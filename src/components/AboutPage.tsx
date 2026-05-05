import React from 'react';
import { motion } from 'motion/react';
import { Info, Mail, Github, Heart, ShieldAlert, BookOpen } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <section className="text-center">
          <h1 className="text-5xl font-bold text-emerald-950 mb-6 tracking-tight">Sobre Amazonia Explorer</h1>
          <p className="text-lg text-emerald-900/60 leading-relaxed">
            Nuestra misión es utilizar la tecnología más avanzada para conectar a las personas con la naturaleza, 
            estamos enfocados en la preservación y el conocimiento de la fauna de la Amazonia.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-emerald-100 shadow-sm">
            <BookOpen className="w-8 h-8 text-emerald-600 mb-4" />
            <h3 className="text-xl font-bold text-emerald-950 mb-3">Educación</h3>
            <p className="text-emerald-900/50 text-sm leading-relaxed">
              Creemos que el conocimiento es el primer paso para la conservación. Al aprender sobre los animales, 
              creamos conciencia sobre su importancia.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-emerald-100 shadow-sm">
            <ShieldAlert className="w-8 h-8 text-amber-500 mb-4" />
            <h3 className="text-xl font-bold text-emerald-950 mb-3">Conservación</h3>
            <p className="text-emerald-900/50 text-sm leading-relaxed">
              Apoyamos el ecoturismo responsable y la protección de los hábitats naturales. 
              Recuerda siempre respetar la fauna silvestre.
            </p>
          </div>
        </div>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-emerald-900">¿Cómo funciona?</h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-600 font-bold">1</div>
              <p className="text-emerald-900/70 pt-1">Capturamos una imagen clara del animal utilizando tu cámara o subiendo un archivo.</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-600 font-bold">2</div>
              <p className="text-emerald-900/70 pt-1">Procesamos la imagen con inteligencia artificial avanzada para identificar la especie.</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-600 font-bold">3</div>
              <p className="text-emerald-900/70 pt-1">Generamos un reporte detallado con datos científicos, curiosidades y estado de conservación.</p>
            </div>
          </div>
        </section>

        <section className="p-10 rounded-[3rem] bg-emerald-600 text-white text-center shadow-2xl shadow-emerald-600/30">
          <Heart className="w-12 h-12 mb-6 mx-auto" />
          <h2 className="text-3xl font-bold mb-4">Ayúdanos a crecer</h2>
          <p className="font-medium mb-8 opacity-80">
            Comparte tus hallazgos y ayúdanos a mejorar el reconocimiento de especies.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:info@amazonia.exp" className="px-6 py-3 bg-white text-emerald-600 rounded-xl font-bold text-sm flex items-center gap-2">
              <Mail className="w-4 h-4" /> Contacto
            </a>
            <a href="#" className="px-6 py-3 bg-emerald-700 text-white rounded-xl font-bold text-sm flex items-center gap-2">
              <Github className="w-4 h-4" /> Código
            </a>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
