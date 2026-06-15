import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-24 border-t border-zinc-900 bg-zinc-950 relative overflow-hidden">
      {/* Dynamic soft background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/5 rounded-full glow-blur -z-10" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-left">
        <div className="space-y-6">
          <h2 className="text-[34px] font-bold tracking-tight text-white leading-tight">
            About Me
          </h2>
          
          <p className="text-zinc-400 leading-relaxed font-light text-base sm:text-lg max-w-3xl">
            I am an electrical engineer who sits at the intersection of hardware and software. I believe that software is a discipline of craftsmanship. My mission is to bridge advanced artificial intelligence with highly optimal, predictable computer science architecture.
          </p>
        </div>
      </div>
    </section>
  );
}
