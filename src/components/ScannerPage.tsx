import React, { useState } from 'react';
import { Camera, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { CameraScanner } from './CameraScanner.tsx';
import { ImageUploader } from './ImageUploader.tsx';
import { AnimalResult } from './AnimalResult.tsx';
import { LoadingState } from './LoadingState.tsx';
import { identifyAnimalFromImage, type AnimalInfo } from '@/src/services/geminiService.ts';

export function ScannerPage() {
  const [showScanner, setShowScanner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnimalInfo | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProcessImage = async (base64Image: string) => {
    setLoading(true);
    setError(null);
    setCurrentImage(base64Image);
    setShowScanner(false);

    try {
      const animalInfo = await identifyAnimalFromImage(base64Image);
      
      if (animalInfo) {
        setResult(animalInfo);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#059669', '#10b981', '#fbbf24']
        });
      } else {
        setError("No pudimos identificar un animal de la Amazonia en esta imagen. Por favor, intenta con otra foto.");
      }
    } catch (err) {
      setError("Hubo un error al procesar la imagen. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setCurrentImage(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <AnimatePresence mode="wait">
        {!result && !loading && (
          <motion.div
            key="controls"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-12"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold text-emerald-950 mb-4 tracking-tight">Identificador de Especies</h1>
              <p className="text-emerald-900/60 max-w-lg mx-auto">
                Captura una foto o sube una imagen para descubrir los secretos de la fauna amazónica.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowScanner(true)}
                className="flex flex-col items-center justify-center gap-4 p-10 rounded-[2.5rem] bg-emerald-600 text-white font-bold transition-all shadow-xl shadow-emerald-600/20 group"
              >
                <div className="p-4 rounded-3xl bg-white/20 group-hover:bg-white/30 transition-colors">
                  <Camera className="w-10 h-10" />
                </div>
                <div className="text-center">
                  <span className="block text-2xl tracking-tight">Cámara en Vivo</span>
                  <span className="text-emerald-100/60 text-xs uppercase tracking-widest mt-1">Scanner instantáneo</span>
                </div>
              </motion.button>

              <ImageUploader onUpload={handleProcessImage} isLoading={loading} />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-3xl bg-white border border-rose-100 flex items-center gap-4 text-rose-900 shadow-sm shadow-rose-100"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Lo sentimos</h4>
                  <p className="text-rose-950/60 text-sm">{error}</p>
                </div>
                <button 
                  onClick={() => setError(null)}
                  className="ml-auto p-2 hover:bg-rose-50 rounded-full text-rose-400"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {loading && <LoadingState key="loading" />}

        {result && currentImage && !loading && (
          <AnimalResult 
            key="result"
            animal={result} 
            image={currentImage} 
            onReset={handleReset} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScanner && (
          <CameraScanner 
            onCapture={handleProcessImage} 
            onClose={() => setShowScanner(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
