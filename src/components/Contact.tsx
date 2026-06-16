import React, { useState } from 'react';
import { Mail, Building2, User, Send, CheckCircle2 } from 'lucide-react';
import { Inquiry } from '../types';

export default function Contact() {
  // Visitor Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [projectInterest, setProjectInterest] = useState('LLM Agents');
  const [message, setMessage] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [successfulResult, setSuccessfulResult] = useState<Inquiry | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitting(true);
    setSuccessfulResult(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, role, projectInterest, message })
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessfulResult(data.inquiry);
        // Clean fields
        setName('');
        setEmail('');
        setCompany('');
        setRole('');
        setMessage('');
      }
    } catch (e) {
      console.error("Failed to submit contact", e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-zinc-900 bg-zinc-950/40 relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-950/10 rounded-full glow-blur -z-10"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Get in touch
          </h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-xl mx-auto">
            I'm always open to discussing new projects, technical workflows, or architectural inquiries. Drop a message below to connect.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Form or Success Screen */}
          {!successfulResult ? (
            <form onSubmit={handleFormSubmit} className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-xl space-y-5">
              <h3 className="text-sm font-mono tracking-wider text-zinc-300 uppercase pb-2 border-b border-zinc-850">
                Visitor Inquiry Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-400 block">FULL NAME *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                    <input
                      type="text"
                      required
                      placeholder="Sarah Chen"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 pl-9 pr-4 py-2 text-xs font-mono text-zinc-200 rounded-lg focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-400 block">EMAIL ADDRESS *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                    <input
                      type="email"
                      required
                      placeholder="sarah@corp.io"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 pl-9 pr-4 py-2 text-xs font-mono text-zinc-200 rounded-lg focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-400 block">COMPANY NAME</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="AetherLabs Inc"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 pl-9 pr-4 py-2 text-xs font-mono text-zinc-200 rounded-lg focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                {/* Project Focus dropdown */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-400 block">PROJECT SPECIALTIES</label>
                  <select
                    value={projectInterest}
                    onChange={(e) => setProjectInterest(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-850 px-3.5 py-2.5 text-xs font-mono text-zinc-300 rounded-lg focus:outline-none focus:border-violet-500"
                  >
                    <option value="LLM Agents">LLM Autonomous Agents</option>
                    <option value="Computer Vision">Dynamic Document Vision Pipeline</option>
                    <option value="Mlopps / Infrastructure">Low-Latency prompt Cache Infrastructure</option>
                    <option value="General Inquiry">General Strategic Consultation</option>
                  </select>
                </div>
              </div>

              {/* Message body */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-400 block">INQUIRY PAYLOAD CONTENT *</label>
                <textarea
                  required
                  placeholder="Describe your workflow parameters, deployment blockers, or architectural needs..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-32 bg-zinc-950 border border-zinc-850 rounded-lg p-3 text-xs font-mono text-zinc-200 focus:outline-none focus:border-violet-500 resize-none scrollbar leading-normal"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white disabled:bg-zinc-800 py-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-md shadow-violet-950/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Streaming payload diagnostics...' : 'Dispatch Inquiry Capsule'}</span>
              </button>
            </form>
          ) : (
            /* High Tech Real-time Gemini analysis output */
            <div className="bg-zinc-900 border border-violet-500/20 p-6 sm:p-8 rounded-xl space-y-5 shadow-xl shadow-violet-900/10 transition-all">
              <div className="flex items-center space-x-3 text-violet-400">
                <CheckCircle2 className="w-5 h-5 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Capsule Received & Analyzed by Gemini!</span>
              </div>

              {/* Quick classifications */}
              <div className="grid grid-cols-2 gap-4 bg-zinc-950 p-4 rounded-lg border border-zinc-850">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 block">REAL-TIME SENTIMENT</span>
                  <span className={`text-[11px] font-mono font-bold mt-1 inline-block px-2 py-0.5 rounded capitalize ${
                    successfulResult.sentiment === 'positive' ? 'text-violet-400 bg-violet-500/5' : successfulResult.sentiment === 'critical' ? 'text-red-400 bg-red-500/5' : 'text-zinc-400 bg-zinc-400/5'
                  }`}>
                    {successfulResult.sentiment || "neutral"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 block">URGENCY PRUNING</span>
                  <span className={`text-[11px] font-mono font-bold mt-1 inline-block px-2 py-0.5 rounded capitalize ${
                    successfulResult.urgency === 'high' ? 'text-red-400 bg-red-500/5 border border-red-500/10' : successfulResult.urgency === 'medium' ? 'text-amber-400 bg-amber-500/5' : 'text-zinc-400 bg-zinc-400/5'
                  }`}>
                    {successfulResult.urgency || "medium"}
                  </span>
                </div>
              </div>

              {/* Inquiry analysis Summary card */}
              <div className="space-y-1.5">
                <h4 className="text-[10px] font-mono text-zinc-550">PROMPT TELEMETRY SUMMARY</h4>
                <p className="bg-zinc-950 p-3 rounded border border-zinc-850 text-xs text-zinc-300 leading-normal font-light">
                  {successfulResult.summary}
                </p>
              </div>

              {/* AI Draft proposal reply mockup */}
              <div className="space-y-1.5">
                <h4 className="text-[10px] font-mono text-zinc-550">AUTO-GENERATED DRAFT EMAIL FOLLOW-UP</h4>
                <div className="bg-zinc-950 p-4 rounded border border-zinc-850 text-[11px] font-mono text-violet-400 leading-relaxed whitespace-pre-wrap h-40 overflow-y-auto scrollbar">
                  {successfulResult.aiSuggestedReply}
                </div>
              </div>

              <div>
                <button
                  onClick={() => setSuccessfulResult(null)}
                  className="w-full bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border border-zinc-850 text-center py-2.5 rounded-lg text-xs font-mono transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
