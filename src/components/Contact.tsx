import React, { useState, useEffect } from 'react';
import { MessageSquareCode, Mail, Building2, User, HelpCircle, Send, CheckCircle2, Lock, Unlock, HelpCircle as AlertIcon, RefreshCw, Eye } from 'lucide-react';
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

  // Admin Dashboard State
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeHelp, setPasscodeHelp] = useState(false);
  const [allInquiries, setAllInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [updateStatusId, setUpdateStatusId] = useState<string | null>(null);

  const fetchInquiries = () => {
    setLoadingInquiries(true);
    fetch('/api/inquiries')
      .then(res => res.json())
      .then(data => {
        setAllInquiries(data);
        setLoadingInquiries(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingInquiries(false);
      });
  };

  useEffect(() => {
    if (isAdminUnlocked) {
      fetchInquiries();
    }
  }, [isAdminUnlocked]);

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'admin123') {
      setIsAdminUnlocked(true);
      setPasscodeHelp(false);
    } else {
      setPasscodeHelp(true);
    }
  };

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
        
        // Refresh admin feed if already unlocked
        if (isAdminUnlocked) {
          fetchInquiries();
        }
      }
    } catch (e) {
      console.error("Failed to submit contact", e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdateStatusId(id);
    try {
      const res = await fetch(`/api/inquiries/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const data = await res.json();
        setAllInquiries(prev => prev.map(inq => inq.id === id ? data.inquiry : inq));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(data.inquiry);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdateStatusId(null);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-zinc-900 bg-zinc-950/40 relative">
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-violet-950/5 rounded-full glow-blur -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded text-[11px] font-mono text-violet-400 mb-3">
            <MessageSquareCode className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
            <span>Inquiry Channels</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Contact & Live Processing Operations
          </h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-xl">
            Submit a professional inquiry to test the real-time full-stack pipeline. Submissions undergo immediate lexical analysis, urgency classification, and custom reply auto-drafting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Panel: Contact Form */}
          <div className="lg:col-span-6 space-y-6">
            {!successfulResult ? (
              <form onSubmit={handleFormSubmit} className="bg-zinc-900 border border-zinc-805 p-6 rounded-xl space-y-4">
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
                      className="w-full bg-zinc-950 border border-zinc-850 px-3.5 py-2.5 text-xs font-mono text-zinc-350 rounded-lg focus:outline-none focus:border-violet-500"
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
              <div className="bg-zinc-900 border border-violet-500/20 p-6 rounded-xl space-y-5 shadow-xl shadow-violet-900/10 animate-all">
                <div className="flex items-center space-x-3 text-violet-400">
                  <CheckCircle2 className="w-5 h-5 animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-wider font-bold">Capsule Received & Analyzed by Gemini!</span>
                </div>

                {/* Quick classifications */}
                <div className="grid grid-cols-2 gap-4 bg-zinc-950 p-4 rounded-lg border border-zinc-850">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 block">REAL-TIME SENTIMENT</span>
                    <span className={`text-[11px] font-mono font-bold mt-1 inline-block px-2 py-0.5 rounded capitalize ${
                      successfulResult.sentiment === 'positive' ? 'text-violet-400 bg-violet-500/5' : successfulResult.sentiment === 'critical' ? 'text-red-400 bg-red-500/5' : 'text-zinc-405 bg-zinc-400/5'
                    }`}>
                      {successfulResult.sentiment || "neutral"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 block">URGENCY PRUNING</span>
                    <span className={`text-[11px] font-mono font-bold mt-1 inline-block px-2 py-0.5 rounded capitalize ${
                      successfulResult.urgency === 'high' ? 'text-red-400 bg-red-500/5 border border-red-500/10' : successfulResult.urgency === 'medium' ? 'text-amber-400 bg-amber-500/5' : 'text-zinc-405 bg-zinc-400/5'
                    }`}>
                      {successfulResult.urgency || "medium"}
                    </span>
                  </div>
                </div>

                {/* Inquiry analysis Summary card */}
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-mono text-zinc-500">PROMPT TELEMETRY SUMMARY</h4>
                  <p className="bg-zinc-950 p-3 rounded border border-zinc-850 text-xs text-zinc-300 leading-normal font-light">
                    {successfulResult.summary}
                  </p>
                </div>

                {/* AI Draft proposal reply mockup */}
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-mono text-zinc-500">AUTO-GENERATED DRAFT EMAIL FOLLOW-UP</h4>
                  <div className="bg-zinc-950 p-4 rounded border border-zinc-855 text-[11px] font-mono text-violet-400 leading-relaxed whitespace-pre-wrap h-40 overflow-y-auto scrollbar">
                    {successfulResult.aiSuggestedReply}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSuccessfulResult(null)}
                    className="flex-1 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border border-zinc-850 text-center py-2.5 rounded-lg text-xs font-mono transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                  <button
                    onClick={() => {
                      setIsAdminUnlocked(true);
                      setPasscode('admin123');
                    }}
                    className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white py-2.5 rounded-lg text-xs font-mono font-bold text-center cursor-pointer shadow-md shadow-violet-950/20"
                  >
                    Unlock Inbox Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel: Lock-Gated Secure Developer ops Dashboard */}
          <div className="lg:col-span-6 bg-zinc-900 border border-zinc-800 p-6 rounded-xl min-h-[460px] flex flex-col justify-between">
            {!isAdminUnlocked ? (
              /* Lock screen placeholder */
              <div className="flex-1 flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-850 text-violet-400 animate-pulse">
                  <Lock className="w-5 h-5 text-violet-400" />
                </div>

                <div>
                  <h3 className="text-sm font-mono tracking-wider text-zinc-200 uppercase font-bold">DEVELOPER OPS CONSOLE</h3>
                  <p className="text-zinc-500 text-xs font-mono mt-1 max-w-sm mx-auto leading-normal">
                    This protected terminal aggregates incoming visitor inquiries, showcases system metrics, and helps audit Gemini context configurations.
                  </p>
                </div>

                <form onSubmit={handleAdminAuth} className="space-y-3 w-full max-w-xs pt-2">
                  <div className="space-y-1">
                    <input
                      type="password"
                      placeholder="Enter verification code (admin123)"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      className="w-full text-center bg-zinc-950 border border-zinc-850 p-2.5 text-xs font-mono text-zinc-200 rounded-lg focus:outline-none focus:border-violet-500"
                    />
                    {passcodeHelp && (
                      <span className="text-[10px] text-red-400 font-mono block">
                        Incorrect verification code. Try "admin123".
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-zinc-850 border border-zinc-750 hover:bg-zinc-800 text-white py-2 rounded-lg text-xs font-mono transition-all cursor-pointer"
                  >
                    Authenticate Console
                  </button>
                </form>

                <div className="text-[10px] font-mono text-zinc-500 flex items-center space-x-1.5 justify-center">
                  <AlertIcon className="w-3.5 h-3.5" />
                  <span>Public test code: <strong className="text-zinc-400">admin123</strong></span>
                </div>
              </div>
            ) : (
              /* Active Admin panel view */
              <div className="flex-1 flex flex-col justify-between h-full space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <span className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase flex items-center space-x-1.5">
                    <Unlock className="w-3.5 h-3.5 text-violet-400" />
                    <span>Inquiry Ops Feed ({allInquiries.length})</span>
                  </span>
                  <button
                    onClick={fetchInquiries}
                    disabled={loadingInquiries}
                    className="text-[10px] uppercase font-mono text-zinc-400 hover:text-white flex items-center space-x-1 transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-2.5 h-2.5 ${loadingInquiries ? 'animate-spin' : ''}`} />
                    <span>Poll data</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1">
                  {/* Left sublist: list of inquiry senders */}
                  <div className="md:col-span-5 border-r border-zinc-800 pr-4 space-y-2 max-h-[320px] overflow-y-auto scrollbar">
                    {loadingInquiries ? (
                      <div className="space-y-2 p-2 font-mono text-[10px] text-zinc-500 animate-pulse">
                        Analyzing incoming telemetry records...
                      </div>
                    ) : (
                      allInquiries.map((inq) => (
                        <div
                          key={inq.id}
                          onClick={() => setSelectedInquiry(inq)}
                          className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                            selectedInquiry?.id === inq.id
                              ? 'bg-zinc-800 border-violet-500/25 text-white'
                              : 'bg-zinc-950/30 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
                          }`}
                        >
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className="font-bold line-clamp-1">{inq.name}</span>
                            <span className={`text-[8px] px-1.5 py-0.5 rounded capitalize ${
                              inq.urgency === 'high' ? 'bg-red-500/10 text-red-400' : 'bg-zinc-805 text-zinc-450'
                            }`}>
                              {inq.urgency || "med"}
                            </span>
                          </div>
                          <span className="text-[9px] font-mono text-zinc-550 line-clamp-1 block mt-1">
                            {inq.company || "Independent"}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Right sublist: detail viewer */}
                  <div className="md:col-span-7 space-y-3 p-1.5 max-h-[320px] overflow-y-auto scrollbar text-xs">
                    {selectedInquiry ? (
                      <div className="space-y-3">
                        <div className="pb-2 border-b border-zinc-800">
                          <h4 className="font-bold font-serif text-white text-sm leading-normal">{selectedInquiry.name}</h4>
                          <span className="text-[9px] font-mono text-violet-400 block mt-0.5">{selectedInquiry.email}</span>
                          <span className="text-[9px] font-mono text-zinc-400 block mt-0.5">Focus Interest: {selectedInquiry.projectInterest}</span>
                          <span className="text-[9px] font-mono text-zinc-400 block mt-0.5">Company: {selectedInquiry.company} ({selectedInquiry.role})</span>
                        </div>

                        <div>
                          <span className="text-[9px] font-mono text-zinc-500 block mb-1">INCOMING CAPSULE MESSAGE</span>
                          <p className="bg-zinc-950 p-2 text-[11px] text-zinc-300 leading-normal font-light rounded border border-zinc-850 whitespace-pre-wrap">
                            "{selectedInquiry.message}"
                          </p>
                        </div>

                        {selectedInquiry.summary && (
                          <div>
                            <span className="text-[9px] font-mono text-zinc-500 block mb-1">GEMINI EVALUATED SUMMARY</span>
                            <p className="bg-zinc-950/80 p-2 text-[10px] font-mono text-violet-400 rounded border border-zinc-850 whitespace-pre-wrap">
                              {selectedInquiry.summary}
                            </p>
                          </div>
                        )}

                        {selectedInquiry.aiSuggestedReply && (
                          <div>
                            <span className="text-[9px] font-mono text-zinc-500 block mb-1">AUTO-REPLY TEMPLATE PRESET</span>
                            <div className="bg-zinc-950 p-3 text-[10px] font-mono text-zinc-350 rounded border border-zinc-850 leading-relaxed whitespace-pre-wrap max-h-24 overflow-y-auto scrollbar">
                              {selectedInquiry.aiSuggestedReply}
                            </div>
                          </div>
                        )}

                        {/* Status controllers */}
                        <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-zinc-450">STATUS: <strong className="text-zinc-350 uppercase">{selectedInquiry.status}</strong></span>
                          <div className="flex items-center space-x-1.5">
                            {selectedInquiry.status !== 'contacted' && (
                              <button
                                onClick={() => handleUpdateStatus(selectedInquiry.id, 'contacted')}
                                disabled={updateStatusId === selectedInquiry.id}
                                className="bg-zinc-950 hover:bg-zinc-800 text-[10px] font-mono text-violet-400 border border-zinc-800 px-2 py-1 rounded cursor-pointer"
                              >
                                {updateStatusId === selectedInquiry.id ? "Updating..." : "Mark Contacted"}
                              </button>
                            )}
                            {selectedInquiry.status !== 'resolved' && (
                              <button
                                onClick={() => handleUpdateStatus(selectedInquiry.id, 'resolved')}
                                disabled={updateStatusId === selectedInquiry.id}
                                className="bg-violet-500/10 hover:bg-violet-500 hover:text-zinc-950 text-[10px] font-mono text-violet-400 border border-violet-500/20 px-2 py-1 rounded cursor-pointer"
                              >
                                {updateStatusId === selectedInquiry.id ? "Updating..." : "Close inquiry"}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-center font-mono text-[10px] text-zinc-500 p-12">
                        Select an inquiry capsule from the ledger feed to audit prompt analytics.
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-550">Security Clearance Level: Dev-Operator</span>
                  <button
                    onClick={() => {
                      setIsAdminUnlocked(false);
                      setPasscode('');
                      setSelectedInquiry(null);
                    }}
                    className="text-[10px] font-mono text-red-400/90 hover:text-red-300 flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Terminated Session</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
