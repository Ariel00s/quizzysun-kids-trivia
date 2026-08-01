import { useState, useEffect, useRef } from 'react';
import { Player, QuizState, Category, AgeGroup, Language } from './types';
import { QUESTIONS, BADGES } from './questions';
import RegisterPlayer from './components/RegisterPlayer';
import MainMenu from './components/MainMenu';
import QuizView from './components/QuizView';
import VictoryView from './components/VictoryView';
import BadgeBook from './components/BadgeBook';
import Leaderboard from './components/Leaderboard';
import ThreeMascot from './components/ThreeMascot';
import { Users, UserPlus, Trophy, Sparkles, Smile, Volume2, Globe, Heart, Settings, X, RefreshCw, VolumeX } from 'lucide-react';
import VersusQuizView from './components/VersusQuizView';
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';
import AICreativityHub from './components/AICreativityHub';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [activePlayerId, setActivePlayerId] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('he');
  const [soundOn, setSoundOn] = useState(true);
  const [screen, setScreen] = useState<'welcome' | 'register' | 'main-menu' | 'quiz' | 'victory' | 'badges' | 'leaderboard' | 'versus-quiz' | 'ai-hub'>('main-menu');

  // AI Creativity and Background Music States
  const [currentBgMusicUrl, setCurrentBgMusicUrl] = useState<string | null>(null);
  const [currentLyrics, setCurrentLyrics] = useState<string | null>(null);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  
  // Active gameplay quiz states
  const [activeQuiz, setActiveQuiz] = useState<QuizState | null>(null);
  const [lastRoundScore, setLastRoundScore] = useState(0);
  const [unlockedBadgesThisRound, setUnlockedBadgesThisRound] = useState<string[]>([]);
  const [currentSoloRound, setCurrentSoloRound] = useState(1);

  // Versus Mode & Global settings
  const [versusEnabled, setVersusEnabled] = useState(false);
  const [versusOpponentId, setVersusOpponentId] = useState<string | null>(null);
  const [versusModeStyle, setVersusModeStyle] = useState<'time' | 'turn'>('time');
  const [versusTimeLimit, setVersusTimeLimit] = useState<number>(60);
  const [showGlobalSettings, setShowGlobalSettings] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Load persistence configurations on mount
  useEffect(() => {
    try {
      const storedPlayers = localStorage.getItem('quizzy_sun_players');
      const storedActiveId = localStorage.getItem('quizzy_sun_active_player_id');
      const storedLang = localStorage.getItem('quizzy_sun_lang') as Language;
      const storedSound = localStorage.getItem('quizzy_sun_sound');
      const storedVersusStyle = localStorage.getItem('quizzy_sun_versus_style') as 'time' | 'turn';
      const storedVersusTimeLimit = localStorage.getItem('quizzy_sun_versus_time_limit');

      if (storedPlayers) {
        const parsedPlayers = JSON.parse(storedPlayers);
        // Ensure backwards compatibility by adding xp and level if missing
        const validatedPlayers = parsedPlayers.map((p: any) => ({
          ...p,
          xp: p.xp || 0,
          level: p.level || 1,
        }));
        setPlayers(validatedPlayers);
      }
      if (storedActiveId) {
        setActivePlayerId(storedActiveId);
      }
      if (storedLang) {
        setLang(storedLang);
      }
      if (storedSound !== null) {
        setSoundOn(storedSound === 'true');
      }
      if (storedVersusStyle) {
        setVersusModeStyle(storedVersusStyle);
      }
      if (storedVersusTimeLimit) {
        setVersusTimeLimit(Number(storedVersusTimeLimit));
      }
    } catch (e) {
      console.error('Error loading data from local storage', e);
    }
  }, []);

  // Global background music player synchronizer
  useEffect(() => {
    if (currentBgMusicUrl) {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current = null;
      }
      bgAudioRef.current = new Audio(currentBgMusicUrl);
      bgAudioRef.current.loop = true;
      if (soundOn) {
        bgAudioRef.current.play().catch(err => console.warn("Global music play failed:", err));
      }
    } else {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current = null;
      }
    }

    return () => {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
      }
    };
  }, [currentBgMusicUrl]);

  useEffect(() => {
    if (bgAudioRef.current) {
      if (soundOn) {
        bgAudioRef.current.play().catch(err => console.warn("Global music play failed:", err));
      } else {
        bgAudioRef.current.pause();
      }
    }
  }, [soundOn]);

  // Save changes to localStorage whenever players updates
  const savePlayers = (updatedPlayers: Player[]) => {
    setPlayers(updatedPlayers);
    try {
      localStorage.setItem('quizzy_sun_players', JSON.stringify(updatedPlayers));
    } catch (e) {
      console.error('Error saving players list to local storage', e);
    }
  };

  const getActivePlayer = (): Player | null => {
    return players.find((p) => p.id === activePlayerId) || null;
  };

  const handleRegisterPlayer = (name: string, ageGroup: AgeGroup, avatar: string, profilePic: string | null, autoSelectAsOpponent: boolean = false) => {
    const newPlayer: Player = {
      id: `player_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name,
      ageGroup,
      avatar,
      profilePic,
      score: 0,
      gamesPlayed: 0,
      badges: [],
      lastPlayed: new Date().toISOString(),
      xp: 0,
      level: 1
    };

    const updatedPlayers = [...players, newPlayer];
    savePlayers(updatedPlayers);
    
    if (autoSelectAsOpponent) {
      setVersusOpponentId(newPlayer.id);
    } else {
      setActivePlayerId(newPlayer.id);
      localStorage.setItem('quizzy_sun_active_player_id', newPlayer.id);
    }
    
    setScreen('main-menu');

    // Trigger welcoming audio narration
    if (soundOn) {
      try {
        const welcomeTxt = lang === 'en' 
          ? `Welcome aboard ${name}! Let's play some fun quizzes.` 
          : `ברוך הבא ${name}! בוא נשחק בחידונים מדליקים.`;
        const utterance = new SpeechSynthesisUtterance(welcomeTxt);
        utterance.lang = lang === 'he' ? 'he-IL' : 'en-US';
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const handleSelectActivePlayer = (playerId: string) => {
    setActivePlayerId(playerId);
    localStorage.setItem('quizzy_sun_active_player_id', playerId);
    setScreen('main-menu');
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('quizzy_sun_lang', newLang);
  };

  const handleSoundToggle = () => {
    const newVal = !soundOn;
    setSoundOn(newVal);
    localStorage.setItem('quizzy_sun_sound', String(newVal));
    if (newVal) {
      try {
        const testTxt = lang === 'en' ? 'Voice sound activated!' : 'הקריינות הופעלה בהצלחה!';
        const utterance = new SpeechSynthesisUtterance(testTxt);
        utterance.lang = lang === 'he' ? 'he-IL' : 'en-US';
        window.speechSynthesis.speak(utterance);
      } catch (e) {}
    } else {
      window.speechSynthesis.cancel();
    }
  };

  const handleResetAll = () => {
    localStorage.clear();
    setPlayers([]);
    setActivePlayerId(null);
    setLang('en');
    setSoundOn(true);
    setScreen('welcome');
    try {
      window.speechSynthesis.cancel();
      const text = 'Reset complete! Let\'s start a new adventure!';
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  };

  const handleResetAllClick = () => {
    if (confirmReset) {
      handleResetAll();
      setConfirmReset(false);
      setShowGlobalSettings(false);
    } else {
      setConfirmReset(true);
    }
  };

  const handleFinishVersusMatch = (
    winnerId: string | null,
    score1: number,
    score2: number,
    detailsText: string,
    answered1?: string[],
    answered2?: string[]
  ) => {
    const updatedPlayers = players.map((p) => {
      let extraPoints = 0;
      let addedXp = 0;
      
      if (p.id === activePlayerId) {
        extraPoints += score1 * 10;
        addedXp += score1 * 50;
        if (winnerId === activePlayerId) { extraPoints += 100; addedXp += 200; }
        else if (winnerId === null) { extraPoints += 50; addedXp += 100; }
        
        const newXp = (p.xp || 0) + addedXp;
        const newLevel = Math.floor(newXp / 250) + 1;
        
        const currentAnswered = p.answeredQuestions || [];
        const newAnsweredQuestions = Array.from(new Set([...currentAnswered, ...(answered1 || [])]));

        return {
          ...p,
          score: p.score + extraPoints,
          gamesPlayed: p.gamesPlayed + 1,
          lastPlayed: new Date().toISOString(),
          xp: newXp,
          level: newLevel,
          answeredQuestions: newAnsweredQuestions
        };
      } else if (p.id === versusOpponentId) {
        extraPoints += score2 * 10;
        addedXp += score2 * 50;
        if (winnerId === versusOpponentId) { extraPoints += 100; addedXp += 200; }
        else if (winnerId === null) { extraPoints += 50; addedXp += 100; }
        
        const newXp = (p.xp || 0) + addedXp;
        const newLevel = Math.floor(newXp / 250) + 1;
        
        const currentAnswered = p.answeredQuestions || [];
        const newAnsweredQuestions = Array.from(new Set([...currentAnswered, ...(answered2 || [])]));

        return {
          ...p,
          score: p.score + extraPoints,
          gamesPlayed: p.gamesPlayed + 1,
          lastPlayed: new Date().toISOString(),
          xp: newXp,
          level: newLevel,
          answeredQuestions: newAnsweredQuestions
        };
      }
      return p;
    });

    savePlayers(updatedPlayers);
    setScreen('leaderboard');

    if (soundOn) {
      try {
        const utterance = new SpeechSynthesisUtterance(detailsText);
        utterance.lang = lang === 'he' ? 'he-IL' : 'en-US';
        window.speechSynthesis.speak(utterance);
      } catch (e) {}
    }
  };

  const handleChangeAgeGroup = (playerId: string, newAgeGroup: AgeGroup) => {
    const updatedPlayers = players.map((p) => {
      if (p.id === playerId) {
        return {
          ...p,
          ageGroup: newAgeGroup
        };
      }
      return p;
    });
    savePlayers(updatedPlayers);

    // Friendly narration of the new age selection
    if (soundOn) {
      try {
        const textEn = `Age group changed to ${newAgeGroup === '5-7' ? 'five to seven' : newAgeGroup === '8-13' ? 'eight to thirteen' : 'thirteen plus'}`;
        const textHe = `קבוצת הגיל שונתה ל${newAgeGroup === '5-7' ? 'חמש עד שבע' : newAgeGroup === '8-13' ? 'שמונה עד שלוש עשרה' : 'שלוש עשרה פלוס'}`;
        const utterance = new SpeechSynthesisUtterance(lang === 'en' ? textEn : textHe);
        utterance.lang = lang === 'he' ? 'he-IL' : 'en-US';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      } catch (e) {}
    }
  };

  const handleChangeAvatar = (playerId: string, newAvatar: string) => {
    const updatedPlayers = players.map((p) => {
      if (p.id === playerId) {
        return { ...p, avatar: newAvatar, profilePic: null };
      }
      return p;
    });
    savePlayers(updatedPlayers);
  };

  const handleStartQuiz = (category: Category | 'All', customRound?: number) => {
    const activePlayer = getActivePlayer();
    if (!activePlayer) return;

    if (versusEnabled) {
      setSelectedCategory(category);
      setScreen('versus-quiz');
      return;
    }

    const roundToUse = customRound !== undefined ? customRound : 1;
    if (customRound === undefined) {
      setCurrentSoloRound(1);
    }

    // Filter questions by age group difficulty, scaling up every 3 rounds
    let effectiveAgeGroup: AgeGroup = activePlayer.ageGroup;
    if (activePlayer.ageGroup === '5-7') {
      if (roundToUse >= 7) {
        effectiveAgeGroup = '13+';
      } else if (roundToUse >= 4) {
        effectiveAgeGroup = '8-13';
      }
    } else if (activePlayer.ageGroup === '8-13') {
      if (roundToUse >= 4) {
        effectiveAgeGroup = '13+';
      }
    }

    let pool = QUESTIONS.filter((q) => q.ageGroup === effectiveAgeGroup);
    if (pool.length === 0) {
      pool = QUESTIONS.filter((q) => q.ageGroup === activePlayer.ageGroup);
    }
    
    // Filter by selected category if not 'All'
    if (category !== 'All') {
      pool = pool.filter((q) => q.category === category);
    }

    // Filter out already answered questions to prevent repetition
    const answeredIds = activePlayer.answeredQuestions || [];
    let unreplied = pool.filter((q) => !answeredIds.includes(q.id));

    // If we have fewer than 10 unreplied questions, fall back/reset so they have enough questions
    if (unreplied.length < 10) {
      unreplied = pool;
    }

    // Shuffle and pick up to 10 questions for the round
    const shuffled = [...unreplied].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, 10);

    setActiveQuiz({
      category,
      questions: selectedQuestions,
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      isFinished: false
    });

    setScreen('quiz');
  };

  const handleFinishQuiz = (score: number, answers: { questionId: string; selectedIndex: number; isCorrect: boolean }[]) => {
    const activePlayer = getActivePlayer();
    if (!activePlayer) return;

    setLastRoundScore(score);
    const newlyEarnedBadges: string[] = [];

    // Evaluate badge achievements conditions
    const updatedBadges = [...activePlayer.badges];

    const addBadgeIfMissing = (badgeId: string) => {
      if (!updatedBadges.includes(badgeId)) {
        updatedBadges.push(badgeId);
        newlyEarnedBadges.push(badgeId);
      }
    };

    // 1. First Step Badge: complete any quiz
    addBadgeIfMissing('first-step');

    // 2. Play 5 or more quizzes
    const updatedGamesPlayed = activePlayer.gamesPlayed + 1;
    if (updatedGamesPlayed >= 5) {
      addBadgeIfMissing('halfway');
    }

    // Perfect score checks
    if (score === answers.length && answers.length > 0) {
      addBadgeIfMissing('perfect-score');

      // Category-specific perfect scores
      const activeCategory = activeQuiz?.category;
      if (activeCategory === 'Geography') {
        addBadgeIfMissing('geography-master');
      } else if (activeCategory === 'Animals') {
        addBadgeIfMissing('animals-expert');
      } else if (activeCategory === 'Math') {
        addBadgeIfMissing('math-wizard');
      } else if (activeCategory === 'History') {
        addBadgeIfMissing('history-hero');
      } else if (activeCategory === 'Science') {
        addBadgeIfMissing('science-genius');
      } else if (activeCategory === 'Space') {
        addBadgeIfMissing('space-ranger');
      } else if (activeCategory === 'GeneralKnowledge') {
        addBadgeIfMissing('general-knowledge-master');
      }
    }

    // Update active player persistence
    const justAnsweredIds = answers.map((a) => a.questionId);

    const updatedPlayers = players.map((p) => {
      if (p.id === activePlayer.id) {
        const addedXp = (score * 50) + (newlyEarnedBadges.length * 100);
        const newXp = (p.xp || 0) + addedXp;
        const newLevel = Math.floor(newXp / 250) + 1;
        
        const currentAnswered = p.answeredQuestions || [];
        const newAnsweredQuestions = Array.from(new Set([...currentAnswered, ...justAnsweredIds]));

        return {
          ...p,
          score: p.score + (score * 10) + (newlyEarnedBadges.length * 50),
          gamesPlayed: updatedGamesPlayed,
          badges: updatedBadges,
          lastPlayed: new Date().toISOString(),
          xp: newXp,
          level: newLevel,
          answeredQuestions: newAnsweredQuestions
        };
      }
      return p;
    });

    savePlayers(updatedPlayers);
    setUnlockedBadgesThisRound(newlyEarnedBadges);
    setScreen('victory');
  };

  const activePlayer = getActivePlayer();

  // Determine actual display screen depending on registration list
  const getRenderedScreen = () => {
    // Switch case depending on screen state
    switch (screen) {
      case 'register':
        return (
          <motion.div
            key="register"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-full flex justify-center"
          >
            <RegisterPlayer
              lang={lang}
              onRegister={handleRegisterPlayer}
              onCancel={() => setScreen('main-menu')}
              onOpenSettings={() => { setShowGlobalSettings(true); setConfirmReset(false); }}
            />
          </motion.div>
        );

      case 'welcome':
      case 'main-menu':
      default:
        return (
          <motion.div
            key="main-menu"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-full flex justify-center"
          >
            <MainMenu
              players={players}
              activePlayer={activePlayer}
              lang={lang}
              soundOn={soundOn}
              onLanguageChange={handleLanguageChange}
              onSoundToggle={handleSoundToggle}
              onStartQuiz={handleStartQuiz}
              onViewBadges={() => setScreen('badges')}
              onViewLeaderboard={() => setScreen('leaderboard')}
              onSwitchPlayer={() => setScreen('main-menu')}
              onResetAll={handleResetAll}
              onChangeAgeGroup={handleChangeAgeGroup}
              onChangeAvatar={handleChangeAvatar}
              onOpenSettings={() => { setShowGlobalSettings(true); setConfirmReset(false); }}
              versusEnabled={versusEnabled}
              onVersusModeToggle={setVersusEnabled}
              versusOpponentId={versusOpponentId}
              onVersusOpponentChange={setVersusOpponentId}
              versusModeStyle={versusModeStyle}
              versusTimeLimit={versusTimeLimit}
              onRegisterPlayer={handleRegisterPlayer}
              onSetActivePlayer={handleSelectActivePlayer}
            />
          </motion.div>
        );

      case 'quiz':
        if (!activeQuiz || !activePlayer) return null;
        return (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-full flex justify-center"
          >
            <QuizView
              activePlayer={activePlayer}
              questions={activeQuiz.questions}
              lang={lang}
              soundOn={soundOn}
              onFinish={handleFinishQuiz}
              onExit={() => setScreen('main-menu')}
              currentRound={currentSoloRound}
            />
          </motion.div>
        );

      case 'versus-quiz': {
        const opponent = players.find((p) => p.id === versusOpponentId);
        if (!activePlayer || !opponent) {
          // If we somehow enter versus-quiz with invalid selection, fall back
          setTimeout(() => setScreen('main-menu'), 0);
          return null;
        }
        return (
          <motion.div
            key="versus-quiz"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-full flex justify-center"
          >
            <VersusQuizView
              player1={activePlayer}
              player2={opponent}
              category={selectedCategory}
              modeStyle={versusModeStyle}
              timeLimitSeconds={versusTimeLimit}
              lang={lang}
              soundOn={soundOn}
              onFinish={handleFinishVersusMatch}
              onExit={() => setScreen('main-menu')}
            />
          </motion.div>
        );
      }

      case 'victory':
        if (!activePlayer || !activeQuiz) return null;
        return (
          <motion.div
            key="victory"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-full flex justify-center"
          >
            <VictoryView
              activePlayer={activePlayer}
              score={lastRoundScore}
              totalQuestions={activeQuiz.questions.length}
              unlockedBadgeIds={unlockedBadgesThisRound}
              lang={lang}
              onNextRound={() => {
                const nextRound = currentSoloRound + 1;
                setCurrentSoloRound(nextRound);
                handleStartQuiz(activeQuiz.category, nextRound);
              }}
              onMainMenu={() => setScreen('main-menu')}
              currentRound={currentSoloRound}
            />
          </motion.div>
        );

      case 'badges':
        if (!activePlayer) return null;
        return (
          <motion.div
            key="badges"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-full flex justify-center"
          >
            <BadgeBook
              earnedBadgeIds={activePlayer.badges}
              lang={lang}
              onBack={() => setScreen('main-menu')}
            />
          </motion.div>
        );

      case 'leaderboard':
        return (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-full flex justify-center"
          >
            <Leaderboard
              players={players}
              activePlayer={activePlayer}
              lang={lang}
              onBack={() => setScreen('main-menu')}
            />
          </motion.div>
        );

      case 'ai-hub':
        return (
          <motion.div
            key="ai-hub"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-full flex justify-center"
          >
            <AICreativityHub
              activePlayer={activePlayer}
              lang={lang}
              onApplyProfilePic={(dataUrl) => {
                if (activePlayer) {
                  const updatedPlayers = players.map(p => {
                    if (p.id === activePlayer.id) {
                      return { ...p, profilePic: dataUrl, avatar: '🤖' };
                    }
                    return p;
                  });
                  savePlayers(updatedPlayers);
                  if (soundOn) {
                    try {
                      const text = lang === 'en' ? "Perfect! Your new AI profile photo is set!" : "מצוין! תמונת הפרופיל החדשה שלך עודכנה בהצלחה!";
                      const utterance = new SpeechSynthesisUtterance(text);
                      utterance.lang = lang === 'he' ? 'he-IL' : 'en-US';
                      window.speechSynthesis.speak(utterance);
                    } catch (e) {}
                  }
                }
                setScreen('main-menu');
              }}
              onApplyBgMusic={(audioUrl, lyrics) => {
                setCurrentBgMusicUrl(audioUrl);
                setCurrentLyrics(lyrics || null);
                if (soundOn) {
                  try {
                    const text = lang === 'en' ? "Excellent choice! Your new background track is now playing!" : "בחירה מעולה! קטע המוזיקה החדש שלך מופעל כעת ברקע!";
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.lang = lang === 'he' ? 'he-IL' : 'en-US';
                    window.speechSynthesis.speak(utterance);
                  } catch (e) {}
                }
                setScreen('main-menu');
              }}
              onBack={() => setScreen('main-menu')}
              currentBgMusicUrl={currentBgMusicUrl}
              currentLyrics={currentLyrics}
            />
          </motion.div>
        );
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-[#FFF9E6]" dir={lang === "he" ? "rtl" : "ltr"}>
      
      {/* Immersive landscape backdrop */}
      <div 
        className="fixed inset-0 bg-cover bg-center -z-10 opacity-30 brightness-[1.02] pointer-events-none select-none"
        style={{ 
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAdJzkly7x1z1W7idUswN9-MrX5oO7YIps0NQ7yA1FRxCeuTHqwd1dZC3QDX_oM_SEOg11idWlTzsMbXQA3INx3HQOGWVyEzZAXM_zBya9cyB9VPI8XzHlENEahxOe1TiJ478ZR2sOHFRljr8CG7dRQ5DtevtocM1cqYY4Tq9IEaOAi7BNXaYJENA5M76PNxmI5aK_OEbbvkff_uFYHtzB_Dxj9kqhlW0goQ_7BVYQ6-Ngt0Xbl_s-X')` 
        }} 
      />

      {/* Glassy Header App Bar */}
      <header className="w-full h-12 sm:h-14 flex justify-between items-center px-3 sm:px-6 bg-[#FF7675] border-b-4 border-white/25 shadow-lg z-30 sticky top-0">
        <div 
          onClick={() => setScreen('main-menu')}
          className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer hover:scale-102 transition-transform select-none shrink-0"
        >
          {/* Animated sun mascot icon with no border or frame */}
          <div className="w-7 h-7 sm:w-10 sm:h-10 overflow-hidden shrink-0 flex items-center justify-center">
            <DotLottiePlayer
              src="https://lottie.host/0e9049c9-4048-45c7-a36a-6586ef6a4ac9/nrIukPh25y.lottie"
              autoplay
              loop
              speed={3}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <h1 className="font-headline-md text-base sm:text-xl md:text-2xl text-white tracking-wide uppercase leading-none font-black shrink-0">
            QuizzySun
          </h1>
        </div>

        {/* Global Stats or current player overview */}
        {screen !== 'quiz' && screen !== 'versus-quiz' && (
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {activePlayer && (
              <>
                <button
                  onClick={() => setScreen('badges')}
                  className="flex items-center gap-1 bg-[#74B9FF] text-white border-2 border-white/60 px-2 py-1 rounded-full text-xs font-bold shadow-md hover:scale-105 active:translate-y-0.5 transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>🏅</span>
                  <span>{activePlayer.badges.length}</span>
                </button>

                <button
                  onClick={() => setScreen('leaderboard')}
                  className="flex items-center gap-1 bg-[#FDCB6E] text-white border-2 border-white/60 px-2 py-1 rounded-full text-xs font-bold shadow-md hover:scale-105 active:translate-y-0.5 transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>⭐</span>
                  <span>{activePlayer.score}</span>
                </button>
              </>
            )}

            {/* Global Settings button is always available at the top right of non-gameplay pages */}
            <button
              onClick={() => {
                setShowGlobalSettings(true);
                setConfirmReset(false);
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white/20 border-2 border-white/60 rounded-full text-white hover:scale-105 active:translate-y-0.5 transition-all cursor-pointer shadow-md shrink-0"
              title={lang === 'en' ? 'Open Settings' : 'הגדרות המשחק'}
            >
              <Settings className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        )}
      </header>

      {/* Main Container content view */}
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-margin-mobile py-2 md:py-4 overflow-hidden">
        {/* Kid-Friendly Integrated Console Frame */}
        <div className="w-full bg-gradient-to-b from-[#E0F7FA]/95 via-white/98 to-[#FFF9C4]/95 backdrop-blur-md border-[6px] sm:border-[8px] border-[#FFEAA7] rounded-[32px] p-3 sm:p-5 md:p-6 shadow-[0_8px_0_0_#FFEAA7,0_15px_20px_-5px_rgba(0,0,0,0.08)] relative overflow-hidden flex flex-col min-h-0 z-10">
          
          {/* Playful Floating Background Motifs */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFEAA7]/30 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-6 left-6 text-2xl select-none opacity-25 pointer-events-none animate-pulse" style={{ animationDuration: '8s' }}>☁️</div>
          <div className="absolute top-1/4 right-8 text-3xl select-none opacity-20 pointer-events-none animate-pulse" style={{ animationDuration: '12s' }}>☁️</div>
          <div className="absolute bottom-1/4 left-10 text-2xl select-none opacity-20 pointer-events-none animate-bounce" style={{ animationDuration: '10s' }}>🎈</div>
          <div className="absolute bottom-10 right-12 text-3xl select-none opacity-30 pointer-events-none animate-pulse" style={{ animationDuration: '6s' }}>⭐</div>
          
          <div className="w-full h-full flex flex-col flex-grow relative z-10 overflow-y-auto min-h-0 pr-1">
            <AnimatePresence mode="wait">
              {getRenderedScreen()}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Humble educational footer */}
      <footer className="w-full py-2.5 text-center text-[10px] sm:text-xs text-[#2D3436] font-bold bg-[#FFEAA7]/40 border-t-2 border-[#FDCB6E] shadow-inner z-20">
        <div className="max-w-2xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <p>© {new Date().getFullYear()} QuizzySun. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
            <span>for curious kids around the world!</span>
          </div>
        </div>
      </footer>

      {/* Global Settings Modal Overlay */}
      {showGlobalSettings && (
        <div 
          className="fixed inset-0 bg-[#2D3436]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={() => setShowGlobalSettings(false)}
        >
          <div 
            className="w-full max-w-lg bg-white border-4 border-[#74B9FF] rounded-[32px] p-6 md:p-8 shadow-chunky-blue relative animate-pop"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowGlobalSettings(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all hover:scale-110 active:scale-90 cursor-pointer shadow-sm border border-slate-200"
              title={lang === 'en' ? 'Close' : 'סגור'}
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl md:text-3xl font-black text-[#2D3436] mb-6 flex items-center gap-2 border-b-2 border-slate-100 pb-3">
              <span>⚙️</span>
              <span>{lang === 'en' ? 'Game Settings' : 'הגדרות המשחק'}</span>
            </h3>
            
            <div className="flex flex-col gap-5 text-left">
              {/* Language Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-600 uppercase tracking-wider">
                  🌐 {lang === 'en' ? 'Language' : 'שפה'}
                </label>
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1.5 rounded-2xl border-2 border-[#74B9FF]">
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                      lang === 'en'
                        ? 'bg-[#74B9FF] text-white shadow-md scale-102 font-black'
                        : 'text-[#2D3436] hover:bg-slate-100'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange('he')}
                    className={`py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                      lang === 'he'
                        ? 'bg-[#74B9FF] text-white shadow-md scale-102'
                        : 'text-[#2D3436] hover:bg-slate-100'
                    }`}
                  >
                    עברית
                  </button>
                </div>
              </div>

              {/* Voice Narrator */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-600 uppercase tracking-wider">
                  🔊 {lang === 'en' ? 'Voice Narrator (TTS)' : 'קריינות קולית'}
                </label>
                <button
                  onClick={handleSoundToggle}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 font-bold text-sm transition-all cursor-pointer shadow-sm active:translate-y-0.5 ${
                    soundOn
                      ? 'bg-[#FFEAA7] text-[#D35400] border-[#FDCB6E]'
                      : 'bg-white text-slate-500 border-slate-300'
                  }`}
                >
                  {soundOn ? <Volume2 className="w-5 h-5 text-[#D35400]" /> : <VolumeX className="w-5 h-5" />}
                  <span>
                    {soundOn 
                      ? lang === 'en' ? 'Narrator: Enabled 🔊' : 'קריינות: פעילה 🔊'
                      : lang === 'en' ? 'Narrator: Disabled 🔇' : 'קריינות: כבויה 🔇'}
                  </span>
                </button>
              </div>

              {/* Versus Mode Duel Style */}
              <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
                <label className="text-sm font-bold text-slate-600 uppercase tracking-wider">
                  ⚔️ {lang === 'en' ? 'Versus Duel Style' : 'סגנון קרב ראש בראש'}
                </label>
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1.5 rounded-2xl border-2 border-[#74B9FF]">
                  <button
                    onClick={() => {
                      setVersusModeStyle('time');
                      localStorage.setItem('quizzy_sun_versus_style', 'time');
                    }}
                    className={`py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer flex flex-col items-center ${
                      versusModeStyle === 'time'
                        ? 'bg-[#74B9FF] text-white shadow-md scale-102 font-black'
                        : 'text-[#2D3436] hover:bg-slate-100'
                    }`}
                  >
                    <span>⏱️ {lang === 'en' ? 'Time Attack' : 'מרוץ נגד השעון'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setVersusModeStyle('turn');
                      localStorage.setItem('quizzy_sun_versus_style', 'turn');
                    }}
                    className={`py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer flex flex-col items-center ${
                      versusModeStyle === 'turn'
                        ? 'bg-[#74B9FF] text-white shadow-md scale-102 font-black'
                        : 'text-[#2D3436] hover:bg-slate-100'
                    }`}
                  >
                    <span>🔄 {lang === 'en' ? 'Turn-by-Turn' : 'תור אחרי תור'}</span>
                  </button>
                </div>
              </div>

              {/* Time Attack Limit Config */}
              {versusModeStyle === 'time' && (
                <div className="flex flex-col gap-1.5 animate-fade-in text-left">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    ⏱️ {lang === 'en' ? 'Time Attack Duration' : 'זמן קצוב למרוץ'}
                  </label>
                  <select
                    value={versusTimeLimit}
                    onChange={(e) => {
                      const limit = Number(e.target.value);
                      setVersusTimeLimit(limit);
                      localStorage.setItem('quizzy_sun_versus_time_limit', String(limit));
                    }}
                    className="w-full p-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-[#2D3436] cursor-pointer"
                  >
                    <option value={30}>{lang === 'en' ? '30 Seconds' : '30 שניות'}</option>
                    <option value={60}>{lang === 'en' ? '1 Minute (Default)' : 'דקה אחת (ברירת מחדל)'}</option>
                    <option value={120}>{lang === 'en' ? '2 Minutes' : '2 דקות'}</option>
                    <option value={180}>{lang === 'en' ? '3 Minutes' : '3 דקות'}</option>
                  </select>
                </div>
              )}

              {/* Danger Zone */}
              <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
                <label className="text-xs font-black text-rose-500 uppercase tracking-widest text-left">
                  ⚠️ {lang === 'en' ? 'Danger Zone' : 'אזור סכנה'}
                </label>
                <button
                  onClick={handleResetAllClick}
                  className={`w-full py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 border-2 shadow-sm ${
                    confirmReset
                      ? 'bg-[#D63031] text-white border-[#FF7675] hover:bg-red-700 animate-bounce'
                      : 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100'
                  }`}
                >
                  <RefreshCw className={`w-4 h-4 ${confirmReset ? 'animate-spin' : ''}`} />
                  <span>
                    {confirmReset
                      ? lang === 'en' ? 'ARE YOU ABSOLUTELY SURE?' : 'האם אתם בטוחים לחלוטין?'
                      : lang === 'en' ? 'Reset All Game Data' : 'איפוס כל נתוני המשחק'}
                  </span>
                </button>
                {confirmReset && (
                  <p className="text-xs text-center text-rose-600 font-bold leading-tight mt-1 animate-pulse">
                    {lang === 'en' 
                      ? 'This will clear all players, custom scores, and earned badges!' 
                      : 'פעולה זו תמחק את כל השחקנים, הציונים והתגים!'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
