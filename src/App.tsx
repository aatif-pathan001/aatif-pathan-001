import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import AIExpertiseTree from './components/AIExpertiseTree';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import { Terminal, Github, Cpu, Linkedin, Globe, Sparkles } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['hero', 'about', 'expertise', 'projects', 'blog', 'contact'];
      let currentSection = 'hero';

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // The last section that scrolled past our trigger threshold (200px from top) is active
          if (rect.top <= 200) {
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once at start to adjust correct section
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen text-zinc-100 flex flex-col justify-between bg-zinc-950">
      {/* Dynamic background lights */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-gradient-to-b from-violet-900/10 via-zinc-950/0 to-transparent pointer-events-none -z-10" />

      {/* Header Navigation */}
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Intro Hero Section */}
        <Hero onNavigate={setActiveSection} />

        {/* Minimal About details */}
        <About />

        {/* Dynamic & Interactive AI Expertise/Skills Infographics & Trees */}
        <AIExpertiseTree />

        {/* Work / Project Catalog */}
        <Projects />

        {/* Technical Blog / Deep dives */}
        <Blog />

        {/* Contact form and admin dashboard */}
        <Contact />
      </main>

      {/* Elegant Footer and Credit details (Avoiding tech-larp or status indicators in margins) */}
      <footer className="bg-zinc-950 border-t border-zinc-900/60 py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          {/* Left Block */}
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs font-mono font-bold">
              λ
            </div>
            <div>
              <p className="font-mono text-xs text-white font-bold tracking-wider">AATIF KHAN</p>
              <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Systems AI Specialty • © 2026</p>
            </div>
          </div>

          {/* Social connections */}
          <div className="flex items-center space-x-5">
            <a
              href="https://github.com/aatif-pathan001"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-md hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all"
              id="footer-github"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/aatif-khan-pathan-a1674617b"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-md hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all"
              id="footer-linkedin"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-1.5 rounded-md hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all"
              id="footer-globe"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
