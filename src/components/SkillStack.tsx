import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Terminal, Database, Sparkles, Globe } from 'lucide-react';

interface Skill {
  name: string;
  logoUrl: string;
  description: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  accentColor: string; // Tailwind glow class
}

interface SkillCategory {
  title: string;
  icon: React.ComponentType<any>;
  skills: Skill[];
}

export default function SkillStack() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const categories: SkillCategory[] = [
    {
      title: 'Languages',
      icon: Terminal,
      skills: [
        {
          name: 'Python',
          logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
          description: 'AI tooling, data pipeline orchestration, & LLM agent runtimes.',
          level: 'Expert',
          accentColor: 'hover:shadow-sky-500/10 hover:border-sky-500/35 border-zinc-800',
        },
        {
          name: 'C++',
          logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
          description: 'Low-latency system programming and computing kernels.',
          level: 'Advanced',
          accentColor: 'hover:shadow-indigo-500/10 hover:border-indigo-500/35 border-zinc-800',
        },
        {
          name: 'MATLAB',
          logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg',
          description: 'Numerical computing, scientific simulations, & matrix modeling algorithms.',
          level: 'Advanced',
          accentColor: 'hover:shadow-orange-600/10 hover:border-orange-600/35 border-zinc-800',
        },
      ],
    },
    {
      title: 'Backend & Data Store',
      icon: Database,
      skills: [
        {
          name: 'PostgreSQL',
          logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
          description: 'Advanced relational modeling, full-text indexes, & performance tuning.',
          level: 'Expert',
          accentColor: 'hover:shadow-indigo-400/10 hover:border-indigo-400/35 border-zinc-800',
        },
        {
          name: 'FastAPI',
          logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
          description: 'Asynchronous API design, dependency injection & Pydantic speed.',
          level: 'Expert',
          accentColor: 'hover:shadow-teal-400/10 hover:border-teal-400/35 border-zinc-800',
        },
        {
          name: 'MongoDB',
          logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
          description: 'Document-oriented collections, dynamic schemas, & raw speed.',
          level: 'Advanced',
          accentColor: 'hover:shadow-green-500/10 hover:border-green-500/35 border-zinc-800',
        },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.35, ease: 'easeOut' },
    },
  };

  return (
    <section id="skills" className="py-20 border-t border-zinc-900 bg-zinc-950 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-indigo-950/10 rounded-full glow-blur -z-10"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Skill Stack
          </h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-xl">
            A comprehensive overview of production engines, core compilers, database systems, and runtime orchestration tools representing my deep professional focus.
          </p>
        </div>

        {/* Categories grid */}
        <div className="space-y-12">
          {categories.map((category, catIdx) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.title} 
                className="space-y-4"
                onMouseEnter={() => setActiveCategory(catIdx)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                {/* Category Header */}
                <div className="flex items-center space-x-2.5 border-b border-zinc-900 pb-2">
                  <IconComponent className="w-4 h-4 text-violet-400" />
                  <h3 className="text-sm font-mono font-bold tracking-wider text-zinc-200 uppercase">
                    {category.title}
                  </h3>
                  <span className="text-[10px] text-zinc-600 font-mono">
                    ({category.skills.length} tools)
                  </span>
                </div>

                {/* Grid of technologies */}
                <motion.div 
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-x-8"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                >
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      className="flex items-center space-x-3 py-1"
                    >
                      {/* Brand Logo Wrapper (Borderless & minimal) */}
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center overflow-hidden">
                        <img 
                          src={skill.logoUrl} 
                          alt={`${skill.name} logo`} 
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            // If devicons fail or are blocked, we gracefully degrade to text or simple shape
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>

                      {/* Info block */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-medium text-zinc-200 font-mono tracking-tight">
                          {skill.name}
                        </h4>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
