import { useState, FormEvent } from 'react';
import CameraCapture from './CameraCapture';
import { Player, Category, AgeGroup } from '../types';
import rainbowSvg from '../../assets/Rainbow.svg';
import { Play, Award, Trophy, UserPlus, Users, Volume2, VolumeX, Globe, Settings, MapPin, Sparkles, RefreshCw, X, Plus, Check, ArrowLeft, Lock, Camera, Smile } from 'lucide-react';

interface MainMenuProps {
  players: Player[];
  activePlayer: Player | null;
  lang: 'en' | 'he';
  soundOn: boolean;
  onLanguageChange: (lang: 'en' | 'he') => void;
  onSoundToggle: () => void;
  onStartQuiz: (category: Category | 'All') => void;
  onViewBadges: () => void;
  onViewLeaderboard: () => void;
  onSwitchPlayer: () => void;
  onResetAll: () => void;
  onChangeAgeGroup?: (playerId: string, newAgeGroup: AgeGroup) => void;
  onOpenSettings: () => void;
  versusEnabled: boolean;
  onVersusModeToggle: (enabled: boolean) => void;
  versusOpponentId: string | null;
  onVersusOpponentChange: (id: string | null) => void;
  versusModeStyle: 'time' | 'turn';
  versusTimeLimit: number;
  onRegisterPlayer: (name: string, ageGroup: AgeGroup, avatar: string, profilePic: string | null, gender: 'male' | 'female', autoSelectAsOpponent?: boolean) => void;
  onSetActivePlayer: (playerId: string) => void;
  onChangeAvatar?: (playerId: string, newAvatar: string) => void;
  onDeletePlayer?: (playerId: string) => void;
  onChangeGender?: (playerId: string, newGender: 'male' | 'female') => void;
  cameraQuestEnabled: boolean;
  onCameraQuestToggle: (enabled: boolean) => void;
  onStartCameraQuest: (type: string) => void;
}

const PRESET_AVATARS = ['🦖', '🦁', '🦄', '🐼', '🐨', '🦊', '🐯', '🐸', '🚀', '⭐', '🌈', '🎨'];
const AVATARS_BY_LEVEL = [
  { avatar: '🦖', level: 1 }, { avatar: '🦁', level: 1 }, { avatar: '🦄', level: 1 },
  { avatar: '🐼', level: 2 }, { avatar: '🦊', level: 2 },
  { avatar: '🐯', level: 3 }, { avatar: '🐸', level: 3 },
  { avatar: '🚀', level: 4 }, { avatar: '⭐', level: 4 },
  { avatar: '🌈', level: 5 }, { avatar: '🎨', level: 5 },
  { avatar: '🤖', level: 6 }, { avatar: '👽', level: 6 },
  { avatar: '👻', level: 7 }, { avatar: '🦸', level: 8 }
];

interface InlineAddPlayerFormProps {
  lang: 'en' | 'he';
  onSave: (name: string, ageGroup: AgeGroup, avatar: string, profilePic: string | null, gender: 'male' | 'female') => void;
  onCancel: () => void;
}

