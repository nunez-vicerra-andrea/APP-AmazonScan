import React from 'react';
import { Camera, RefreshCw, X } from 'lucide-react';
import Webcam from 'react-webcam';
import { cn } from '@/src/lib/utils';

interface CameraScannerProps {
  onCapture: (image: string) => void;
  onClose: () => void;
}

export function CameraScanner({ onCapture, onClose }: CameraScannerProps) {
  const webcamRef = React.useRef<Webcam>(null);
  const [isCameraReady, setIsCameraReady] = React.useState(false);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [webcamRef, onCapture]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-lg aspect-[3/4] rounded-3xl overflow-hidden border-2 border-emerald-500/30">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: 'environment',
            aspectRatio: 3/4
          }}
          onUserMedia={() => setIsCameraReady(true)}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay scanning lines */}
        <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-0.5 bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] animate-[scan_3s_ease-in-out_infinite]" />
        
        {!isCameraReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80">
            <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
            <span className="ml-3 text-emerald-500 font-medium tracking-tight">Abriendo cámara...</span>
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-6 items-center">
        <button
          onClick={onClose}
          className="p-4 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <button
          onClick={capture}
          disabled={!isCameraReady}
          className={cn(
            "p-6 rounded-full transition-all transform active:scale-95",
            isCameraReady 
              ? "bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]" 
              : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
          )}
        >
          <Camera className="w-8 h-8" />
        </button>
      </div>

      <p className="mt-6 text-emerald-500/70 text-sm font-medium tracking-wide uppercase">
        Encuadra al animal y captura
      </p>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0%, 100% { top: 10%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}} />
    </div>
  );
}
