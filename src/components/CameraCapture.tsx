import { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, AlertCircle, Smile } from 'lucide-react';

interface CameraCaptureProps {
  onPhotoCaptured: (photoDataUrl: string | null) => void;
  lang: 'en' | 'he';
}

export default function CameraCapture({ onPhotoCaptured, lang }: CameraCaptureProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [permissionState, setPermissionState] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startCamera = async () => {
    setError(null);
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 320, facingMode: 'user' },
        audio: false
      });
      
      setStream(mediaStream);
      setPermissionState('granted');
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setPermissionState('denied');
      setError(
        lang === 'en'
          ? 'Could not access the camera. Please make sure camera permissions are enabled in your browser, or select a fun avatar below!'
          : 'לא הצלחנו לגשת למצלמה. אנא ודאו שאישורי המצלמה מופעלים בדפדפן שלכם, או בחרו דמות משחק למטה!'
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    // Start camera automatically when permission state is prompt/granted
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Draw the current video frame onto the canvas
        canvas.width = 300;
        canvas.height = 300;
        
        // Mirror the image for a natural selfie feel
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setCapturedPhoto(dataUrl);
        onPhotoCaptured(dataUrl);
        stopCamera();
      }
    }
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    onPhotoCaptured(null);
    startCamera();
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary shadow-[0_4px_0_0_rgba(0,38,132,1)] bg-surface-variant overflow-hidden flex items-center justify-center">
        {capturedPhoto ? (
          <img
            src={capturedPhoto}
            alt="Captured profile"
            className="w-full h-full object-cover"
          />
        ) : error ? (
          <div className="p-4 text-center flex flex-col items-center gap-1">
            <Smile className="w-12 h-12 text-primary animate-bounce" />
            <p className="text-xs text-on-surface-variant font-label-bold">
              {lang === 'en' ? 'Camera Offline' : 'המצלמה כבויה'}
            </p>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]"
          />
        )}

        {/* Decorative corner flash */}
        <div className="absolute top-2 left-4 w-4 h-4 bg-white/40 rounded-full" />
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="flex gap-2">
        {!capturedPhoto && !error && (
          <button
            type="button"
            onClick={takePhoto}
            className="flex items-center gap-2 px-md py-2 bg-secondary-container text-on-secondary-container border-2 border-secondary rounded-full font-label-bold hover:scale-105 active:translate-y-1 shadow-[0_2px_0_0_rgba(110,92,0,1)] transition-all cursor-pointer"
          >
            <Camera className="w-5 h-5" />
            <span>{lang === 'en' ? 'Snap Photo!' : 'צילום תמונה!'}</span>
          </button>
        )}

        {capturedPhoto && (
          <button
            type="button"
            onClick={retakePhoto}
            className="flex items-center gap-2 px-md py-2 bg-primary-fixed text-on-primary-fixed border-2 border-primary rounded-full font-label-bold hover:scale-105 active:translate-y-1 shadow-[0_2px_0_0_rgba(0,38,132,1)] transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{lang === 'en' ? 'Retake' : 'צילום מחדש'}</span>
          </button>
        )}

        {error && (
          <button
            type="button"
            onClick={startCamera}
            className="flex items-center gap-2 px-md py-2 bg-secondary-container text-on-secondary-container border-2 border-secondary rounded-full font-label-bold hover:scale-105 active:translate-y-1 shadow-[0_2px_0_0_rgba(110,92,0,1)] transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
            <span>{lang === 'en' ? 'Retry Camera' : 'נסה שוב'}</span>
          </button>
        )}
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container border-2 border-error p-2 rounded-lg text-xs font-medium max-w-xs text-center flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
