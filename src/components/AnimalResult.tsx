import { motion } from 'motion/react';
import { Leaf, Info, ShieldCheck, Heart, ArrowLeft, Layers } from 'lucide-react';
import type { AnimalInfo } from '@/src/services/geminiService';

interface AnimalResultProps {
  animal: AnimalInfo;
  image: string;
  onReset: () => void;
}

export function AnimalResult({ animal, image, onReset }: AnimalResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8 pb-20"
    >
      {/* Back Button */}
      <button
        onClick={onReset}
        className="flex items-center gap-2 text-emerald-600 hover:text-emerald-500 transition-colors group mb-4"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold tracking-tight uppercase text-sm">Identificar otro</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Image Card */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white shadow-emerald-900/10">
            <img 
              src={image} 
              alt={animal.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-full uppercase tracking-widest mb-3 inline-block shadow-lg">
                Identificado con éxito
              </span>
              <h1 className="text-4xl font-bold text-white tracking-tight leading-tight">
                {animal.name}
              </h1>
              <p className="text-emerald-300 italic font-medium mt-1">
                {animal.scientificName}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-600 mb-1">
                <Layers className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800/50">Dieta</span>
              </div>
              <p className="text-emerald-950 font-bold capitalize">{animal.diet}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-sm">
              <div className="flex items-center gap-2 text-rose-500 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-rose-800/50">Estado</span>
              </div>
              <p className="text-emerald-950 font-bold capitalize">{animal.conservationStatus}</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-8">
          <section className="p-8 rounded-[2rem] bg-white border border-emerald-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Info className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-emerald-950 tracking-tight">Descripción</h2>
            </div>
            <p className="text-emerald-900/70 leading-relaxed text-lg">
              {animal.description}
            </p>
          </section>

          <section className="p-8 rounded-[2rem] bg-emerald-600 text-white shadow-xl shadow-emerald-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Hábitat Natural</h2>
            </div>
            <p className="text-emerald-50 leading-relaxed font-medium">
              {animal.habitat}
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Heart className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-emerald-950 tracking-tight">Curiosidades</h2>
            </div>
            <ul className="grid gap-4">
              {animal.curiosities.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="p-5 rounded-2xl bg-white border border-amber-100 text-emerald-950/80 leading-snug font-medium shadow-sm"
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-400 mr-3" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
