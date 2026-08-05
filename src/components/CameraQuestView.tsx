import { useState, useEffect, useRef } from 'react';
import { Camera, RefreshCw, AlertCircle, Smile, Volume2, ArrowRight, Sparkles, CheckCircle2, Home } from 'lucide-react';
import { Player, Language } from '../types';
import { CameraQuest } from '../quests';
import { motion, AnimatePresence } from 'motion/react';

interface CameraQuestViewProps {
  activePlayer: Player;
  quests: CameraQuest[];
  lang: Language;
  soundOn: boolean;
  onFinish: (score: number) => void;
  onExit: () => void;
  currentRound: number;
}

export default function CameraQuestView({
  activePlayer,
  quests,
  lang,
  soundOn,
  onFinish,
  onExit,
  currentRound
}: CameraQuestViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  
  // Verification states
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasVerified, setHasVerified] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [explanation, setExplanation] = useState<string>('');
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const currentQuest = quests[currentIndex];
  const totalQuests = quests.length;

  const speakText = (text: string, isRateSlower: boolean = false) => {
    if (!soundOn || typeof window === 'undefined' || !window.speechSynthesis) return null;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const isHe = lang === 'he';
      utterance.lang = isHe ? 'he-IL' : 'en-US';
      utterance.rate = isRateSlower ? 0.95 : 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.toLowerCase().includes(isHe ? 'he' : 'en')) ||
                    voices.find(v => v.lang.toLowerCase().startsWith(isHe ? 'he' : 'en'));
      if (voice) {
        utterance.voice = voice;
      }
      window.speechSynthesis.speak(utterance);
      return utterance;
    } catch (err) {
      console.warn('Speech synthesis failed:', err);
      return null;
    }
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 480 }, 
          height: { ideal: 480 }, 
          facingMode: facingMode 
        },
        audio: false
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError(
        lang === 'en'
          ? 'Could not access the camera. Please make sure camera permissions are enabled in your browser.'
          : 'לא הצלחנו לגשת למצלמה. אנא ודאו שאישורי המצלמה מופעלים בדפדפן שלכם.'
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  // Flip camera between front (user) and rear (environment)
  const toggleCamera = () => {
    setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = 400;
        canvas.height = 400;
        
        // Mirror the image only if we are using the selfie front camera
        if (facingMode === 'user') {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
        }
        
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setCapturedPhoto(dataUrl);
        stopCamera();
      }
    }
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    setHasVerified(false);
    setIsCorrect(null);
    setExplanation('');
    setVerifyError(null);
    startCamera();
  };

  const narrateQuest = () => {
    if (!soundOn || !currentQuest) return;
    const text = lang === 'he' ? currentQuest.promptHe : currentQuest.promptEn;
    const utterance = speakText(text, true);
    if (utterance) speechRef.current = utterance;
  };

  // Start camera on mount & whenever facingMode changes
  useEffect(() => {
    if (!capturedPhoto) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [facingMode]);

  // Handle narration when current quest changes
  useEffect(() => {
    setCapturedPhoto(null);
    setHasVerified(false);
    setIsCorrect(null);
    setExplanation('');
    setVerifyError(null);
    
    // Automatically switch facingMode based on quest type
    // If it's a selfie expression quest, default to 'user'
    // Otherwise default to 'environment'
    if (currentQuest) {
      if (currentQuest.type === 'expression') {
        setFacingMode('user');
      } else {
        setFacingMode('environment');
      }
    }
    
    setTimeout(() => {
      narrateQuest();
    }, 500);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [currentIndex, lang]);

  const handleVerify = async () => {
    if (!capturedPhoto) return;
    setIsVerifying(true);
    setVerifyError(null);

    try {
      const questText = lang === 'he' ? currentQuest.promptHe : currentQuest.promptEn;
      const response = await fetch('/api/gemini/verify-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: capturedPhoto,
          questText,
          language: lang,
          gender: activePlayer.gender || 'male'
        })
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to analyze capture');
      }

      setIsCorrect(data.isCorrect);
      setExplanation(data.explanation);
      setHasVerified(true);

      if (data.isCorrect) {
        setScore(prev => prev + 1);
        speakText(data.explanation || (lang === 'he' ? 'צדקת! כל הכבוד!' : 'Correct! Great job!'), false);
      } else {
        speakText(data.explanation || (lang === 'he' ? 'לא בדיוק, כדאי לנסות שוב!' : 'Not quite, try again!'), false);
      }
    } catch (err: any) {
      console.error(err);
      setVerifyError(err.message || 'An error occurred during verification.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleNextQuest = () => {
    if (currentIndex + 1 < totalQuests) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onFinish(score);
    }
  };

  const progressPercentage = ((currentIndex + 1) / totalQuests) * 100;

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-2 relative">
      {/* Progress and Score Header */}
      <div className="w-full flex items-center justify-between gap-3 bg-white/50 backdrop-blur-sm px-3 py-2 rounded-2xl border border-[#74B9FF]/20 shadow-sm">
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => { stopCamera(); onExit(); }}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-50 border border-[#74B9FF]/50 flex items-center justify-center cursor-pointer text-sm shadow-xs transition-transform hover:scale-110"
            title={lang === 'en' ? 'Main Menu' : 'תפריט ראשי'}
          >
            🏠
          </button>
        </div>

        <span className="font-bold text-[#FF7675] text-xs sm:text-sm whitespace-nowrap">
          {lang === 'en'
            ? `Camera Quest • Q ${currentIndex + 1}/${totalQuests}`
            : `ציד מצלמה • משימה ${currentIndex + 1}/${totalQuests}`}
        </span>

        <div className="flex-grow max-w-[140px] sm:max-w-[220px] h-3 bg-slate-100 rounded-full border border-[#74B9FF] overflow-hidden">
          <div
            className="h-full bg-[#55EFC4] candy-stripe rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <span className="text-xs font-bold text-[#0984E3] shrink-0 whitespace-nowrap bg-[#D2E3FC]/60 px-2.5 py-1 rounded-full border border-[#74B9FF]/40">
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
          {/* Quest Question Card */}
          <div className="w-full bg-white/80 backdrop-blur-sm border-2 border-[#74B9FF]/50 rounded-3xl p-4 flex flex-col items-center text-center relative mt-4 shadow-sm">
            {/* Quest Type Ribbon */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF7675] text-white px-5 py-1 rounded-full border-2 border-white font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-sm">
              {lang === 'en' ? 'CAMERA QUEST' : 'משימת מצלמה'}
            </div>

            <div className="w-full flex justify-between items-center gap-4 mb-4 mt-2">
              <div className="w-8 h-8" />
              <button
                onClick={narrateQuest}
                className="w-10 h-10 rounded-full border border-[#74B9FF] bg-blue-50 hover:bg-blue-100 flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 shadow-sm shrink-0"
                title={lang === 'en' ? 'Listen' : 'הקשב למשימה'}
              >
                <Volume2 className="w-5 h-5 text-[#0984E3]" />
              </button>
            </div>

            <h2 className="font-headline-md text-xl sm:text-2xl text-[#2D3436] font-black mb-4">
              {lang === 'en' ? currentQuest.promptEn : currentQuest.promptHe}
            </h2>

            {/* Live Camera Feed or Image Preview */}
            <div className="relative w-full max-w-[340px] aspect-square rounded-[32px] border-4 border-[#74B9FF] bg-slate-100 overflow-hidden shadow-chunky-blue flex items-center justify-center">
              {capturedPhoto ? (
                <img
                  src={capturedPhoto}
                  alt="Captured quest look"
                  className="w-full h-full object-cover"
                />
              ) : cameraError ? (
                <div className="p-6 text-center flex flex-col items-center gap-2">
                  <AlertCircle className="w-12 h-12 text-[#FF7675] animate-pulse" />
                  <p className="text-sm text-slate-500 font-bold leading-normal">
                    {cameraError}
                  </p>
                  <button
                    onClick={startCamera}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-full font-bold text-xs hover:bg-blue-600 active:translate-y-0.5 transition-all shadow-sm cursor-pointer"
                  >
                    {lang === 'en' ? 'Retry Camera' : 'נסה שוב'}
                  </button>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                  />
                  {/* Overlay Corner Flash */}
                  <div className="absolute top-4 left-4 w-6 h-6 bg-white/40 rounded-full blur-[1px]" />
                </div>
              )}
            </div>

            <canvas ref={canvasRef} className="hidden" />

            {/* Verification Loading / Results */}
            <div className="w-full max-w-md mt-4">
              {isVerifying && (
                <div className="flex flex-col items-center gap-2 py-4 animate-pulse">
                  <RefreshCw className="w-8 h-8 text-[#0984E3] animate-spin" />
                  <p className="font-bold text-sm text-[#0984E3]">
                    {lang === 'en' ? 'Gemini is analyzing your photo...' : 'ג׳מיני מנתח את התמונה שלך...'}
                  </p>
                </div>
              )}

              {verifyError && (
                <div className="bg-red-50 border-2 border-red-300 text-red-800 p-3 rounded-2xl text-xs font-bold flex items-center gap-2 max-w-sm mx-auto my-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{verifyError}</span>
                </div>
              )}

              {hasVerified && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-2xl border-4 text-center my-2 max-w-lg mx-auto ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  <h4 className="font-black text-base mb-1.5 flex items-center justify-center gap-1.5">
                    {isCorrect ? (
                      <>
                        <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500 animate-bounce" />
                        <span>{lang === 'en' ? 'Amazing! Correct!' : 'מדהים! נכון מאוד!'}</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-rose-500" />
                        <span>{lang === 'en' ? 'Not Quite!' : 'לא בדיוק!'}</span>
                      </>
                    )}
                  </h4>
                  <p className="text-sm font-bold leading-normal">
                    {explanation}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Interaction Buttons Row */}
            <div className="flex flex-wrap justify-center gap-3 mt-4 w-full">
              {!capturedPhoto && !cameraError && (
                <div className="flex gap-2">
                  <button
                    onClick={takePhoto}
                    className="px-6 py-3 bg-[#55EFC4] text-[#006241] border-2 border-[#00B894] rounded-full font-black text-sm md:text-base hover:scale-105 active:translate-y-0.5 shadow-sm transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    <span>{lang === 'en' ? 'Snap Photo!' : 'צלמו תמונה!'}</span>
                  </button>

                  <button
                    onClick={toggleCamera}
                    className="p-3 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-700 rounded-full font-bold hover:scale-105 active:translate-y-0.5 shadow-sm transition-all cursor-pointer flex items-center justify-center"
                    title={lang === 'en' ? 'Flip Camera' : 'החלף מצלמה'}
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
              )}

              {capturedPhoto && !isVerifying && !hasVerified && (
                <div className="flex gap-3">
                  <button
                    onClick={retakePhoto}
                    className="px-5 py-2.5 bg-slate-100 text-slate-700 border-2 border-slate-300 rounded-full font-bold text-sm hover:scale-105 active:translate-y-0.5 shadow-sm transition-all cursor-pointer"
                  >
                    {lang === 'en' ? 'Retake' : 'צילום מחדש'}
                  </button>

                  <button
                    onClick={handleVerify}
                    className="px-6 py-2.5 bg-[#74B9FF] text-white border-2 border-[#0984E3] rounded-full font-black text-sm hover:scale-105 active:translate-y-0.5 shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Verify Capture' : 'בדקו את התמונה'}</span>
                  </button>
                </div>
              )}

              {hasVerified && (
                <div className="flex gap-3">
                  {!isCorrect && (
                    <button
                      onClick={retakePhoto}
                      className="px-5 py-2.5 bg-slate-100 text-slate-700 border-2 border-slate-300 rounded-full font-bold text-sm hover:scale-105 active:translate-y-0.5 shadow-sm transition-all cursor-pointer"
                    >
                      {lang === 'en' ? 'Try Again' : 'נסו שוב'}
                    </button>
                  )}

                  <button
                    onClick={handleNextQuest}
                    className="px-6 py-2.5 bg-[#FF7675] text-white border-2 border-white/20 rounded-full font-black text-sm hover:scale-105 active:translate-y-0.5 shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{lang === 'en' ? 'Continue' : 'המשך'}</span>
                    <ArrowRight className={`w-4 h-4 ${lang === 'he' ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
