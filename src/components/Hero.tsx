import React from 'react';
import { CornerDownRight } from 'lucide-react';
// @ts-ignore
import developerPortrait from '../assets/images/regenerated_image_1781381857849.png';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[90vh] pt-32 pb-20 flex items-center overflow-hidden bg-zinc-950">
      {/* Background radial soft ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-violet-600/5 rounded-full glow-blur -z-10"></div>
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center justify-center">
          
          {/* Left Side: Elegant Portrait Photo */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="relative group max-w-xs sm:max-w-sm w-full">
              {/* Decorative minimal border behind portrait */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-violet-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur" />
              
              <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900 shadow-2xl transition-all duration-500 hover:scale-[1.01]">
                <img
                  src={developerPortrait}
                  alt="Aatif Khan Portrait"
                  className="w-full h-[430.531px] object-cover transition-all duration-700 ease-in-out"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Clean 3-4 line Greeting */}
          <div className="md:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              {/* h1 heading block */}
              <h1 className="text-[32px] font-bold tracking-tight text-white leading-tight font-sans">
                Hi, I'm Aatif
              </h1>
              
              <p className="text-zinc-400 text-[18px] font-light leading-relaxed max-w-xl">
                I design and build highly optimized, secure AI systems that think and solve in production
              </p>
            </div>

            {/* Micro-call-to-actions to keep it absolutely clean */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-zinc-900/60">
              <span
                onClick={() => {
                  onNavigate('projects');
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2 text-xs font-mono text-zinc-400 hover:text-white transition-all cursor-pointer group"
              >
                <CornerDownRight className="w-3.5 h-3.5 text-violet-400 group-hover:translate-x-1 transition-transform" />
                <span>Browse catalog</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
