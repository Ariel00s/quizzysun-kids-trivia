import { useState, useEffect, useRef } from 'react';
import { Question, Player, Language } from '../types';
import { Volume2, VolumeX, AlertCircle, HelpCircle, Star, ArrowRight, Smile, Sparkles, RefreshCw, Globe } from 'lucide-react';
import { QuestionVisual } from './QuestionVisual';
import { motion, AnimatePresence } from 'motion/react';

interface QuizViewProps {
  activePlayer: Player;
  questions: Question[];
  lang: Language;
  soundOn: boolean;
  onFinish: (score: number, answers: { questionId: string; selectedIndex: number; isCorrect: boolean }[]) => void;
  onExit: () => void;
  currentRound: number;
}

export default function QuizView({
  activePlayer,
  questions,
  lang,
  soundOn,
  onFinish,
  onExit,
  currentRound
}: QuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answersList, setAnswersList] = useState<{ questionId: string; selectedIndex: number; isCorrect: boolean }[]>([]);
  const [wiggleIndex, setWiggleIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [usedHint, setUsedHint] = useState(false);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

  // AI Explainer State (Search Grounding)
  const [isExplaining, setIsExplaining] = useState(false);
  const [aiDeepExplanation, setAiDeepExplanation] = useState<string | null>(null);
  const [aiSources, setAiSources] = useState<{ title: string; uri: string }[]>([]);
  const [explainError, setExplainError] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  // Sound effects & speech synthesis refs
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Encouraging feedback phrases
  const ENCOURAGING_EN = ['Awesome!', 'Outstanding!', 'Spectacular!', 'Super job!', 'Perfect!', 'You are a genius!'];
  const ENCOURAGING_HE = ['כל הכבוד!', 'מצוין!', 'תשובה מנצחת!', 'אתה פשוט אלוף!', 'פשוט מושלם!', 'איזה יופי!'];

  const TRY_AGAIN_EN = ['Nice try!', 'You can do it!', 'So close!', 'Let\'s keep going!', 'Keep trying!'];
  const TRY_AGAIN_HE = ['לא נורא!', 'בפעם הבאה תצליחו!', 'ניסיון יפה!', 'אתם מסוגלים ליותר!', 'קרוב מאוד!'];

  // Narrate current question & options
  const narrateQuestion = () => {
    if (!soundOn || !currentQuestion) return;
    
    try {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      
      const isHe = lang === 'he';
      const questionText = isHe ? currentQuestion.questionHe : currentQuestion.questionEn;
      const options = isHe ? currentQuestion.optionsHe : currentQuestion.optionsEn;
      
      // Build narrated text with options: Question. 1. option 1. 2. option 2...
      let textToSpeak = questionText + ". ";
      options.forEach((opt, index) => {
        textToSpeak += `${index + 1}. ${opt}. `;
      });
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = isHe ? 'he-IL' : 'en-US';
      
      // Try to find native voice
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.startsWith(isHe ? 'he' : 'en'));
      if (voice) {
        utterance.voice = voice;
      }
      
      utterance.rate = 0.95; // Slightly slower for kids
      window.speechSynthesis.speak(utterance);
      speechRef.current = utterance;
    } catch (err) {
      console.warn('Speech synthesis failed:', err);
    }
  };

  // Speak feedback
  const speakFeedback = (isCorrect: boolean) => {
    if (!soundOn) return;
    
    try {
      window.speechSynthesis.cancel();
      const isHe = lang === 'he';
      
      let phrase = '';
      if (isCorrect) {
        const phrases = isHe ? ENCOURAGING_HE : ENCOURAGING_EN;
        phrase = phrases[Math.floor(Math.random() * phrases.length)];
      } else {
        const phrases = isHe ? TRY_AGAIN_HE : TRY_AGAIN_EN;
        phrase = phrases[Math.floor(Math.random() * phrases.length)];
      }

      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = isHe ? 'he-IL' : 'en-US';
      
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.startsWith(isHe ? 'he' : 'en'));
      if (voice) {
        utterance.voice = voice;
      }

      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis failed:', err);
    }
  };

  // Run narration on question change
  useEffect(() => {
    narrateQuestion();
    // Reset local states for new question
    setSelectedAnswerIndex(null);
    setHasAnswered(false);
    setShowFeedback(null);
    setWiggleIndex(null);
    setUsedHint(false);
    setAiDeepExplanation(null);
    setAiSources([]);
    setExplainError(null);
    setIsExplaining(false);

    if (currentQuestion) {
      const count = (lang === 'en' ? currentQuestion.optionsEn : currentQuestion.optionsHe).length;
      const indices = Array.from({ length: count }, (_, i) => i);
      indices.sort(() => Math.random() - 0.5);
      setShuffledIndices(indices);
    }
    
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [currentIndex, lang, soundOn]);

  // Move to next question automatically with a 2.5-second timeout
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (hasAnswered) {
      timer = setTimeout(() => {
        handleNextQuestion();
      }, 2500);
    }
    return () => clearTimeout(timer);
  }, [hasAnswered, currentIndex]);

  const handleAskAI = async () => {
    setIsExplaining(true);
    setExplainError(null);
    setAiDeepExplanation(null);
    try {
      const response = await fetch('/api/gemini/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: lang === 'en' ? currentQuestion.questionEn : currentQuestion.questionHe,
          context: lang === 'en' ? currentQuestion.explanationEn : currentQuestion.explanationHe,
          language: lang,
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to fetch explanation');
      }

      setAiDeepExplanation(data.text);
      setAiSources(data.sources || []);

      // Speak the AI explanation if sound is activated
      if (soundOn) {
        try {
          const cleanText = data.text.replace(/[*#_`]/g, '');
          const utterance = new SpeechSynthesisUtterance(cleanText.slice(0, 300)); // Play reasonable length
          utterance.lang = lang === 'he' ? 'he-IL' : 'en-US';
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utterance);
        } catch (e) {}
      }
    } catch (err: any) {
      setExplainError(err.message || 'An error occurred.');
    } finally {
      setIsExplaining(false);
    }
  };

  const getHintText = () => {
    if (lang === 'en' && currentQuestion.hintEn) {
      return currentQuestion.hintEn;
    }
    if (lang === 'he' && currentQuestion.hintHe) {
      return currentQuestion.hintHe;
    }

    // Dynamic fallback: eliminate one wrong option
    const correctIdx = currentQuestion.answerIndex;
    const totalOptions = currentQuestion[lang === 'en' ? 'optionsEn' : 'optionsHe'].length;
    
    const wrongIndices: number[] = [];
    for (let i = 0; i < totalOptions; i++) {
      if (i !== correctIdx) {
        wrongIndices.push(i);
      }
    }
    
    const charCodeSum = currentQuestion.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const selectedWrongIdx = wrongIndices[charCodeSum % wrongIndices.length];
    const wrongOptionName = currentQuestion[lang === 'en' ? 'optionsEn' : 'optionsHe'][selectedWrongIdx];

    if (lang === 'en') {
      return `Super Tip: It is NOT "${wrongOptionName}"! Try choosing between the other options!`;
    } else {
      return `טיפ כוח: זה בטוח לא "${wrongOptionName}"! נסו לבחור מבין האפשרויות האחרות!`;
    }
  };

  const handleShowHint = () => {
    if (usedHint) return;
    setUsedHint(true);

    if (soundOn) {
      try {
        window.speechSynthesis.cancel();
        const hintText = getHintText();
        const utterance = new SpeechSynthesisUtterance(hintText);
        utterance.lang = lang === 'he' ? 'he-IL' : 'en-US';
        
        const voices = window.speechSynthesis.getVoices();
        const voice = voices.find(v => v.lang.startsWith(lang === 'he' ? 'he' : 'en'));
        if (voice) {
          utterance.voice = voice;
        }
        
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis failed for hint:', err);
      }
    }
  };

  const handleSelectAnswer = (dIdx: number) => {
    if (hasAnswered) return;
    setSelectedAnswerIndex(dIdx);

    const originalIdx = shuffledIndices[dIdx] !== undefined ? shuffledIndices[dIdx] : dIdx;
    const isCorrect = originalIdx === currentQuestion.answerIndex;
    setHasAnswered(true);
    
    if (isCorrect) {
      const pointsEarned = usedHint ? 0.5 : 1;
      setScore(prev => prev + pointsEarned);
      setShowFeedback('correct');
      speakFeedback(true);
    } else {
      setWiggleIndex(dIdx);
      setShowFeedback('wrong');
      speakFeedback(false);
      // Play a quick physical wiggle timeout
      setTimeout(() => setWiggleIndex(null), 800);
    }

    setAnswersList(prev => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedIndex: originalIdx,
        isCorrect
      }
    ]);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onFinish(score, answersList);
    }
  };

  const getButtonColor = (index: number) => {
    // Colors mapping for answers: Blue, Green, Yellow, Red
    const colors = [
      'bg-[#74B9FF] hover:bg-[#0984E3] text-white border-white/30 shadow-chunky-blue hover-chunky-blue',
      'bg-[#55EFC4] hover:bg-[#00B894] text-white border-white/30 shadow-chunky-green hover-chunky-green',
      'bg-[#FFEAA7] hover:bg-[#FDCB6E] text-[#D35400] border-white/30 shadow-chunky-yellow hover-chunky-yellow',
      'bg-[#FF7675] hover:bg-[#D63031] text-white border-white/30 shadow-chunky-red hover-chunky-red'
    ];
    return colors[index % 4];
  };

  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-1.5 sm:gap-2.5 relative">
      
      {/* Super Slim Progress and Minimal Control Header */}
      <div className="w-full flex items-center justify-between gap-2.5 bg-white/50 backdrop-blur-sm px-2.5 py-1.5 rounded-2xl border border-[#74B9FF]/20 shadow-sm">
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onExit}
            className="w-7 h-7 rounded-full bg-white hover:bg-slate-50 border border-[#74B9FF]/50 flex items-center justify-center cursor-pointer text-xs shadow-xs transition-transform hover:scale-110"
            title={lang === 'en' ? 'Main Menu' : 'תפריט ראשי'}
          >
            🏠
          </button>
          <button
            onClick={() => onFinish(score, answersList)}
            className="w-7 h-7 rounded-full bg-white hover:bg-slate-50 border border-rose-300 flex items-center justify-center cursor-pointer text-xs shadow-xs transition-transform hover:scale-110"
            title={lang === 'en' ? 'End Game' : 'סיום המשחק'}
          >
            🏁
          </button>
        </div>

        <span className="font-bold text-[#FF7675] text-xs sm:text-sm whitespace-nowrap">
          {lang === 'en' 
            ? `Round ${currentRound} • Q ${currentIndex + 1}/${totalQuestions}` 
            : `סיבוב ${currentRound} • שאלה ${currentIndex + 1}/${totalQuestions}`}
        </span>

        {/* Thinner progress bar directly inline or neat */}
        <div className="flex-grow max-w-[140px] sm:max-w-[220px] h-3 bg-slate-100 rounded-full border border-[#FDCB6E] overflow-hidden">
          <div
            className="h-full bg-[#55EFC4] candy-stripe rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <span className="text-xs font-bold text-[#D35400] shrink-0 whitespace-nowrap bg-[#FFEAA7]/60 px-2 py-0.5 rounded-full border border-[#FDCB6E]/40">
          ⭐ {score} {lang === 'en' ? 'pts' : 'נק׳'}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="w-full flex flex-col items-center"
        >
          {/* Main Question Card */}
          <div className="w-full bg-white/80 backdrop-blur-sm border-2 border-[#74B9FF]/50 rounded-3xl p-3 sm:p-4 flex flex-col items-center text-center relative mt-4 shadow-sm">
            {/* Category Label Pin */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF7675] text-white px-5 py-1 rounded-full border-2 border-white font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-sm">
              {lang === 'en' ? currentQuestion.category : (
                currentQuestion.category === 'Geography' ? 'גאוגרפיה' :
                currentQuestion.category === 'Animals' ? 'בעלי חיים' :
                currentQuestion.category === 'Math' ? 'חשבון' :
                currentQuestion.category === 'History' ? 'היסטוריה' :
                currentQuestion.category === 'Science' ? 'מדע' :
                currentQuestion.category === 'Space' ? 'חלל' : currentQuestion.category
              )}
            </div>

            {/* Top Control Bar inside Card to avoid overlapping with question text */}
            <div className="w-full flex justify-between items-center gap-4 mb-4 mt-2">
              {/* Hint button on top-left of card */}
              {!hasAnswered ? (
                <button
                  onClick={handleShowHint}
                  disabled={usedHint}
                  className={`px-3 py-1.5 rounded-full border font-bold text-xs flex items-center gap-1 cursor-pointer transition-all hover:scale-110 active:scale-95 shadow-sm ${
                    usedHint
                      ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                      : 'bg-[#FFEAA7] text-[#D35400] border-[#FDCB6E]'
                  }`}
                  title={lang === 'en' ? 'Get a hint (-0.5 pts)' : 'קבל רמז (-0.5 נקודות)'}
                >
                  <span>💡</span>
                  <span className="inline-block">
                    {usedHint 
                      ? (lang === 'en' ? 'Hint Used' : 'הרמז נוצל') 
                      : (lang === 'en' ? 'Hint (-0.5 pts)' : 'רמז (-0.5 נק׳)')}
                  </span>
                </button>
              ) : <div />}

              {/* Narrate Repeat Voice button */}
              <button
                onClick={narrateQuestion}
                className="w-10 h-10 rounded-full border border-[#74B9FF] bg-blue-50 hover:bg-blue-100 flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 shadow-sm shrink-0"
                title={lang === 'en' ? 'Listen to question' : 'הקשב לשאלה'}
              >
                <Volume2 className="w-5 h-5 text-[#0984E3]" />
              </button>
            </div>

            <h2 className="font-headline-md text-lg sm:text-2xl text-[#2D3436] font-black mb-1">
              {lang === 'en' ? currentQuestion.questionEn : currentQuestion.questionHe}
            </h2>

            <QuestionVisual question={currentQuestion} lang={lang} />

            {/* Display hint if used */}
            {usedHint && (
              <div className="mt-4 p-3 bg-[#FFEAA7]/40 border border-[#FDCB6E] rounded-xl text-sm font-bold text-[#D35400] animate-pop max-w-md">
                <span>💡 </span>
                <span>{getHintText()}</span>
              </div>
            )}
          </div>

          {/* Answer Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full mt-2">
            {shuffledIndices.map((originalIdx, idx) => {
              const option = (lang === 'en' ? currentQuestion.optionsEn : currentQuestion.optionsHe)[originalIdx];
              const isSelected = selectedAnswerIndex === idx;
              const isWiggled = wiggleIndex === idx;
              
              let stateStyle = getButtonColor(idx);
              if (isSelected) {
                stateStyle = 'bg-[#FF7675] text-white border-white/20 shadow-sm scale-102';
              }
              if (hasAnswered) {
                if (originalIdx === currentQuestion.answerIndex) {
                  stateStyle = 'bg-[#55EFC4] text-white border-white/20 shadow-sm scale-102';
                } else if (isSelected) {
                  stateStyle = 'bg-[#FF7675] text-white border-white/20 shadow-sm opacity-60';
                } else {
                  stateStyle = 'opacity-40 pointer-events-none';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={hasAnswered}
                  onClick={() => handleSelectAnswer(idx)}
                  className={`w-full p-2.5 sm:p-3 text-left md:text-center text-sm sm:text-lg font-bold rounded-2xl border-2 transition-all duration-100 flex items-center justify-between sm:justify-center gap-2 active:translate-y-0.5 active:shadow-none cursor-pointer ${stateStyle} ${
                    isWiggled ? 'animate-wiggle' : ''
                  }`}
                >
                  {/* Option Index Bubble marker */}
                  <span className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center font-bold text-sm select-none">
                    {idx + 1}
                  </span>
                  <span className="flex-grow text-center font-bold">{option}</span>
                  <span className="w-8 shrink-0" /> {/* Spacer spacer */}
                </button>
              );
            })}
          </div>

          {/* Action / Explanation Box */}
          <div className="w-full flex flex-col items-center gap-2 mt-2">
            {hasAnswered && (
              <div className="w-full flex flex-col items-center gap-3">
                {/* Explanation box */}
                <div className={`w-full p-3 rounded-xl border-4 text-center animate-pop ${
                  showFeedback === 'correct'
                    ? 'bg-emerald-50 border-[#55EFC4] text-emerald-900'
                    : 'bg-rose-50 border-[#FF7675] text-[#D63031]'
                }`}>
                  <h4 className="font-bold text-sm mb-1 flex items-center justify-center gap-1">
                    {showFeedback === 'correct' ? (
                      <>
                        <span>🌟</span>
                        <span>{lang === 'en' ? 'Awesome explanation!' : 'הסבר קצר ומעניין!'}</span>
                      </>
                    ) : (
                      <>
                        <span>💡</span>
                        <span>{lang === 'en' ? 'Did you know?' : 'הידעתם?'}</span>
                      </>
                    )}
                  </h4>
                  <p className="text-xs font-bold leading-normal">
                    {lang === 'en' ? currentQuestion.explanationEn : currentQuestion.explanationHe}
                  </p>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 px-5 py-2 bg-[#74B9FF] text-white font-headline-md text-lg border-4 border-white/20 rounded-2xl shadow-chunky-blue hover-chunky-blue active:translate-y-1 active:shadow-none hover:scale-105 transition-all cursor-pointer font-black"
                >
                  <span>
                    {currentIndex + 1 < totalQuestions
                      ? lang === 'en' ? 'Next Question' : 'לשאלה הבאה'
                      : lang === 'en' ? 'View Results' : 'לצפייה בתוצאות'}
                  </span>
                  <ArrowRight className={`w-5 h-5 ${lang === 'he' ? 'rotate-180' : ''}`} />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Visual Feedback Overlay Overlay */}
      {showFeedback && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center animate-pop">
          <div className="text-[120px] select-none filter drop-shadow-md">
            {showFeedback === 'correct' ? '⭐' : '😅'}
          </div>
        </div>
      )}
    </div>
  );
}
