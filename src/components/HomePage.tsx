import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Shield, Globe, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 mb-8">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-700">Explora la Biodiversidad</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-emerald-950 mb-6 leading-[0.85]">
          La Selva <br />
          <span className="text-emerald-600">Vibrante</span>.
        </h1>
        
        <p className="text-xl text-emerald-900/60 mb-12 max-w-xl mx-auto leading-relaxed">
          Siente el pulso del Amazonas. Identifica especies exóticas y sumérgete en el mundo natural con tecnología de vanguardia.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/scanner"
            className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/30 group"
          >
            Comenzar Escaneo
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="/about"
            className="px-8 py-4 bg-white text-emerald-900 font-bold rounded-2xl border border-emerald-200 hover:bg-emerald-50 transition-all shadow-sm"
          >
            Nuestra Misión
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
        {[
          { icon: Shield, title: "Protección", text: "Fomentamos el cuidado de los ecosistemas locales." },
          { icon: Globe, title: "Conexión", text: "Puente entre la tecnología y la vida silvestre." },
          { icon: Heart, title: "Pasión", text: "Creado para los guardianes de la naturaleza." }
        ].map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="p-8 rounded-3xl bg-white/40 border border-emerald-100 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4 mx-auto text-emerald-600">
              <feat.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-emerald-900 mb-2">{feat.title}</h3>
            <p className="text-emerald-900/50 text-sm leading-relaxed">{feat.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
