import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative mb-10">
        {/* Pulsing rings */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-emerald-500/10"
        />
        
        <div className="relative w-24 h-24 rounded-full bg-white border border-emerald-200 flex items-center justify-center shadow-2xl shadow-emerald-500/10">
          <Leaf className="w-10 h-10 text-emerald-600 animate-pulse" />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-emerald-950 mb-3 tracking-tight">
        Escuchando la Selva...
      </h2>
      <p className="text-emerald-700/60 font-bold tracking-widest uppercase text-[10px] animate-bounce">
        Identificando fauna amazónica
      </p>
      
      <div className="mt-12 w-48 h-1.5 bg-emerald-100 rounded-full overflow-hidden text-center">
        <motion.div
          animate={{ x: [-200, 200] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1/2 h-full bg-emerald-600 shadow-[0_0_10px_rgba(5,150,105,0.4)]"
        />
      </div>
    </div>
  );
}
