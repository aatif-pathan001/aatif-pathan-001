import React, { useState } from 'react';
import { Briefcase, GraduationCap, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TimelineItem {
  id: string;
  company: string;
  role: string;
  period: string;
  points: string[];
  tech: string[];
  type: 'work' | 'education';
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: "tcs-experience",
    company: "Tata Consultancy Services (TCS)",
    role: "Software Engineer",
    period: "Oct 2024 - Present",
    points: [
      "Engineered high-throughput enterprise systems with critical attention to server-side latency and resource minimization.",
      "Optimized legacy transaction pipelines, boosting concurrent user capacity by 35% through custom event-driven caching.",
      "Coordinated with multi-discipline teams to build robust, secure API microservices aligned to strict enterprise guardrails."
    ],
    tech: ["Node.js", "TypeScript", "Microservices", "REST APIs", "SQL"],
    type: "work"
  },
  {
    id: "cipherschool-experience",
    company: "CipherSchool",
    role: "Technical Mentor & Full-Stack Instructor",
    period: "Jul 2023 - Sep 2024",
    points: [
      "Designed and delivered interactive system architecting curriculums, training over 1,500 developers in clean practices.",
      "Led continuous workshops focused on deterministic hardware-software integration, react state patterns, and API security.",
      "Created fully decoupled full-stack prototype starter kits featuring automated validation suites for fast on-boarding."
    ],
    tech: ["React", "JavaScript", "Python", "System Design", "UI/UX"],
    type: "work"
  },
  {
    id: "college-experience",
    company: "B.Tech College",
    role: "B.Tech in Electrical Engineering",
    period: "Aug 2020 - Jun 2024",
    points: [
      "Graduated with honors, focusing on digital signal processing, control systems, and automated microcode setups.",
      "Developed customized embedded microcontroller units for IoT data telemetry, bridging analog signals to web sockets.",
      "Spearheaded joint team prototypes on solar logic controls, applying strict timing models and deterministic firmware routines."
    ],
    tech: ["Embedded C", "Microcontrollers", "MATLAB", "IoT", "Circuit Design"],
    type: "education"
  }
];

export default function AIExpertiseTree() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="expertise" className="py-24 border-t border-zinc-900 bg-zinc-950/80 relative overflow-hidden">
      {/* Visual background atmospheric elements */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-950/10 rounded-full glow-blur -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-purple-950/10 rounded-full glow-blur -z-10 pointer-events-none" />

      {/* Grid Mesh pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-left">
        {/* Header Title */}
        <div className="text-left space-y-3 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            My Journey & Experience
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
            A chronological tree of my career milestones, academic foundation, and technical history. Click any milestone to unfold details.
          </p>
        </div>

        {/* Tree Timeline Structure */}
        <div className="relative border-l border-zinc-800 ml-4 md:ml-6 pl-8 md:pl-10 space-y-6">
          {TIMELINE_DATA.map((item) => {
            const Icon = item.type === 'education' ? GraduationCap : Briefcase;
            const isExpanded = expandedId === item.id;

            return (
              <div key={item.id} className="relative group">
                {/* Timeline Node Point Indicator */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="absolute -left-[45px] md:-left-[53px] top-1.5 focus:outline-none bg-zinc-950 w-8 h-8 rounded-full border border-zinc-700 group-hover:border-violet-500 flex items-center justify-center transition-all duration-300 cursor-pointer z-20"
                >
                  <Icon className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'text-violet-400 scale-110' : 'text-zinc-500 group-hover:text-violet-400'}`} />
                </button>

                {/* Main Card Content */}
                <div
                  onClick={() => toggleItem(item.id)}
                  className={`p-6 rounded-xl bg-zinc-900/40 border transition-all duration-300 space-y-4 cursor-pointer select-none ${
                    isExpanded 
                      ? 'border-violet-500/40 bg-zinc-900/70 shadow-lg shadow-violet-950/10' 
                      : 'border-zinc-900 hover:border-zinc-800/80 hover:bg-zinc-900/50'
                  }`}
                >
                  {/* Top line metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="space-y-1">
                      <h3 className="font-sans font-semibold text-lg text-white">
                        {item.role}
                      </h3>
                      <p className="text-violet-400 text-sm font-medium">
                        {item.company}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3 self-start sm:self-center">
                      {/* Period tag */}
                      <div className="inline-flex items-center space-x-2 bg-zinc-950/60 border border-zinc-850 px-3 py-1 rounded-md text-xs font-mono text-zinc-400">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{item.period}</span>
                      </div>

                      {/* Interactive toggle status indicator */}
                      <div className="p-1 rounded-md bg-zinc-950/40 border border-zinc-850/60 text-zinc-400 group-hover:text-white transition-colors">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-violet-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300" />
                        )}
                      </div>
                    </div>
                  </div>



                  {/* Collapsible details wrapper using AnimatePresence & motion */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden space-y-4"
                      >
                        {/* Bullet points detailing the experience */}
                        <ul className="space-y-2.5 text-zinc-300 text-sm font-light leading-relaxed pt-2">
                          {item.points.map((point, index) => (
                            <li key={index} className="flex items-start space-x-2.5">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-450 mt-2 shrink-0 animate-pulse" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Technology Badges bottom summary line */}
                        <div className="pt-4 border-t border-zinc-900/60 flex flex-wrap gap-2">
                          {item.tech.map((badge, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono bg-zinc-950/80 text-zinc-300 border border-zinc-800 px-2 py-0.5 rounded shadow-sm"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
