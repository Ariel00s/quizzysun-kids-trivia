import React from 'react';
import { Question, Language } from '../types';

interface QuestionVisualProps {
  question: Question;
  lang: Language;
}

export const QuestionVisual: React.FC<QuestionVisualProps> = ({ question, lang }) => {
  const { visualType } = question;

  if (!visualType) return null;

  // Common wrapper styling
  const wrapperClass = "w-full max-w-[280px] h-[160px] flex items-center justify-center bg-slate-50/50 rounded-2xl border-2 border-slate-100 p-2 my-2 select-none mx-auto";

  switch (visualType) {
    case 'stop-sign':
      return (
        <div className={wrapperClass} id="visual-stop-sign">
          <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-md">
            {/* Octagon */}
            <polygon 
              points="29,5 71,5 95,29 95,71 71,95 29,95 5,71 5,29" 
              fill="#D63031" 
              stroke="#FFFFFF" 
              strokeWidth="4" 
            />
            {/* Inner octagon line */}
            <polygon 
              points="30.5,8 69.5,8 92,30.5 92,69.5 69.5,92 30.5,92 8,69.5 8,30.5" 
              fill="none" 
              stroke="#FFFFFF" 
              strokeWidth="2" 
            />
            {/* STOP Text */}
            <text 
              x="50" 
              y="58" 
              fill="#FFFFFF" 
              fontSize={lang === 'en' ? '22' : '18'} 
              fontWeight="900" 
              fontFamily="sans-serif" 
              textAnchor="middle"
            >
              {lang === 'en' ? 'STOP' : 'עצור'}
            </text>
          </svg>
        </div>
      );

    case 'yield-sign':
      return (
        <div className={wrapperClass} id="visual-yield-sign">
          <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-md">
            {/* Inverted Triangle */}
            <polygon 
              points="10,15 90,15 50,85" 
              fill="#FFFFFF" 
              stroke="#D63031" 
              strokeWidth="8" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );

    case 'no-entry-sign':
      return (
        <div className={wrapperClass} id="visual-no-entry-sign">
          <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-md">
            {/* Red Circle */}
            <circle cx="50" cy="50" r="42" fill="#D63031" stroke="#FFFFFF" strokeWidth="3" />
            {/* White Bar */}
            <rect x="18" y="43" width="64" height="14" fill="#FFFFFF" rx="2" />
          </svg>
        </div>
      );

    case 'pedestrian-sign':
      return (
        <div className={wrapperClass} id="visual-pedestrian-sign">
          <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-md">
            {/* Blue Square with rounded corners */}
            <rect x="8" y="8" width="84" height="84" rx="14" fill="#0984E3" stroke="#FFFFFF" strokeWidth="3" />
            
            {/* White warning triangle in center */}
            <polygon points="50,22 18,78 82,78" fill="#FFFFFF" />
            
            {/* Pedestrian walking figure (black) */}
            {/* Head */}
            <circle cx="50" cy="40" r="5" fill="#2D3436" />
            {/* Torso */}
            <line x1="50" y1="45" x2="50" y2="60" stroke="#2D3436" strokeWidth="4.5" strokeLinecap="round" />
            {/* Arm 1 */}
            <line x1="50" y1="48" x2="42" y2="56" stroke="#2D3436" strokeWidth="3" strokeLinecap="round" />
            {/* Arm 2 */}
            <line x1="50" y1="48" x2="60" y2="52" stroke="#2D3436" strokeWidth="3" strokeLinecap="round" />
            {/* Leg 1 */}
            <line x1="50" y1="60" x2="44" y2="72" stroke="#2D3436" strokeWidth="3.5" strokeLinecap="round" />
            {/* Leg 2 */}
            <line x1="50" y1="60" x2="56" y2="72" stroke="#2D3436" strokeWidth="3.5" strokeLinecap="round" />
            
            {/* Crosswalk lines */}
            <line x1="30" y1="74" x2="70" y2="74" stroke="#2D3436" strokeWidth="3" strokeLinecap="round" />
            <line x1="35" y1="78" x2="65" y2="78" stroke="#2D3436" strokeWidth="2.5" />
          </svg>
        </div>
      );

    case 'traffic-light-sign':
      return (
        <div className={wrapperClass} id="visual-traffic-light-sign">
          <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-md">
            {/* Warning Triangle */}
            <polygon 
              points="50,12 12,82 88,82" 
              fill="#FFFFFF" 
              stroke="#D63031" 
              strokeWidth="8" 
              strokeLinejoin="round"
            />
            {/* Traffic Light Housing */}
            <rect x="42" y="42" width="16" height="34" rx="4" fill="#2D3436" />
            {/* Lights */}
            <circle cx="50" cy="48" r="3.5" fill="#FF7675" />
            <circle cx="50" cy="59" r="3.5" fill="#FDCB6E" />
            <circle cx="50" cy="70" r="3.5" fill="#55EFC4" />
          </svg>
        </div>
      );

    case 'bicycle-sign':
      return (
        <div className={wrapperClass} id="visual-bicycle-sign">
          <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-md">
            {/* Warning Triangle */}
            <polygon 
              points="50,12 12,82 88,82" 
              fill="#FFFFFF" 
              stroke="#D63031" 
              strokeWidth="8" 
              strokeLinejoin="round"
            />
            {/* Bicycle drawing inside */}
            {/* Rear wheel */}
            <circle cx="38" cy="66" r="8" fill="none" stroke="#2D3436" strokeWidth="2.5" />
            {/* Front wheel */}
            <circle cx="62" cy="66" r="8" fill="none" stroke="#2D3436" strokeWidth="2.5" />
            {/* Frame */}
            <polygon points="38,66 48,52 58,66" fill="none" stroke="#2D3436" strokeWidth="2" />
            <line x1="48" y1="52" x2="60" y2="52" stroke="#2D3436" strokeWidth="2" />
            <line x1="62" y1="66" x2="60" y2="52" stroke="#2D3436" strokeWidth="2" />
            {/* Handlebar */}
            <line x1="60" y1="52" x2="58" y2="44" stroke="#2D3436" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="56" y1="44" x2="62" y2="44" stroke="#2D3436" strokeWidth="2.5" />
            {/* Seat */}
            <line x1="48" y1="52" x2="46" y2="46" stroke="#2D3436" strokeWidth="2" />
            <line x1="43" y1="46" x2="49" y2="46" stroke="#2D3436" strokeWidth="2.5" />
          </svg>
        </div>
      );

    case 'puzzle-piece':
      return (
        <div className={wrapperClass} id="visual-puzzle-piece">
          <div className="grid grid-cols-2 gap-2 w-[120px] h-[120px] p-1 bg-slate-200 rounded-xl border-2 border-slate-300">
            {/* Red Star */}
            <div className="bg-[#FF7675] rounded-lg flex items-center justify-center text-white text-2xl shadow-sm">
              ⭐
            </div>
            {/* Blue Moon */}
            <div className="bg-[#74B9FF] rounded-lg flex items-center justify-center text-white text-2xl shadow-sm">
              🌙
            </div>
            {/* Green Heart */}
            <div className="bg-[#55EFC4] rounded-lg flex items-center justify-center text-white text-2xl shadow-sm">
              💚
            </div>
            {/* Question Mark Slot */}
            <div className="bg-white rounded-lg flex items-center justify-center text-slate-400 font-black text-2xl border-2 border-dashed border-[#74B9FF] animate-pulse">
              ?
            </div>
          </div>
        </div>
      );

    case 'count-shapes':
      return (
        <div className={wrapperClass} id="visual-count-shapes">
          <svg width="220" height="130" viewBox="0 0 220 130" className="border border-indigo-100 rounded-xl bg-[#F8FAFC]">
            {/* Grid background for observation */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="220" height="130" fill="url(#grid)" rx="12" />

            {/* Scattered colourful shapes */}
            {/* Yellow Stars (4) */}
            <text x="25" y="35" fontSize="24">⭐</text>
            <text x="75" y="90" fontSize="22">⭐</text>
            <text x="165" y="40" fontSize="24">⭐</text>
            <text x="195" y="105" fontSize="20">⭐</text>

            {/* Blue Circles (5) */}
            <circle cx="35" cy="80" r="10" fill="#74B9FF" stroke="#0984E3" strokeWidth="2" />
            <circle cx="115" cy="50" r="12" fill="#74B9FF" stroke="#0984E3" strokeWidth="2" />
            <circle cx="145" cy="95" r="9" fill="#74B9FF" stroke="#0984E3" strokeWidth="2" />
            <circle cx="185" cy="65" r="11" fill="#74B9FF" stroke="#0984E3" strokeWidth="2" />
            <circle cx="65" cy="25" r="8" fill="#74B9FF" stroke="#0984E3" strokeWidth="2" />

            {/* Green Triangles (3) */}
            <polygon points="120,80 108,102 132,102" fill="#55EFC4" stroke="#00B894" strokeWidth="2" />
            <polygon points="55,100 45,118 65,118" fill="#55EFC4" stroke="#00B894" strokeWidth="2" />
            <polygon points="150,22 140,40 160,40" fill="#55EFC4" stroke="#00B894" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'odd-one-out':
      return (
        <div className={wrapperClass} id="visual-odd-one-out">
          <div className="grid grid-cols-4 gap-2 w-full px-2">
            {/* Face 1 */}
            <div className="bg-[#FFEAA7] border-2 border-[#FDCB6E] rounded-full aspect-square flex items-center justify-center text-2xl shadow-sm">
              😊
            </div>
            {/* Face 2 */}
            <div className="bg-[#FFEAA7] border-2 border-[#FDCB6E] rounded-full aspect-square flex items-center justify-center text-2xl shadow-sm">
              😊
            </div>
            {/* Face 3 - ODD ONE OUT */}
            <div className="bg-sky-100 border-2 border-sky-300 rounded-full aspect-square flex items-center justify-center text-2xl shadow-md scale-105 animate-bounce">
              😢
            </div>
            {/* Face 4 */}
            <div className="bg-[#FFEAA7] border-2 border-[#FDCB6E] rounded-full aspect-square flex items-center justify-center text-2xl shadow-sm">
              😊
            </div>
          </div>
        </div>
      );

    case 'pattern-complete':
      return (
        <div className={wrapperClass} id="visual-pattern-complete">
          <div className="flex items-center gap-1.5 p-2 bg-slate-100 border-2 border-slate-200 rounded-2xl shadow-sm">
            <span className="text-2xl">🔴</span>
            <span className="text-slate-400 font-bold text-xs">➔</span>
            <span className="text-2xl">🟡</span>
            <span className="text-slate-400 font-bold text-xs">➔</span>
            <span className="text-2xl">🟢</span>
            <span className="text-slate-400 font-bold text-xs">➔</span>
            <span className="text-2xl">🔴</span>
            <span className="text-slate-400 font-bold text-xs">➔</span>
            <span className="text-2xl">🟡</span>
            <span className="text-slate-400 font-bold text-xs">➔</span>
            <div className="w-8 h-8 rounded-full bg-white border-2 border-dashed border-[#74B9FF] flex items-center justify-center text-[#0984E3] font-black text-sm animate-pulse">
              ?
            </div>
          </div>
        </div>
      );

    case 'shadow-match':
      return (
        <div className={wrapperClass} id="visual-shadow-match">
          <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-sm bg-slate-50 border border-slate-200 rounded-xl">
            {/* Rabbit Solid Shadow */}
            {/* Rabbit Body */}
            <ellipse cx="55" cy="65" rx="18" ry="13" fill="#1E293B" />
            {/* Head */}
            <circle cx="37" cy="52" r="10.5" fill="#1E293B" />
            {/* Ears */}
            <ellipse cx="33" cy="32" rx="3.5" ry="12" fill="#1E293B" transform="rotate(-15 33 32)" />
            <ellipse cx="40" cy="32" rx="3.5" ry="12" fill="#1E293B" transform="rotate(5 40 32)" />
            {/* Tail */}
            <circle cx="74" cy="61" r="4.5" fill="#1E293B" />
            {/* Feet */}
            <ellipse cx="44" cy="77" rx="4.5" ry="3" fill="#1E293B" />
            <ellipse cx="58" cy="77" rx="4.5" ry="3" fill="#1E293B" />
          </svg>
        </div>
      );

    case 'speed-limit-50-sign':
      return (
        <div className={wrapperClass} id="visual-speed-limit-50-sign">
          <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-md">
            {/* White circle with red border */}
            <circle cx="50" cy="50" r="42" fill="#FFFFFF" stroke="#D63031" strokeWidth="8" />
            {/* Speed limit text */}
            <text x="50" y="58" fill="#2D3436" fontSize="28" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
              50
            </text>
          </svg>
        </div>
      );

    case 'no-u-turn-sign':
      return (
        <div className={wrapperClass} id="visual-no-u-turn-sign">
          <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-md">
            {/* White circle with red border */}
            <circle cx="50" cy="50" r="42" fill="#FFFFFF" stroke="#D63031" strokeWidth="8" />
            {/* Curved Arrow (U-Turn) */}
            <path 
              d="M 62,65 L 62,45 C 62,32 38,32 38,45 L 38,62" 
              fill="none" 
              stroke="#2D3436" 
              strokeWidth="7" 
              strokeLinecap="round" 
            />
            {/* Arrowhead pointing down on the left */}
            <polygon points="38,68 31,58 45,58" fill="#2D3436" />
            {/* Red Diagonal Slash */}
            <line x1="22" y1="22" x2="78" y2="78" stroke="#D63031" strokeWidth="8" />
          </svg>
        </div>
      );

    case 'roundabout-sign':
      return (
        <div className={wrapperClass} id="visual-roundabout-sign">
          <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-md">
            {/* Blue Circle */}
            <circle cx="50" cy="50" r="42" fill="#0984E3" stroke="#FFFFFF" strokeWidth="3" />
            {/* Circular Arrow 1 (Top-right) */}
            <path d="M 50,20 A 30,30 0 0,1 76,35" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
            <polygon points="78,38 75,26 67,31" fill="#FFFFFF" />
            {/* Circular Arrow 2 (Bottom) */}
            <path d="M 76,65 A 30,30 0 0,1 40,78" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
            <polygon points="36,77 48,77 46,68" fill="#FFFFFF" />
            {/* Circular Arrow 3 (Left) */}
            <path d="M 30,55 A 30,30 0 0,1 45,22" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
            <polygon points="46,18 36,24 41,32" fill="#FFFFFF" />
          </svg>
        </div>
      );

    case 'slippery-road-sign':
      return (
        <div className={wrapperClass} id="visual-slippery-road-sign">
          <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-md">
            {/* Red Warning Triangle */}
            <polygon points="50,12 12,82 88,82" fill="#FFFFFF" stroke="#D63031" strokeWidth="8" strokeLinejoin="round" />
            {/* Tilted Car silhouette */}
            <path d="M 40,55 L 60,51 L 58,45 C 57,43 54,42 50,43 L 42,46 C 39,47 38,50 40,55 Z" fill="#2D3436" />
            {/* Wheels */}
            <circle cx="44" cy="56" r="3.5" fill="#2D3436" />
            <circle cx="56" cy="53" r="3.5" fill="#2D3436" />
            {/* Squiggly skid marks */}
            <path d="M 44,59 Q 40,65 48,70 Q 55,75 42,78" fill="none" stroke="#2D3436" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 56,56 Q 52,62 60,67 Q 67,72 54,75" fill="none" stroke="#2D3436" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'train-crossing-sign':
      return (
        <div className={wrapperClass} id="visual-train-crossing-sign">
          <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-md">
            {/* Red Warning Triangle */}
            <polygon points="50,12 12,82 88,82" fill="#FFFFFF" stroke="#D63031" strokeWidth="8" strokeLinejoin="round" />
            {/* Locomotive shape */}
            <rect x="34" y="58" width="34" height="15" rx="2" fill="#2D3436" />
            <rect x="52" y="44" width="14" height="15" rx="1" fill="#2D3436" />
            {/* Chimney */}
            <rect x="38" y="46" width="5" height="12" fill="#2D3436" />
            <polygon points="36,46 45,46 42,42 39,42" fill="#2D3436" />
            {/* Cabin roof */}
            <rect x="49" y="41" width="19" height="4" rx="1" fill="#2D3436" />
            {/* Wheels */}
            <circle cx="40" cy="74" r="5" fill="#2D3436" />
            <circle cx="51" cy="74" r="5" fill="#2D3436" />
            <circle cx="62" cy="74" r="5" fill="#2D3436" />
            {/* Steam smoke clouds */}
            <circle cx="34" cy="38" r="3" fill="#D2D7DF" />
            <circle cx="28" cy="34" r="4.5" fill="#D2D7DF" />
            <circle cx="20" cy="30" r="6" fill="#D2D7DF" />
          </svg>
        </div>
      );

    case 'parking-sign':
      return (
        <div className={wrapperClass} id="visual-parking-sign">
          <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-md">
            {/* Blue Square with white border */}
            <rect x="10" y="10" width="80" height="80" rx="12" fill="#0984E3" stroke="#FFFFFF" strokeWidth="3" />
            {/* White Letter P */}
            <text x="50" y="68" fill="#FFFFFF" fontSize="56" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
              P
            </text>
          </svg>
        </div>
      );

    case 'school-zone-sign':
      return (
        <div className={wrapperClass} id="visual-school-zone-sign">
          <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-md">
            {/* Red Warning Triangle */}
            <polygon points="50,12 12,82 88,82" fill="#FFFFFF" stroke="#D63031" strokeWidth="8" strokeLinejoin="round" />
            {/* Two Kids Walking (Silhouettes) */}
            {/* Kid 1 (Taller, Left) */}
            <circle cx="42" cy="42" r="3.5" fill="#2D3436" />
            <path d="M 38,47 C 38,47 43,45 45,47 L 44,62 L 40,62 Z" fill="#2D3436" />
            <line x1="40" y1="62" x2="38" y2="74" stroke="#2D3436" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="43" y1="62" x2="45" y2="74" stroke="#2D3436" strokeWidth="2.5" strokeLinecap="round" />
            {/* Arm holding smaller kid */}
            <line x1="43" y1="50" x2="55" y2="52" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" />
            
            {/* Kid 2 (Shorter, Right) */}
            <circle cx="56" cy="48" r="3" fill="#2D3436" />
            <path d="M 53,53 C 53,53 57,51 59,53 L 57,64 L 54,64 Z" fill="#2D3436" />
            <line x1="55" y1="64" x2="53" y2="74" stroke="#2D3436" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="57" y1="64" x2="59" y2="74" stroke="#2D3436" strokeWidth="2.2" strokeLinecap="round" />
            {/* Crosswalk lines at bottom */}
            <line x1="30" y1="77" x2="70" y2="77" stroke="#2D3436" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'no-parking-sign':
      return (
        <div className={wrapperClass} id="visual-no-parking-sign">
          <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-md">
            {/* Blue background with red border */}
            <circle cx="50" cy="50" r="42" fill="#0984E3" stroke="#D63031" strokeWidth="8" />
            {/* Diagonal Red Line slash */}
            <line x1="22" y1="22" x2="78" y2="78" stroke="#D63031" strokeWidth="8" />
          </svg>
        </div>
      );

    case 'one-way-sign':
      return (
        <div className={wrapperClass} id="visual-one-way-sign">
          <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-md">
            {/* Blue rectangle with white border */}
            <rect x="25" y="10" width="50" height="80" rx="8" fill="#0984E3" stroke="#FFFFFF" strokeWidth="3" />
            {/* White Arrow pointing up */}
            <line x1="50" y1="78" x2="50" y2="24" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
            <polygon points="50,16 34,34 66,34" fill="#FFFFFF" />
          </svg>
        </div>
      );

    default:
      return null;
  }
};
