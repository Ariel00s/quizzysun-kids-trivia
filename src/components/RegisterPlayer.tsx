import { useState, FormEvent } from 'react';
import { Player, AgeGroup } from '../types';
import CameraCapture from './CameraCapture';
import { User, Camera, Sparkles, Smile, ArrowRight, ArrowLeft, Settings } from 'lucide-react';

interface RegisterPlayerProps {
  onRegister: (name: string, ageGroup: AgeGroup, avatar: string, profilePic: string | null) => void;
  onCancel: (() => void) | null;
  lang: 'en' | 'he';
  onOpenSettings?: () => void;
}

const PRESET_AVATARS = ['🦖', '🦁', '🦄', '🐼', '🐨', '🦊', '🐯', '🐸', '🚀', '⭐', '🌈', '🎨'];

export default function RegisterPlayer({ onRegister, onCancel, lang, onOpenSettings }: RegisterPlayerProps) {
  const [name, setName] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('8-13');
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0]);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [useCamera, setUseCamera] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onRegister(name.trim(), ageGroup, selectedAvatar, profilePic);
  };

  return (
    <div className="w-full max-w-xl bg-white border-4 border-primary rounded-[32px] p-6 md:p-8 shadow-chunky-yellow relative overflow-hidden animate-pop">
      <div className="absolute top-1 left-1 right-1 h-2 bg-white/40 rounded-full opacity-50" />

      {onOpenSettings && (
        <button
          type="button"
          onClick={onOpenSettings}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 border-2 border-[#74B9FF] text-[#0984E3] flex items-center justify-center cursor-pointer shadow-sm z-10 transition-transform hover:scale-110 active:scale-95"
          title={lang === 'en' ? 'Open Settings' : 'פתח הגדרות'}
        >
          <Settings className="w-5.5 h-5.5 text-[#0984E3]" />
        </button>
      )}

      <h2 className={`font-headline-lg-mobile text-primary text-center mb-4 leading-none font-bold text-2xl md:text-3xl ${onOpenSettings ? 'pr-10 pl-10' : ''}`}>
        {lang === 'en' ? 'Create Your Player Profile!' : 'יצירת פרופיל שחקן חדש!'}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Name input */}
        <div className="flex flex-col gap-1">
          <label className="font-label-bold text-primary text-sm md:text-base">
            {lang === 'en' ? 'What is your name?' : 'מה השם שלך?'}
          </label>
          <div className="relative">
            <input
              type="text"
              required
              maxLength={15}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={lang === 'en' ? 'Enter nickname...' : 'הקלד כינוי משחק...'}
              className="w-full h-14 pl-12 pr-4 bg-surface-container rounded-full border-4 border-primary text-primary font-headline-md text-lg focus:outline-none focus:ring-0 focus:border-secondary transition-all text-center md:text-left"
            />
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
          </div>
        </div>

        {/* Age Group Difficulty selection */}
        <div className="flex flex-col gap-1">
          <label className="font-label-bold text-primary text-sm md:text-base">
            {lang === 'en' ? 'Choose your group (Age decides question levels):' : 'בחרו את קבוצת הגיל (הגיל קובע את רמת השאלות):'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {([
              { group: '5-7', labelEn: 'Ages 5-7', labelHe: 'גילאי 5-7', icon: '🦕' },
              { group: '8-13', labelEn: 'Ages 8-13', labelHe: 'גילאי 8-13', icon: '🚀' },
              { group: '13+', labelEn: 'Ages 13+', labelHe: 'גילאי 13+', icon: '🎓' }
            ] as const).map(({ group, labelEn, labelHe, icon }) => (
              <button
                key={group}
                type="button"
                onClick={() => setAgeGroup(group)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl border-4 bubbly-btn transition-all cursor-pointer ${
                  ageGroup === group
                    ? 'bg-secondary-container border-secondary text-on-secondary-container shadow-[0_4px_0_0_rgba(110,92,0,1)]'
                    : 'bg-surface border-primary-fixed text-on-surface-variant hover:bg-surface-bright'
                }`}
              >
                <span className="text-3xl select-none">{icon}</span>
                <span className="font-label-bold text-[11px] md:text-xs leading-none">
                  {lang === 'en' ? labelEn : labelHe}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Profile Picture Option Toggles */}
        <div className="flex flex-col gap-1 border-t-2 border-primary-fixed pt-sm">
          <div className="flex justify-between items-center mb-1">
            <label className="font-label-bold text-primary text-sm md:text-base">
              {lang === 'en' ? 'Choose profile look:' : 'בחרו את מראה הפרופיל:'}
            </label>
            <button
              type="button"
              onClick={() => {
                setUseCamera(!useCamera);
                if (useCamera) setProfilePic(null);
              }}
              className="flex items-center gap-1 px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full border border-primary font-bold text-xs hover:scale-105 cursor-pointer"
            >
              {useCamera ? <Smile className="w-3.5 h-3.5" /> : <Camera className="w-3.5 h-3.5" />}
              <span>
                {useCamera
                  ? lang === 'en' ? 'Use Avatar' : 'שימוש בדמות'
                  : lang === 'en' ? 'Snap Selfie!' : 'צילום סלפי!'}
              </span>
            </button>
          </div>

          {useCamera ? (
            <div className="bg-surface-container rounded-2xl p-2 border-2 border-dashed border-primary">
              <CameraCapture
                lang={lang}
                onPhotoCaptured={(dataUrl) => setProfilePic(dataUrl)}
              />
            </div>
          ) : (
            <div className="grid grid-cols-6 gap-1 p-2 bg-surface-container rounded-2xl border-2 border-primary max-h-[140px] overflow-y-auto justify-items-center">
              {PRESET_AVATARS.map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`w-12 h-12 rounded-full text-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer ${
                    selectedAvatar === avatar && !profilePic
                      ? 'bg-secondary-container border-2 border-secondary shadow-md scale-105'
                      : 'bg-white hover:bg-white/80'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Actions Submit / Cancel */}
        <div className="flex gap-2 mt-2 border-t-2 border-primary-fixed pt-md">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 bg-white text-on-surface-variant font-headline-md text-lg border-4 border-[#74B9FF] rounded-xl hover-chunky-blue shadow-chunky-blue active:translate-y-1 active:shadow-none transition-all cursor-pointer text-center font-bold"
            >
              {lang === 'en' ? 'Cancel' : 'ביטול'}
            </button>
          )}
          
          <button
            type="submit"
            disabled={!name.trim()}
            className={`flex-1 py-3 font-headline-md text-lg border-4 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer font-bold ${
              name.trim()
                ? 'bg-secondary-container text-on-secondary-container border-[#74B9FF] shadow-chunky-yellow hover-chunky-yellow'
                : 'bg-surface-variant text-on-surface-variant border-outline-variant opacity-50 cursor-not-allowed'
            }`}
          >
            <span>{lang === 'en' ? 'Start Journey!' : 'מתחילים במסע!'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </form>
    </div>
  );
}
