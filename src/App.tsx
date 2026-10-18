import React from 'react';
// @ts-ignore
import developerPortrait from './assets/images/regenerated_image_1781381857849.png';
import { FALLBACK_PROJECTS, FALLBACK_BLOG_POSTS } from './data/fallbackData';
import { Project, BlogPost } from './types';

const NAV: [string, string, string][] = [
  ['home', 'Home', 'ph-house'],
  ['about', 'About', 'ph-user'],
  ['experience', 'Experience', 'ph-briefcase'],
  ['work', 'Work', 'ph-stack'],
  ['writing', 'Writing', 'ph-book-open'],
  ['stack', 'Stack', 'ph-cpu'],
  ['contact', 'Contact', 'ph-envelope-simple'],
];

const EXP = [
  {
    title: 'Software Engineer',
    org: 'Tata Consultancy Services (TCS)',
    date: 'Oct 2024 - Present',
    icon: 'ph-briefcase',
    points: [
      'Building production AI systems with a focus on performance, security and reliability.',
      'Designing retrieval and LLM pipelines for enterprise workloads.',
    ],
  },
  {
    title: 'Technical Mentor & Full-Stack Instructor',
    org: 'CipherSchool',
    date: 'Jul 2023 - Sep 2024',
    icon: 'ph-briefcase',
    points: [
      'Mentored learners through full-stack projects from design to deployment.',
      'Created course material on backend systems and modern web tooling.',
    ],
  },
  {
    title: 'B.Tech in Electrical Engineering',
    org: 'B.Tech College',
    date: 'Aug 2020 - Jun 2024',
    icon: 'ph-graduation-cap',
    points: [
      'Foundation in circuits, signals and embedded systems alongside computer science.',
    ],
  },
];

const PROJECTS = [
  {
    id: 'proj-youtube-triage',
    cat: 'LLM AGENTS',
    key: 'llm',
    file: 'triage.py — scoring video',
    stat: '< 60s',
    statLabel: 'one-shot verification\nfor a 1–4 hour video',
    title: 'YouTube Video Triage',
    metric: 'One-shot verification results in under 60s.',
    desc: 'Specialized productivity tool designed for professional self-learners to determine if a long-form video (1-4 hours) is worth their time before they commit to watching it.',
    tags: ['Python', 'Gemini API', 'Pytest', 'Triage Pipeline', 'YouTube API'],
    demo: false,
    githubUrl: 'https://github.com/aatif-pathan001/youtube_triage',
    liveUrl: '#',
  },
  {
    id: 'proj-pixelcrypt',
    cat: 'COMPUTER VISION',
    key: 'cv',
    file: 'pixelcrypt.ts — encoding payload',
    stat: '0%',
    statLabel: 'visual degradation\nat 100% data capacity',
    title: 'PixelCrypt',
    metric: 'Zero visual degradation at 100% data capacity.',
    desc: 'Advanced steganography tool designed to encode and conceal arbitrary files within carrier images without visual distortion. Utilizes direct pixel manipulations and custom encoding matrices.',
    tags: ['TypeScript', 'Canvas API', 'Steganography', 'Cryptography', 'Tailwind CSS'],
    demo: true,
    githubUrl: 'https://github.com/aatif-pathan001/encode_file_into_image',
    liveUrl: 'https://pixelcrypt-9rog.onrender.com',
  },
  {
    id: 'proj-rag-detective',
    cat: 'RAG SYSTEMS',
    key: 'rag',
    file: 'ingest.py — building the index',
    anim: '/new_portfolio/RAG Ingestion Animation.dc.html',
    stat: '0',
    statLabel: 'unsupported spans —\nevery claim cited & verified',
    title: 'RAG Detective',
    metric: 'Every claim traced back to its evidence.',
    desc: 'Retrieval-augmented question answering that shows its work. A query moves through intent parsing, hybrid BM25 + dense retrieval, cross-encoder reranking, cited generation and a fact-verification pass, so every sentence in the answer traces back to a source.',
    tags: ['Python', 'Hybrid Search', 'Cross-Encoder', 'Vector DB', 'RAGAS'],
    demo: true,
    githubUrl: 'https://github.com/aatif-pathan001',
    liveUrl: '/new_portfolio/RAG Detective v3.dc.html',
  },
];

const FILTERS: [string, string][] = [
  ['all', 'All Workspace'],
  ['llm', 'LLM Agents'],
  ['cv', 'Computer Vision'],
  ['rag', 'RAG Systems'],
];

const POSTS = [
  {
    id: 'post-low-latency',
    kind: 'Engineering',
    date: '2026-05-28',
    read: '6 min read',
    title: 'Architecting Low-Latency LLM Pipelines: Cache Strategies',
    desc: 'Exploring prompt caching architectures, local-routing fallback chains, and semantic search indices designed to bring round-trip API responses under 400 milliseconds.',
    tags: ['#LLM Performance', '#Caching', '#Architecture', '#System Engineering'],
    likes: 42,
    url: 'https://medium.com/@aatifkhanjodhpur',
  },
  {
    id: 'post-system-instruct',
    kind: 'Tutorial',
    date: '2026-06-02',
    read: '8 min read',
    title: 'Mastering System Instructions: Structuring LLM State Control',
    desc: 'System instructions are not just fancy prompts. Learn how to treat system prompts as compilation layers, compile structural schemas, and enforce deterministic output constraints.',
    tags: ['#Prompt Engineering', '#JSON Enforcement', '#Security'],
    likes: 58,
    url: 'https://medium.com/@aatifkhanjodhpur',
  },
];

