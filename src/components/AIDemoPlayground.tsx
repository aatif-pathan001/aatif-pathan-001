import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Send, Sparkles, SlidersHorizontal, RefreshCw, Terminal, CheckCircle2 } from 'lucide-react';
import { Message } from '../types';

interface AIDemoPlaygroundProps {
  selectedTemplate: string | null;
  onClearTemplate: () => void;
}

const SYSTEM_PRESETS = {
  'text-agent': {
    title: 'Aether Autonomous Agent (CoT)',
    instruction: 'You are AetherAgent, a state-authoritative multi-agent orchestrator. Break down every user request into explicit sub-tasks, plan logical tool selections, perform safety-alignment scans, and execute steps sequentially using bulletproof reasoning blocks.',
    initialPrompt: 'Help me draft an autonomous agent plan for sorting client inquiries based on priority metrics and dispatching slack alerts.',
    info: 'Simulates step-by-step multi-agent planning with rigid structural breakdowns.'
  },
  'prompt-compiler': {
    title: 'Prompt Optimization IDE',
    instruction: 'You are PromptCompiler, a prompt-engineering specialist. Your sole job is to analyze rough user instructions, identify lexical redundancies, eliminate conversational fluff, and compile them into optimized system prompts with explicit schema control.',
    initialPrompt: 'Make this prompt better: "Please write a summary of this document, and don\'t write more than 5 sentences, and make it look professional." ',
    info: 'Compiles raw user instructions into parsed, professional instructions.'
  },
  'data-analyst': {
    title: 'Semantic Data Intel',
    instruction: 'You are IrisAnalyst, a quantitative model that specializes in analyzing tabular performance metrics. You must parse input numbers, calculate latency percentiles, and estimate optimal temperature settings to stabilize token distributions.',
    initialPrompt: 'Evaluate these API telemetry results: p50: 240ms, p95: 1450ms, p99: 3100ms. Why is my p99 so high?',
    info: 'Performs semantic breakdowns of telemetry statistics.'
  }
};