function InlineAddPlayerForm({ lang, onSave, onCancel }: InlineAddPlayerFormProps) {
  const [name, setName] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('8-13');
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0]);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [useCamera, setUseCamera] = useState(false);
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name.trim(), ageGroup, selectedAvatar, profilePic, gender);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-slate-50 border-4 border-dashed border-[#74B9FF] rounded-[24px] p-5 flex flex-col gap-4 text-left animate-pop">
      <div className="flex justify-between items-center border-b-2 border-slate-200 pb-2">
        <h5 className="font-black text-[#FF7675] text-sm md:text-base flex items-center gap-1">
          <span>➕</span>
          <span>{lang === 'en' ? 'Create New Player Profile' : 'יצירת שחקן חדש'}</span>
        </h5>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-full transition-colors"
        >
          {lang === 'en' ? 'Cancel' : 'ביטול'}
        </button>
      </div>

      {/* Name Input */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-black text-slate-500 uppercase tracking-wider">
          {lang === 'en' ? "What's the name?" : 'מה שם השחקן?'}
        </label>
        <input
          type="text"
          required
          maxLength={15}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={lang === 'en' ? 'Type nickname...' : 'הקלד כינוי...'}
          className="w-full p-2.5 bg-white border-2 border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-[#74B9FF] transition-all"
        />
      </div>

      {/* Gender Selection */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-black text-slate-500 uppercase tracking-wider">
          {lang === 'en' ? 'Gender:' : 'מגדר:'}
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setGender('male')}
            className={`flex items-center justify-center gap-2 py-2 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${
              gender === 'male'
                ? 'bg-[#D2E3FC] border-[#74B9FF] text-[#0984E3] font-black'
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            <span className="text-lg">🙋‍♂️</span>
            <span>{lang === 'en' ? 'Boy' : 'בן'}</span>
          </button>
          <button
            type="button"
            onClick={() => setGender('female')}
            className={`flex items-center justify-center gap-2 py-2 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${
              gender === 'female'
                ? 'bg-pink-100 border-pink-300 text-pink-600 font-black'
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            <span className="text-lg">🙋‍♀️</span>
            <span>{lang === 'en' ? 'Girl' : 'בת'}</span>
          </button>
        </div>
      </div>

      {/* Age Group Selector */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-black text-slate-500 uppercase tracking-wider">
          {lang === 'en' ? 'Age Group (difficulty):' : 'קבוצת גיל (רמת קושי):'}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {([
            { group: '5-7', label: lang === 'en' ? '5-7 🦖' : '5-7 🦖' },
            { group: '8-13', label: lang === 'en' ? '8-13 🚀' : '8-13 🚀' },
            { group: '13+', label: lang === 'en' ? '13+ 🎓' : '13+ 🎓' }
          ] as const).map(({ group, label }) => (
            <button
              key={group}
              type="button"
              onClick={() => setAgeGroup(group)}
              className={`py-2 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${
                ageGroup === group
                  ? 'bg-[#D2E3FC] border-[#74B9FF] text-[#0984E3] shadow-sm font-black'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Picture Option Toggles */}
      <div className="flex flex-col gap-2 pt-2 border-t border-slate-200">
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs font-black text-slate-500 uppercase tracking-wider">
            {lang === 'en' ? 'Choose profile look:' : 'בחרו את מראה הפרופיל:'}
          </label>
          <button
            type="button"
            onClick={() => {
              setUseCamera(!useCamera);
              if (useCamera) setProfilePic(null);
            }}
            className="flex items-center gap-1 px-3 py-1 bg-slate-200 text-slate-700 rounded-full border border-slate-300 font-bold text-xs hover:scale-105 cursor-pointer"
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
          <div className="bg-white rounded-2xl p-2 border-2 border-dashed border-[#74B9FF]">
            <CameraCapture
              lang={lang}
              onPhotoCaptured={(dataUrl) => setProfilePic(dataUrl)}
            />
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-2 p-2 bg-white rounded-xl border border-slate-200 max-h-[100px] overflow-y-auto justify-items-center">
            {PRESET_AVATARS.map((avatar) => (
              <button
                key={avatar}
                type="button"
                onClick={() => setSelectedAvatar(avatar)}
                className={`w-10 h-10 rounded-full text-xl flex items-center justify-center transition-all cursor-pointer ${
                  selectedAvatar === avatar && !profilePic
                    ? 'bg-[#D2E3FC] border-2 border-[#74B9FF] scale-110 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100'
                }`}
              >
                {avatar}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2.5 mt-2 bg-[#55EFC4] text-[#006241] border-2 border-[#00B894] rounded-xl font-bold text-sm shadow-sm hover:scale-102 active:translate-y-0.5 transition-transform cursor-pointer text-center font-black"
      >
        {lang === 'en' ? 'Create & Select! 🎉' : 'שמירה ובחירת שחקן! 🎉'}
      </button>
    </form>
  );
}

export default function MainMenu({
  players,
  activePlayer,
  lang,
  soundOn,
  onLanguageChange,
  onSoundToggle,
  onStartQuiz,
  onViewBadges,
  onViewLeaderboard,
  onSwitchPlayer,
  onResetAll,
  onChangeAgeGroup,
  onOpenSettings,
  versusEnabled,
  onVersusModeToggle,
  versusOpponentId,
  onVersusOpponentChange,
  versusModeStyle,
  versusTimeLimit,
  onRegisterPlayer,
  onSetActivePlayer,
  onChangeAvatar,
  onDeletePlayer,
  onChangeGender,
  cameraQuestEnabled,
  onCameraQuestToggle,
  onStartCameraQuest
}: MainMenuProps) {
  const [currentStep, setCurrentStep] = useState<'setup' | 'topics'>('setup');
  const [addingPlayer, setAddingPlayer] = useState<boolean>(false);
  const [showAvatarModal, setShowAvatarModal] = useState<boolean>(false);

  const handleQuestPlay = (type: string) => {
    if (!activePlayer) {
      if (soundOn) {
        try {
          const warnText = lang === 'en' 
            ? 'Please select or create Player 1 first!' 
            : 'אנא בחרו או צרו שחקן ראשון תחילה!';
          const utterance = new SpeechSynthesisUtterance(warnText);
          utterance.lang = lang === 'he' ? 'he-IL' : 'en-US';
          window.speechSynthesis.speak(utterance);
        } catch (e) {}
      }
      alert(lang === 'en' ? 'Please select or create Player 1 first!' : 'אנא בחרו או צרו שחקן ראשון תחילה!');
      return;
    }
    onStartCameraQuest(type);
  };

  const handleCategoryPlay = (category: Category | 'All') => {
    if (!activePlayer) {
      if (soundOn) {
        try {
          const warnText = lang === 'en' 
            ? 'Please select or create Player 1 first!' 
            : 'אנא בחרו או צרו שחקן ראשון תחילה!';
          const utterance = new SpeechSynthesisUtterance(warnText);
          utterance.lang = lang === 'he' ? 'he-IL' : 'en-US';
          window.speechSynthesis.speak(utterance);
        } catch (e) {}
      }
      alert(lang === 'en' ? 'Please select or create Player 1 first!' : 'אנא בחרו או צרו שחקן ראשון תחילה!');
      return;
    }
    if (versusEnabled && !versusOpponentId) {
      if (soundOn) {
        try {
          const warnText = lang === 'en' 
            ? 'Please select Challenger 2 before starting the battle!' 
            : 'אנא בחרו מתמודד שני לפני שמתחילים בקרב!';
          const utterance = new SpeechSynthesisUtterance(warnText);
          utterance.lang = lang === 'he' ? 'he-IL' : 'en-US';
          window.speechSynthesis.speak(utterance);
        } catch (e) {}
      }
      alert(lang === 'en' ? 'Please select Challenger 2 first!' : 'אנא בחרו מתמודד שני תחילה!');
      return;
    }
    onStartQuiz(category);
  };
  
  const getDailyProgress = (player: Player | null) => {
    if (!player) return 0;
    return Math.min(player.gamesPlayed * 20, 100);
  };

  const getDailyGoalText = (player: Player | null) => {
    if (!player) return '0/5';
    return `${Math.min(player.gamesPlayed, 5)}/5`;
  };

  const handleAgeGroupCycle = (player: Player) => {
    if (!onChangeAgeGroup) return;
    const current = player.ageGroup;
    let next: AgeGroup = '5-7';
    if (current === '5-7') {
      next = '8-13';
    } else if (current === '8-13') {
      next = '13+';
    } else {
      next = '5-7';
    }
    onChangeAgeGroup(player.id, next);
  };

  const handleGenderToggle = (player: Player) => {
    if (!onChangeGender) return;
    const current = player.gender || 'male';
    const next = current === 'male' ? 'female' : 'male';
    onChangeGender(player.id, next);
  };

  const handleSaveInlinePlayer = (name: string, ageGroup: AgeGroup, avatar: string, profilePic: string | null, gender: 'male' | 'female') => {
    onRegisterPlayer(name, ageGroup, avatar, profilePic, gender, false);
    setAddingPlayer(false);
  };

  // Setup validation checking
  const isSetupValid = versusEnabled
    ? (activePlayer && versusOpponentId && activePlayer.id !== versusOpponentId)
    : !!activePlayer;

  const handleContinueToTopics = () => {
    if (!activePlayer) {
      if (soundOn) {
        try {
          const warnText = lang === 'en'
            ? 'Please select or create Player 1 first!'
            : 'אנא בחרו או צרו שחקן ראשון תחילה!';
          const utterance = new SpeechSynthesisUtterance(warnText);
          utterance.lang = lang === 'he' ? 'he-IL' : 'en-US';
          window.speechSynthesis.speak(utterance);
        } catch (e) {}
      }
      alert(lang === 'en' ? 'Please select or create Player 1 first!' : 'אנא בחרו או צרו שחקן ראשון תחילה!');
      return;
    }
    if (versusEnabled && !versusOpponentId) {
      if (soundOn) {
        try {
          const warnText = lang === 'en'
            ? 'Please select Challenger 2 before starting the battle!'
            : 'אנא בחרו מתמודד שני לפני שמתחילים בקרב!';
          const utterance = new SpeechSynthesisUtterance(warnText);
          utterance.lang = lang === 'he' ? 'he-IL' : 'en-US';
          window.speechSynthesis.speak(utterance);
        } catch (e) {}
      }
      alert(lang === 'en' ? 'Please select Challenger 2 first!' : 'אנא בחרו מתמודד שני תחילה!');
      return;
    }
    setCurrentStep('topics');
  };

  if (currentStep === 'topics') {
    return (
      <div className="w-full max-w-5xl flex flex-col items-center gap-3 md:gap-4 animate-pop relative">
        {/* Decorative floating rainbow at top left */}
        <div className="absolute -top-6 -left-6 w-20 h-20 opacity-15 pointer-events-none -z-10 select-none animate-pulse">
          <img src={rainbowSvg} alt="Rainbow decoration" className="w-full h-full object-contain" />
        </div>
        
        {/* Navigation back and active match summary */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/70 backdrop-blur-sm border-2 border-[#74B9FF]/50 rounded-3xl p-3.5 shadow-sm">
          <button
            onClick={() => setCurrentStep('setup')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-all border border-slate-300 shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'en' ? 'Change Players / Style' : 'חזרה להגדרות שחקנים'}</span>
          </button>

          {/* Minimalist Active Match Summary */}
          <div className="flex items-center gap-2 font-black text-sm text-[#2D3436]">
            <span>🎯</span>
            <span>{lang === 'en' ? 'Match:' : 'משחק של:'}</span>
            {!versusEnabled ? (
              <span className="bg-[#D2E3FC] text-[#0984E3] px-3 py-1 rounded-full border border-[#74B9FF] flex items-center gap-1.5 shadow-sm">
                <span>{activePlayer?.avatar}</span>
                <span>{activePlayer?.name}</span>
                <span className="text-xs bg-white px-2 py-0.5 rounded-full border border-[#74B9FF] text-[#0984E3]">
                  {activePlayer?.ageGroup}
                </span>
              </span>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="bg-[#74B9FF] text-[#0984E3] px-3 py-1 rounded-full border border-blue-200 flex items-center gap-1 shadow-sm">
                  <span>{activePlayer?.avatar}</span>
                  <span>{activePlayer?.name}</span>
                </span>
                <span className="text-rose-500 font-black">VS</span>
                <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full border border-rose-200 flex items-center gap-1 shadow-sm">
                  <span>{players.find(p => p.id === versusOpponentId)?.avatar}</span>
                  <span>{players.find(p => p.id === versusOpponentId)?.name}</span>
                </span>
              </div>
            )}


          </div>
        </div>

        {/* Main Categories Navigation Grid */}
        <div className="w-full text-center z-10 mt-1">
          <h3 className="font-headline-md text-[#FF7675] mb-3.5 drop-shadow-sm font-black text-sm sm:text-base md:text-lg uppercase tracking-wider">
            {cameraQuestEnabled
              ? (lang === 'en' ? 'CHOOSE A QUEST TYPE TO PLAY' : 'בחרו סוג משימה להתחלת המשחק')
              : (lang === 'en' ? 'CHOOSE A TOPIC TO PLAY' : 'בחרו נושא להתחלת המשחק')}
          </h3>
          
          {cameraQuestEnabled ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 w-full max-w-4xl mx-auto">
              {([
                { id: 'color', labelEn: 'Colors', labelHe: 'צבעים', emoji: '🎨', bgColor: 'bg-gradient-to-br from-[#FF9F43] to-[#EE5A24] text-white border border-white/20 shadow-[0_8px_16px_-4px_rgba(238,90,36,0.3)] hover:shadow-[0_12px_20px_-4px_rgba(238,90,36,0.45)] hover:-translate-y-0.5' },
                { id: 'expression', labelEn: 'Selfie Faces', labelHe: 'סלפי פרצופים', emoji: '😜', bgColor: 'bg-gradient-to-br from-[#FF9FF3] to-[#F368E0] text-white border border-white/20 shadow-[0_8px_16px_-4px_rgba(243,104,224,0.3)] hover:shadow-[0_12px_20px_-4px_rgba(243,104,224,0.45)] hover:-translate-y-0.5' },
                { id: 'letter-number', labelEn: 'Letters & Numbers', labelHe: 'אותיות ומספרים', emoji: '🔢', bgColor: 'bg-gradient-to-br from-[#55EFC4] to-[#00B894] text-white border border-white/20 shadow-[0_8px_16px_-4px_rgba(0,184,148,0.3)] hover:shadow-[0_12px_20px_-4px_rgba(0,184,148,0.45)] hover:-translate-y-0.5' },
                { id: 'object', labelEn: 'Household Objects', labelHe: 'חפצים בבית', emoji: '🧸', bgColor: 'bg-gradient-to-br from-[#A29BFE] to-[#6C5CE7] text-white border border-white/20 shadow-[0_8px_16px_-4px_rgba(108,92,231,0.3)] hover:shadow-[0_12px_20px_-4px_rgba(108,92,231,0.45)] hover:-translate-y-0.5' }
              ] as const).map((qType) => (
                <button
                  key={qType.id}
                  onClick={() => handleQuestPlay(qType.id)}
                  className={`p-3.5 rounded-2xl border flex items-center justify-start sm:justify-center gap-3 font-black text-xs sm:text-sm md:text-base transition-all duration-150 transform hover:scale-102 hover:-translate-y-0.5 active:scale-98 active:translate-y-0 cursor-pointer ${qType.bgColor}`}
                >
                  <span className="text-xl sm:text-2xl shrink-0">{qType.emoji}</span>
                  <span className="truncate">{lang === 'en' ? qType.labelEn : qType.labelHe}</span>
                </button>
              ))}

              <button
                onClick={() => handleQuestPlay('All')}
                className="col-span-2 sm:col-span-1 md:col-span-1 p-3.5 bg-gradient-to-br from-[#74B9FF] to-[#0984E3] text-white font-black text-xs sm:text-sm md:text-base border border-white/20 rounded-2xl shadow-[0_8px_16px_-4px_rgba(9,132,227,0.3)] hover:shadow-[0_12px_20px_-4px_rgba(9,132,227,0.45)] hover:-translate-y-0.5 active:scale-98 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 animate-pulse"
              >
                <span>📸</span>
                <span>{lang === 'en' ? 'Mixed (All)' : 'הכל מעורב'}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 w-full max-w-4xl mx-auto">
              {([
                { id: 'Geography', labelEn: 'Geography', labelHe: 'גאוגרפיה', emoji: '🌍', bgColor: 'bg-gradient-to-br from-[#74B9FF] to-[#0984E3] text-white border border-white/20 shadow-[0_8px_16px_-4px_rgba(9,132,227,0.3)] hover:shadow-[0_12px_20px_-4px_rgba(9,132,227,0.45)] hover:-translate-y-0.5' },
                { id: 'Animals', labelEn: 'Animals', labelHe: 'בעלי חיים', emoji: '🦁', bgColor: 'bg-gradient-to-br from-[#FF9F43] to-[#EE5A24] text-white border border-white/20 shadow-[0_8px_16px_-4px_rgba(238,90,36,0.3)] hover:shadow-[0_12px_20px_-4px_rgba(238,90,36,0.45)] hover:-translate-y-0.5' },
                { id: 'Math', labelEn: 'Math', labelHe: 'חשבון', emoji: '🔢', bgColor: 'bg-gradient-to-br from-[#55EFC4] to-[#00B894] text-white border border-white/20 shadow-[0_8px_16px_-4px_rgba(0,184,148,0.3)] hover:shadow-[0_12px_20px_-4px_rgba(0,184,148,0.45)] hover:-translate-y-0.5' },
                { id: 'History', labelEn: 'History', labelHe: 'היסטוריה', emoji: '📜', bgColor: 'bg-gradient-to-br from-[#FF7675] to-[#D63031] text-white border border-white/20 shadow-[0_8px_16px_-4px_rgba(214,48,49,0.3)] hover:shadow-[0_12px_20px_-4px_rgba(214,48,49,0.45)] hover:-translate-y-0.5' },
                { id: 'Science', labelEn: 'Science', labelHe: 'מדע', emoji: '🧪', bgColor: 'bg-gradient-to-br from-[#81ECEC] to-[#00CEC9] text-white border border-white/20 shadow-[0_8px_16px_-4px_rgba(0,206,201,0.3)] hover:shadow-[0_12px_20px_-4px_rgba(0,206,201,0.45)] hover:-translate-y-0.5' },
                { id: 'Space', labelEn: 'Space', labelHe: 'חלל', emoji: '🚀', bgColor: 'bg-gradient-to-br from-[#A29BFE] to-[#6C5CE7] text-white border border-white/20 shadow-[0_8px_16px_-4px_rgba(108,92,231,0.3)] hover:shadow-[0_12px_20px_-4px_rgba(108,92,231,0.45)] hover:-translate-y-0.5' },
                { id: 'Stories', labelEn: 'Stories & Tales', labelHe: 'סיפורים ואגדות', emoji: '🏰', bgColor: 'bg-gradient-to-br from-[#FF9FF3] to-[#F368E0] text-white border border-white/20 shadow-[0_8px_16px_-4px_rgba(243,104,224,0.3)] hover:shadow-[0_12px_20px_-4px_rgba(243,104,224,0.45)] hover:-translate-y-0.5' },
                { id: 'GeneralKnowledge', labelEn: 'General Info', labelHe: 'ידע כללי', emoji: '💡', bgColor: 'bg-gradient-to-br from-[#FFC048] to-[#FF9F43] text-white border border-white/20 shadow-[0_8px_16px_-4px_rgba(255,159,67,0.3)] hover:shadow-[0_12px_20px_-4px_rgba(255,159,67,0.45)] hover:-translate-y-0.5' },
              ] as const).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryPlay(cat.id)}
                  className={`p-3.5 rounded-2xl border flex items-center justify-start sm:justify-center gap-3 font-black text-xs sm:text-sm md:text-base transition-all duration-150 transform hover:scale-102 hover:-translate-y-0.5 active:scale-98 active:translate-y-0 cursor-pointer ${cat.bgColor}`}
                >
                  <span className="text-xl sm:text-2xl shrink-0">{cat.emoji}</span>
                  <span className="truncate">{lang === 'en' ? cat.labelEn : cat.labelHe}</span>
                </button>
              ))}

              <button
                onClick={() => handleCategoryPlay('All')}
                className="col-span-2 sm:col-span-1 md:col-span-1 p-3.5 bg-gradient-to-br from-[#74B9FF] to-[#0984E3] text-white font-black text-xs sm:text-sm md:text-base border border-white/20 rounded-2xl shadow-[0_8px_16px_-4px_rgba(9,132,227,0.3)] hover:shadow-[0_12px_20px_-4px_rgba(9,132,227,0.45)] hover:-translate-y-0.5 active:scale-98 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 animate-pulse"
              >
                <span>🎮</span>
                <span>{lang === 'en' ? 'Mixed (All)' : 'משחק מעורב'}</span>
              </button>
            </div>
          )}
        </div>

  

      {/* Avatar Selector Modal */}
      {showAvatarModal && activePlayer && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in"
          onClick={() => setShowAvatarModal(false)}
        >
          <div 
            className="w-full max-w-sm bg-white border-4 border-[#74B9FF] rounded-[32px] p-6 shadow-chunky-blue relative animate-pop"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAvatarModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-headline-md text-xl text-center text-[#2D3436] font-bold mb-4">
              {lang === 'en' ? 'Unlock & Choose Avatar' : 'בחירת דמות'}
            </h3>
            
            <div className="grid grid-cols-4 gap-3 max-h-[300px] overflow-y-auto p-2">
              {AVATARS_BY_LEVEL.map((item, idx) => {
                const isUnlocked = (activePlayer.level || 1) >= item.level;
                const isSelected = activePlayer.avatar === item.avatar && !activePlayer.profilePic;
                
                return (
                  <div key={idx} className="relative flex flex-col items-center gap-1">
                    <button
                      onClick={() => {
                        if (isUnlocked && onChangeAvatar) {
                          onChangeAvatar(activePlayer.id, item.avatar);
                          setShowAvatarModal(false);
                        }
                      }}
                      className={`w-12 h-12 rounded-full text-2xl flex items-center justify-center transition-all ${
                        !isUnlocked ? 'bg-slate-100 opacity-50 grayscale cursor-not-allowed' :
                        isSelected ? 'bg-[#D2E3FC] border-2 border-[#74B9FF] scale-110 shadow-sm' :
                        'bg-white border border-slate-200 hover:bg-slate-50 cursor-pointer hover:scale-105'
                      }`}
                    >
                      {item.avatar}
                      {!isUnlocked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 rounded-full">
                          <Lock className="w-4 h-4 text-slate-700" />
                        </div>
                      )}
                    </button>
                    {!isUnlocked && (
                      <span className="text-[9px] font-bold text-rose-500">
                        {lang === 'en' ? `Lv ${item.level}` : `רמה ${item.level}`}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

  return (
    <div className="w-full max-w-5xl flex flex-col items-center gap-3 animate-pop relative">
      {/* Decorative floating rainbow at top left */}
      <div className="absolute -top-6 -left-6 w-20 h-20 opacity-15 pointer-events-none -z-10 select-none animate-pulse">
        <img src={rainbowSvg} alt="Rainbow decoration" className="w-full h-full object-contain" />
      </div>
      
      {/* Frameless Integrated Panel */}
      <div className="w-full relative overflow-hidden z-10 animate-pop">
        
        {/* Playful Slim Game Mode Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-100/50 pb-3 mb-3">
          <div className="flex flex-col text-left">
            <h3 className="font-headline-md text-base sm:text-lg font-black text-[#2D3436] flex items-center gap-1.5">
              <span>🎮</span>
              <span>{lang === 'en' ? 'Select Game Mode' : 'בחרו מצב משחק'}</span>
            </h3>
          </div>
          <div className="flex bg-slate-100/80 p-1 rounded-full border border-slate-200">
            <button
              type="button"
              onClick={() => {
                onVersusModeToggle(false);
                onCameraQuestToggle(false);
                setAddingPlayer(false);
              }}
              className={`px-3 py-1.5 rounded-full font-black text-xs transition-all cursor-pointer flex items-center gap-1 ${
                !versusEnabled && !cameraQuestEnabled
                  ? 'bg-[#D2E3FC] text-[#0984E3] shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>🦖</span>
              <span>{lang === 'en' ? 'Solo' : 'יחיד'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onVersusModeToggle(true);
                onCameraQuestToggle(false);
                setAddingPlayer(false);
              }}
              className={`px-3 py-1.5 rounded-full font-black text-xs transition-all cursor-pointer flex items-center gap-1 ${
                versusEnabled
                  ? 'bg-rose-200 text-rose-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>⚔️</span>
              <span>{lang === 'en' ? 'Versus' : 'דו-קרב'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onVersusModeToggle(false);
                onCameraQuestToggle(true);
                setAddingPlayer(false);
              }}
              className={`px-3 py-1.5 rounded-full font-black text-xs transition-all cursor-pointer flex items-center gap-1 ${
                cameraQuestEnabled
                  ? 'bg-amber-200 text-amber-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>📸</span>
              <span>{lang === 'en' ? 'Camera' : 'ציד מצלמה'}</span>
            </button>
          </div>
        </div>

        {players.length === 0 ? (
          /* Empty State: Prompt to create the first player directly inline! */
          <div className="flex flex-col items-center text-center gap-4 py-4 max-w-xl mx-auto">
            <span className="text-6xl animate-bounce">👋</span>
            <h4 className="font-black text-2xl text-[#2D3436]">
              {lang === 'en' ? "Welcome! Let's Create Your Profile" : 'ברוכים הבאים! בואו ניצור פרופיל'}
            </h4>
            <p className="text-sm font-medium text-slate-500 mb-2">
              {lang === 'en'
                ? "To start playing, add your first player nickname. You can add more players anytime!"
                : "כדי להתחיל לשחק, אנא הוסף את שם השחקן הראשון שלך. תוכל להוסיף שחקנים נוספים בכל עת!"}
            </p>
            <div className="w-full">
              <InlineAddPlayerForm
                lang={lang}
                onSave={(name, age, avatar, profilePic, gender) => onRegisterPlayer(name, age, avatar, profilePic, gender, false)}
                onCancel={() => {}}
              />
            </div>
          </div>
        ) : (
          /* Unified active content layout */
          <div className="flex flex-col gap-4">
            
            {/* 1. Universal Minimalist Player Selection Row */}
            <div className="flex flex-col gap-2 text-left border-b border-slate-100 pb-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                👤 {lang === 'en' ? 'Who is playing?' : 'מי משחק כעת?'}
              </label>

              <div className="flex flex-wrap items-center gap-3">
                {players.map((p) => {
                  const isActive = activePlayer?.id === p.id;
                  const isOpponent = versusEnabled && versusOpponentId === p.id;
                  
                  return (
                    <div key={p.id} className="relative flex items-center">
                      <button
                        onClick={() => {
                          if (isOpponent) {
                            // Swap or deselect opponent to avoid duplicate
                            onVersusOpponentChange(null);
                          }
                          onSetActivePlayer(p.id);
                        }}
                        className={`pl-3 pr-9 py-2 rounded-2xl border-2 font-black text-sm flex items-center gap-2 transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#D2E3FC] border-[#74B9FF] text-[#0984E3] shadow-sm scale-102'
                            : isOpponent
                            ? 'bg-rose-100 border-rose-300 text-rose-600'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                        }`}
                      >
                        {p.profilePic ? (
                          <div className="w-6 h-6 rounded-full border border-current overflow-hidden shrink-0 bg-white flex items-center justify-center">
                            <img src={p.profilePic} alt={p.name} className="w-full h-full object-cover scale-x-[-1]" />
                          </div>
                        ) : (
                          <span className="text-xl">{p.avatar}</span>
                        )}
                        <span>{p.name}</span>
                        {isActive && <Check className="w-4 h-4 text-[#0984E3]" />}
                        {isOpponent && <span className="text-[10px] bg-rose-200 text-rose-700 px-1.5 py-0.5 rounded-full font-bold">VS</span>}
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          onDeletePlayer?.(p.id);
                        }}
                        className="absolute right-2 w-5 h-5 rounded-full bg-slate-200/80 hover:bg-rose-500 hover:text-white text-slate-500 flex items-center justify-center text-[9px] font-black cursor-pointer transition-all border border-slate-300/80 hover:border-rose-600 shadow-sm"
                        title={lang === 'en' ? 'Delete Player' : 'מחק שחקן'}
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}

                {!addingPlayer ? (
                  <button
                    onClick={() => setAddingPlayer(true)}
                    className="px-4 py-2 rounded-2xl border-2 border-dashed border-[#74B9FF] text-[#0984E3] bg-blue-50/50 hover:bg-blue-50 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>➕</span>
                    <span>{lang === 'en' ? 'Add Player' : 'שחקן חדש'}</span>
                  </button>
                ) : (
                  <div className="w-full max-w-sm mt-2">
                    <InlineAddPlayerForm
                      lang={lang}
                      onSave={handleSaveInlinePlayer}
                      onCancel={() => setAddingPlayer(false)}
                    />
                  </div>
                )}


              </div>
            </div>

            {/* 2. Mode Specific Config */}
            {!versusEnabled ? (
              /* --- SOLO MODE VIEW --- */
              activePlayer && (
                <div className="flex flex-col md:flex-row items-center gap-4 text-left bg-slate-50/80 p-3 sm:p-4 rounded-2xl border border-slate-200">
                  <div 
                    className="relative w-16 h-16 rounded-full border-4 border-[#74B9FF] bg-[#D2E3FC] flex items-center justify-center shrink-0 shadow-sm cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                    onClick={() => setShowAvatarModal(true)}
                    title={lang === 'en' ? 'Change Avatar' : 'החלפת דמות'}
                  >
                    {activePlayer.profilePic ? (
                      <img
                        src={activePlayer.profilePic}
                        alt={activePlayer.name}
                        className="w-full h-full object-cover scale-x-[-1] rounded-full"
                      />
                    ) : (
                      <span className="text-3xl">{activePlayer.avatar}</span>
                    )}
                  </div>

                  <div className="flex-grow w-full">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h4 className="font-black text-slate-800 text-lg">
                        {activePlayer.name}
                      </h4>
                      <button
                        onClick={() => handleAgeGroupCycle(activePlayer)}
                        className="px-2.5 py-0.5 bg-[#D2E3FC] text-[#0984E3] text-[11px] font-black rounded-full border border-[#74B9FF] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
                        title={lang === 'en' ? 'Click to change age group' : 'לחץ לשינוי קבוצת הגיל'}
                      >
                        {activePlayer.ageGroup === '5-7'
                          ? lang === 'en' ? 'Ages 5-7 🦖' : 'גילאי 5-7 🦖'
                          : activePlayer.ageGroup === '8-13'
                          ? lang === 'en' ? 'Ages 8-13 🚀' : 'גילאי 8-13 🚀'
                          : lang === 'en' ? 'Ages 13+ 🎓' : 'גילאי 13+ 🎓'}
                      </button>
                      <button
                        onClick={() => handleGenderToggle(activePlayer)}
                        className={`px-2.5 py-0.5 text-[11px] font-black rounded-full border hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm ${
                          activePlayer.gender === 'female'
                            ? 'bg-pink-100 border-pink-300 text-pink-600'
                            : 'bg-blue-100 border-blue-300 text-[#0984E3]'
                        }`}
                        title={lang === 'en' ? 'Click to change gender' : 'לחץ לשינוי מגדר'}
                      >
                        {activePlayer.gender === 'female'
                          ? lang === 'en' ? 'Girl 🙋‍♀️' : 'בת 🙋‍♀️'
                          : lang === 'en' ? 'Boy 🙋‍♂️' : 'בן 🙋‍♂️'}
                      </button>
                    </div>

                    {/* Progress goal tracker */}
                    <div className="w-full mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-[10px] text-[#0984E3] leading-none uppercase tracking-wider">
                          🌟 {lang === 'en' ? `Level ${(activePlayer.level || 1)}` : `רמה ${(activePlayer.level || 1)}`}
                        </span>
                        <span className="font-bold text-[10px] text-[#0984E3] leading-none">
                          {((activePlayer.xp || 0) % 250)} / 250 XP
                        </span>
                      </div>
                      <div className="h-3.5 w-full bg-slate-200 rounded-full overflow-hidden relative shadow-inner">
                        <div
                          className="h-full bg-[#74B9FF] rounded-full candy-stripe transition-all duration-500"
                          style={{ width: `${(((activePlayer.xp || 0) % 250) / 250) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : (
              /* --- VERSUS BATTLE VIEW --- */
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch relative">
                  
                  {/* Visual VS Badge Divider for Desktop */}
                  <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-rose-500 border-4 border-white text-white font-black text-xs items-center justify-center shadow-md z-10">
                    VS
                  </div>

                  {/* CHALLENGER 1 (ACTIVE PLAYER) */}
                  <div className="bg-slate-50/50 border-2 border-[#74B9FF]/40 rounded-2xl p-4 flex flex-col justify-between text-left">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                        🥊 {lang === 'en' ? 'Challenger 1' : 'מתמודד 1'}
                      </p>

                      {activePlayer ? (
                        <div className="bg-white border border-[#74B9FF]/20 rounded-xl p-3 flex items-center gap-3">
                          {activePlayer.profilePic ? (
                            <div className="w-10 h-10 rounded-full border-2 border-[#74B9FF]/20 overflow-hidden shrink-0 bg-slate-50 flex items-center justify-center">
                              <img src={activePlayer.profilePic} alt={activePlayer.name} className="w-full h-full object-cover scale-x-[-1]" />
                            </div>
                          ) : (
                            <span className="text-3xl shrink-0">{activePlayer.avatar}</span>
                          )}
                          <div className="min-w-0 flex-grow">
                            <p className="font-black text-[#2D3436] text-sm truncate">{activePlayer.name}</p>
                            <span className="text-[9px] font-black bg-[#74B9FF]/20 text-[#0984E3] px-2 py-0.5 rounded-full">
                              {activePlayer.ageGroup === '5-7' ? '5-7' : activePlayer.ageGroup === '8-13' ? '8-13' : '13+'}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-rose-500 font-bold">
                          {lang === 'en' ? 'Select a player above!' : 'בחרו שחקן מלמעלה!'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* CHALLENGER 2 */}
                  <div className="bg-slate-50/50 border-2 border-rose-200/60 rounded-2xl p-4 flex flex-col justify-between text-left">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                          🥊 {lang === 'en' ? 'Challenger 2' : 'מתמודד 2'}
                        </p>
                        {versusOpponentId && (
                          <button
                            onClick={() => onVersusOpponentChange(null)}
                            className="text-xs font-bold text-slate-400 hover:text-rose-600 cursor-pointer"
                          >
                            {lang === 'en' ? 'Clear' : 'הסר'}
                          </button>
                        )}
                      </div>

                      {versusOpponentId ? (
                        (() => {
                          const opp = players.find(p => p.id === versusOpponentId);
                          if (!opp) return null;
                          return (
                            <button
                              onClick={() => onVersusOpponentChange(null)}
                              className="w-full bg-white hover:bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-center gap-3 animate-fade-in transition-all cursor-pointer text-left active:scale-98"
                              title={lang === 'en' ? 'Click to change opponent' : 'לחצו כדי להחליף יריב'}
                            >
                              {opp.profilePic ? (
                                <div className="w-10 h-10 rounded-full border-2 border-rose-200 overflow-hidden shrink-0 bg-slate-50 flex items-center justify-center">
                                  <img src={opp.profilePic} alt={opp.name} className="w-full h-full object-cover scale-x-[-1]" />
                                </div>
                              ) : (
                                <span className="text-3xl shrink-0">{opp.avatar}</span>
                              )}
                              <div className="min-w-0 flex-grow">
                                <p className="font-black text-[#2D3436] text-sm truncate">{opp.name}</p>
                                <span className="text-[9px] font-black bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full">
                                  {opp.ageGroup === '5-7' ? '5-7' : opp.ageGroup === '8-13' ? '8-13' : '13+'}
                                </span>
                              </div>
                            </button>
                          );
                        })()
                      ) : (
                        <div className="flex flex-col gap-2">
                          <p className="text-xs text-rose-500 font-bold italic animate-pulse">
                            {lang === 'en' ? 'Challenger 2 not selected!' : 'מתמודד 2 לא נבחר!'}
                          </p>
                          
                          {/* Full-width player selection boxes */}
                          <div className="flex flex-col gap-2 mt-1">
                            {players.filter(p => p.id !== activePlayer?.id).map((p) => (
                              <button
                                key={p.id}
                                onClick={() => onVersusOpponentChange(p.id)}
                                className="w-full bg-white hover:bg-[#FFEAA7]/20 border border-slate-200 hover:border-[#F1C40F] rounded-xl p-3 flex items-center gap-3 transition-all text-left cursor-pointer active:scale-98 shadow-sm"
                              >
                                {p.profilePic ? (
                                  <div className="w-10 h-10 rounded-full border border-slate-200 overflow-hidden shrink-0 bg-slate-50 flex items-center justify-center">
                                    <img src={p.profilePic} alt={p.name} className="w-full h-full object-cover scale-x-[-1]" />
                                  </div>
                                ) : (
                                  <span className="text-3xl shrink-0">{p.avatar}</span>
                                )}
                                <div className="min-w-0 flex-grow">
                                  <p className="font-black text-[#2D3436] text-sm truncate">{p.name}</p>
                                  <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                                    {p.ageGroup === '5-7' ? '5-7' : p.ageGroup === '8-13' ? '8-13' : '13+'}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}


                    </div>
                  </div>

                </div>

                {/* Versus style details reminder */}
                <div className="mt-1 p-3.5 bg-amber-50/40 border border-dashed border-[#74B9FF] rounded-2xl flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-[#0984E3] gap-4">
                  <div className="flex items-center gap-2 text-left">
                    <span>⚡</span>
                    <span>
                      {versusModeStyle === 'time'
                        ? lang === 'en' 
                          ? `Duel Mode: Time Attack (${versusTimeLimit} seconds/turn)` 
                          : `סגנון דו-קרב: מרוץ נגד השעון (${versusTimeLimit} שניות לתור)`
                        : lang === 'en'
                          ? 'Duel Mode: Turn-by-Turn (1 question each per round)'
                          : 'סגנון דו-קרב: תור אחרי תור (שאלה אחת לכל שחקן בכל סיבוב)'}
                    </span>
                  </div>
                  <button
                    onClick={onOpenSettings}
                    className="text-[#0984E3] underline hover:text-[#74B9FF] cursor-pointer bg-transparent border-none font-bold shrink-0"
                  >
                    {lang === 'en' ? 'Change style in Settings' : 'שנו סגנון בהגדרות'}
                  </button>
                </div>
              </div>
            )}



            {/* Big primary button to proceed to Step 2: Topics Selection */}
            <div className="flex justify-center mt-4">
              <button
                onClick={handleContinueToTopics}
                className={`w-full sm:w-auto px-10 py-4 font-headline-md text-lg md:text-xl rounded-[24px] cursor-pointer transition-all duration-200 font-black text-center flex items-center justify-center gap-2 transform active:scale-98 hover:-translate-y-0.5 ${
                  isSetupValid
                    ? 'bg-gradient-to-r from-[#55EFC4] to-[#00B894] text-white border border-white/20 shadow-[0_10px_20px_-6px_rgba(0,184,148,0.4)] hover:shadow-[0_14px_24px_-4px_rgba(0,184,148,0.55)]'
                    : 'bg-slate-100 text-slate-400 border border-slate-200 opacity-60 cursor-not-allowed shadow-none'
                }`}
              >
                <span>{lang === 'en' ? 'Next: Choose Topic ➔' : 'לבחירת נושא המשחק ➔'}</span>
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