const DI = (n: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${n}.svg`;

const ELEMENTS = [
  { sym: 'Py', name: 'Python', cat: 'Languages', group: 'I', logo: DI('python/python-original') },
  { sym: 'C++', name: 'C++', cat: 'Languages', group: 'I', logo: DI('cplusplus/cplusplus-original') },
  { sym: 'Ml', name: 'MATLAB', cat: 'Languages', group: 'I', logo: DI('matlab/matlab-original') },
  { sym: 'Pg', name: 'PostgreSQL', cat: 'Backend & data', group: 'II', logo: DI('postgresql/postgresql-original') },
  { sym: 'Fa', name: 'FastAPI', cat: 'Backend & data', group: 'II', logo: DI('fastapi/fastapi-original') },
  { sym: 'Mg', name: 'MongoDB', cat: 'Backend & data', group: 'II', logo: DI('mongodb/mongodb-original') },
];

const WORDS = [' secure AI systems', ' RAG pipelines', ' LLM agents', ' things that ship'];

interface AppState {
  active: string;
  open: number;
  hx: number;
  hp: string | null;
  el: number;
  filter: string;
  search: string;
  liked: Record<string, boolean>;
  sent: boolean;
  typed: string;
  form: {
    name: string;
    email: string;
    company: string;
    spec: string;
    msg: string;
  };
  foc: string;
  phase: number;
  now: number;
  selectedProject: Project | null;
  selectedPost: BlogPost | null;
}

export default function App() {
  return <PortfolioComponent />;
}

class PortfolioComponent extends React.Component<{}, AppState> {
  declare setState: (updater: Partial<AppState> | ((prevState: AppState) => Partial<AppState>)) => void;
  state: AppState = {
    active: 'home',
    open: -1,
    hx: -1,
    hp: null,
    el: 0,
    filter: 'all',
    search: '',
    liked: {},
    sent: false,
    typed: '',
    form: { name: '', email: '', company: '', spec: 'LLM Agents', msg: '' },
    foc: '',
    phase: 0,
    now: Date.now(),
    selectedProject: null,
    selectedPost: null,
  };

  cardRef = React.createRef<HTMLDivElement>();
  progRef = React.createRef<HTMLDivElement>();
  heroVisRef = React.createRef<HTMLDivElement>();
  heroTxtRef = React.createRef<HTMLDivElement>();
  cueRef = React.createRef<HTMLAnchorElement>();
  marqRef = React.createRef<HTMLDivElement>();
  tlRef = React.createRef<HTMLDivElement>();
  tlFillRef = React.createRef<HTMLDivElement>();
  topRef = React.createRef<HTMLButtonElement>();
  ringRef = React.createRef<SVGCircleElement>();
  glareRef = React.createRef<HTMLDivElement>();
  frameRef = React.createRef<HTMLDivElement>();
  glowRef = React.createRef<HTMLDivElement>();
  netRef = React.createRef<HTMLCanvasElement>();
  detectRef = React.createRef<HTMLDivElement>();

  canv: Record<string, HTMLCanvasElement | null> = {};
  hov: Record<string, number> = {};
  demoRaf = 0;
  netRaf = 0;
  sRaf = 0;
  tt: any = null;
  clk: any = null;
  ct: any[] = [];
  io: IntersectionObserver | null = null;
  decodeEls: HTMLElement[] = [];
  mouse = { x: -1, y: -1 };
  onNetMove: ((e: MouseEvent) => void) | null = null;
  onNetLeave: (() => void) | null = null;
  onScroll: (() => void) | null = null;

  startDemos() {
    const st: Record<string, number> = { llm: 0, cv: 0, rag: 0 };
    let last = performance.now();
    const bits = Array.from({ length: 40 }, () => (Math.random() < 0.5 ? '0' : '1'));
    const img = Array.from({ length: 22 * 34 }, (_, i) => {
      const x = i % 34,
        y = Math.floor(i / 34);
      return 0.25 + 0.45 * Math.sin(x * 0.25 + y * 0.18) * Math.cos(y * 0.2 - x * 0.07) + Math.random() * 0.12;
    });
    const segs = Array.from({ length: 28 }, (_, i) => 0.25 + 0.7 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.45)));

    const prep = (c: HTMLCanvasElement) => {
      const dpr = window.devicePixelRatio || 1,
        W = c.clientWidth,
        H = c.clientHeight;
      if (!W) return null;
      if (c.width !== Math.round(W * dpr)) {
        c.width = Math.round(W * dpr);
        c.height = Math.round(H * dpr);
      }
      const ctx = c.getContext('2d');
      if (!ctx) return null;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      return { ctx, W, H };
    };

    const mono = (s: number) => `500 ${s}px 'JetBrains Mono', monospace`;

    const drawLLM = (c: HTMLCanvasElement, t: number) => {
      const p = prep(c);
      if (!p) return;
      const { ctx, W, H } = p,
        ph = (t % 7) / 7;
      ctx.fillStyle = '#141327';
      ctx.fillRect(0, 0, W, H);
      const vx = 18,
        vy = 16,
        vw = W - 36,
        vh = H * 0.42;
      const g = ctx.createLinearGradient(vx, vy, vx + vw, vy + vh);
      g.addColorStop(0, '#2a2552');
      g.addColorStop(1, '#1b1a33');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.roundRect(vx, vy, vw, vh, 8);
      ctx.fill();
      ctx.fillStyle = 'rgba(196,181,253,.9)';
      ctx.beginPath();
      const cx = vx + vw / 2,
        cy = vy + vh / 2;
      ctx.moveTo(cx - 9, cy - 12);
      ctx.lineTo(cx + 13, cy);
      ctx.lineTo(cx - 9, cy + 12);
      ctx.fill();
      ctx.font = mono(10);
      ctx.fillStyle = '#c4b5fd';
      ctx.fillText('transcript ▸ chunk ' + (1 + Math.floor(ph * 28)) + '/28', vx + 12, vy + vh - 12);
      const mins = Math.floor(ph * 184);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#8f8daa';
      ctx.fillText(Math.floor(mins / 60) + ':' + String(mins % 60).padStart(2, '0') + ':00 / 3:04:00', vx + vw - 12, vy + vh - 12);
      ctx.textAlign = 'left';
      const gy = vy + vh + 22,
        gh = H * 0.26,
        n = segs.length,
        sw = vw / n,
        upto = ph * n;
      ctx.strokeStyle = 'rgba(167,139,250,.12)';
      ctx.lineWidth = 1;
      [0, 0.5, 1].forEach((k) => {
        ctx.beginPath();
        ctx.moveTo(vx, gy + gh * k);
        ctx.lineTo(vx + vw, gy + gh * k);
        ctx.stroke();
      });
      ctx.beginPath();
      for (let i = 0; i <= Math.min(n - 1, upto); i++) {
        const x = vx + sw * i + sw / 2,
          y = gy + gh * (1 - segs[i]);
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.strokeStyle = '#a78bfa';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#8b5cf6';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;
      const by = gy + gh + 16,
        bh = 14;
      for (let i = 0; i < n; i++) {
        const done = i < upto;
        ctx.fillStyle = done ? `rgba(139,92,246,${0.25 + segs[i] * 0.75})` : '#24233e';
        ctx.beginPath();
        ctx.roundRect(vx + sw * i + 1, by, sw - 2, bh, 2);
        ctx.fill();
      }
      const px = vx + vw * ph;
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#c4b5fd';
      ctx.shadowBlur = 12;
      ctx.fillRect(px - 1, by - 6, 2, bh + 12);
      ctx.shadowBlur = 0;
      const score = Math.round(
        (segs.slice(0, Math.max(1, Math.ceil(upto))).reduce((a, b) => a + b, 0) / Math.max(1, Math.ceil(upto))) * 100
      );
      ctx.font = mono(10);
      ctx.fillStyle = '#8f8daa';
      ctx.fillText('relevance', vx, by + bh + 22);
      ctx.font = mono(11);
      const verdict = ph > 0.92 ? 'WORTH IT · ' + score + '%' : 'scoring… ' + score + '%';
      const tw = ctx.measureText(verdict).width + 18;
      ctx.fillStyle = ph > 0.92 ? '#7c3aed' : '#24233e';
      ctx.beginPath();
      ctx.roundRect(vx + vw - tw, by + bh + 9, tw, 20, 4);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.fillText(verdict, vx + vw - tw + 9, by + bh + 23);
    };

    const drawCV = (c: HTMLCanvasElement, t: number) => {
      const p = prep(c);
      if (!p) return;
      const { ctx, W, H } = p,
        ph = (t % 6) / 6;
      ctx.fillStyle = '#141327';
      ctx.fillRect(0, 0, W, H);
      const cols = 34,
        rows = 22,
        gx = 18,
        gy = 16,
        gw = W * 0.72 - 18,
        cs = gw / cols,
        gh = cs * rows,
        scan = ph * cols;
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) {
          let v = img[y * cols + x];
          const enc = x < scan;
          if (enc && Math.random() < 0.04) v += 0.05;
          const l = Math.max(0.1, Math.min(0.85, v));
          ctx.fillStyle = `hsl(${255 + v * 20}, ${55 + v * 20}%, ${l * 60}%)`;
          ctx.fillRect(gx + x * cs, gy + y * cs, cs - 0.6, cs - 0.6);
        }
      const sx = gx + scan * cs;
      const sg = ctx.createLinearGradient(sx - 40, 0, sx, 0);
      sg.addColorStop(0, 'rgba(167,139,250,0)');
      sg.addColorStop(1, 'rgba(196,181,253,.45)');
      ctx.fillStyle = sg;
      ctx.fillRect(sx - 40, gy, 40, gh);
      ctx.fillStyle = '#e4dcff';
      ctx.shadowColor = '#a78bfa';
      ctx.shadowBlur = 14;
      ctx.fillRect(sx - 1, gy - 4, 2, gh + 8);
      ctx.shadowBlur = 0;
      const bx = gx + gw + 18;
      ctx.font = mono(10);
      ctx.fillStyle = '#8f8daa';
      ctx.fillText('payload.bin', bx, gy + 8);
      if (Math.random() < 0.5) {
        bits.shift();
        bits.push(Math.random() < 0.5 ? '0' : '1');
      }
      ctx.font = mono(11);
      for (let r = 0; r < 12; r++) {
        const row = bits.slice((r * 3) % 30, ((r * 3) % 30) + 8).join('');
        ctx.fillStyle = r === 11 ? '#c4b5fd' : `rgba(167,139,250,${0.15 + r * 0.06})`;
        ctx.fillText(row, bx, gy + 28 + r * ((gh - 30) / 12));
      }
      const yb = gy + gh + 22;
      ctx.fillStyle = '#24233e';
      ctx.beginPath();
      ctx.roundRect(gx, yb, W - 36, 6, 3);
      ctx.fill();
      const pg = ctx.createLinearGradient(gx, 0, gx + (W - 36) * ph, 0);
      pg.addColorStop(0, '#7c2df0');
      pg.addColorStop(1, '#a78bfa');
      ctx.fillStyle = pg;
      ctx.beginPath();
      ctx.roundRect(gx, yb, Math.max(6, (W - 36) * ph), 6, 3);
      ctx.fill();
      ctx.font = mono(10);
      ctx.fillStyle = '#c9c7de';
      ctx.fillText('encoding LSB · ' + Math.round(ph * 100) + '%', gx, yb + 24);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#4ade80';
      ctx.fillText('ΔE 0.00 · lossless', W - 18, yb + 24);
      ctx.textAlign = 'left';
    };

    const drawRAG = (c: HTMLCanvasElement, t: number) => {
      const p = prep(c);
      if (!p) return;
      const { ctx, W, H } = p,
        ph = (t % 8) / 8,
        cl = (v: number) => Math.max(0, Math.min(1, v));
      ctx.fillStyle = '#141327';
      ctx.fillRect(0, 0, W, H);
      const x0 = 18,
        w = W - 36,
        rr = (x: number, y: number, ww: number, hh: number, r: number) => {
          ctx.beginPath();
          ctx.roundRect(x, y, ww, hh, r);
        };
      const q = 'How does RAG reduce hallucinations?',
        qn = Math.floor(cl(ph / 0.12) * q.length);
      ctx.fillStyle = '#1b1a33';
      rr(x0, 16, w, 30, 6);
      ctx.fill();
      ctx.strokeStyle = '#34305a';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.font = mono(11);
      ctx.fillStyle = '#a78bfa';
      ctx.fillText('>', x0 + 12, 35);
      ctx.fillStyle = '#d6d4e8';
      ctx.fillText(q.slice(0, qn) + (ph < 0.14 && Math.floor(t * 3) % 2 ? '▍' : ''), x0 + 28, 35);
      const S = ['query', 'retrieve', 'rerank', 'generate', 'verify'],
        ny = 46 + H * 0.15,
        prog = cl((ph - 0.12) / 0.6) * 4,
        nx = (i: number) => x0 + 14 + ((w - 28) * i) / 4,
        live = ph > 0.12;
      ctx.strokeStyle = '#2c2b48';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(nx(0), ny);
      ctx.lineTo(nx(4), ny);
      ctx.stroke();
      if (live) {
        ctx.strokeStyle = '#a78bfa';
        ctx.shadowColor = '#8b5cf6';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(nx(0), ny);
        ctx.lineTo(nx(prog), ny);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      ctx.font = mono(9.5);
      ctx.textAlign = 'center';
      S.forEach((s, i) => {
        const on = live && prog >= i - 0.001;
        ctx.fillStyle = on ? '#7c3aed' : '#24233e';
        ctx.beginPath();
        ctx.arc(nx(i), ny, 6, 0, 7);
        ctx.fill();
        ctx.strokeStyle = on ? '#c4b5fd' : '#3a3958';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = on ? '#c4b5fd' : '#5f5d7a';
        ctx.fillText(s, nx(i), ny + 22);
      });
      ctx.textAlign = 'left';
      if (live && prog < 4) {
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#c4b5fd';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(nx(prog), ny, 3.5, 0, 7);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      const ey = ny + H * 0.15,
        ew = w * 0.5,
        rh = 18,
        gap = H * 0.078;
      ctx.font = mono(10);
      ctx.fillStyle = '#8f8daa';
      ctx.fillText('evidence · top-3', x0, ey);
      (
        [
          ['Lewis et al. 2020', 0.92],
          ['Gao et al. 2023', 0.87],
          ['Production RAG guide', 0.78],
        ] as [string, number][]
      ).forEach(([l, s], i) => {
        const y = ey + 12 + i * gap,
          k = cl(prog - 1 - i * 0.3);
        ctx.fillStyle = '#24233e';
        rr(x0, y, ew, rh, 3);
        ctx.fill();
        if (k) {
          ctx.fillStyle = 'rgba(139,92,246,' + (0.3 + 0.45 * k) + ')';
          rr(x0, y, ew * s * k, rh, 3);
          ctx.fill();
        }
        ctx.fillStyle = k ? '#e4dcff' : '#5f5d7a';
        ctx.fillText('[' + (i + 1) + '] ' + l, x0 + 7, y + 12.5);
        ctx.textAlign = 'right';
        ctx.fillText(k ? (s * k).toFixed(2) : '—', x0 + ew - 7, y + 12.5);
        ctx.textAlign = 'left';
      });
      const ax = x0 + ew + 18,
        aw = w - ew - 18,
        g = cl((ph - 0.5) / 0.3),
        LW = [1, 0.84, 0.93, 0.7, 0.5],
        tot = LW.reduce((a, b) => a + b, 0);
      ctx.fillStyle = '#8f8daa';
      ctx.fillText('answer · cited', ax, ey);
      let left = g * tot;
      LW.forEach((lw, i) => {
        const y = ey + 14 + i * 15,
          f = Math.max(0, Math.min(lw, left));
        left -= lw;
        ctx.fillStyle = '#24233e';
        rr(ax, y, aw * lw, 6, 3);
        ctx.fill();
        if (f) {
          ctx.fillStyle = 'rgba(214,212,232,.75)';
          rr(ax, y, aw * f, 6, 3);
          ctx.fill();
        }
        if ((i === 1 || i === 3) && f >= lw) {
          ctx.fillStyle = '#7c3aed';
          rr(ax + aw * lw + 4, y - 3, 16, 12, 3);
          ctx.fill();
          ctx.fillStyle = '#fff';
          ctx.font = mono(8);
          ctx.fillText(i === 1 ? '1' : '2', ax + aw * lw + 9, y + 6);
          ctx.font = mono(10);
        }
      });
      const vy = H - 40,
        ok = ph > 0.86,
        facts = Math.min(5, Math.floor(cl((ph - 0.7) / 0.16) * 5));
      ctx.fillStyle = '#24233e';
      rr(x0, vy, w, 4, 2);
      ctx.fill();
      const pg = ctx.createLinearGradient(x0, 0, x0 + w, 0);
      pg.addColorStop(0, '#7c2df0');
      pg.addColorStop(1, '#a78bfa');
      ctx.fillStyle = pg;
      rr(x0, vy, Math.max(4, w * cl(ph / 0.86)), 4, 2);
      ctx.fill();
      ctx.font = mono(10);
      ctx.fillStyle = ok ? '#4ade80' : '#c9c7de';
      ctx.fillText(ok ? 'faithfulness 0.94 · 0 unsupported' : 'grounding claims…', x0, vy + 24);
      ctx.font = mono(11);
      const vt = ok ? 'VERIFIED · 5/5' : 'checking ' + facts + '/5',
        tw = ctx.measureText(vt).width + 18;
      ctx.fillStyle = ok ? '#7c3aed' : '#24233e';
      rr(x0 + w - tw, vy + 11, tw, 20, 4);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.fillText(vt, x0 + w - tw + 9, vy + 25);
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      (['llm', 'cv', 'rag'] as const).forEach((k) => {
        st[k] += dt * (this.hov[k] ? 2.4 : 1);
        const c = this.canv[k];
        if (c && c.isConnected) ({ llm: drawLLM, cv: drawCV, rag: drawRAG })[k](c, st[k]);
      });
      this.demoRaf = requestAnimationFrame(loop);
    };
    this.demoRaf = requestAnimationFrame(loop);
  }

  startNet() {
    const c = this.netRef.current;
    if (!c) return;
    const sec = c.parentElement;
    if (!sec) return;
    const nodes = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00025,
      vy: (Math.random() - 0.5) * 0.00025,
      r: 1 + Math.random() * 1.4,
    }));
    this.mouse = { x: -1, y: -1 };
    this.onNetMove = (e: MouseEvent) => {
      const r = sec.getBoundingClientRect();
      this.mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    this.onNetLeave = () => {
      this.mouse = { x: -1, y: -1 };
    };
    sec.addEventListener('mousemove', this.onNetMove);
    sec.addEventListener('mouseleave', this.onNetLeave);
    const loop = () => {
      const dpr = window.devicePixelRatio || 1,
        W = c.clientWidth,
        H = c.clientHeight;
      if (c.width !== Math.round(W * dpr)) {
        c.width = Math.round(W * dpr);
        c.height = Math.round(H * dpr);
      }
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);
        const m = this.mouse,
          pts = nodes.map((n) => {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > 1) n.vx *= -1;
            if (n.y < 0 || n.y > 1) n.vy *= -1;
            let x = n.x * W,
              y = n.y * H;
            if (m.x >= 0) {
              const dx = x - m.x,
                dy = y - m.y,
                d = Math.hypot(dx, dy);
              if (d < 140 && d > 0) {
                x += (dx / d) * (140 - d) * 0.18;
                y += (dy / d) * (140 - d) * 0.18;
              }
            }
            return { x, y, r: n.r };
          });
        for (let i = 0; i < pts.length; i++)
          for (let j = i + 1; j < pts.length; j++) {
            const a = pts[i],
              b = pts[j],
              d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < 120) {
              ctx.strokeStyle = `rgba(167,139,250,${(1 - d / 120) * 0.22})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        pts.forEach((p) => {
          let near = 0;
          if (m.x >= 0) {
            const d = Math.hypot(p.x - m.x, p.y - m.y);
            if (d < 220) {
              near = 1 - d / 220;
              ctx.strokeStyle = `rgba(196,181,253,${near * 0.55})`;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(m.x, m.y);
              ctx.stroke();
            }
          }
          ctx.fillStyle = `rgba(196,181,253,${0.35 + near * 0.65})`;
          ctx.shadowColor = '#8b5cf6';
          ctx.shadowBlur = near * 12;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + near * 1.8, 0, 7);
          ctx.fill();
          ctx.shadowBlur = 0;
        });
        if (m.x >= 0) {
          ctx.fillStyle = '#c4b5fd';
          ctx.shadowColor = '#8b5cf6';
          ctx.shadowBlur = 16;
          ctx.beginPath();
          ctx.arc(m.x, m.y, 3, 0, 7);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      this.netRaf = requestAnimationFrame(loop);
    };
    this.netRaf = requestAnimationFrame(loop);
  }

  decode() {
    const G = '01<>/{}[]#$%&*+=?ABCDEFXYZ';
    this.decodeEls = Array.from(document.querySelectorAll('section h2')) as HTMLElement[];
    this.decodeEls.forEach((el: any) => {
      const orig = el.textContent || '';
      el.style.cursor = 'default';
      el.onmouseenter = () => {
        if (el._run) return;
        el._run = true;
        let f = 0;
        const total = orig.length * 1.2;
        const step = () => {
          f++;
          el.textContent = orig
            .split('')
            .map((ch: string, i: number) => (ch === ' ' || i < f / 1.2 ? ch : G[Math.floor(Math.random() * G.length)]))
            .join('');
          if (f < total) requestAnimationFrame(step);
          else {
            el.textContent = orig;
            el._run = false;
          }
        };
        step();
      };
    });
  }

  componentDidMount() {
    this.clk = setInterval(() => this.setState({ now: Date.now() }), 30000);
    this.startDemos();
    this.startNet();
    this.decode();

    const els = Array.from(
      document.querySelectorAll(
        '[data-reveal], section h2, section h2 + p, article, #experience [data-exp-row], #work [data-work-row], #stack [data-stack-grid], #contact form'
      )
    ) as HTMLElement[];
    const todo = els.filter((el) => !el.dataset.rvDone && !(el.closest('#home') && !el.dataset.reveal));
    todo.forEach((el) => {
      const d = el.dataset.reveal ? +el.dataset.reveal * 110 : 0;
      el.style.transform = (el.style.transform || '').replace(/\s*translateY\(24px\)/g, '');
      el.style.opacity = '0';
      el.style.translate = '0 24px';
      el.style.transition = `opacity .8s cubic-bezier(.2,.8,.2,1) ${d}ms, translate .8s cubic-bezier(.2,.8,.2,1) ${d}ms`;
    });
    this.io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.dataset.rvDone = '1';
          el.style.opacity = '1';
          el.style.translate = '0 0';
          this.io?.unobserve(el);
          setTimeout(() => {
            el.style.transition = '';
            el.style.translate = '';
          }, 1400);
        }),
      { threshold: 0.12 }
    );
    todo.forEach((el) => this.io?.observe(el));

    let w = 0,
      i = 0,
      del = false;
    const typeStep = () => {
      const word = WORDS[w];
      if (!del) {
        i++;
        if (i > word.length) {
          del = true;
          this.tt = setTimeout(typeStep, 1600);
          return;
        }
      } else {
        i--;
        if (i <= 0) {
          del = false;
          w = (w + 1) % WORDS.length;
        }
      }
      this.setState({ typed: word.slice(0, i) });
      this.tt = setTimeout(typeStep, del ? 35 : 70);
    };
    this.tt = setTimeout(typeStep, 700);

    this.onScroll = () => {
      if (!this.sRaf)
        this.sRaf = requestAnimationFrame(() => {
          this.sRaf = 0;
          this.scrollFx();
        });
      const y = window.scrollY + 140;
      let cur = 'home';
      NAV.forEach(([id]) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = 'contact';
      if (cur !== this.state.active) this.setState({ active: cur });
    };
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
  }

  scrollFx() {
    const y = window.scrollY,
      vh = window.innerHeight,
      max = document.documentElement.scrollHeight - vh,
      p = max > 0 ? y / max : 0;
    const R = <T,>(r: React.RefObject<T | null>) => r && r.current;
    if (R(this.progRef)) this.progRef.current!.style.transform = `scaleX(${p})`;
    const k = Math.min(1, y / vh);
    if (R(this.heroVisRef))
      this.heroVisRef.current!.style.transform = `translateY(${y * 0.18}px) rotate(${-k * 4}deg) scale(${1 - k * 0.06})`;
    if (R(this.heroTxtRef)) {
      this.heroTxtRef.current!.style.transform = `translateY(${y * 0.32}px)`;
      this.heroTxtRef.current!.style.opacity = String(1 - k * 1.1);
    }
    if (R(this.netRef)) this.netRef.current!.style.opacity = String(1 - k * 0.8);
    if (R(this.cueRef)) this.cueRef.current!.style.opacity = String(Math.max(0, 1 - y / 120));
    if (R(this.marqRef)) this.marqRef.current!.style.transform = `translateX(${-((y * 0.45) % 1400) - 200}px)`;
    if (R(this.tlRef) && R(this.tlFillRef)) {
      const r = this.tlRef.current!.getBoundingClientRect();
      const f = Math.max(0, Math.min(1, (vh * 0.6 - r.top) / r.height));
      this.tlFillRef.current!.style.height = f * 100 + '%';
    }
    if (R(this.topRef)) {
      const on = y > vh * 0.8,
        b = this.topRef.current!;
      b.style.opacity = on ? '1' : '0';
      b.style.transform = on ? 'none' : 'translateY(16px) scale(.9)';
      b.style.pointerEvents = on ? 'auto' : 'none';
    }
    if (R(this.ringRef)) this.ringRef.current!.setAttribute('stroke-dashoffset', (131.9 * (1 - p)).toFixed(1));
  }

  componentWillUnmount() {
    if (this.onScroll) window.removeEventListener('scroll', this.onScroll);
    cancelAnimationFrame(this.sRaf);
    clearTimeout(this.tt);
    this.io && this.io.disconnect();
    cancelAnimationFrame(this.netRaf);
    cancelAnimationFrame(this.demoRaf);
    clearInterval(this.clk);
    (this.ct || []).forEach(clearTimeout);
    const s = this.netRef.current && this.netRef.current.parentElement;
    if (s) {
      if (this.onNetMove) s.removeEventListener('mousemove', this.onNetMove);
      if (this.onNetLeave) s.removeEventListener('mouseleave', this.onNetLeave);
    }
    (this.decodeEls || []).forEach((el) => {
      el.onmouseenter = null;
    });
  }

  tilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const c = this.cardRef.current;
    if (!c) return;
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width,
      y = (e.clientY - r.top) / r.height;
    c.style.transition = 'transform .12s ease-out, box-shadow .5s';
    c.style.transform = `perspective(900px) rotateY(${(x - 0.5) * 14}deg) rotateX(${(0.5 - y) * 12}deg) scale(1.02)`;
    const g = this.glareRef.current;
    if (g) {
      g.style.setProperty('--gx', x * 100 + '%');
      g.style.setProperty('--gy', y * 100 + '%');
    }
    const f = this.frameRef.current;
    if (f) f.style.transform = `translate(${14 - (x - 0.5) * 18}px, ${14 - (y - 0.5) * 18}px)`;
  };

  tiltIn = () => {
    const g = this.glareRef.current,
      gl = this.glowRef.current,
      f = this.frameRef.current,
      c = this.cardRef.current;
    if (this.detectRef.current) this.detectRef.current.style.opacity = '1';
    if (g) g.style.opacity = '1';
    if (gl) gl.style.opacity = '.9';
    if (f) f.style.borderColor = 'rgba(196,181,253,.9)';
    if (c) c.style.boxShadow = '0 40px 80px -24px rgba(124,58,237,.55)';
  };

  tiltOut = () => {
    const c = this.cardRef.current,
      g = this.glareRef.current,
      gl = this.glowRef.current,
      f = this.frameRef.current;
    if (c) {
      c.style.transition = 'transform .6s cubic-bezier(.2,.8,.2,1), box-shadow .5s';
      c.style.transform = 'perspective(900px)';
      c.style.boxShadow = '0 30px 60px -20px rgba(0,0,0,.5)';
    }
    if (this.detectRef.current) this.detectRef.current.style.opacity = '0';
    if (g) g.style.opacity = '0';
    if (gl) gl.style.opacity = '.35';
    if (f) {
      f.style.transform = 'translate(14px,14px)';
      f.style.borderColor = 'rgba(167,139,250,.55)';
    }
  };

  go = (id: string, e?: React.MouseEvent) => {
    e && e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: id === 'home' ? 0 : el.offsetTop - 62, behavior: 'smooth' });
  };

  spot = (e: React.MouseEvent<HTMLElement>) => {
    const t = e.currentTarget,
      r = t.getBoundingClientRect();
    t.style.setProperty('--mx', e.clientX - r.left + 'px');
    t.style.setProperty('--my', e.clientY - r.top + 'px');
  };

  contactVals() {
    const { form, foc, phase } = this.state;
    const set = (k: keyof AppState['form']) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      this.setState({ form: { ...this.state.form, [k]: e.target.value } });
    const v: any = {},
      keys: (keyof AppState['form'])[] = ['name', 'email', 'company', 'msg'];
    keys.forEach((k) => {
      v['v_' + k] = form[k];
      v['set_' + k] = set(k);
      v['foc_' + k] = () => this.setState({ foc: k });
      v['f_' + k] = foc === k ? '#8b5cf6' : form[k] ? '#4c3f8a' : '#2f2e4c';
      v['ic_' + k] = foc === k || form[k] ? '#a78bfa' : '#5f5d7a';
    });
    v.blur = () => this.setState({ foc: '' });
    v.specs = (
      [
        ['LLM Agents', 'ph-robot'],
        ['Computer Vision', 'ph-eye'],
        ['RAG Systems', 'ph-magnifying-glass'],
        ['Backend & Data', 'ph-database'],
      ] as [string, string][]
    ).map(([label, icon]) => {
      const on = form.spec === label;
      return {
        label,
        icon,
        pick: () => this.setState({ form: { ...this.state.form, spec: label } }),
        border: on ? '#8b5cf6' : '#2f2e4c',
        bg: on ? '#2a2550' : 'transparent',
        color: on ? '#fff' : '#b8b6d0',
      };
    });
    const q = (x: string) => (x ? JSON.stringify(x.length > 60 ? x.slice(0, 60) + '…' : x) : 'null');
    const rows: [string, string, string][] = [
      ['name', q(form.name), 'name'],
      ['email', q(form.email), 'email'],
      ['company', q(form.company), 'company'],
      ['specialty', q(form.spec), 'spec'],
      ['payload', q(form.msg), 'msg'],
    ];
    v.json = rows.map(([k, val, key], i) => ({
      k,
      v: val,
      c: val === 'null' ? '#5f5d7a' : '#86efac',
      hl: foc === key ? 'rgba(139,92,246,.22)' : 'transparent',
      comma: i < rows.length - 1 ? ',' : '',
    }));
    v.filled = [form.name, form.email, form.company, form.spec, form.msg].filter(Boolean).length;
    v.tokens = Math.ceil((form.name + form.email + form.company + form.msg).length / 4);
    v.clock = new Date(this.state.now).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata',
    });
    const P = [
      ['Dispatch Inquiry Capsule', 'ph-paper-plane-tilt', '0%', '0s', 'draft', '#24233e', '#b8b6d0'],
      ['Tokenizing payload…', 'ph-circle-notch', '35%', '.6s', 'compiling', '#2a2550', '#c4b5fd'],
      ['Transmitting capsule…', 'ph-broadcast', '80%', '.8s', 'sending', '#2a2550', '#c4b5fd'],
      ['Capsule delivered · reply < 24h', 'ph-check-circle', '100%', '.4s', 'delivered', 'rgba(74,222,128,.14)', '#4ade80'],
    ][phase];
    Object.assign(v, {
      sendLabel: P[0],
      sendIcon: P[1],
      sendW: P[2],
      sendDur: P[3],
      stLabel: P[4],
      stBg: P[5],
      stColor: P[6],
    });
    v.onSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (this.state.phase) return;
      this.setState({ phase: 1 });
      if (form.name && form.email && form.msg) {
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            company: form.company,
            projectInterest: form.spec,
            message: form.msg,
          }),
        }).catch(() => {});
      }
      this.ct = [
        setTimeout(() => this.setState({ phase: 2 }), 700),
        setTimeout(() => this.setState({ phase: 3 }), 1600),
        setTimeout(
          () => this.setState({ phase: 0, form: { name: '', email: '', company: '', spec: 'LLM Agents', msg: '' } }),
          4600
        ),
      ];
    };
    return v;
  }

  render() {
    const { active, open, filter, search, liked, selectedProject, selectedPost } = this.state;
    const q = search.trim().toLowerCase();
    const posts = POSTS.filter((p) => !q || [p.title, p.desc, p.kind, ...p.tags].join(' ').toLowerCase().includes(q)).map(
      (p) => {
        const l = !!liked[p.title];
        return {
          ...p,
          likes: p.likes + (l ? 1 : 0),
          likeIcon: l ? 'ph-fill ph-thumbs-up' : 'ph-thumbs-up',
          likeColor: l ? '#a78bfa' : '#c9c7de',
          like: () => this.setState((s) => ({ liked: { ...s.liked, [p.title]: !s.liked[p.title] } })),
        };
      }
    );

    const nav = NAV.map(([id, label, icon]) => {
      const on = active === id;
      return {
        id,
        label,
        icon,
        go: (e: React.MouseEvent) => this.go(id, e),
        color: on ? '#a78bfa' : '#a3a1bd',
        bg: on ? '#14132a' : 'transparent',
        fw: on ? 600 : 400,
      };
    });

    const marquee = Array.from({ length: 3 }, () => ['RAG Systems', 'LLM Agents', 'Computer Vision', 'Secure AI', 'Production ML'])
      .flat()
      .map((t, i) => ({
        t,
        c: i % 2 ? 'transparent' : '#f2f1fa',
        s: i % 2 ? '1px #8b7fd4' : '0',
      }));

    const exp = EXP.map((x, i) => ({
      ...x,
      open: open === i,
      rot: open === i ? '180deg' : '0deg',
      border: open === i ? '#4c3f8a' : '#2c2b48',
      ring: open === i || this.state.hx === i ? '#8b5cf6' : '#3a3958',
      ...(this.state.hx === i
        ? {
            scale: 1.18,
            iconBg: '#2a2550',
            iconColor: '#e4dcff',
            iconGlow: '0 0 18px -2px #8b5cf6',
            iconAnim: 'pf-bob .9s ease-in-out infinite',
            pingAnim: 'pf-ring 1.3s ease-out infinite',
          }
        : {
            scale: 1,
            iconBg: '#1f1f3c',
            iconColor: open === i ? '#c4b5fd' : '#8f8daa',
            iconGlow: 'none',
            iconAnim: 'none',
            pingAnim: 'none',
          }),
      enter: () => this.setState({ hx: i }),
      leave: () => this.setState({ hx: -1 }),
      toggle: () => this.setState({ open: open === i ? -1 : i }),
    }));

    const filters = FILTERS.map(([k, label]) => {
      const on = filter === k;
      return {
        label,
        pick: () => this.setState({ filter: k }),
        bg: on ? '#24233e' : 'transparent',
        color: on ? '#a78bfa' : '#d6d4e8',
        border: on ? '#34305a' : 'transparent',
      };
    });

    const projects = PROJECTS.filter((p) => filter === 'all' || p.key === filter).map((p, i) => {
      const hv = this.state.hp === p.key,
        flip = i % 2 === 1;
      return {
        ...p,
        idx: String(PROJECTS.indexOf(p) + 1).padStart(2, '0'),
        visOrder: flip ? 2 : 1,
        txtOrder: flip ? 1 : 2,
        glow: hv ? 1 : 0.35,
        winBorder: hv ? '#8b5cf6' : '#2f2e4c',
        numStroke: hv ? '#a78bfa' : '#4c4a6e',
        winTf: hv ? 'perspective(1200px) rotateY(0deg) translateY(-6px)' : `perspective(1200px) rotateY(${flip ? -6 : 6}deg)`,
        canvasRef: (el: HTMLCanvasElement | null) => {
          this.canv[p.key] = el;
        },
        isCanvas: !(p as any).anim,
        enter: () => {
          this.hov[p.key] = 1;
          this.setState({ hp: p.key });
        },
        leave: () => {
          this.hov[p.key] = 0;
          this.setState({ hp: null });
        },
      };
    });

    const COL: Record<string, [string, string, string]> = {
      Languages: ['#8b5cf6', 'rgba(139,92,246,.35)', 'rgba(139,92,246,.16)'],
      'Backend & data': ['#22c3a6', 'rgba(34,195,166,.3)', 'rgba(34,195,166,.13)'],
    };
    const elements = ELEMENTS.map((e, i) => {
      const [color, glow, tint] = COL[e.cat],
        on = (this.state.el ?? 0) === i;
      return {
        ...e,
        num: i + 1,
        color,
        glow,
        tint,
        border: on ? color : '#2f2e4c',
        shadow: on ? `0 0 0 1px ${color}, 0 18px 40px -18px ${color}` : 'none',
        bar: on ? 1 : 0.55,
        pick: () => this.setState({ el: i }),
      };
    });
    const el = elements[this.state.el ?? 0];
    const c = this.contactVals();

    return (
      <div style={{ minHeight: '100vh', background: '#1f1f3c' }}>
        {/* Navigation */}
        <nav
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 30,
            background: 'color-mix(in srgb, #1f1f3c 92%, transparent)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #2a2a4a',
          }}
        >
          <div
            ref={this.progRef}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: -1,
              height: 2,
              background: 'linear-gradient(90deg, #7c2df0, #a78bfa, #5b4ff0)',
              boxShadow: '0 0 12px #8b5cf6',
              transformOrigin: '0 50%',
              transform: 'scaleX(0)',
            }}
          />
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              padding: '14px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 24,
            }}
          >
            <a
              href="#home"
              onClick={(e) => this.go('home', e)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: '#fff',
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: '-0.02em',
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 5,
                  display: 'grid',
                  placeItems: 'center',
                  background: '#7c3aed',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                A
              </span>
              Aatif Khan
            </a>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {nav.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={n.go}
                  className="pf-nav-link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '6px 12px',
                    borderRadius: 7,
                    fontSize: 12.5,
                    fontWeight: n.fw,
                    color: n.color,
                    background: n.bg,
                    boxShadow: 'inset 0 0 0 1px transparent',
                    transition: 'color .2s, background .2s, box-shadow .2s, translate .2s',
                  }}
                >
                  <i className={`ph ${n.icon}`} style={{ fontSize: 13 }} />
                  {n.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: 'calc(100vh - 62px)',
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #2a2a4a',
          }}
        >
          {/* Aurora */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div
              style={{
                position: 'absolute',
                left: '8%',
                top: '12%',
                width: 460,
                height: 460,
                borderRadius: '50%',
                background: 'radial-gradient(closest-side, rgba(124,58,237,.28), transparent)',
                filter: 'blur(40px)',
                animation: 'pf-drift1 18s ease-in-out infinite',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: '6%',
                bottom: '6%',
                width: 520,
                height: 520,
                borderRadius: '50%',
                background: 'radial-gradient(closest-side, rgba(91,79,240,.22), transparent)',
                filter: 'blur(50px)',
                animation: 'pf-drift2 22s ease-in-out infinite',
              }}
            />
          </div>

          <canvas
            ref={this.netRef}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              willChange: 'opacity',
            }}
          />

          <div
            style={{
              position: 'relative',
              maxWidth: 1100,
              width: '100%',
              margin: '0 auto',
              padding: '80px 24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 100,
              alignItems: 'center',
            }}
          >
            {/* Hero Visual / Portrait Card */}
            <div
              data-reveal="0"
              ref={this.heroVisRef}
              style={{ position: 'relative', width: '100%', maxWidth: 382, willChange: 'transform' }}
            >
              <div
                ref={this.frameRef}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 12,
                  border: '1px solid rgba(167,139,250,.55)',
                  transform: 'translate(14px,14px)',
                  transition: 'transform .5s cubic-bezier(.2,.8,.2,1), border-color .4s',
                  pointerEvents: 'none',
                }}
              />
              <div
                ref={this.glowRef}
                style={{
                  position: 'absolute',
                  inset: -30,
                  borderRadius: 40,
                  background: 'radial-gradient(closest-side, rgba(124,58,237,.55), transparent)',
                  filter: 'blur(30px)',
                  opacity: 0.35,
                  transition: 'opacity .5s',
                  pointerEvents: 'none',
                }}
              />
              <div
                ref={this.cardRef}
                onMouseMove={this.tilt}
                onMouseLeave={this.tiltOut}
                onMouseEnter={this.tiltIn}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '382 / 430',
                  borderRadius: 10,
                  overflow: 'hidden',
                  boxShadow: '0 30px 60px -20px rgba(0,0,0,.5)',
                  transform: 'perspective(900px)',
                  transition: 'transform .5s cubic-bezier(.2,.8,.2,1), box-shadow .5s',
                  willChange: 'transform',
                  background: '#141327',
                }}
              >
                <img
                  src={developerPortrait}
                  alt="Aatif Khan Portrait"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: 10,
                  }}
                  referrerPolicy="no-referrer"
                />
                <div
                  ref={this.glareRef}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    opacity: 0,
                    transition: 'opacity .4s',
                    background: 'radial-gradient(320px circle at var(--gx, 50%) var(--gy, 0%), rgba(255,255,255,.22), transparent 60%)',
                    mixBlendMode: 'overlay',
                  }}
                />
                <div
                  ref={this.detectRef}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    opacity: 0,
                    transition: 'opacity .35s',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage:
                        'linear-gradient(rgba(167,139,250,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,.10) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />
                  {/* Scan bar */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      height: 60,
                      background: 'linear-gradient(180deg, transparent, rgba(167,139,250,.35) 85%, #c4b5fd)',
                      opacity: 0.55,
                      animation: 'pf-scanY 2.4s linear infinite',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: '22%',
                      top: '12%',
                      width: '52%',
                      height: '58%',
                      transition: 'transform .4s',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: 18,
                        height: 18,
                        borderLeft: '2px solid #a78bfa',
                        borderTop: '2px solid #a78bfa',
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        width: 18,
                        height: 18,
                        borderRight: '2px solid #a78bfa',
                        borderTop: '2px solid #a78bfa',
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: 18,
                        height: 18,
                        borderLeft: '2px solid #a78bfa',
                        borderBottom: '2px solid #a78bfa',
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: 18,
                        height: 18,
                        borderRight: '2px solid #a78bfa',
                        borderBottom: '2px solid #a78bfa',
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        left: -2,
                        top: -24,
                        padding: '2px 7px',
                        borderRadius: 3,
                        background: '#7c3aed',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        color: '#fff',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      person · 0.99
                    </span>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      right: 10,
                      bottom: 10,
                      padding: '5px 8px',
                      borderRadius: 4,
                      background: 'rgba(20,19,42,.85)',
                      border: '1px solid #34305a',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9.5,
                      lineHeight: 1.5,
                      color: '#c4b5fd',
                    }}
                  >
                    model: vision-v3
                    <br />
                    latency: 12ms
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: -14,
                  bottom: 28,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '7px 12px',
                  borderRadius: 7,
                  background: 'rgba(27,26,48,.82)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid #34305a',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: '#d6d4e8',
                  boxShadow: '0 12px 30px -12px rgba(0,0,0,.6)',
                  pointerEvents: 'none',
                }}
              >
                <span style={{ position: 'relative', width: 7, height: 7 }}>
                  <span
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      background: '#4ade80',
                      animation: 'pf-ping 1.6s ease-out infinite',
                    }}
                  />
                  <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#4ade80' }} />
                </span>
                Open to work
              </div>
            </div>

            {/* Hero Text */}
            <div ref={this.heroTxtRef} style={{ display: 'flex', flexDirection: 'column', willChange: 'transform, opacity' }}>
              <div
                data-reveal="1"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: '#8f8daa',
                }}
              >
                <span style={{ color: '#a78bfa' }}>&gt;</span>building
                <span style={{ color: '#c4b5fd' }}>{this.state.typed}</span>
                <span
                  style={{
                    display: 'inline-block',
                    width: 7,
                    height: 14,
                    marginLeft: -4,
                    background: '#a78bfa',
                    animation: 'pf-blink 1s steps(1) infinite',
                  }}
                />
              </div>
              <h1
                data-reveal="2"
                style={{
                  margin: '0 0 18px',
                  fontSize: 32,
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#fff',
                  display: 'flex',
                  gap: 9,
                  flexWrap: 'wrap',
                  cursor: 'default',
                }}
              >
                Hi, I'm{' '}
                <span
                  className="pf-hero-name"
                  style={{
                    background:
                      'linear-gradient(90deg, #ffffff 0%, #ffffff 40%, #c4b5fd 50%, #ffffff 60%, #ffffff 100%)',
                    backgroundSize: '250% 100%',
                    backgroundPosition: '100% 0',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    transition: 'background-position .9s ease',
                  }}
                >
                  Aatif
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    transformOrigin: '70% 80%',
                    animation: 'pf-wave 2.6s ease-in-out 1s infinite',
                    color: '#c4b5fd',
                  }}
                >
                  <i className="ph-fill ph-hand-waving" />
                </span>
              </h1>
              <p
                data-reveal="3"
                style={{
                  margin: 0,
                  fontSize: 18,
                  lineHeight: 1.65,
                  fontWeight: 300,
                  color: '#b8b6d0',
                  maxWidth: 580,
                }}
              >
                I design and build highly optimized, secure AI systems that think and solve in production
              </p>
              <div
                data-reveal="4"
                style={{ position: 'relative', height: 1, background: '#2c2c4c', margin: '34px 0 18px', overflow: 'hidden' }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: 1,
                    width: '25%',
                    background: 'linear-gradient(90deg, transparent, #a78bfa, transparent)',
                    animation: 'pf-scan 3.5s ease-in-out infinite',
                  }}
                />
              </div>
              <div data-reveal="5" style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
                <a
                  href="#work"
                  onClick={(e) => this.go('work', e)}
                  className="pf-hero-cta"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 0',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: '#c9c7de',
                    borderBottom: '1px solid transparent',
                    transition: 'color .2s, gap .25s, border-color .25s',
                  }}
                >
                  <i className="ph ph-arrow-elbow-down-right" style={{ color: '#a78bfa', fontSize: 14 }} />
                  Browse catalog
                </a>
                <a
                  href="#contact"
                  onClick={(e) => this.go('contact', e)}
                  className="pf-hero-cta"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 0',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: '#8f8daa',
                    borderBottom: '1px solid transparent',
                    transition: 'color .2s, gap .25s, border-color .25s',
                  }}
                >
                  <i className="ph ph-envelope-simple" style={{ fontSize: 14 }} />
                  Get in touch
                </a>
              </div>
            </div>
          </div>

          <a
            href="#about"
            onClick={(e) => this.go('about', e)}
            ref={this.cueRef}
            className="pf-scroll-cue"
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 28,
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: '.2em',
              color: '#8f8daa',
            }}
          >
            SCROLL
            <span
              style={{
                position: 'relative',
                width: 20,
                height: 32,
                borderRadius: 12,
                border: '1px solid #4c4a6e',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 6,
                  width: 4,
                  height: 7,
                  borderRadius: 2,
                  background: '#a78bfa',
                  animation: 'pf-cue 1.8s ease-in-out infinite',
                }}
              />
            </span>
          </a>
        </section>

        {/* Marquee Banner */}
        <div style={{ overflow: 'hidden', borderBottom: '1px solid #2a2a4a', padding: '22px 0', background: '#1b1a33' }}>
          <div
            ref={this.marqRef}
            style={{
              display: 'flex',
              gap: 40,
              whiteSpace: 'nowrap',
              willChange: 'transform',
              fontSize: 44,
              fontWeight: 600,
              letterSpacing: '-0.03em',
            }}
          >
            {marquee.map((m, idx) => (
              <span
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 40,
                  color: m.c,
                  WebkitTextStroke: m.s,
                }}
              >
                {m.t}
                <i className="ph-fill ph-asterisk-simple" style={{ fontSize: 22, color: '#8b5cf6', WebkitTextStroke: '0' }} />
              </span>
            ))}
          </div>
        </div>

        {/* About Section */}
        <section id="about" style={{ borderBottom: '1px solid #2a2a4a' }}>
          <div style={{ maxWidth: 880, margin: '0 auto', padding: '96px 24px' }}>
            <h2 style={{ margin: '0 0 30px', fontSize: 34, fontWeight: 600, letterSpacing: '-0.035em', color: '#fff' }}>
              About Me
            </h2>
            <p style={{ margin: 0, fontSize: 17.5, lineHeight: 1.72, fontWeight: 300, color: '#b8b6d0', maxWidth: 760 }}>
              I am an electrical engineer who sits at the intersection of hardware and software. I believe that software is a
              discipline of craftsmanship. My mission is to bridge advanced artificial intelligence with highly optimal,
              predictable computer science architecture.
            </p>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" style={{ borderBottom: '1px solid #2a2a4a' }}>
          <div style={{ maxWidth: 880, margin: '0 auto', padding: '96px 24px 96px' }}>
            <h2 style={{ margin: '0 0 14px', fontSize: 34, fontWeight: 600, letterSpacing: '-0.035em', color: '#fff' }}>
              My Journey &amp; Experience
            </h2>
            <p style={{ margin: '0 0 64px', fontSize: 14, lineHeight: 1.65, color: '#b8b6d0', maxWidth: 620 }}>
              A chronological tree of my career milestones, academic foundation, and technical history. Click any milestone to
              unfold details.
            </p>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div ref={this.tlRef} style={{ position: 'absolute', left: 16, top: 20, bottom: 20, width: 1, background: '#2c2c4c' }}>
                <div
                  ref={this.tlFillRef}
                  style={{
                    position: 'absolute',
                    left: -1,
                    top: 0,
                    width: 3,
                    height: 0,
                    borderRadius: 2,
                    background: 'linear-gradient(180deg, #a78bfa, #7c3aed)',
                    boxShadow: '0 0 12px #8b5cf6',
                  }}
                />
              </div>
              {exp.map((x, idx) => (
                <div
                  key={idx}
                  data-exp-row="1"
                  onMouseEnter={x.enter}
                  onMouseLeave={x.leave}
                  style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}
                >
                  <span
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      width: 32,
                      height: 32,
                      flex: 'none',
                      marginTop: 6,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      border: `1px solid ${x.ring}`,
                      background: x.iconBg,
                      color: x.iconColor,
                      fontSize: 14,
                      boxShadow: x.iconGlow,
                      transform: `scale(${x.scale})`,
                      transition:
                        'border-color .3s, background .3s, color .3s, box-shadow .3s, transform .4s cubic-bezier(.3,1.6,.5,1)',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        inset: -1,
                        borderRadius: '50%',
                        border: '1px solid #a78bfa',
                        opacity: 0,
                        animation: x.pingAnim,
                        pointerEvents: 'none',
                      }}
                    />
                    <i className={`ph ${x.icon}`} style={{ display: 'block', animation: x.iconAnim }} />
                  </span>
                  <div
                    onMouseMove={this.spot}
                    className="pf-exp-card"
                    style={{
                      flex: 1,
                      minWidth: 0,
                      borderRadius: 10,
                      background:
                        'radial-gradient(420px circle at var(--mx, -400px) var(--my, -400px), rgba(124,58,237,.16), transparent 60%), #1b1a30',
                      border: `1px solid ${x.border}`,
                      transition: 'border-color .25s, translate .25s, box-shadow .3s',
                    }}
                  >
                    <button
                      onClick={x.toggle}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        padding: '26px 24px',
                        background: 'transparent',
                        border: 0,
                        cursor: 'pointer',
                        textAlign: 'left',
                        font: 'inherit',
                        color: 'inherit',
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.02em', color: '#fff' }}>{x.title}</div>
                        <div style={{ fontSize: 13.5, fontWeight: 500, color: '#a78bfa', marginTop: 8 }}>{x.org}</div>
                      </div>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '5px 12px',
                          borderRadius: 4,
                          border: '1px solid #b8b6d0',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11.5,
                          color: '#d6d4e8',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <i className="ph ph-calendar-blank" />
                        {x.date}
                      </span>
                      <span
                        style={{
                          width: 26,
                          height: 26,
                          flex: 'none',
                          borderRadius: 5,
                          border: '1px solid #b8b6d0',
                          display: 'grid',
                          placeItems: 'center',
                          color: '#d6d4e8',
                          fontSize: 12,
                          transform: `rotate(${x.rot})`,
                          transition: 'transform .3s',
                        }}
                      >
                        <i className="ph ph-caret-down" />
                      </span>
                    </button>
                    {x.open && (
                      <div style={{ padding: '0 24px 24px', borderTop: '1px solid #2c2b48' }}>
                        <ul
                          style={{
                            margin: '18px 0 0',
                            paddingLeft: 18,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8,
                            fontSize: 14,
                            lineHeight: 1.6,
                            color: '#b8b6d0',
                          }}
                        >
                          {x.points.map((p, pIdx) => (
                            <li key={pIdx}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work / Projects Section */}
        <section id="work" style={{ borderBottom: '1px solid #2a2a4a' }}>
          <div style={{ maxWidth: 1264, margin: '0 auto', padding: '96px 24px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: 24,
                flexWrap: 'wrap',
                marginBottom: 48,
              }}
            >
              <div>
                <h2 style={{ margin: '0 0 14px', fontSize: 34, fontWeight: 600, letterSpacing: '-0.035em', color: '#fff' }}>
                  Projects &amp; Builds
                </h2>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: '#b8b6d0', maxWidth: 520 }}>
                  Production-grade code repositories, architectural designs, and customized pipelines optimized for throughput,
                  safety, and agent precision.
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 4,
                  padding: 4,
                  borderRadius: 7,
                  background: '#19182d',
                  border: '1px solid #2c2b48',
                }}
              >
                {filters.map((f, fIdx) => (
                  <button
                    key={fIdx}
                    onClick={f.pick}
                    className="pf-filter-btn"
                    style={{
                      padding: '6px 13px',
                      borderRadius: 5,
                      border: `1px solid ${f.border}`,
                      background: f.bg,
                      color: f.color,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'color .2s, background .2s',
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
              {projects.map((p) => (
                <div
                  key={p.key}
                  data-work-row="1"
                  onMouseEnter={p.enter}
                  onMouseLeave={p.leave}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                    gap: 48,
                    alignItems: 'center',
                  }}
                >
                  <div style={{ order: p.visOrder, position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        inset: -24,
                        borderRadius: 30,
                        background: 'radial-gradient(closest-side, rgba(124,58,237,.35), transparent)',
                        filter: 'blur(28px)',
                        opacity: p.glow,
                        transition: 'opacity .5s',
                        pointerEvents: 'none',
                      }}
                    />
                    <div
                      style={{
                        position: 'relative',
                        borderRadius: 12,
                        overflow: 'hidden',
                        background: '#141327',
                        border: `1px solid ${p.winBorder}`,
                        boxShadow: '0 30px 70px -30px rgba(0,0,0,.7)',
                        transform: p.winTf,
                        transition: 'transform .6s cubic-bezier(.2,.8,.2,1), border-color .4s',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '10px 14px',
                          background: '#1a1930',
                          borderBottom: '1px solid #2c2b48',
                        }}
                      >
                        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#3a3958' }} />
                        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#3a3958' }} />
                        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#3a3958' }} />
                        <span style={{ marginLeft: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#8f8daa' }}>
                          {p.file}
                        </span>
                        <span
                          style={{
                            marginLeft: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 10,
                            color: '#4ade80',
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              background: '#4ade80',
                              boxShadow: '0 0 8px #4ade80',
                            }}
                          />
                          running
                        </span>
                      </div>
                      {p.isCanvas && (
                        <canvas ref={p.canvasRef} style={{ display: 'block', width: '100%', aspectRatio: '16 / 10' }} />
                      )}
                      {(p as any).anim && (
                        <iframe
                          src={(p as any).anim}
                          title="RAG ingestion animation"
                          loading="lazy"
                          style={{
                            display: 'block',
                            width: '100%',
                            aspectRatio: '16 / 9',
                            border: 0,
                            background: '#141327',
                            pointerEvents: 'none',
                          }}
                          tabIndex={-1}
                        />
                      )}
                    </div>
                  </div>

                  <div style={{ order: p.txtOrder, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                      <span
                        style={{
                          fontSize: 64,
                          fontWeight: 600,
                          letterSpacing: '-0.05em',
                          lineHeight: 0.9,
                          color: 'transparent',
                          WebkitTextStroke: `1px ${p.numStroke}`,
                          transition: '-webkit-text-stroke-color .4s',
                        }}
                      >
                        {p.idx}
                      </span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10.5,
                          fontWeight: 500,
                          letterSpacing: '.1em',
                          color: '#a78bfa',
                        }}
                      >
                        {p.cat}
                      </span>
                    </div>
                    <h3 style={{ margin: '16px 0 0', fontSize: 30, fontWeight: 600, letterSpacing: '-0.03em', color: '#fff' }}>
                      {p.title}
                    </h3>
                    <p style={{ margin: '14px 0 0', fontSize: 14, lineHeight: 1.7, color: '#b8b6d0', maxWidth: 520 }}>{p.desc}</p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        marginTop: 22,
                        padding: '14px 16px',
                        borderRadius: 8,
                        background: 'linear-gradient(90deg, rgba(124,58,237,.16), transparent)',
                        borderLeft: '2px solid #8b5cf6',
                        maxWidth: 520,
                      }}
                    >
                      <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.03em', color: '#fff', whiteSpace: 'nowrap' }}>
                        {p.stat}
                      </span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11,
                          lineHeight: 1.5,
                          color: '#c9c7de',
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {p.statLabel}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 20 }}>
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="pf-proj-tag"
                          style={{
                            padding: '4px 10px',
                            borderRadius: 4,
                            background: '#24233e',
                            border: '1px solid transparent',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 10.5,
                            color: '#c9c7de',
                            cursor: 'default',
                            transition: 'color .2s, border-color .2s, background .2s, translate .2s',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        flexWrap: 'wrap',
                        marginTop: 26,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 12,
                      }}
                    >
                      <a
                        href={p.githubUrl || 'https://github.com/aatif-pathan001'}
                        target="_blank"
                        rel="noreferrer"
                        className="pf-btn-source"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 7,
                          padding: '9px 14px',
                          borderRadius: 6,
                          background: 'linear-gradient(90deg, #7c2df0, #5b4ff0)',
                          color: '#fff',
                          transition: 'filter .2s, translate .2s',
                        }}
                      >
                        <i className="ph ph-github-logo" />
                        Source
                      </a>
                      {p.demo && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="pf-btn-outline"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 7,
                            padding: '8px 13px',
                            borderRadius: 6,
                            border: '1px solid #4c3f8a',
                            color: '#d6d4e8',
                            transition: 'border-color .2s, color .2s, translate .2s',
                          }}
                        >
                          <i className="ph ph-arrow-square-out" />
                          Live Demo
                        </a>
                      )}
                      <a
                        href="#work"
                        onClick={(e) => {
                          e.preventDefault();
                          const found = FALLBACK_PROJECTS.find((fp) => fp.id === p.id) || null;
                          this.setState({ selectedProject: found });
                        }}
                        className="pf-btn-outline"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 7,
                          padding: '8px 13px',
                          borderRadius: 6,
                          border: '1px solid #2c2b48',
                          color: '#c9c7de',
                          transition: 'border-color .2s, color .2s, translate .2s',
                        }}
                      >
                        <i className="ph ph-eye" />
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Writing Section */}
        <section id="writing" style={{ borderBottom: '1px solid #2a2a4a' }}>
          <div style={{ maxWidth: 1008, margin: '0 auto', padding: '96px 24px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: 24,
                flexWrap: 'wrap',
                marginBottom: 48,
              }}
            >
              <div>
                <h2 style={{ margin: '0 0 14px', fontSize: 34, fontWeight: 600, letterSpacing: '-0.035em', color: '#fff' }}>
                  Technical Writings
                </h2>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: '#b8b6d0', maxWidth: 560 }}>
                  Concrete walkthroughs, research summaries, and systems strategies written to demystify complex neural execution
                  architectures in real production states.
                </p>
              </div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: 318,
                  maxWidth: '100%',
                  padding: '8px 12px',
                  borderRadius: 5,
                  background: '#19182d',
                  border: '1px solid #2c2b48',
                }}
              >
                <i className="ph ph-magnifying-glass" style={{ color: '#8f8daa' }} />
                <input
                  value={search}
                  onChange={(e) => this.setState({ search: e.target.value })}
                  placeholder="Search concepts or components..."
                  style={{
                    flex: 1,
                    minWidth: 0,
                    border: 0,
                    outline: 0,
                    background: 'transparent',
                    color: '#f2f1fa',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11.5,
                  }}
                />
              </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {posts.map((w) => (
                <article
                  key={w.title}
                  onMouseMove={this.spot}
                  className="pf-post-card"
                  style={{
                    padding: 24,
                    borderRadius: 9,
                    background:
                      'radial-gradient(520px circle at var(--mx, -500px) var(--my, -500px), rgba(124,58,237,.18), transparent 55%), #1c1b33',
                    border: '1.5px solid #d6d4ec',
                    transition: 'translate .25s, border-color .25s, box-shadow .25s',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      flexWrap: 'wrap',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10.5,
                      color: '#8f8daa',
                    }}
                  >
                    <span
                      style={{
                        padding: '3px 7px',
                        borderRadius: 3,
                        background: '#2a2550',
                        border: '1px solid #34305a',
                        color: '#a78bfa',
                        fontWeight: 500,
                      }}
                    >
                      {w.kind}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <i className="ph ph-calendar-blank" />
                      {w.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <i className="ph ph-clock" />
                      {w.read}
                    </span>
                    <span
                      style={{
                        padding: '2px 6px',
                        borderRadius: 3,
                        background: '#121212',
                        color: '#e8e2c4',
                        fontSize: 9.5,
                        fontWeight: 500,
                      }}
                    >
                      Medium.com
                    </span>
                  </div>
                  <h3
                    style={{
                      margin: '16px 0 0',
                      fontFamily: "'Libre Baskerville', Georgia, serif",
                      fontSize: 19,
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      lineHeight: 1.35,
                      color: '#fff',
                    }}
                  >
                    {w.title}
                  </h3>
                  <p style={{ margin: '10px 0 0', fontSize: 12.5, lineHeight: 1.6, color: '#b8b6d0' }}>{w.desc}</p>
                  <div style={{ height: 1, background: '#2c2b48', margin: '20px 0 14px' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    {w.tags.map((t) => (
                      <span
                        key={t}
                        className="pf-post-tag"
                        style={{
                          padding: '3px 8px',
                          borderRadius: 3,
                          background: '#24233e',
                          border: '1px solid transparent',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 9.5,
                          color: '#7d7b98',
                          cursor: 'default',
                          transition: 'color .2s, border-color .2s',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                    <button
                      onClick={w.like}
                      className="pf-text-hover-light"
                      style={{
                        marginLeft: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '4px 6px',
                        border: 0,
                        background: 'transparent',
                        cursor: 'pointer',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 12,
                        color: w.likeColor,
                      }}
                    >
                      <i className={`ph ${w.likeIcon}`} style={{ fontSize: 15 }} />
                      {w.likes}
                    </button>
                    <a
                      href={w.url}
                      onClick={(e) => {
                        e.preventDefault();
                        const found = FALLBACK_BLOG_POSTS.find((bp) => bp.id === w.id) || null;
                        this.setState({ selectedPost: found });
                      }}
                      className="pf-text-hover-light"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10.5,
                        fontWeight: 600,
                        letterSpacing: '.06em',
                        color: '#a78bfa',
                      }}
                    >
                      ARTICLE <i className="ph ph-caret-right" />
                    </a>
                  </div>
                </article>
              ))}
              {posts.length === 0 && (
                <div
                  style={{
                    padding: 32,
                    textAlign: 'center',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: '#7d7b98',
                    border: '1px dashed #2c2b48',
                    borderRadius: 9,
                  }}
                >
                  No writings match that search.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Skill Stack Section */}
        <section id="stack" style={{ borderBottom: '1px solid #2a2a4a' }}>
          <div style={{ maxWidth: 1008, margin: '0 auto', padding: '96px 24px' }}>
            <h2 style={{ margin: '0 0 14px', fontSize: 34, fontWeight: 600, letterSpacing: '-0.035em', color: '#fff' }}>
              Skill Stack
            </h2>
            <p style={{ margin: '0 0 52px', fontSize: 14, lineHeight: 1.5, color: '#b8b6d0', maxWidth: 560 }}>
              A comprehensive overview of production engines, core compilers, database systems, and runtime orchestration tools
              representing my deep professional focus.
            </p>
            <div
              data-stack-grid="1"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 40,
                alignItems: 'start',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  maxWidth: 260,
                  width: '100%',
                  aspectRatio: '1 / 1.08',
                  borderRadius: 10,
                  padding: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  background: `radial-gradient(circle at 70% 20%, ${el.glow}, transparent 60%), #1c1b33`,
                  border: `1.5px solid ${el.color}`,
                  boxShadow: `0 30px 60px -30px ${el.color}`,
                  transition: 'border-color .35s, box-shadow .35s, background .35s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontFamily: "'JetBrains Mono', monospace" }}>
                  <span style={{ fontSize: 22, fontWeight: 600, color: '#fff' }}>{el.num}</span>
                  <span style={{ fontSize: 22, fontWeight: 600, color: '#fff', letterSpacing: '-0.03em' }}>{el.sym}</span>
                </div>
                <div style={{ flex: 1, display: 'grid', placeItems: 'center' }}>
                  <span
                    style={{
                      width: '46%',
                      aspectRatio: '1 / 1',
                      background: `url(${el.logo}) center / contain no-repeat`,
                      filter: `drop-shadow(0 0 28px ${el.color})`,
                      transition: 'filter .35s',
                    }}
                  />
                </div>
                <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', color: '#fff' }}>{el.name}</div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 6,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10.5,
                    color: '#b0aec8',
                  }}
                >
                  <span style={{ color: el.color }}>{el.cat}</span>
                  <span>group {el.group}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <div
                  style={{
                    display: 'flex',
                    gap: 20,
                    flexWrap: 'wrap',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10.5,
                    color: '#b0aec8',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: '#8b5cf6' }} />
                    Languages
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: '#22c3a6' }} />
                    Backend &amp; data store
                  </span>
                  <span style={{ marginLeft: 'auto', color: '#5f5d7a' }}>hover an element</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(112px, 1fr))', gap: 10 }}>
                  {elements.map((e) => (
                    <div
                      key={e.sym}
                      onMouseEnter={e.pick}
                      className="pf-el-tile"
                      style={{
                        position: 'relative',
                        aspectRatio: '1 / 1.12',
                        borderRadius: 8,
                        padding: '9px 10px',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'default',
                        background: `linear-gradient(160deg, ${e.tint}, #1c1b33 70%)`,
                        border: `1px solid ${e.border}`,
                        boxShadow: e.shadow,
                        transition: 'translate .3s cubic-bezier(.2,.8,.2,1), border-color .3s, box-shadow .3s',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11,
                          color: '#d6d4e8',
                        }}
                      >
                        <span>{e.num}</span>
                        <span
                          style={{
                            width: 18,
                            height: 18,
                            opacity: 0.9,
                            background: `url(${e.logo}) center / contain no-repeat`,
                          }}
                        />
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: 34,
                          fontWeight: 600,
                          letterSpacing: '-0.03em',
                          color: '#fff',
                        }}
                      >
                        {e.sym}
                      </div>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10.5,
                          color: '#d6d4e8',
                          textAlign: 'center',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {e.name}
                      </div>
                      <span
                        style={{
                          position: 'absolute',
                          left: 10,
                          right: 10,
                          bottom: 0,
                          height: 2,
                          borderRadius: 2,
                          background: e.color,
                          opacity: e.bar,
                          transition: 'opacity .3s',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid #2a2a4a' }}>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '40%',
              width: 900,
              height: 600,
              marginLeft: -450,
              background: 'radial-gradient(closest-side, rgba(124,58,237,.18), transparent)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', maxWidth: 1120, margin: '0 auto', padding: '96px 24px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: 24,
                flexWrap: 'wrap',
                marginBottom: 44,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    letterSpacing: '.14em',
                    color: '#a78bfa',
                    marginBottom: 12,
                  }}
                >
                  // OPEN CHANNEL
                </div>
                <h2 style={{ margin: '0 0 14px', fontSize: 34, fontWeight: 600, letterSpacing: '-0.035em', color: '#fff' }}>
                  Get in touch
                </h2>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#b8b6d0', maxWidth: 520 }}>
                  I'm always open to discussing new projects, technical workflows, or architectural inquiries. Compose a request
                  below and watch it compile.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a
                  href="mailto:aatifkhanjodhpur@gmail.com"
                  className="pf-social-pill"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '9px 14px',
                    borderRadius: 8,
                    border: '1px solid #2f2e4c',
                    background: '#1b1a30',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: '#d6d4e8',
                    transition: 'border-color .2s, translate .2s, color .2s',
                  }}
                >
                  <i className="ph ph-envelope-simple" />
                  Email
                </a>
                <a
                  href="https://www.linkedin.com/in/aatif-khan-pathan-a1674617b"
                  target="_blank"
                  rel="noreferrer"
                  className="pf-social-pill"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '9px 14px',
                    borderRadius: 8,
                    border: '1px solid #2f2e4c',
                    background: '#1b1a30',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: '#d6d4e8',
                    transition: 'border-color .2s, translate .2s, color .2s',
                  }}
                >
                  <i className="ph ph-linkedin-logo" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/aatif-pathan001"
                  target="_blank"
                  rel="noreferrer"
                  className="pf-social-pill"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '9px 14px',
                    borderRadius: 8,
                    border: '1px solid #2f2e4c',
                    background: '#1b1a30',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: '#d6d4e8',
                    transition: 'border-color .2s, translate .2s, color .2s',
                  }}
                >
                  <i className="ph ph-github-logo" />
                  GitHub
                </a>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                borderRadius: 14,
                overflow: 'hidden',
                border: '1px solid #34305a',
                background: 'rgba(27,26,48,.7)',
                backdropFilter: 'blur(14px)',
                boxShadow: '0 40px 90px -40px rgba(124,58,237,.6)',
              }}
            >
              <form onSubmit={c.onSubmit} style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 8,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: '#8f8daa',
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#4ade80',
                      boxShadow: '0 0 10px #4ade80',
                    }}
                  />
                  agent://aatif <span style={{ color: '#5f5d7a' }}>—</span>{' '}
                  <span style={{ color: '#c4b5fd' }}>inquiry.compose()</span>
                  <span style={{ marginLeft: 'auto', color: '#5f5d7a' }}>replies &lt; 24h</span>
                </div>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 14px',
                    borderRadius: 8,
                    background: '#141327',
                    border: `1px solid ${c.f_name}`,
                    transition: 'border-color .25s, box-shadow .25s',
                  }}
                >
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#a78bfa', whiteSpace: 'nowrap' }}>
                    &gt; name
                  </span>
                  <input
                    name="name"
                    value={c.v_name}
                    onChange={c.set_name}
                    onFocus={c.foc_name}
                    onBlur={c.blur}
                    placeholder="Sarah Chen"
                    style={{
                      flex: 1,
                      minWidth: 0,
                      border: 0,
                      outline: 0,
                      background: 'transparent',
                      color: '#f2f1fa',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12.5,
                    }}
                  />
                  <i className="ph ph-user" style={{ color: c.ic_name, fontSize: 15, transition: 'color .25s' }} />
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 14px',
                    borderRadius: 8,
                    background: '#141327',
                    border: `1px solid ${c.f_email}`,
                    transition: 'border-color .25s, box-shadow .25s',
                  }}
                >
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#a78bfa', whiteSpace: 'nowrap' }}>
                    &gt; email
                  </span>
                  <input
                    name="email"
                    type="email"
                    value={c.v_email}
                    onChange={c.set_email}
                    onFocus={c.foc_email}
                    onBlur={c.blur}
                    placeholder="sarah@corp.io"
                    style={{
                      flex: 1,
                      minWidth: 0,
                      border: 0,
                      outline: 0,
                      background: 'transparent',
                      color: '#f2f1fa',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12.5,
                    }}
                  />
                  <i className="ph ph-envelope-simple" style={{ color: c.ic_email, fontSize: 15, transition: 'color .25s' }} />
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 14px',
                    borderRadius: 8,
                    background: '#141327',
                    border: `1px solid ${c.f_company}`,
                    transition: 'border-color .25s, box-shadow .25s',
                  }}
                >
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#a78bfa', whiteSpace: 'nowrap' }}>
                    &gt; company
                  </span>
                  <input
                    name="company"
                    value={c.v_company}
                    onChange={c.set_company}
                    onFocus={c.foc_company}
                    onBlur={c.blur}
                    placeholder="AetherLabs Inc"
                    style={{
                      flex: 1,
                      minWidth: 0,
                      border: 0,
                      outline: 0,
                      background: 'transparent',
                      color: '#f2f1fa',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12.5,
                    }}
                  />
                  <i className="ph ph-buildings" style={{ color: c.ic_company, fontSize: 15, transition: 'color .25s' }} />
                </label>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 9,
                    padding: '12px 14px',
                    borderRadius: 8,
                    background: '#141327',
                    border: '1px solid #2f2e4c',
                  }}
                >
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#a78bfa' }}>&gt; specialty</span>
                  <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                    {c.specs.map((sp: any) => (
                      <button
                        key={sp.label}
                        type="button"
                        onClick={sp.pick}
                        className="pf-spec-btn"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '6px 11px',
                          borderRadius: 6,
                          border: `1px solid ${sp.border}`,
                          background: sp.bg,
                          color: sp.color,
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11.5,
                          cursor: 'pointer',
                          transition: 'border-color .2s, background .2s, color .2s, translate .2s',
                        }}
                      >
                        <i className={`ph ${sp.icon}`} />
                        {sp.label}
                      </button>
                    ))}
                  </div>
                </div>

                <label
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    padding: '12px 14px',
                    borderRadius: 8,
                    background: '#141327',
                    border: `1px solid ${c.f_msg}`,
                    transition: 'border-color .25s',
                  }}
                >
                  <span style={{ display: 'flex', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#a78bfa' }}>
                    &gt; payload
                    <span style={{ marginLeft: 'auto', color: '#5f5d7a' }}>{c.tokens} tokens</span>
                  </span>
                  <textarea
                    name="msg"
                    rows={4}
                    value={c.v_msg}
                    onChange={c.set_msg}
                    onFocus={c.foc_msg}
                    onBlur={c.blur}
                    placeholder="Describe your workflow parameters, deployment blockers, or architectural needs..."
                    style={{
                      resize: 'vertical',
                      border: 0,
                      outline: 0,
                      background: 'transparent',
                      color: '#f2f1fa',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12.5,
                      lineHeight: 1.6,
                    }}
                  />
                </label>

                <button
                  type="submit"
                  className="pf-submit-btn"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    marginTop: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 9,
                    padding: 14,
                    border: 0,
                    borderRadius: 8,
                    background: '#2a2550',
                    color: '#fff',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12.5,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'translate .2s, box-shadow .3s',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: c.sendW,
                      background: 'linear-gradient(90deg, #7c2df0, #5b4ff0)',
                      transition: `width ${c.sendDur} cubic-bezier(.4,0,.2,1)`,
                    }}
                  />
                  <span style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 9 }}>
                    <i className={`ph ${c.sendIcon}`} />
                    {c.sendLabel}
                  </span>
                </button>
              </form>

              <div
                style={{
                  position: 'relative',
                  padding: 26,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  background: '#141327',
                  borderLeft: '1px solid #2c2b48',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: '#8f8daa',
                  }}
                >
                  <i className="ph ph-brackets-curly" style={{ color: '#a78bfa' }} />
                  inquiry.json
                  <span
                    style={{
                      marginLeft: 'auto',
                      padding: '2px 7px',
                      borderRadius: 4,
                      background: c.stBg,
                      color: c.stColor,
                    }}
                  >
                    {c.stLabel}
                  </span>
                </div>
                <div
                  style={{
                    flex: 1,
                    margin: 0,
                    padding: 16,
                    borderRadius: 8,
                    background: '#100f20',
                    border: '1px solid #24233e',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    lineHeight: 1.85,
                    color: '#8f8daa',
                    minHeight: 240,
                  }}
                >
                  <div style={{ color: '#5f5d7a' }}>{'{'}</div>
                  {c.json.map((j: any) => (
                    <div key={j.k} style={{ paddingLeft: 18, wordBreak: 'break-word' }}>
                      <span style={{ color: '#a78bfa' }}>"{j.k}"</span>
                      <span style={{ color: '#5f5d7a' }}>: </span>
                      <span
                        style={{
                          color: j.c,
                          background: j.hl,
                          borderRadius: 3,
                          transition: 'background .3s',
                        }}
                      >
                        {j.v}
                      </span>
                      <span style={{ color: '#5f5d7a' }}>{j.comma}</span>
                    </div>
                  ))}
                  <div style={{ color: '#5f5d7a' }}>{'}'}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, fontFamily: "'JetBrains Mono', monospace" }}>
                  <div style={{ padding: '10px 12px', borderRadius: 8, background: '#1b1a30', border: '1px solid #24233e' }}>
                    <div style={{ fontSize: 9.5, color: '#5f5d7a' }}>FIELDS</div>
                    <div style={{ marginTop: 4, fontSize: 15, color: '#fff' }}>{c.filled}/5</div>
                  </div>
                  <div style={{ padding: '10px 12px', borderRadius: 8, background: '#1b1a30', border: '1px solid #24233e' }}>
                    <div style={{ fontSize: 9.5, color: '#5f5d7a' }}>TOKENS</div>
                    <div style={{ marginTop: 4, fontSize: 15, color: '#fff' }}>{c.tokens}</div>
                  </div>
                  <div style={{ padding: '10px 12px', borderRadius: 8, background: '#1b1a30', border: '1px solid #24233e' }}>
                    <div style={{ fontSize: 9.5, color: '#5f5d7a' }}>LOCAL TIME</div>
                    <div style={{ marginTop: 4, fontSize: 15, color: '#fff' }}>{c.clock}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            maxWidth: 1264,
            margin: '0 auto',
            padding: '44px 24px 52px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 5,
              display: 'grid',
              placeItems: 'center',
              background: '#7c3aed',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            A
          </span>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, letterSpacing: '.1em', color: '#fff' }}>
              AATIF KHAN
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, color: '#7d7b98', marginTop: 3 }}>
              Systems AI Specialty • © 2026
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 28, fontSize: 18 }}>
            <a
              href="https://github.com/aatif-pathan001"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="pf-footer-link"
              style={{ color: '#c9c7de' }}
            >
              <i className="ph ph-github-logo" />
            </a>
            <a
              href="https://www.linkedin.com/in/aatif-khan-pathan-a1674617b"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="pf-footer-link"
              style={{ color: '#c9c7de' }}
            >
              <i className="ph ph-linkedin-logo" />
            </a>
            <a
              href="#home"
              onClick={(e) => this.go('home', e)}
              aria-label="Website"
              className="pf-footer-link"
              style={{ color: '#c9c7de' }}
            >
              <i className="ph ph-globe" />
            </a>
          </div>
        </footer>

        {/* Back to Top Button */}
        <button
          ref={this.topRef}
          onClick={(e) => this.go('home', e)}
          aria-label="Back to top"
          className="pf-top-btn"
          style={{
            position: 'fixed',
            right: 24,
            bottom: 24,
            zIndex: 40,
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: 0,
            padding: 0,
            background: '#1b1a30',
            color: '#c4b5fd',
            cursor: 'pointer',
            display: 'grid',
            placeItems: 'center',
            opacity: 0,
            transform: 'translateY(16px) scale(.9)',
            pointerEvents: 'none',
            transition: 'opacity .35s, transform .35s, box-shadow .3s',
            boxShadow: '0 12px 30px -10px rgba(0,0,0,.6)',
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" style={{ position: 'absolute', inset: 0 }}>
            <circle cx="24" cy="24" r="21" fill="none" stroke="#2f2e4c" strokeWidth="2" />
            <circle
              ref={this.ringRef}
              cx="24"
              cy="24"
              r="21"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="131.9"
              strokeDashoffset="131.9"
              transform="rotate(-90 24 24)"
            />
          </svg>
          <i className="ph-bold ph-arrow-up" style={{ position: 'relative', fontSize: 16 }} />
        </button>

        {/* Project Details Modal */}
        {selectedProject && (
          <div
            onClick={() => this.setState({ selectedProject: null })}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
              background: 'rgba(20, 19, 39, 0.82)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: 680,
                borderRadius: 12,
                overflow: 'hidden',
                background: '#1b1a30',
                border: '1px solid #34305a',
                boxShadow: '0 40px 90px -30px rgba(0,0,0,.8)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  padding: '20px 24px',
                  borderBottom: '1px solid #2c2b48',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.1em', color: '#a78bfa' }}>
                    {selectedProject.cat || selectedProject.category}
                  </span>
                  <h3 style={{ margin: '6px 0 0', fontSize: 22, fontWeight: 600, color: '#fff' }}>{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => this.setState({ selectedProject: null })}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    border: '1px solid #2c2b48',
                    background: '#141327',
                    color: '#b8b6d0',
                    cursor: 'pointer',
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{ padding: 24, maxHeight: '60vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ fontSize: 14, lineHeight: 1.7, color: '#d6d4e8', whiteSpace: 'pre-wrap' }}>
                  {selectedProject.longDescription || selectedProject.description}
                </div>
                {selectedProject.highlightedMetric && (
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: 8,
                      background: '#141327',
                      border: '1px solid #2c2b48',
                      borderLeft: '2px solid #8b5cf6',
                    }}
                  >
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8f8daa' }}>
                      EVALUATED PERFORMANCE IMPACT
                    </div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#c4b5fd', marginTop: 4 }}>
                      {selectedProject.highlightedMetric}
                    </div>
                  </div>
                )}
              </div>
              <div
                style={{
                  padding: '14px 24px',
                  background: '#141327',
                  borderTop: '1px solid #2c2b48',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                }}
              >
                <span style={{ color: '#7d7b98', fontSize: 11 }}>ID: {selectedProject.id}</span>
                <div style={{ display: 'flex', gap: 10 }}>
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        padding: '7px 14px',
                        borderRadius: 6,
                        background: 'linear-gradient(90deg, #7c2df0, #5b4ff0)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <i className="ph ph-github-logo" /> Source
                    </a>
                  )}
                  <button
                    onClick={() => this.setState({ selectedProject: null })}
                    style={{
                      padding: '7px 14px',
                      borderRadius: 6,
                      border: '1px solid #2c2b48',
                      background: 'transparent',
                      color: '#c9c7de',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontSize: 12,
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article Reader Modal */}
        {selectedPost && (
          <div
            onClick={() => this.setState({ selectedPost: null })}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
              background: 'rgba(20, 19, 39, 0.82)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: 740,
                borderRadius: 12,
                overflow: 'hidden',
                background: '#1b1a30',
                border: '1px solid #34305a',
                boxShadow: '0 40px 90px -30px rgba(0,0,0,.8)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  padding: '20px 24px',
                  borderBottom: '1px solid #2c2b48',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#a78bfa' }}>
                    {selectedPost.category} • {selectedPost.date} • {selectedPost.readTime}
                  </div>
                  <h3
                    style={{
                      margin: '6px 0 0',
                      fontFamily: "'Libre Baskerville', Georgia, serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: '#fff',
                    }}
                  >
                    {selectedPost.title}
                  </h3>
                </div>
                <button
                  onClick={() => this.setState({ selectedPost: null })}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    border: '1px solid #2c2b48',
                    background: '#141327',
                    color: '#b8b6d0',
                    cursor: 'pointer',
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{ padding: 24, maxHeight: '65vh', overflowY: 'auto', fontSize: 14, lineHeight: 1.75, color: '#d6d4e8', whiteSpace: 'pre-wrap' }}>
                {selectedPost.content}
              </div>
              <div
                style={{
                  padding: '14px 24px',
                  background: '#141327',
                  borderTop: '1px solid #2c2b48',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                }}
              >
                {selectedPost.url ? (
                  <a
                    href={selectedPost.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#a78bfa', display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    Read on Medium <i className="ph ph-arrow-square-out" />
                  </a>
                ) : (
                  <span />
                )}
                <button
                  onClick={() => this.setState({ selectedPost: null })}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 6,
                    background: 'linear-gradient(90deg, #7c2df0, #5b4ff0)',
                    border: 0,
                    color: '#fff',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 12,
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
