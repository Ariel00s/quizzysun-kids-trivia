import { useEffect, useState } from 'react';
import { Player, Badge } from '../types';
import { BADGES } from '../questions';
import { Award, Trophy, Star, Home, Sparkles, CheckCircle2 } from 'lucide-react';
import ThreeMascot from './ThreeMascot';
import fireworksSvg from '../../assets/Fireworks.svg';
import congratulationSvg from '../../assets/congratulation.svg';

interface VictoryViewProps {
  activePlayer: Player;
  score: number;
  totalQuestions: number;
  unlockedBadgeIds: string[]; // List of badge IDs unlocked in this round
  lang: 'en' | 'he';
  onNextRound: () => void;
  onMainMenu: () => void;
  currentRound: number;
}

export default function VictoryView({
  activePlayer,
  score,
  totalQuestions,
  unlockedBadgeIds,
  lang,
  onNextRound,
  onMainMenu,
  currentRound
}: VictoryViewProps) {
  const [particles, setParticles] = useState<{ id: number; left: string; delay: string; duration: string; color: string; isCircle: boolean; size: string; tilt: string }[]>([]);

  useEffect(() => {
    // Generate beautiful colorful confetti particles on mount
    const colors = ['#74B9FF', '#D2E3FC', '#55EFC4', '#FF7675', '#a29bfe', '#fd79a8', '#f1c40f', '#e67e22', '#2ecc71', '#3498db'];
    const generated = Array.from({ length: 120 }).map((_, idx) => ({
      id: idx,
      left: `${Math.random() * 100}vw`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 2.5 + 2.5}s`,
      color: colors[Math.floor(Math.random() * colors.length)],
      isCircle: Math.random() > 0.4,
      size: `${Math.random() * 8 + 8}px`,
      tilt: `${Math.random() * 30 - 15}deg`
    }));
    setParticles(generated);
  }, []);

  const getRankStars = () => {
    const ratio = score / totalQuestions;
    if (ratio >= 0.9) return 3;
    if (ratio >= 0.6) return 2;
    if (ratio >= 0.3) return 1;
    return 0;
  };

  const starsCount = getRankStars();

  // Determine if next round will be harder
  const isLevelUpIncoming = currentRound % 3 === 0 && (
    (activePlayer.ageGroup === '5-7' && currentRound < 9) ||
    (activePlayer.ageGroup === '8-13' && currentRound < 6)
  );

  return (
    <div className="w-full max-w-xl flex flex-col items-center gap-4 relative">
      
      {/* Fireworks Background Decoration */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none mix-blend-multiply scale-110 overflow-hidden select-none">
        <img src={fireworksSvg} className="w-full h-full object-contain animate-pulse" />
      </div>

      {/* Confetti overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute confetti"
            style={{
              left: p.left,
              top: '-20px',
              backgroundColor: p.color,
              width: p.size,
              height: p.isCircle ? p.size : `${parseFloat(p.size) * 0.7}px`,
              borderRadius: p.isCircle ? '50%' : '3px',
              opacity: 0.85,
              transform: `rotate(${p.tilt})`,
              animation: `confetti-fall ${p.duration} linear ${p.delay} infinite`
            }}
          />
        ))}
      </div>

      {/* Title */}
      <h1 className="font-headline-lg text-4xl md:text-5xl text-[#FF7675] font-black text-center tracking-tight animate-pop">
        {score === totalQuestions 
          ? lang === 'en' ? 'PERFECT SCORE! 🏆' : 'ציון מושלם! 🏆'
          : lang === 'en' ? 'GREAT JOB! 🌟' : 'עבודה מצוינת! 🌟'}
      </h1>

      {/* Decorative Congratulatory Illustration */}
      <img src={congratulationSvg} className="w-40 h-auto select-none mt-1 animate-bounce shrink-0" style={{ animationDuration: '4s' }} alt="Congratulation" />

      {/* Interactive 3D Three.js Mascot */}
      <div className="w-20 h-20 md:w-28 md:h-28 select-none z-10 shrink-0">
        <ThreeMascot isCelebrating={true} />
      </div>

      {/* Score and Stars Card */}
      <div className="w-full bg-white border-4 border-[#74B9FF] rounded-[32px] p-4 md:p-6 shadow-chunky-blue hover-chunky-blue flex flex-col items-center text-center relative z-10 animate-pop" style={{ animationDelay: '0.2s' }}>
        <div className="absolute top-1 left-1 right-1 h-2 bg-white/40 rounded-full opacity-50" />

        {/* Stars achievement rating */}
        <div className="flex gap-1 mb-2">
          {[1, 2, 3].map((starIdx) => {
            const isActive = starIdx <= starsCount;
            return (
              <Star
                key={starIdx}
                className={`w-12 h-12 ${
                  isActive 
                    ? 'text-[#74B9FF] fill-[#74B9FF] animate-bounce' 
                    : 'text-slate-200 fill-slate-200'
                }`}
                style={{ animationDelay: `${starIdx * 0.1}s` }}
              />
            );
          })}
        </div>

        {/* Big Score text */}
        <div className="mb-4 flex flex-col items-center gap-1">
          <p className="font-label-bold text-[#2D3436] font-bold uppercase tracking-widest text-sm mb-1">
            {lang === 'en' ? `Round ${currentRound} Completed!` : `סיבוב ${currentRound} הושלם!`}
          </p>
          <div className="flex items-end gap-3 justify-center mb-1">
            <p className="font-headline-md text-[#FF7675] text-5xl leading-none font-black">
              {score} / {totalQuestions}
            </p>
          </div>
          <div className="bg-[#55EFC4]/20 border border-[#00B894] px-4 py-1 rounded-full animate-bounce mt-2 shadow-sm">
            <p className="font-bold text-[#006241] text-sm">
              +{(score * 50) + (unlockedBadgeIds.length * 100)} XP {lang === 'en' ? 'Earned!' : 'הרווחת!'} 🌟
            </p>
          </div>
        </div>

        {/* Feedback message */}
        <p className="font-body-md text-[#00B894] font-bold mb-4">
          {score === totalQuestions
            ? lang === 'en' ? 'Perfect! You are an absolute master!' : 'מושלם! פשוט מקצוענים אמיתיים!'
            : score >= totalQuestions * 0.7
            ? lang === 'en' ? 'Fantastic effort! Superb knowledge!' : 'מדהים! ידע יוצא מן הכלל!'
            : score >= totalQuestions * 0.4
            ? lang === 'en' ? 'Nice try! Keep playing to learn more!' : 'ניסיון נהדר! המשיכו לשחק כדי ללמוד עוד!'
            : lang === 'en' ? 'Good effort! Practice makes perfect!' : 'ניסיון יפה! תרגול מביא לשלמות!'}
        </p>

        {/* Unlocked Badges section */}
        {unlockedBadgeIds.length > 0 && (
          <div className="w-full border-t-2 border-slate-100 pt-md mt-2">
            <h4 className="font-label-bold text-[#FF7675] mb-2 flex items-center justify-center gap-1 text-base uppercase font-bold">
              <Sparkles className="w-4 h-4 text-[#74B9FF] fill-[#74B9FF]" />
              <span>{lang === 'en' ? 'NEW BADGES UNLOCKED!' : 'תגים חדשים שנפתחו!'}</span>
            </h4>
            <div className="flex flex-wrap justify-center gap-2">
              {unlockedBadgeIds.map((badgeId) => {
                const badge = BADGES.find((b) => b.id === badgeId);
                if (!badge) return null;
                return (
                  <div
                    key={badgeId}
                    className="flex items-center gap-2 bg-[#D2E3FC] border-2 border-[#74B9FF] px-4 py-1.5 rounded-xl animate-bounce shadow-sm text-[#0984E3]"
                  >
                    <span className="text-2xl">{badge.icon}</span>
                    <span className="font-bold text-xs">
                      {lang === 'en' ? badge.titleEn : badge.titleHe}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Difficulty Level-up alert card */}
      {isLevelUpIncoming && (
        <div className="w-full bg-rose-50 border-4 border-[#FF7675] rounded-2xl p-3.5 flex items-center justify-center gap-3 animate-pulse shadow-sm z-10">
          <span className="text-3xl">🚀</span>
          <div className="text-left">
            <p className="font-black text-sm text-[#D63031] uppercase leading-tight">
              {lang === 'en' ? 'DIFFICULTY LEVEL UP!' : 'הרמה עולה! 🚀'}
            </p>
            <p className="font-bold text-xs text-[#2D3436] leading-snug">
              {lang === 'en' 
                ? 'The next round will have harder questions! Get ready!' 
                : 'בסיבוב הבא השאלות הופכות למאתגרות יותר! התכוננו!'}
            </p>
          </div>
        </div>
      )}

      {/* Interactive Action Buttons */}
      <div className="w-full flex flex-col gap-2 sm:gap-3 relative z-10">
        <button
          onClick={onNextRound}
          className="w-full h-16 bg-[#D2E3FC] text-[#0984E3] font-headline-md text-2xl border-4 border-[#74B9FF] rounded-xl shadow-chunky-yellow hover-chunky-yellow active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer font-black"
        >
          <Star className="w-6 h-6 text-[#0984E3] fill-[#0984E3]" />
          <span>{lang === 'en' ? 'Next Round' : 'לסיבוב הבא'}</span>
        </button>

        <button
          onClick={onMainMenu}
          className="w-full h-16 bg-[#74B9FF] text-white font-headline-md text-2xl border-4 border-white/20 rounded-xl shadow-chunky-blue hover-chunky-blue active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer font-black"
        >
          <Home className="w-5 h-5 text-white" />
          <span>{lang === 'en' ? 'Main Menu' : 'לתפריט הראשי'}</span>
        </button>
      </div>
    </div>
  );
}
