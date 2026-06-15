import React from 'react';
import { Home, User, Briefcase, Layers } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  openaiAccess?: boolean;
}

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'expertise', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Work', icon: Layers },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900/50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Name / My name */}
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => {
            setActiveSection('hero');
            document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <div className="w-7 h-7 rounded bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-mono font-bold text-sm">
              A
            </div>
            <span className="font-sans font-medium text-sm text-white tracking-tight">
              Aatif Khan
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isActive
                      ? 'bg-zinc-900 text-violet-400 font-medium'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-violet-400 animate-pulse' : 'text-zinc-400'}`} />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
