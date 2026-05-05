/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Camera, Info, Home, Leaf } from 'lucide-react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { HomePage } from './components/HomePage.tsx';
import { AboutPage } from './components/AboutPage.tsx';
import { ScannerPage } from './components/ScannerPage.tsx';
import { cn } from './lib/utils.ts';

function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Inicio' },
    { path: '/scanner', icon: Camera, label: 'Scanner' },
    { path: '/about', icon: Info, label: 'Info' },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-md">
      <div className="flex items-center justify-around gap-2 p-2 bg-white/60 backdrop-blur-2xl rounded-3xl border border-emerald-100 shadow-2xl">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-500",
                isActive 
                  ? "bg-emerald-600 text-white font-bold shadow-[0_10px_20px_rgba(5,150,105,0.2)]" 
                  : "text-emerald-800/50 hover:text-emerald-800"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className={cn(
                "hidden md:block overflow-hidden transition-all duration-500",
                isActive ? "max-w-20 opacity-100" : "max-w-0 opacity-0"
              )}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-glow"
                  className="absolute inset-0 rounded-2xl bg-emerald-400 blur-sm -z-10 opacity-20"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-emerald-50 text-emerald-950 selection:bg-emerald-200 selection:text-emerald-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/60 backdrop-blur-md border-b border-emerald-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-600/20">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-emerald-900">Amazonia<span className="text-emerald-600">Explorer</span></span>
          </Link>
          
          <div className="hidden sm:flex items-center gap-10">
            <Link to="/" className="text-sm font-semibold text-emerald-800 hover:text-emerald-600 transition-colors">Inicio</Link>
            <Link to="/scanner" className="text-sm font-semibold text-emerald-800 hover:text-emerald-600 transition-colors">Scanner</Link>
            <Link to="/about" className="text-sm font-semibold text-emerald-800 hover:text-emerald-600 transition-colors">Información</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-32 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/scanner" element={<ScannerPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Navigation />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

