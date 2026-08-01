import { useState, useRef, useEffect } from "react";
import { Player } from "../types";
import { Sparkles, Music, Image as ImageIcon, ArrowLeft, Play, Pause, Download, Volume2, RefreshCw } from "lucide-react";

interface AICreativityHubProps {
  activePlayer: Player | null;
  lang: "en" | "he";
  onApplyProfilePic: (dataUrl: string) => void;
  onApplyBgMusic: (audioUrl: string, lyrics?: string) => void;
  onBack: () => void;
  currentBgMusicUrl: string | null;
  currentLyrics: string | null;
}

export default function AICreativityHub({
  activePlayer,
  lang,
  onApplyProfilePic,
  onApplyBgMusic,
  onBack,
  currentBgMusicUrl,
  currentLyrics,
}: AICreativityHubProps) {
  // Mascot Generator State
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageSize, setImageSize] = useState<"512px" | "1K" | "2K" | "4K">("1K");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  // Music Generator State
  const [musicPrompt, setMusicPrompt] = useState("");
  const [trackType, setTrackType] = useState<"short" | "long">("short");
  const [isGeneratingMusic, setIsGeneratingMusic] = useState(false);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null);
  const [generatedLyrics, setGeneratedLyrics] = useState<string | null>(null);
  const [musicError, setMusicError] = useState<string | null>(null);

  // Audio Playback
  const [isPlayingGenerated, setIsPlayingGenerated] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handlePlayToggle = () => {
    if (!generatedAudioUrl) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(generatedAudioUrl);
      audioRef.current.loop = true;
      audioRef.current.onended = () => setIsPlayingGenerated(false);
    }

    if (isPlayingGenerated) {
      audioRef.current.pause();
      setIsPlayingGenerated(false);
    } else {
      audioRef.current.play().catch(err => console.warn("Audio play failed:", err));
      setIsPlayingGenerated(true);
    }
  };

  // Image Generation API Request
  const handleGenerateMascot = async () => {
    if (!imagePrompt.trim()) return;
    setIsGeneratingImage(true);
    setImageError(null);
    setGeneratedImageUrl(null);

    try {
      const res = await fetch("/api/gemini/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `${imagePrompt}, cute 3D claymation cartoon mascot style, vibrant colorful, isolated, kid friendly, white background`,
          imageSize,
          aspectRatio,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to generate image");
      }

      setGeneratedImageUrl(data.imageUrl);
    } catch (err: any) {
      setImageError(err.message || "Something went wrong.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Music Generation API Request
  const handleGenerateMusic = async () => {
    if (!musicPrompt.trim()) return;
    setIsGeneratingMusic(true);
    setMusicError(null);
    setGeneratedAudioUrl(null);
    setGeneratedLyrics(null);
    setIsPlayingGenerated(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    try {
      const res = await fetch("/api/gemini/generate-music", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `${musicPrompt}, playful upbeat educational kid-safe game synth melody, background music theme`,
          trackType,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to generate music track.");
      }

      // Reconstruct blob on the client from base64 string
      const binary = atob(data.audioBase64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: data.mimeType || "audio/wav" });
      const audioUrl = URL.createObjectURL(blob);

      setGeneratedAudioUrl(audioUrl);
      if (data.lyrics) {
        setGeneratedLyrics(data.lyrics);
      }
    } catch (err: any) {
      setMusicError(err.message || "Failed to generate background music.");
    } finally {
      setIsGeneratingMusic(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-3 animate-pop" dir={lang === "he" ? "rtl" : "ltr"}>
      {/* Top Header Panel */}
      <div className="w-full flex justify-between items-center border-b border-slate-100 pb-2">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-5 h-5 text-[#FDCB6E] animate-pulse" />
          <h2 className="font-black text-lg sm:text-xl text-[#FF7675] uppercase">
            {lang === "en" ? "AI Creativity Hub" : "מרכז היצירה של AI"}
          </h2>
        </div>
        
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all border border-slate-300 shadow-xs cursor-pointer"
        >
          <ArrowLeft className={`w-3.5 h-3.5 ${lang === "he" ? "rotate-180" : ""}`} />
          <span>{lang === "en" ? "Menu" : "תפריט"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Module 1: Mascot Avatar Generator */}
        <div className="bg-white/50 border border-[#74B9FF]/30 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="p-1.5 bg-rose-100 rounded-lg text-rose-500 shrink-0">
                <ImageIcon className="w-4 h-4" />
              </span>
              <h3 className="text-xs sm:text-sm font-black text-slate-800">
                {lang === "en" ? "AI Mascot Creator" : "יוצר דמויות ומסקוטי AI"}
              </h3>
            </div>

            <p className="text-[10px] sm:text-xs font-bold text-slate-500 mb-2 leading-tight">
              {lang === "en"
                ? "Describe your dream mascot! Gemini will generate a custom profile picture."
                : "תארו דמות ויווצר לכם אווטאר מדליק שתוכלו להגדיר כתמונת פרופיל."}
            </p>

            {/* Prompt Input */}
            <div className="flex flex-col gap-1 mb-2.5">
              <textarea
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                placeholder={
                  lang === "en"
                    ? "e.g., A happy yellow sun wearing sunglasses, 3D claymation"
                    : "לדוגמה: שמש צהובה ושמחה עם משקפי שמש, תלת-מימד"
                }
                className="w-full p-2 bg-white/80 border border-slate-200 rounded-xl font-bold text-xs focus:outline-none focus:border-[#74B9FF] transition-all min-h-[44px] max-h-[44px] resize-none"
              />
            </div>

            {/* Size Selector Affordance */}
            <div className="flex flex-col gap-1 mb-2">
              <div className="grid grid-cols-3 gap-1">
                {(["1K", "2K", "4K"] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setImageSize(size)}
                    className={`py-1 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
                      imageSize === size
                        ? "bg-[#FFEAA7] border-[#FDCB6E] text-[#D35400] font-black shadow-xs"
                        : "bg-white/80 border-slate-200 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {size} {size === "1K" ? "⭐" : size === "2K" ? "🌟" : "🔥"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action and Output Zone */}
          <div className="pt-2 border-t border-slate-100/50 flex flex-col items-center">
            {isGeneratingImage ? (
              <div className="flex flex-col items-center gap-1.5 py-2 text-center">
                <RefreshCw className="w-5 h-5 text-[#74B9FF] animate-spin" />
                <span className="text-[10px] font-black text-[#0984E3] animate-pulse">
                  {lang === "en" ? "Sketching mascot..." : "מייצר דמות..."}
                </span>
              </div>
            ) : generatedImageUrl ? (
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#55EFC4] shadow-xs relative">
                  <img
                    src={generatedImageUrl}
                    alt="AI Generated Mascot"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <button
                  onClick={() => onApplyProfilePic(generatedImageUrl)}
                  className="px-4 py-1.5 bg-[#55EFC4] text-[#006241] border border-[#00B894]/50 rounded-lg font-black text-[10px] shadow-xs hover:scale-102 transition-all cursor-pointer"
                >
                  ✨ {lang === "en" ? "Apply as Profile Photo" : "הגדר כתמונת הפרופיל שלי"}
                </button>
              </div>
            ) : (
              <button
                disabled={!imagePrompt.trim()}
                onClick={handleGenerateMascot}
                className={`w-full py-2 rounded-xl border font-black text-xs transition-all cursor-pointer text-center ${
                  imagePrompt.trim()
                    ? "bg-[#FFEAA7] text-[#D35400] border-[#FDCB6E] shadow-xs hover:bg-[#ffeaa7]/90"
                    : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                }`}
              >
                🎨 {lang === "en" ? "Generate Mascot" : "צור תמונת מסקוט"}
              </button>
            )}

            {imageError && (
              <div className="mt-1.5 text-[10px] font-bold text-[#D63031] bg-rose-50 border border-rose-100 p-1.5 rounded-lg w-full text-center">
                ⚠️ {imageError}
              </div>
            )}
          </div>
        </div>

        {/* Module 2: Background Music Composer */}
        <div className="bg-white/50 border border-[#74B9FF]/30 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="p-1.5 bg-indigo-100 rounded-lg text-indigo-500 shrink-0">
                <Music className="w-4 h-4" />
              </span>
              <h3 className="text-xs sm:text-sm font-black text-slate-800">
                {lang === "en" ? "AI Music Composer" : "מלחין מוזיקת רקע AI"}
              </h3>
            </div>

            <p className="text-[10px] sm:text-xs font-bold text-slate-500 mb-2 leading-tight">
              {lang === "en"
                ? "Describe the style of background music you want! Lyria will compose a track."
                : "תארו סגנון מוזיקה ובינה מלאכותית תלחין קטע רקע ייחודי למשחק."}
            </p>

            {/* Prompt Input */}
            <div className="flex flex-col gap-1 mb-2.5">
              <textarea
                value={musicPrompt}
                onChange={(e) => setMusicPrompt(e.target.value)}
                placeholder={
                  lang === "en"
                    ? "e.g., Happy toy synthesizer bells and upbeat soft drums"
                    : "לדוגמה: פעמוני סינתיסייזר שמחים של צעצועים ותופים רכים"
                }
                className="w-full p-2 bg-white/80 border border-slate-200 rounded-xl font-bold text-xs focus:outline-none focus:border-[#74B9FF] transition-all min-h-[44px] max-h-[44px] resize-none"
              />
            </div>

            {/* Length Style Selector */}
            <div className="flex flex-col gap-1 mb-2">
              <div className="grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={() => setTrackType("short")}
                  className={`py-1 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
                    trackType === "short"
                      ? "bg-[#FFEAA7] border-[#FDCB6E] text-[#D35400] font-black shadow-xs"
                      : "bg-white/80 border-slate-200 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  ⚡ {lang === "en" ? "Short (30s)" : "קטע קצר"}
                </button>
                <button
                  type="button"
                  onClick={() => setTrackType("long")}
                  className={`py-1 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
                    trackType === "long"
                      ? "bg-[#FFEAA7] border-[#FDCB6E] text-[#D35400] font-black shadow-xs"
                      : "bg-white/80 border-slate-200 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  🎵 {lang === "en" ? "Full Song" : "שיר מלא"}
                </button>
              </div>
            </div>
          </div>

          {/* Action and Output Zone */}
          <div className="pt-2 border-t border-slate-100/50 flex flex-col items-center">
            {isGeneratingMusic ? (
              <div className="flex flex-col items-center gap-1.5 py-2 text-center">
                <RefreshCw className="w-5 h-5 text-[#74B9FF] animate-spin" />
                <span className="text-[10px] font-black text-[#0984E3] animate-pulse">
                  {lang === "en" ? "Composing theme track..." : "מלחין מוזיקה..."}
                </span>
              </div>
            ) : generatedAudioUrl ? (
              <div className="flex flex-col items-center gap-1.5 w-full">
                <div className="flex items-center gap-2 bg-indigo-50/50 border border-indigo-100 p-2 rounded-xl w-full justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <button
                      onClick={handlePlayToggle}
                      className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-600 transition-all shadow-xs shrink-0"
                    >
                      {isPlayingGenerated ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                    </button>
                    <div className="min-w-0">
                      <h4 className="font-black text-slate-800 text-[10px] truncate">
                        {lang === "en" ? "My Custom AI Track" : "הלחן הבלעדי שלי"}
                      </h4>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onApplyBgMusic(generatedAudioUrl, generatedLyrics || undefined)}
                  className="px-4 py-1.5 bg-[#55EFC4] text-[#006241] border border-[#00B894]/50 rounded-lg font-black text-[10px] shadow-xs hover:scale-102 transition-all cursor-pointer"
                >
                  🎹 {lang === "en" ? "Apply as Background Music" : "הגדר כמוזיקת רקע"}
                </button>
              </div>
            ) : (
              <button
                disabled={!musicPrompt.trim()}
                onClick={handleGenerateMusic}
                className={`w-full py-2 rounded-xl border font-black text-xs transition-all cursor-pointer text-center ${
                  musicPrompt.trim()
                    ? "bg-[#FFEAA7] text-[#D35400] border-[#FDCB6E] shadow-xs hover:bg-[#ffeaa7]/90"
                    : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                }`}
              >
                🎵 {lang === "en" ? "Compose Music" : "הלחן מוזיקה בלעדית"}
              </button>
            )}

            {musicError && (
              <div className="mt-1.5 text-[10px] font-bold text-[#D63031] bg-rose-50 border border-rose-100 p-1.5 rounded-lg w-full text-center">
                ⚠️ {musicError}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
