import { useState, useEffect, useRef } from 'react';
import { Player, Question, Language, getEncouragingPhrases } from '../types';
import { QUESTIONS } from '../questions';
import { Volume2, VolumeX, AlertCircle, Shield, Trophy, Timer, ArrowRight, RotateCcw, HelpCircle } from 'lucide-react';
import { QuestionVisual } from './QuestionVisual';

interface VersusQuizViewProps {
  player1: Player;
  player2: Player;
  category: string;
  modeStyle: 'time' | 'turn';
  timeLimitSeconds: number;
  lang: Language;
  soundOn: boolean;
  onFinish: (winnerId: string | null, score1: number, score2: number, detailsText: string, answered1?: string[], answered2?: string[]) => void;
  onExit: () => void;
}

export default function VersusQuizView({
  player1,
  player2,
  category,
  modeStyle,
  timeLimitSeconds,
  lang,
  soundOn,
  onFinish,
  onExit
}: VersusQuizViewProps) {
  // Question Pools (filtered per player's ageGroup and shuffled)
  const [pool1, setPool1] = useState<Question[]>([]);
  const [pool2, setPool2] = useState<Question[]>([]);

  // Turn States
  // 'turn' mode: round-by-round alternating turns
  // 'time' mode: Player 1 answers as many as possible, then Player 2 does, then show results
  const [activeTurn, setActiveTurn] = useState<1 | 2 | 'results'>(1);
  const [turnStarted, setTurnStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimitSeconds);

  // Scores and Answers
  const [p1Answers, setP1Answers] = useState<{ questionId: string; isCorrect: boolean }[]>([]);
  const [p2Answers, setP2Answers] = useState<{ questionId: string; isCorrect: boolean }[]>([]);
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);

  // Active question indexes for each player
  const [p1Index, setP1Index] = useState(0);
  const [p2Index, setP2Index] = useState(0);

  // Feedback states
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [wiggleIndex, setWiggleIndex] = useState<number | null>(null);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

  // Turn-by-Turn mode specific progress
  const [currentRound, setCurrentRound] = useState(1);
  const totalRounds = 5; // each player gets 5 questions

  // Sound/TTS Refs
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize question pools on mount
  useEffect(() => {
    const answered1 = player1.answeredQuestions || [];
    const answered2 = player2.answeredQuestions || [];

    if (player1.ageGroup === player2.ageGroup) {
      // If they are in the same age group, filter once and divide to ensure zero duplicate questions
      let matching = QUESTIONS.filter((q) => q.ageGroup === player1.ageGroup);
      if (category !== 'All') {
        matching = matching.filter((q) => q.category === category);
      }
      
      const combinedAnswered = [...answered1, ...answered2];
      let unreplied = matching.filter((q) => !combinedAnswered.includes(q.id));
      if (unreplied.length < 10) {
        unreplied = matching;
      }

      const shuffled = [...unreplied].sort(() => Math.random() - 0.5);
      
      const finalPool1: Question[] = [];
      const finalPool2: Question[] = [];
      shuffled.forEach((q, index) => {
        if (index % 2 === 0) {
          finalPool1.push(q);
        } else {
          finalPool2.push(q);
        }
      });

      setPool1(finalPool1.length > 0 ? finalPool1 : QUESTIONS.slice(0, 15));
      setPool2(finalPool2.length > 0 ? finalPool2 : QUESTIONS.slice(15, 30));
    } else {
      // If age groups are different, the pools are already completely disjoint by design
      let p1Pool = QUESTIONS.filter((q) => q.ageGroup === player1.ageGroup);
      if (category !== 'All') {
        p1Pool = p1Pool.filter((q) => q.category === category);
      }
      let unreplied1 = p1Pool.filter((q) => !answered1.includes(q.id));
      if (unreplied1.length < 5) {
        unreplied1 = p1Pool;
      }
      const shuffled1 = [...unreplied1].sort(() => Math.random() - 0.5);
      setPool1(shuffled1.length > 0 ? shuffled1 : QUESTIONS.slice(0, 15));

      let p2Pool = QUESTIONS.filter((q) => q.ageGroup === player2.ageGroup);
      if (category !== 'All') {
        p2Pool = p2Pool.filter((q) => q.category === category);
      }
      let unreplied2 = p2Pool.filter((q) => !answered2.includes(q.id));
      if (unreplied2.length < 5) {
        unreplied2 = p2Pool;
      }
      const shuffled2 = [...unreplied2].sort(() => Math.random() - 0.5);
      setPool2(shuffled2.length > 0 ? shuffled2 : QUESTIONS.slice(0, 15));
    }
  }, [player1.ageGroup, player2.ageGroup, category, player1.answeredQuestions, player2.answeredQuestions]);

  // Get active question depending on mode & active turn
  const getCurrentQuestion = (): Question | null => {
    if (activeTurn === 1) {
      if (pool1.length === 0) return null;
      // loop back to beginning if we run out
      const idx = p1Index % pool1.length;
      return pool1[idx];
    } else {
      if (pool2.length === 0) return null;
      const idx = p2Index % pool2.length;
      return pool2[idx];
    }
  };

  const currentQuestion = getCurrentQuestion();

  // Narrate current question & options
  const narrateQuestion = () => {
    if (!soundOn || !currentQuestion || shuffledIndices.length === 0) return;
    try {
      window.speechSynthesis.cancel();
      const isHe = lang === 'he';
      const questionText = isHe ? currentQuestion.questionHe : currentQuestion.questionEn;
      const options = isHe ? currentQuestion.optionsHe : currentQuestion.optionsEn;

      let textToSpeak = questionText + ". ";
      shuffledIndices.forEach((originalIdx, idx) => {
        const opt = options[originalIdx];
        textToSpeak += `${idx + 1}. ${opt}. `;
      });

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = isHe ? 'he-IL' : 'en-US';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
      speechRef.current = utterance;
    } catch (e) {
      console.warn(e);
    }
  };

  // Speak short feedback
  const speakFeedbackText = (isCorrect: boolean) => {
    if (!soundOn) return;
    try {
      window.speechSynthesis.cancel();
      const isHe = lang === 'he';
      const currentPlayer = activeTurn === 1 ? player1 : player2;
      const gender = currentPlayer.gender || 'male';
      
      const phrases = getEncouragingPhrases(lang, gender, isCorrect);
      const text = phrases[Math.floor(Math.random() * phrases.length)];

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = isHe ? 'he-IL' : 'en-US';
      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  };

  // Automatically speak when question changes & turn started & indices shuffled
  useEffect(() => {
    if (turnStarted && currentQuestion && activeTurn !== 'results' && shuffledIndices.length > 0) {
      narrateQuestion();
    }
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [shuffledIndices, turnStarted, activeTurn]);

  // Shuffle options on question changes in VersusQuizView
  useEffect(() => {
    if (currentQuestion) {
      const count = (lang === 'he' ? currentQuestion.optionsHe : currentQuestion.optionsEn).length;
      const indices = Array.from({ length: count }, (_, i) => i);
      indices.sort(() => Math.random() - 0.5);
      setShuffledIndices(indices);
    }
  }, [p1Index, p2Index, activeTurn, currentQuestion, lang]);

  // Timer loop for Time Attack Mode
  useEffect(() => {
    if (modeStyle === 'time' && turnStarted && activeTurn !== 'results') {
      setTimeRemaining(timeLimitSeconds);
      
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current!);
            handleTimeAttackTurnFinished();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [turnStarted, activeTurn, modeStyle, timeLimitSeconds]);

  // Finish a player's timed turn
  const handleTimeAttackTurnFinished = () => {
    window.speechSynthesis.cancel();
    if (soundOn) {
      try {
        const text = lang === 'en' ? "Time is up!" : "תם הזמן!";
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === 'he' ? 'he-IL' : 'en-US';
        window.speechSynthesis.speak(utterance);
      } catch (e) {}
    }

    setSelectedAnswerIndex(null);
    setHasAnswered(false);
    setShowFeedback(null);

    if (activeTurn === 1) {
      // Prompt Player 2
      setTurnStarted(false);
      setActiveTurn(2);
    } else {
      // Both finished! Evaluate final outcome
      setActiveTurn('results');
    }
  };

  // Handles Answer Submission
  const handleAnswerSelect = (optionIdx: number) => {
    if (hasAnswered || !currentQuestion) return;

    const originalIdx = shuffledIndices[optionIdx] !== undefined ? shuffledIndices[optionIdx] : optionIdx;
    const isCorrect = originalIdx === currentQuestion.answerIndex;
    setSelectedAnswerIndex(optionIdx);
    setHasAnswered(true);
    setShowFeedback(isCorrect ? 'correct' : 'wrong');
    speakFeedbackText(isCorrect);

    if (activeTurn === 1) {
      setP1Answers((prev) => [...prev, { questionId: currentQuestion.id, isCorrect }]);
      if (isCorrect) setP1Score((prev) => prev + 1);
    } else {
      setP2Answers((prev) => [...prev, { questionId: currentQuestion.id, isCorrect }]);
      if (isCorrect) setP2Score((prev) => prev + 1);
    }

    // In Time Attack, we transition AUTOMATICALLY to keep the rhythm super fun!
    if (modeStyle === 'time') {
      setTimeout(() => {
        // Proceed to next question automatically
        if (activeTurn === 1) {
          setP1Index((prev) => prev + 1);
        } else {
          setP2Index((prev) => prev + 1);
        }
        setHasAnswered(false);
        setSelectedAnswerIndex(null);
        setShowFeedback(null);
      }, 1300);
    }
  };

  // Next Turn or Next Question in Turn-by-Turn mode
  const handleNextTurnByTurn = () => {
    setSelectedAnswerIndex(null);
    setHasAnswered(false);
    setShowFeedback(null);

    if (activeTurn === 1) {
      // Change turn to player 2 in same round
      setActiveTurn(2);
    } else {
      // Player 2 finished their turn in this round.
      if (currentRound >= totalRounds) {
        // Duel complete!
        setActiveTurn('results');
      } else {
        // Advance round and return to Player 1
        setCurrentRound((prev) => prev + 1);
        setActiveTurn(1);
        setP1Index((prev) => prev + 1);
        setP2Index((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (modeStyle === 'turn' && hasAnswered) {
      timer = setTimeout(() => {
        handleNextTurnByTurn();
      }, 3000);
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeStyle, hasAnswered, activeTurn, currentRound]);

  // Complete match & notify parent
  const handleFinishMatch = () => {
    let winnerId: string | null = null;
    let details = '';

    if (p1Score > p2Score) {
      winnerId = player1.id;
      details = lang === 'en' 
        ? `${player1.name} wins the quiz duel!` 
        : `${player1.name} ניצח/ה בדו-קרב החידונים!`;
    } else if (p2Score > p1Score) {
      winnerId = player2.id;
      details = lang === 'en' 
        ? `${player2.name} wins the quiz duel!` 
        : `${player2.name} ניצח/ה בדו-קרב החידונים!`;
    } else {
      details = lang === 'en' ? "It's a draw battle!" : "תיקו מותח!";
    }

    const answered1 = p1Answers.map((a) => a.questionId);
    const answered2 = p2Answers.map((a) => a.questionId);

    onFinish(winnerId, p1Score, p2Score, details, answered1, answered2);
  };

  // Ready page helper text
  const getTopicLabel = () => {
    switch (category) {
      case 'Geography': return lang === 'en' ? 'Geography 🌍' : 'גאוגרפיה 🌍';
      case 'Animals': return lang === 'en' ? 'Animals 🦁' : 'בעלי חיים 🦁';
      case 'Math': return lang === 'en' ? 'Math 🔢' : 'חשבון 🔢';
      case 'History': return lang === 'en' ? 'History ⏳' : 'היסטוריה ⏳';
      case 'Science': return lang === 'en' ? 'Science 🧪' : 'מדע 🧪';
      case 'Space': return lang === 'en' ? 'Space 🚀' : 'חלל 🚀';
      case 'Stories': return lang === 'en' ? 'Stories 🏰' : 'סיפורים ואגדות 🏰';
      default: return lang === 'en' ? 'Mixed Topics ☀️' : 'נושאים מעורבים ☀️';
    }
  };

  // RENDER: Duel Complete / Results Screen
  if (activeTurn === 'results') {
    const isTie = p1Score === p2Score;
    const winner = p1Score > p2Score ? player1 : player2;

    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center relative overflow-hidden animate-pop">
        <div className="absolute top-1 left-1 right-1 h-2 bg-white/40 rounded-full opacity-50" />
        
        <h2 className="font-headline-lg-mobile text-[#FF7675] mb-2 leading-none font-extrabold text-2xl md:text-3xl uppercase tracking-wide">
          🏆 BATTLE RESULTS! 🏆
        </h2>

        <div className="flex justify-center mb-4 text-5xl">🎉</div>

        <p className="text-lg md:text-xl font-black text-[#2D3436] mb-4">
          {isTie
            ? lang === 'en' 
              ? `It's an epic tie! ${p1Score} - ${p2Score}! 🤝` 
              : `תיקו דרמטי! ${p1Score} מול ${p2Score}! 🤝`
            : lang === 'en'
              ? `${winner.name} wins with ${Math.max(p1Score, p2Score)} points! 👑`
              : `${winner.name} מנצח/ת עם ${Math.max(p1Score, p2Score)} נקודות! 👑`}
        </p>

        {/* Duel comparison cards */}
        <div className="grid grid-cols-2 gap-3 mb-5 w-full">
          {/* Player 1 summary */}
          <div className={`p-3.5 rounded-2xl border-2 ${p1Score >= p2Score ? 'bg-amber-50/80 border-[#74B9FF]' : 'bg-white border-slate-200'}`}>
            {player1.profilePic ? (
              <div className="w-11 h-11 rounded-full border border-[#74B9FF] overflow-hidden shrink-0 bg-white mx-auto flex items-center justify-center">
                <img src={player1.profilePic} alt={player1.name} className="w-full h-full object-cover scale-x-[-1]" />
              </div>
            ) : (
              <span className="text-4xl">{player1.avatar}</span>
            )}
            <p className="text-base font-bold text-[#2D3436] mt-1 truncate">{player1.name}</p>
            <p className="text-lg font-black text-[#0984E3] mt-0.5">{p1Score} {lang === 'en' ? 'Correct' : 'נכונות'}</p>
          </div>

          {/* Player 2 summary */}
          <div className={`p-3.5 rounded-2xl border-2 ${p2Score >= p1Score ? 'bg-amber-50/80 border-[#74B9FF]' : 'bg-white border-slate-200'}`}>
            {player2.profilePic ? (
              <div className="w-11 h-11 rounded-full border border-rose-300 overflow-hidden shrink-0 bg-white mx-auto flex items-center justify-center">
                <img src={player2.profilePic} alt={player2.name} className="w-full h-full object-cover scale-x-[-1]" />
              </div>
            ) : (
              <span className="text-4xl">{player2.avatar}</span>
            )}
            <p className="text-base font-bold text-[#2D3436] mt-1 truncate">{player2.name}</p>
            <p className="text-lg font-black text-[#0984E3] mt-0.5">{p2Score} {lang === 'en' ? 'Correct' : 'נכונות'}</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex gap-3 w-full max-w-md">
          <button
            onClick={onExit}
            className="flex-1 py-2.5 bg-white text-[#2D3436] border border-slate-300 rounded-xl font-bold text-sm hover:scale-102 active:translate-y-0.5 transition-all cursor-pointer"
          >
            {lang === 'en' ? 'Back to Menu' : 'חזרה לתפריט'}
          </button>
          
          <button
            onClick={handleFinishMatch}
            className="flex-grow py-2.5 bg-[#D2E3FC] text-[#0984E3] border-2 border-[#74B9FF] rounded-xl shadow-sm font-black text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all"
          >
            <span>{lang === 'en' ? 'Claim Points!' : 'איסוף נקודות!'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // RENDER: Turn Pre-start / Ready screen
  if (!turnStarted) {
    const isP1 = activeTurn === 1;
    const activeChallenger = isP1 ? player1 : player2;

    return (
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center text-center relative overflow-hidden animate-pop">
        <div className="absolute top-1 left-1 right-1 h-2 bg-white/40 rounded-full opacity-50" />
        
        <p className="text-xs font-black text-[#FF7675] uppercase tracking-widest mb-1">
          {modeStyle === 'time'
            ? lang === 'en' ? '⚡ TIME ATTACK DUEL ⚡' : '⚡ מרוץ נגד השעון ⚡'
            : lang === 'en' ? `🔄 ROUND ${currentRound} OF ${totalRounds} 🔄` : `🔄 סיבוב ${currentRound} מתוך ${totalRounds} 🔄`}
        </p>

        <h3 className="text-xl md:text-2xl font-black text-[#2D3436] mb-2.5">
          {lang === 'en' ? 'Get Ready!' : 'התכוננו!'}
        </h3>

        {/* Big Avatar Card */}
        <div className="w-40 h-40 mx-auto rounded-full bg-amber-50 border-4 border-[#74B9FF] flex items-center justify-center text-7xl shadow-md mb-6 animate-pulse">
          {activeChallenger.profilePic ? (
            <img src={activeChallenger.profilePic} alt={activeChallenger.name} className="w-16 h-16 rounded-full object-cover scale-x-[-1] border-4 border-current" />
          ) : (
            activeChallenger.avatar
          )}
        </div>

        <h4 className="text-2xl font-black text-primary mb-2">
          {lang === 'en' ? `${activeChallenger.name}'s Turn!` : `התור של ${activeChallenger.name}!`}
        </h4>

        <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-100 max-w-md mx-auto mb-8 text-center">
          <p className="text-sm font-bold text-slate-500 mb-2">
            {lang === 'en' ? 'Topic:' : 'נושא:'} <span className="text-[#0984E3]">{getTopicLabel()}</span>
          </p>
          <p className="text-sm font-bold text-slate-500 mb-2">
            {lang === 'en' ? 'Difficulty Level:' : 'רמת קושי:'} <span className="text-secondary">{activeChallenger.ageGroup === '5-7' ? (lang === 'en' ? 'Ages 5-7 🦕' : 'גילאי 5-7 🦕') : activeChallenger.ageGroup === '8-13' ? (lang === 'en' ? 'Ages 8-13 🚀' : 'גילאי 8-13 🚀') : (lang === 'en' ? 'Ages 13+ 🎓' : 'גילאי 13+ 🎓')}</span>
          </p>
          <p className="text-sm font-medium text-slate-600 leading-relaxed mt-2">
            {modeStyle === 'time'
              ? lang === 'en'
                ? `You have exactly ${timeLimitSeconds} seconds to answer as many questions correctly as possible!`
                : `יש לכם בדיוק ${timeLimitSeconds} שניות לענות נכון על כמה שיותר שאלות!`
              : lang === 'en'
                ? `Answer one question carefully to score a point for this round!`
                : `ענו על שאלה אחת בתשומת לב כדי לזכות בנקודה בסיבוב זה!`}
          </p>
        </div>

        {/* Duel current stats header */}
        <div className="flex items-center justify-center gap-6 mb-8 text-sm font-black text-slate-400">
          <div>{player1.name}: {p1Score}</div>
          <div className="text-slate-300">|</div>
          <div>{player2.name}: {p2Score}</div>
        </div>

        {/* Start Button */}
        <button
          onClick={() => {
            setTurnStarted(true);
            if (modeStyle === 'time') {
              setTimeRemaining(timeLimitSeconds);
            }
          }}
          className="w-full py-4 bg-secondary-container text-on-secondary-container border-4 border-[#74B9FF] rounded-2xl shadow-chunky-yellow hover-chunky-yellow font-extrabold text-xl flex items-center justify-center gap-2 cursor-pointer animate-bounce"
        >
          <span>{lang === 'en' ? 'START MY TURN! ⏱️' : 'להתחלת התור שלי! ⏱️'}</span>
        </button>
      </div>
    );
  }

  // RENDER: Active Trivia Duel Screen
  const isP1Active = activeTurn === 1;
  const currentChallenger = isP1Active ? player1 : player2;
  const currentChallengerScore = isP1Active ? p1Score : p2Score;

  return (
    <div className="w-full max-w-3xl flex flex-col gap-1.5 sm:gap-2.5 relative animate-pop">
      {/* Top Split status banner */}
      <div className="flex items-center justify-between border-b-2 border-slate-100 pb-2 mb-2 gap-2">
        {/* Active Player */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-100 border border-[#74B9FF] flex items-center justify-center text-lg shrink-0">
            {currentChallenger.profilePic ? (
              <img src={currentChallenger.profilePic} alt={currentChallenger.name} className="w-6 h-6 rounded-full object-cover scale-x-[-1]" />
            ) : (
              currentChallenger.avatar
            )}
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">
              {lang === 'en' ? 'Active' : 'פעיל'}
            </p>
            <p className="text-xs font-black text-[#2D3436] truncate max-w-[80px] sm:max-w-none">{currentChallenger.name}</p>
          </div>
        </div>

        {/* Middle: Timer or Round stats */}
        <div className="flex flex-col items-center">
          {modeStyle === 'time' ? (
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full border-2 font-black text-xs ${timeRemaining <= 10 ? 'bg-rose-50 border-rose-300 text-rose-500 animate-pulse' : 'bg-blue-50 border-blue-200 text-[#0984E3]'}`}>
              <Timer className="w-3.5 h-3.5" />
              <span>{timeRemaining}s</span>
            </div>
          ) : (
            <div className="px-3 py-0.5 rounded-full border border-slate-200 bg-slate-50 font-black text-[10px] text-slate-500">
              {lang === 'en' ? `Round ${currentRound}/${totalRounds}` : `סיבוב ${currentRound}/${totalRounds}`}
            </div>
          )}
        </div>

        {/* Scores tracker */}
        <div className="text-right flex items-center gap-2">
          <div className="hidden sm:block text-[10px] font-bold text-slate-400">
            <div>{player1.name}: {p1Score}</div>
            <div>{player2.name}: {p2Score}</div>
          </div>
          <div className="px-2.5 py-0.5 bg-amber-50 border border-[#74B9FF] text-[#0984E3] font-black text-xs rounded-lg">
            {currentChallengerScore} pts
          </div>
        </div>
      </div>

      {/* Duel progress dot bar (Visible in Turn Mode) */}
      {modeStyle === 'turn' && (
        <div className="grid grid-cols-2 gap-2 mb-3 text-center bg-slate-50 p-2 rounded-2xl border border-slate-100 text-xs font-black">
          <div>
            <span className="mr-1 flex items-center gap-1">
              {player1.profilePic ? <img src={player1.profilePic} className="w-4 h-4 rounded-full object-cover scale-x-[-1]" /> : player1.avatar} {player1.name}:
            </span>
            <span className="inline-flex gap-1">
              {Array.from({ length: totalRounds }).map((_, rIdx) => {
                const answer = p1Answers[rIdx];
                return (
                  <span key={rIdx} className="text-sm">
                    {answer ? (answer.isCorrect ? '🟢' : '🔴') : '⚪'}
                  </span>
                );
              })}
            </span>
          </div>
          <div className="border-l border-slate-200">
            <span className="mr-1 flex items-center gap-1">
              {player2.profilePic ? <img src={player2.profilePic} className="w-4 h-4 rounded-full object-cover scale-x-[-1]" /> : player2.avatar} {player2.name}:
            </span>
            <span className="inline-flex gap-1">
              {Array.from({ length: totalRounds }).map((_, rIdx) => {
                const answer = p2Answers[rIdx];
                return (
                  <span key={rIdx} className="text-sm">
                    {answer ? (answer.isCorrect ? '🟢' : '🔴') : '⚪'}
                  </span>
                );
              })}
            </span>
          </div>
        </div>
      )}

      {/* Question container */}
      {currentQuestion ? (
        <div className="w-full flex flex-col gap-3">
          {/* Question card */}
          <div className="bg-[#E8F0FE] border-4 border-[#74B9FF] rounded-[24px] p-3 shadow-inner relative min-h-[70px] flex items-center justify-center text-center group">
            <button
              onClick={narrateQuestion}
              className="absolute top-2 left-2 w-9 h-9 rounded-full border-2 border-[#74B9FF] bg-blue-50 hover:bg-blue-100 flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 shadow-sm opacity-50 hover:opacity-100"
              title={lang === 'en' ? 'Listen to question' : 'הקשב לשאלה'}
            >
              <Volume2 className="w-4 h-4 text-[#0984E3]" />
            </button>
            <p className="font-headline-md text-base md:text-xl text-[#2D3436] font-bold leading-snug pt-2">
              {lang === 'he' ? currentQuestion.questionHe : currentQuestion.questionEn}
            </p>
          </div>

          {!hasAnswered ? (
            <QuestionVisual question={currentQuestion} lang={lang} />
          ) : (
            modeStyle === 'turn' && (
              <div className="w-full max-w-xl p-3 rounded-2xl border-4 text-center bg-emerald-50 border-[#55EFC4] text-emerald-900 my-2 animate-pop mx-auto">
                <h4 className="font-black text-sm mb-1 flex items-center justify-center gap-1">
                  <span>💡</span>
                  <span>{lang === 'en' ? 'Did you know?' : 'הידעתם?'}</span>
                </h4>
                <p className="text-xs font-bold leading-normal">
                  {lang === 'he' ? currentQuestion.explanationHe : currentQuestion.explanationEn}
                </p>
              </div>
            )
          )}

          {/* Options grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
            {shuffledIndices.map((originalIdx, idx) => {
              const option = (lang === 'he' ? currentQuestion.optionsHe : currentQuestion.optionsEn)[originalIdx];
              const isSelected = selectedAnswerIndex === idx;
              const isCorrectAnswer = originalIdx === currentQuestion.answerIndex;
              
              const colors = [
                'bg-gradient-to-r from-[#74B9FF] to-[#0984E3] text-white border-white/30 shadow-[0_5px_0_0_#0652DD] hover:shadow-[0_3px_0_0_#0652DD] hover:translate-y-0.5 active:translate-y-1 active:shadow-none',
                'bg-gradient-to-r from-[#55EFC4] to-[#00B894] text-white border-white/30 shadow-[0_5px_0_0_#008060] hover:shadow-[0_3px_0_0_#008060] hover:translate-y-0.5 active:translate-y-1 active:shadow-none',
                'bg-gradient-to-r from-[#FFEAA7] to-[#F1C40F] text-[#7F5F00] border-white/30 shadow-[0_5px_0_0_#D97706] hover:shadow-[0_3px_0_0_#D97706] hover:translate-y-0.5 active:translate-y-1 active:shadow-none',
                'bg-gradient-to-r from-[#FF7675] to-[#D63031] text-white border-white/30 shadow-[0_5px_0_0_#B31B1B] hover:shadow-[0_3px_0_0_#B31B1B] hover:translate-y-0.5 active:translate-y-1 active:shadow-none'
              ];
              let btnClass = colors[idx % 4];
              
              if (isSelected) {
                btnClass = 'bg-gradient-to-r from-[#FF7675] to-[#D63031] text-white border-white/40 shadow-[0_3px_0_0_#B31B1B] scale-102';
              }
              if (hasAnswered) {
                if (isCorrectAnswer) {
                  btnClass = 'bg-gradient-to-r from-[#55EFC4] to-[#00B894] text-white border-white/40 shadow-[0_3px_0_0_#008060] scale-102';
                } else if (isSelected) {
                  btnClass = 'bg-gradient-to-r from-[#FF7675] to-[#D63031] text-white border-white/40 shadow-[0_3px_0_0_#B31B1B] opacity-60 scale-98';
                } else {
                  btnClass = 'opacity-40 pointer-events-none';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={hasAnswered}
                  onClick={() => handleAnswerSelect(idx)}
                  className={`w-full p-2 sm:p-2.5 rounded-2xl border-4 text-left font-headline-md text-xs sm:text-sm md:text-base transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                >
                  <span className="font-bold flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{option}</span>
                  </span>
                  {hasAnswered && isCorrectAnswer && (
                    <span className="text-emerald-600 text-xl">✅</span>
                  )}
                  {hasAnswered && isSelected && !isCorrectAnswer && (
                    <span className="text-rose-600 text-xl">❌</span>
                  )}
                </button>
              );
            })}
          </div>



        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-slate-500">{lang === 'en' ? 'Loading question pools...' : 'טוען מאגר שאלות...'}</p>
        </div>
      )}
    </div>
  );
}
