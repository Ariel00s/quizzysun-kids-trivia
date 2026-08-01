import { useState } from 'react';
import { Player, AgeGroup } from '../types';
import { Trophy, Star, Award, User } from 'lucide-react';

interface LeaderboardProps {
  players: Player[];
  activePlayer: Player | null;
  lang: 'en' | 'he';
  onBack: () => void;
}

export default function Leaderboard({ players, activePlayer, lang, onBack }: LeaderboardProps) {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | 'All'>('All');

  const filteredPlayers = players
    .filter((p) => selectedAgeGroup === 'All' || p.ageGroup === selectedAgeGroup)
    .sort((a, b) => b.score - a.score);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-3 relative animate-pop" dir={lang === 'he' ? 'rtl' : 'ltr'}>
      
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <div className="flex items-center gap-1.5">
          <Trophy className="w-6 h-6 text-[#55EFC4] fill-[#55EFC4]" />
          <h2 className="font-black text-[#2D3436] text-lg sm:text-xl">
            {lang === 'en' ? 'Champions Board' : 'לוח האלופים'}
          </h2>
        </div>
        <button
          onClick={onBack}
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#2D3436] font-black text-xs border border-slate-300 rounded-xl transition-all cursor-pointer"
        >
          {lang === 'en' ? 'Back ➡️' : 'חזרה ➡️'}
        </button>
      </div>

      {/* Tabs for Age Groups */}
      <div className="flex gap-1 bg-slate-100/80 p-0.5 rounded-xl border border-slate-200">
        {(['All', '5-7', '8-13', '13+'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedAgeGroup(tab)}
            className={`flex-1 text-center py-1.5 rounded-lg font-black text-[10px] sm:text-xs transition-all cursor-pointer ${
              selectedAgeGroup === tab
                ? 'bg-[#55EFC4] text-white border border-white/20 shadow-xs'
                : 'text-[#2D3436] hover:bg-slate-100'
            }`}
          >
            {tab === 'All'
              ? lang === 'en'
                ? 'All Kids'
                : 'כל הילדים'
              : tab === '5-7'
              ? lang === 'en'
                ? 'Ages 5-7'
                : 'גילאי 5-7'
              : tab === '8-13'
              ? lang === 'en'
                ? 'Ages 8-13'
                : 'גילאי 8-13'
              : lang === 'en'
              ? 'Ages 13+'
              : 'גילאי 13+'}
          </button>
        ))}
      </div>

      {/* Leaderboard list */}
      <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-1">
        {filteredPlayers.length === 0 ? (
          <div className="text-center py-8 text-on-surface-variant font-label-bold">
            {lang === 'en' ? 'No players registered yet.' : 'אין עדיין שחקנים רשומים.'}
          </div>
        ) : (
          filteredPlayers.map((player, index) => {
            const isSelf = activePlayer?.id === player.id;
            const rank = index + 1;

            return (
              <div
                key={player.id}
                className={`flex items-center gap-3 p-2 rounded-xl border transition-all ${
                  isSelf
                    ? 'bg-emerald-50/70 border-[#55EFC4]'
                    : 'bg-white border-slate-100'
                }`}
              >
                {/* Rank number or medal */}
                <div className="w-6 shrink-0 flex items-center justify-center font-black text-sm text-primary">
                  {rank === 1 ? (
                    <span className="text-xl">🥇</span>
                  ) : rank === 2 ? (
                    <span className="text-xl">🥈</span>
                  ) : rank === 3 ? (
                    <span className="text-xl">🥉</span>
                  ) : (
                    `#${rank}`
                  )}
                </div>

                {/* Avatar / Picture */}
                <div className="relative w-9 h-9 rounded-full border border-[#55EFC4]/50 overflow-hidden shrink-0 bg-slate-50 flex items-center justify-center">
                  {player.profilePic ? (
                    <img
                      src={player.profilePic}
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg">{player.avatar}</span>
                  )}
                </div>

                {/* Name & Details */}
                <div className="flex-grow min-w-0">
                  <h3 className="font-black text-xs sm:text-sm text-[#2D3436] truncate flex items-center gap-1.5">
                    <span>{player.name}</span>
                    {isSelf && (
                      <span className="bg-[#FFEAA7] text-[#D35400] text-[8px] font-black px-1.5 py-0.5 rounded-full border border-[#FDCB6E]/50">
                        {lang === 'en' ? 'You' : 'אני'}
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[9px] text-[#2D3436]/60 font-bold">
                    <span>
                      {player.ageGroup === '5-7'
                        ? lang === 'en'
                          ? 'Group 5-7'
                          : 'גילאי 5-7'
                        : player.ageGroup === '8-13'
                        ? lang === 'en'
                          ? 'Group 8-13'
                          : 'גילאי 8-13'
                        : lang === 'en'
                        ? 'Group 13+'
                        : 'גילאי +13'}
                    </span>
                    <span className="w-0.5 h-0.5 bg-slate-300 rounded-full" />
                    <span className="flex items-center gap-0.5">
                      <Award className="w-2.5 h-2.5 text-[#FDCB6E]" />
                      <span>{player.badges.length} {lang === 'en' ? 'badges' : 'תגים'}</span>
                    </span>
                  </div>
                </div>

                {/* Score */}
                <div className="shrink-0 text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Star className="w-3.5 h-3.5 text-[#FDCB6E] fill-[#FDCB6E]" />
                    <span className="font-black text-sm text-[#2D3436] leading-none">
                      {player.score}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
