import { Badge } from '../types';
import { BADGES } from '../questions';
import { Award, CheckCircle, Lock } from 'lucide-react';

interface BadgeBookProps {
  earnedBadgeIds: string[];
  lang: 'en' | 'he';
  onBack: () => void;
}

export default function BadgeBook({ earnedBadgeIds, lang, onBack }: BadgeBookProps) {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-3 relative animate-pop" dir={lang === 'he' ? 'rtl' : 'ltr'}>
      
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <div className="flex items-center gap-1.5">
          <Award className="w-6 h-6 text-[#74B9FF]" />
          <h2 className="font-black text-[#2D3436] text-lg sm:text-xl">
            {lang === 'en' ? 'My Badges' : 'התגים שלי'}
          </h2>
          <span className="font-black bg-[#FFEAA7] text-[#D35400] px-2.5 py-0.5 rounded-full text-xs border border-[#FDCB6E]">
            {earnedBadgeIds.length} / {BADGES.length}
          </span>
        </div>
        <button
          onClick={onBack}
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#2D3436] font-black text-xs border border-slate-300 rounded-xl transition-all cursor-pointer"
        >
          {lang === 'en' ? 'Back ➡️' : 'חזרה ➡️'}
        </button>
      </div>

      <p className="text-xs text-[#2D3436] text-center font-bold bg-[#74B9FF]/10 py-1.5 px-3 rounded-xl border border-[#74B9FF]/20">
        {lang === 'en' 
          ? 'Play quizzes, answer perfectly, and collect all educational badges!' 
          : 'שחקו בחידונים, ענו נכון על השאלות ואספו את כל תגי הלמידה המדליקים!'}
      </p>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[190px] overflow-y-auto pr-1">
        {BADGES.map((badge) => {
          const isEarned = earnedBadgeIds.includes(badge.id);
          return (
            <div
              key={badge.id}
              className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                isEarned
                  ? 'bg-white border-[#74B9FF] shadow-sm'
                  : 'bg-white/40 border-slate-100 opacity-70'
              }`}
            >
              {/* Badge Icon circular container */}
              <div
                className={`w-11 h-11 shrink-0 rounded-full border flex items-center justify-center text-xl shadow-xs ${
                  isEarned ? badge.color : 'bg-slate-100 border-slate-200 grayscale'
                }`}
              >
                {isEarned ? badge.icon : '🔒'}
              </div>

              <div className="flex-grow min-w-0">
                <h3 className="font-black text-xs text-[#2D3436] truncate">
                  {lang === 'en' ? badge.titleEn : badge.titleHe}
                </h3>
                <p className="text-[10px] text-slate-500 leading-tight">
                  {lang === 'en' ? badge.descriptionEn : badge.descriptionHe}
                </p>
                {isEarned && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 mt-0.5">
                    <CheckCircle className="w-2.5 h-2.5" />
                    <span>{lang === 'en' ? 'Unlocked!' : 'נפתח!'}</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