export default function AIDemoPlayground({ selectedTemplate, onClearTemplate }: AIDemoPlaygroundProps) {
  // Config state
  const [model, setModel] = useState<'gemini-3.5-flash' | 'gemini-3.1-flash-lite'>('gemini-3.5-flash');
  const [temperature, setTemperature] = useState<number>(0.7);
  const [systemInstruction, setSystemInstruction] = useState<string>(SYSTEM_PRESETS['text-agent'].instruction);
  const [presetKey, setPresetKey] = useState<string>('text-agent');

  // Conversation state
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: "Aether Autonomous Agent console initialized. Ready for task-decomposition commands.",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [telemetry, setTelemetry] = useState<{ modelUsed?: string; tokensAnalyzed?: number }>({});
  const [errorText, setErrorText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Handle template selection from parent/work section
  useEffect(() => {
    if (selectedTemplate && selectedTemplate !== 'none') {
      const key = selectedTemplate as keyof typeof SYSTEM_PRESETS;
      if (SYSTEM_PRESETS[key]) {
        setPresetKey(selectedTemplate);
        setSystemInstruction(SYSTEM_PRESETS[key].instruction);
        setMessages([
          {
            role: 'system',
            content: `Pre-loaded ${SYSTEM_PRESETS[key].title} pipeline successfully. Ready to run compiler.`,
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
        setUserInput(SYSTEM_PRESETS[key].initialPrompt);
      }
      onClearTemplate();
    }
  }, [selectedTemplate]);

  const handlePresetSelect = (key: string) => {
    setPresetKey(key);
    const preset = SYSTEM_PRESETS[key as keyof typeof SYSTEM_PRESETS];
    if (preset) {
      setSystemInstruction(preset.instruction);
      setMessages([
        {
          role: 'system',
          content: `${preset.title} console initialized. Engine ready.`,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
      setUserInput(preset.initialPrompt);
    }
  };

  const handleResetConsole = () => {
    handlePresetSelect(presetKey);
    setTelemetry({});
    setErrorText(null);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim() || loading) return;

    setErrorText(null);
    const userMsg: Message = {
      role: 'user',
      content: userInput,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    const cachedInput = userInput;
    setUserInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/playground/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].filter(m => m.role !== 'system'),
          model,
          temperature,
          systemInstruction
        })
      });

      if (!response.ok) {
        throw new Error(`Execution error: ${response.statusText}`);
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        role: 'model',
        content: data.content,
        timestamp: new Date().toLocaleTimeString()
      }]);

      setTelemetry({
        modelUsed: data.modelUsed,
        tokensAnalyzed: data.tokensAnalyzed ? Math.round(data.tokensAnalyzed) : undefined
      });
    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || "Failed to execute AI model compilation. Please verify backend secrets connectivity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="playground" className="py-20 border-t border-zinc-900 bg-zinc-950/60 relative">
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-violet-950/10 rounded-full glow-blur -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Module Title */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded text-[11px] font-mono text-violet-400 mb-3">
            <Cpu className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
            <span>Interactive Demo Console</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            AI Engineering Sandbox
          </h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-xl">
            Test custom model architectures and system context protocols in real-time. Tune inference parameters and watch how prompts undergo systemic evaluations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Panel: Hyper-parameter control controllers */}
          <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-850">
              <span className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase flex items-center space-x-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-violet-400" />
                <span>Model Parameters</span>
              </span>
              <button
                onClick={handleResetConsole}
                className="text-[10px] uppercase font-mono text-zinc-400 hover:text-white flex items-center space-x-1 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Presets dropdown */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-400 block">ORCHESTRATION PROFILE</label>
              <div className="flex flex-col gap-1.5">
                {Object.entries(SYSTEM_PRESETS).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => handlePresetSelect(key)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all ${
                      presetKey === key
                        ? 'bg-zinc-800/85 text-violet-400 border-violet-500/35'
                        : 'bg-zinc-950/40 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <span className="font-bold block text-[11px]">{item.title}</span>
                    <span className="text-[9px] text-zinc-500 block mt-0.5 line-clamp-1">{item.info}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Target model selection */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-400 block">MODEL GENERATION ALIAS</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value as any)}
                className="w-full bg-zinc-950 border border-zinc-900 text-xs text-zinc-300 rounded-lg p-2.5 font-mono focus:outline-none focus:border-violet-500"
              >
                <option value="gemini-3.5-flash">gemini-3.5-flash (Standard)</option>
                <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Turbo/Fast)</option>
              </select>
            </div>

            {/* Temperature parameter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-zinc-400">DECODING TEMPERATURE</span>
                <span className="text-violet-400">{temperature}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.5"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-violet-500 h-1.5 bg-zinc-950 rounded-lg cursor-pointer animate-all"
              />
              <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                <span>0.1 (Rigid)</span>
                <span>1.5 (Creative)</span>
              </div>
            </div>

            {/* Custom System prompt instructions */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-400 block">SYSTEM CONTEXT INSTRUCTION</label>
              <textarea
                value={systemInstruction}
                onChange={(e) => {
                  setSystemInstruction(e.target.value);
                  setPresetKey('custom');
                }}
                className="w-full h-32 bg-zinc-950 border border-zinc-805 text-xs text-zinc-300 rounded-lg p-3 font-mono focus:outline-none focus:border-violet-500 resize-none scrollbar leading-normal"
              />
              <span className="text-[9px] font-mono text-zinc-500 leading-normal block">
                System instructions steer core persona limits, response constraints, and structural boundary behaviors.
              </span>
            </div>
          </div>

          {/* Right Panel: Interactive Terminal Stream */}
          <div className="lg:col-span-8 flex flex-col bg-zinc-900 border border-zinc-805 rounded-xl overflow-hidden h-[540px]">
            {/* Console Header */}
            <div className="bg-zinc-950 px-4 py-3 border-b border-zinc-850 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs font-mono text-zinc-300">sysOps // AI Sandbox Terminal</span>
              </div>

              {/* Server availability/Telemetry markers */}
              <div className="flex items-center space-x-3 text-[10px] font-mono text-zinc-500">
                {telemetry.modelUsed && (
                  <span className="text-violet-400/90 hidden sm:inline">
                    Active: {telemetry.modelUsed}
                  </span>
                )}
                {telemetry.tokensAnalyzed && (
                  <span className="border-l border-zinc-800 pl-3 hidden sm:inline">
                    Evaluated: ~{telemetry.tokensAnalyzed} tokens
                  </span>
                )}
              </div>
            </div>

            {/* Chat list streams */}
            <div className="flex-1 p-5 overflow-y-auto bg-zinc-950/30 text-xs space-y-4 scrollbar">
              {messages.map((m, idx) => {
                if (m.role === 'system') {
                  return (
                    <div key={idx} className="flex items-center space-x-2 bg-zinc-900/60 border border-zinc-800 px-3 py-2 rounded-lg text-zinc-400 font-mono">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400"></div>
                      <span className="text-[10px] flex-1">{m.content}</span>
                      <span className="text-[9px] text-zinc-500">{m.timestamp}</span>
                    </div>
                  );
                }

                const isUser = m.role === 'user';
                return (
                  <div key={idx} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">
                        {isUser ? 'Visitor Prompt' : 'Gemini Core'}
                      </span>
                      <span className="text-[9px] text-zinc-650 font-mono">{m.timestamp}</span>
                    </div>
                    <div
                      className={`max-w-[85%] rounded-xl px-4 py-3 border whitespace-pre-wrap leading-relaxed ${
                        isUser
                          ? 'bg-zinc-800 text-zinc-100 border-zinc-700'
                          : 'bg-zinc-950 text-zinc-200 border-zinc-805 font-mono text-[11px] text-violet-400'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex flex-col items-start">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Gemini Decoders</span>
                    <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-ping"></span>
                  </div>
                  <div className="bg-zinc-950/30 text-violet-400 border border-zinc-800 rounded-xl px-4 py-3 font-mono text-[11px] flex items-center space-x-3.5">
                    <div className="flex space-x-1.5">
                      <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="animate-pulse">Synthesizing parameters & invoking core model decoder...</span>
                  </div>
                </div>
              )}

              {errorText && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-xs font-mono">
                  ⚠ {errorText}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form submitters */}
            <form onSubmit={handleSendMessage} className="p-3 bg-zinc-950 border-t border-zinc-805 flex items-center space-x-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={loading ? "Synthesizing output... Please wait." : "Type custom prompt query (e.g. explain caching)..."}
                disabled={loading}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 px-4 text-xs font-mono text-zinc-200 focus:outline-none focus:border-violet-500"
              />
              <button
                type="submit"
                disabled={loading || !userInput.trim()}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white disabled:bg-zinc-800 p-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center shadow-md shadow-violet-950/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
