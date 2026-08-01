const fs = require('fs');
let code = fs.readFileSync('src/components/MainMenu.tsx', 'utf8');

const regex = /interface InlineAddPlayerFormProps {[\s\S]*?<\/form>\s*\);?\s*}/;
const newCode = `interface InlineAddPlayerFormProps {
  lang: 'en' | 'he';
  onSave: (name: string, ageGroup: AgeGroup, avatar: string, profilePic: string | null) => void;
  onCancel: () => void;
}

function InlineAddPlayerForm({ lang, onSave, onCancel }: InlineAddPlayerFormProps) {
  const [name, setName] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('8-13');
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0]);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [useCamera, setUseCamera] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name.trim(), ageGroup, selectedAvatar, profilePic);
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
              className={\`py-2 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer \${
                ageGroup === group
                  ? 'bg-[#FFEAA7] border-[#FDCB6E] text-[#D35400] shadow-sm font-black'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }\`}
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
                className={\`w-10 h-10 rounded-full text-xl flex items-center justify-center transition-all cursor-pointer \${
                  selectedAvatar === avatar && !profilePic
                    ? 'bg-[#FFEAA7] border-2 border-[#FDCB6E] scale-110 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100'
                }\`}
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
}`;
code = code.replace(regex, newCode);
fs.writeFileSync('src/components/MainMenu.tsx', code);
