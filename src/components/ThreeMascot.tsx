import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

interface ThreeMascotProps {
  className?: string;
  isCelebrating?: boolean;
}

export default function ThreeMascot({ className = '', isCelebrating = false }: ThreeMascotProps) {
  // Respecting Kotlin: Modifier.background(Color.LIGHT_GRAY), plus adding rounded borders and playful outline
  return (
    <div 
      className={`w-full h-full bg-slate-200/80 rounded-3xl overflow-hidden flex items-center justify-center p-1 border-4 border-[#74B9FF] shadow-inner transition-transform duration-300 ${
        isCelebrating ? 'animate-bounce' : 'hover:scale-102'
      } ${className}`}
    >
      <DotLottiePlayer
        src="https://lottie.host/0e9049c9-4048-45c7-a36a-6586ef6a4ac9/nrIukPh25y.lottie"
        autoplay
        loop
        speed={3}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
