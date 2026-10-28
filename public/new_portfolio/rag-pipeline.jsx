const MONO = "'JetBrains Mono', ui-monospace, monospace";
const WW = 4480, WH = 2475;
const c01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
const pr = (T, s, e) => c01((T - s) / (e - s));
const MOTION = {
  enter: (T, s, e) => Easing.easeOutCubic(pr(T, s, e)),
  draw: (T, s, e) => Easing.easeInOutCubic(pr(T, s, e)),
  pop: (T, s, e) => Easing.easeOutBack(pr(T, s, e)),
};
const lerp = (a, b, t) => a + (b - a) * t;
const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const typed = (s, p) => s.slice(0, Math.round(s.length * c01(p)));
const fmt = v => (v < 0 ? '−' : '') + Math.abs(v).toFixed(3);
const vec = (i, j) => rnd(i * 97 + j * 13 + 5) * 2 - 1;

const bez = (P, t) => { const u = 1 - t; return [0, 1].map(k => u*u*u*P[0][k] + 3*u*u*t*P[1][k] + 3*u*t*t*P[2][k] + t*t*t*P[3][k]); };
const dOf = P => `M${P[0]} C${P[1]} ${P[2]} ${P[3]}`;
const CONN = {
  up: [[640, 1060], [720, 1060], [720, 1020], [800, 1020]],
  split: [[2000, 1020], [2080, 1020], [2160, 1020], [2240, 1020]],
  emb: [[2860, 760], [2960, 760], [2940, 420], [3040, 420]],
  store: [[3660, 610], [3690, 610], [3710, 610], [3740, 610]],
  idx: [[2860, 1300], [2960, 1300], [2940, 1560], [3040, 1560]],
};

const DOC = [
  { t: 'h1', s: 'Employee Handbook 2026' },
  { t: 'p', s: 'Policies effective 1 January 2026.' },
  { t: 'h2', s: '1. Leave Policy' },
  { t: 'p', s: 'Full-time employees accrue 1.5 days of' },
  { t: 'p', s: 'paid leave per month, up to 18 days.' },
  { t: 'h3', s: '1.1 Carry-forward' },
  { t: 'p', s: 'Up to 6 unused days roll into Q1.' },
  { t: 'h2', s: '2. Remote Work' },
  { t: 'p', s: 'Hybrid schedule: 3 office days a week.' },
  { t: 'tr', s: '| Team        | Remote days |', cells: ['Team', 'Remote days'] },
  { t: 'tr', s: '| Engineering | 2           |', cells: ['Engineering', '2'] },
  { t: 'h2', s: '3. Expense Claims' },
  { t: 'p', s: 'Submit receipts within 30 days via' },
  { t: 'p', s: 'the finance portal.' },
];
const RAW_H = { h1: 64, p: 28, h2: 52, h3: 42, tr: 34 };
const RAW_Y = []; { let y = 40; DOC.forEach(d => { RAW_Y.push(y); y += RAW_H[d.t]; }); }
const RAW_TOTAL = RAW_Y[RAW_Y.length - 1] + 40;
const MD_Y = []; { let y = 700; DOC.forEach((d, i) => { if (i > 0 && d.t[0] === 'h') y += 16; MD_Y.push(y); y += 34; }); }
const MD_PREFIX = { h1: '# ', h2: '## ', h3: '### ' };

const CHUNKS = [
  { id: 'chunk_0001', meta: ['h1: Employee Handbook 2026', 'h2: 1. Leave Policy'], pg: 1, tok: 21, text: 'Full-time employees accrue 1.5 days of paid leave per month, up to 18 days.', r: [2, 4] },
  { id: 'chunk_0002', meta: ['h2: 1. Leave Policy', 'h3: 1.1 Carry-forward'], pg: 1, tok: 9, text: 'Up to 6 unused days roll into Q1.', r: [5, 6] },
  { id: 'chunk_0003', meta: ['h2: 2. Remote Work'], pg: 1, tok: 28, text: 'Hybrid schedule: 3 office days a week. | Team | Remote days | Engineering | 2 |', r: [7, 10] },
  { id: 'chunk_0004', meta: ['h2: 3. Expense Claims'], pg: 1, tok: 17, text: 'Submit receipts within 30 days via the finance portal.', r: [11, 13] },
  { id: 'chunk_0005', meta: ['h2: 4. IT & Security'], pg: 2, tok: 31, text: 'Laptops must use full-disk encryption and lock after 5 minutes idle.' },
  { id: 'chunk_0006', meta: ['h2: 5. Health Benefits'], pg: 2, tok: 34, text: 'Medical cover starts on day one and includes paid parental leave.' },
  { id: 'chunk_0007', meta: ['h2: 6. Code of Conduct'], pg: 3, tok: 26, text: 'Treat colleagues with respect; report concerns to People Ops.' },
];
const SLOT = i => ({ x: 2264, y: 564 + i * 238, w: 572, h: 224 });

const CAPS = [
  ['01', 'Upload', 'ingest_file() receives the document and assigns it a doc_id'],
  ['02', 'Extract', 'Text and structure are pulled out of the PDF as Markdown'],
  ['03', 'Chunk', 'Split at #, ## and ### — every chunk keeps its headers as metadata'],
  ['04', 'Embed', 'Every chunk is tokenized and encoded into a 384-dimension vector'],
  ['05', 'Store', 'Vectors persist in Chroma by chunk_id — similar meaning lands close'],
  ['06', 'Index', 'In parallel, BM25 maps every term → the chunks that contain it'],
  ['07', 'Ready', 'Semantic and keyword search now share the same chunk_ids'],
];
const SECTIONS = ['Upload', 'Parse', 'Split', 'Embed', 'Store', 'Index', 'Ready'];

function colorize(line) {
  return line.split(/("[^"]*"|−?-?\d+\.?\d*)/g).map((seg, i) => {
    let c = 'var(--color-neutral-500)';
    if (seg[0] === '"') c = seg.indexOf('chunk_') === 1 ? 'var(--color-neutral-200)' : 'var(--color-accent-300)';
    else if (/^[−-]?\d/.test(seg)) c = 'var(--color-accent-400)';
    else if (/[A-Za-z]/.test(seg)) c = 'var(--color-neutral-300)';
    return <span key={i} style={{ color: c }}>{seg}</span>;
  });
}

function Panel({ x, y, w, h, k, title, meta, o = 1, active = 0, children }) {
  const a = Math.round(active * 100);
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: w, height: h, opacity: o,
      transform: `translateY(${(1 - o) * 40}px)`, borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      background: 'linear-gradient(180deg, var(--color-surface), color-mix(in srgb, var(--color-surface) 55%, var(--color-bg)))',
      boxShadow: `0 0 0 1px color-mix(in srgb, var(--color-accent-500) ${a * 0.7}%, var(--color-neutral-800)), 0 0 ${90 * active}px -10px color-mix(in srgb, var(--color-accent) ${a * 0.45}%, transparent), 0 24px 60px rgba(0,0,0,0.5)`,
    }}>
      <div style={{ height: 64, display: 'flex', alignItems: 'center', gap: 14, padding: '0 26px', borderBottom: '1px solid var(--color-divider)' }}>
        {k ? <span style={{ fontFamily: MONO, fontSize: 16, color: 'var(--color-accent-300)' }}>{k}</span> : null}
        <span style={{ fontSize: 22, fontWeight: 500, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>{title}</span>
        <span style={{ marginLeft: 'auto', fontFamily: MONO, fontSize: 15, color: 'var(--color-neutral-400)' }}>{meta}</span>
      </div>
      {children}
    </div>
  );
}

function activeOf(T, s, e) { return MOTION.enter(T, s, s + 0.6) * (1 - MOTION.enter(T, e, e + 0.6)); }

function PdfIcon({ size = 56 }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 40 48">
      <path d="M4 2h22l10 10v32a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" style={{ fill: 'var(--color-neutral-200)' }} />
      <path d="M26 2v10h10" style={{ fill: 'var(--color-neutral-400)' }} />
      <rect x="0" y="26" width="26" height="12" rx="2" style={{ fill: 'var(--color-accent-600)' }} />
      <text x="13" y="35" textAnchor="middle" style={{ fill: 'var(--color-accent-100)', fontSize: 8, fontWeight: 700, fontFamily: 'Inter' }}>PDF</text>
    </svg>
  );
}

/* ---------- 01 Upload ---------- */
function UploadPanel({ T, C }) {
  const U = C.Upload;
  const o = MOTION.enter(T, U, U + 0.6);
  const hover = MOTION.enter(T, U + 1.3, U + 1.8);
  const pct = MOTION.draw(T, U + 2.0, U + 3.3);
  const done = pct >= 1;
  const metaLines = [['doc_id', 'doc_7f3a'], ['mime', 'application/pdf'], ['pages', '18']];
  return (
    <Panel x={120} y={760} w={520} h={600} k="01" title="ingest_file()" meta="POST /documents" o={o} active={activeOf(T, U + 0.3, C.Parse)}>
      <div style={{
        position: 'absolute', left: 26, top: 90, width: 468, height: 300, borderRadius: 'var(--radius-md)',
        border: `2px ${hover > 0.5 ? 'solid' : 'dashed'} color-mix(in srgb, var(--color-accent) ${hover * 100}%, var(--color-neutral-700))`,
        background: `color-mix(in srgb, var(--color-accent-900) ${hover * 70}%, transparent)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14,
      }}>
        <div style={{ opacity: 1 - MOTION.enter(T, U + 1.5, U + 1.8), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" style={{ stroke: 'var(--color-accent-400)' }} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 15V4M7.5 8.5 12 4l4.5 4.5M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
          </svg>
          <div style={{ fontSize: 22, color: 'var(--color-neutral-200)' }}>Drop a PDF, DOCX or TXT</div>
          <div style={{ fontSize: 16, color: 'var(--color-neutral-500)' }}>max 50 MB</div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 26, top: 412, width: 468, display: 'flex', fontFamily: MONO, fontSize: 16, opacity: MOTION.enter(T, U + 1.9, U + 2.2) }}>
        <span style={{ color: done ? 'var(--color-accent-300)' : 'var(--color-neutral-300)' }}>{done ? 'uploaded · sha256 9f3c…a71e' : 'uploading…'}</span>
        <span style={{ marginLeft: 'auto', color: 'var(--color-neutral-400)' }}>{Math.round(pct * 100)}%</span>
      </div>
      <div style={{ position: 'absolute', left: 26, top: 446, width: 468, height: 6, borderRadius: 3, background: 'var(--color-neutral-800)', opacity: MOTION.enter(T, U + 1.9, U + 2.2) }}>
        <div style={{ width: `${pct * 100}%`, height: '100%', borderRadius: 3, background: 'var(--color-accent)', boxShadow: '0 0 16px var(--color-accent)' }} />
      </div>
      {metaLines.map((m, i) => (
        <div key={i} style={{ position: 'absolute', left: 26, top: 478 + i * 32, display: 'flex', gap: 16, fontFamily: MONO, fontSize: 16, opacity: MOTION.enter(T, U + 3.3 + i * 0.2, U + 3.6 + i * 0.2) }}>
          <span style={{ width: 80, color: 'var(--color-neutral-500)' }}>{m[0]}</span>
          <span style={{ color: 'var(--color-neutral-200)' }}>{m[1]}</span>
        </div>
      ))}
    </Panel>
  );
}

function FileCard({ T, C }) {
  const U = C.Upload;
  const p = MOTION.enter(T, U + 0.7, U + 1.8);
  const p2 = MOTION.draw(T, U + 3.9, U + 4.9);
  const squash = 1 - 0.05 * Math.sin(Math.PI * pr(T, U + 1.8, U + 2.15));
  let x = lerp(1180, 200, p), y = lerp(560, 952, p) - 90 * Math.sin(Math.PI * p);
  x = lerp(x, 900, p2); y = lerp(y, 960, p2);
  const s = lerp(1.06, 1, p) * squash * lerp(1, 0.7, p2);
  const rot = lerp(10, 0, p);
  const o = MOTION.enter(T, U + 0.7, U + 1.0) * (1 - MOTION.enter(T, U + 4.5, U + 4.9));
  const cur = MOTION.enter(T, U + 2.0, U + 2.7);
  return (
    <React.Fragment>
      <div style={{
        position: 'absolute', left: x, top: y, width: 360, height: 96, opacity: o,
        transform: `rotate(${rot}deg) scale(${s})`, borderRadius: 'var(--radius-md)',
        background: 'var(--color-surface)', boxShadow: '0 0 0 1px var(--color-neutral-700), 0 20px 50px rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'center', gap: 16, padding: '0 18px',
      }}>
        <PdfIcon size={46} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 18, color: 'var(--color-text)', fontWeight: 500 }}>Employee_Handbook_2026.pdf</span>
          <span style={{ fontFamily: MONO, fontSize: 14, color: 'var(--color-neutral-400)' }}>2.4 MB · 18 pages</span>
        </div>
      </div>
      <svg width="34" height="40" viewBox="0 0 17 20" style={{
        position: 'absolute', left: x + 290 + cur * 70, top: y + 58 + cur * 90, opacity: MOTION.enter(T, U + 0.7, U + 1.0) * (1 - cur),
      }}>
        <path d="M1 1l14 10-6 1.2 3.6 6.4-2.4 1.2-3.6-6.4L2 17z" style={{ fill: 'var(--color-neutral-100)', stroke: 'var(--color-bg)' }} strokeWidth="1" />
      </svg>
    </React.Fragment>
  );
}

/* ---------- 02 Parse ---------- */
const lineStart = (P, i) => P + 1.2 + (RAW_Y[i] / RAW_TOTAL) * 3.2;

function RawPanel({ T, C }) {
  const P = C.Parse;
  const o = MOTION.enter(T, P - 0.5, P + 0.2);
  const paper = MOTION.enter(T, P + 0.2, P + 0.8);
  const beam = MOTION.draw(T, P + 1.2, P + 4.4) * RAW_TOTAL;
  const beamOn = pr(T, P + 1.1, P + 1.3) * (1 - pr(T, P + 4.4, P + 4.7));
  return (
    <Panel x={800} y={600} w={560} h={840} k="02" title="Raw document" meta="p. 1 / 18" o={o} active={activeOf(T, P, C.Split)}>
      <div style={{
        position: 'absolute', left: 24, top: 84, width: 512, height: 732, borderRadius: 6, overflow: 'hidden',
        background: 'var(--color-neutral-100)', opacity: paper, transform: `scale(${lerp(0.96, 1, paper)})`,
        boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
      }}>
        {DOC.map((d, i) => {
          const ink = MOTION.enter(T, P + 0.4 + i * 0.05, P + 0.8 + i * 0.05);
          const hl = Math.max(0, 1 - Math.abs(beam - (RAW_Y[i] + RAW_H[d.t] / 2)) / 40) * beamOn;
          const base = { position: 'absolute', left: 36, right: 36, top: RAW_Y[i], height: RAW_H[d.t], display: 'flex', alignItems: 'center', opacity: ink, color: 'var(--color-neutral-900)', background: `color-mix(in srgb, var(--color-accent-300) ${hl * 55}%, transparent)`, borderRadius: 3 };
          if (d.t === 'tr') return (
            <div key={i} style={Object.assign({}, base, { display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid var(--color-neutral-400)', borderTop: i === 10 ? 'none' : '1px solid var(--color-neutral-400)', fontSize: 14, fontWeight: i === 9 ? 600 : 400 })}>
              {d.cells.map((c, j) => <span key={j} style={{ padding: '0 10px', borderLeft: j ? '1px solid var(--color-neutral-400)' : 'none', lineHeight: RAW_H.tr + 'px' }}>{c}</span>)}
            </div>
          );
          const fs = { h1: 28, h2: 20, h3: 16, p: 15 }[d.t];
          return <div key={i} style={Object.assign({}, base, { fontSize: fs, fontWeight: d.t === 'p' ? 400 : 600, paddingTop: d.t[0] === 'h' && i ? 10 : 0, letterSpacing: d.t === 'h1' ? '-0.02em' : 0 })}>{d.s}</div>;
        })}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: beam, background: 'color-mix(in srgb, var(--color-accent-400) 10%, transparent)', opacity: beamOn }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: beam - 1, height: 3, background: 'var(--color-accent)', boxShadow: '0 0 24px 6px color-mix(in srgb, var(--color-accent) 60%, transparent)', opacity: beamOn }} />
        <div style={{ position: 'absolute', bottom: 22, left: 0, right: 0, textAlign: 'center', fontSize: 12, color: 'var(--color-neutral-500)', opacity: paper }}>— 1 —</div>
      </div>
    </Panel>
  );
}

function MdPanel({ T, C }) {
  const P = C.Parse, S = C.Split;
  const o = MOTION.enter(T, P - 0.2, P + 0.5);
  const pulse = MOTION.enter(T, P + 4.7, P + 5.3) * (1 - MOTION.enter(T, S + 1.0, S + 1.6));
  const cuts = [2, 5, 7, 11];
  return (
    <Panel x={1440} y={600} w={560} h={840} title="extracted.md" meta="text/markdown" o={o} active={activeOf(T, P + 0.8, C.Split + 1.2)}>
      {DOC.map((d, i) => {
        const ts = lineStart(P, i);
        const n = pr(T, ts, ts + 0.3);
        const pre = MD_PREFIX[d.t] || '';
        const full = d.t === 'tr' ? d.s : pre + d.s;
        const shown = typed(full, n);
        const ch = CHUNKS.findIndex(c => c.r && i >= c.r[0] && i <= c.r[1]);
        const lift = ch >= 0 ? MOTION.enter(T, S + 1.2 + ch * 0.45, S + 1.5 + ch * 0.45) : 0;
        const restore = MOTION.enter(T, S + 4.6, S + 5.4);
        const dim = 1 - 0.7 * lift + 0.3 * restore * lift;
        const glow = pre ? pulse : 0;
        return (
          <div key={i} style={{ position: 'absolute', left: 26, top: MD_Y[i] - 600, height: 34, display: 'flex', alignItems: 'center', fontFamily: MONO, fontSize: 16, whiteSpace: 'pre', opacity: dim }}>
            <span style={{ color: `color-mix(in srgb, var(--color-accent-200) ${glow * 100}%, var(--color-accent-400))`, textShadow: glow ? `0 0 ${14 * glow}px var(--color-accent)` : 'none' }}>{shown.slice(0, pre.length)}</span>
            <span style={{ color: d.t === 'p' ? 'var(--color-neutral-300)' : d.t === 'tr' ? 'var(--color-neutral-400)' : 'var(--color-text)' }}>{shown.slice(pre.length)}</span>
            {n > 0 && n < 1 ? <span style={{ width: 9, height: 20, marginLeft: 2, background: 'var(--color-accent)' }} /> : null}
          </div>
        );
      })}
      {cuts.map((li, j) => {
        const p = MOTION.draw(T, S + 0.3 + j * 0.18, S + 0.9 + j * 0.18);
        const out = 1 - MOTION.enter(T, S + 4.6, S + 5.2);
        return <div key={j} style={{ position: 'absolute', left: 16, top: MD_Y[li] - 600 - 9, width: 528 * p, height: 0, borderTop: '2px dashed var(--color-accent)', opacity: out * (p > 0 ? 1 : 0) }} />;
      })}
    </Panel>
  );
}

/* ---------- 03 Split ---------- */
function ChunkCard({ c, box, co, o }) {
  return (
    <div style={{
      position: 'absolute', left: box.x, top: box.y, width: box.w, height: box.h, opacity: o,
      borderRadius: 'var(--radius-md)', padding: '18px 20px', overflow: 'hidden',
      background: 'color-mix(in srgb, var(--color-accent-900) 70%, var(--color-surface))',
      boxShadow: '0 0 0 1px var(--color-accent-700), 0 12px 30px rgba(0,0,0,0.35)',
    }}>
      <div style={{ opacity: co, display: 'flex', flexDirection: 'column', gap: 12, width: 532 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: MONO, fontSize: 15, color: 'var(--color-accent-300)', border: '1px solid var(--color-accent-600)', borderRadius: 4, padding: '3px 8px' }}>{c.id}</span>
          <span style={{ marginLeft: 'auto', fontFamily: MONO, fontSize: 14, color: 'var(--color-neutral-400)' }}>doc_7f3a · p.{c.pg} · {c.tok} tok</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {c.meta.map((m, j) => <span key={j} style={{ fontFamily: MONO, fontSize: 13, color: 'var(--color-neutral-300)', background: 'var(--color-neutral-900)', borderRadius: 4, padding: '3px 8px' }}>{m}</span>)}
        </div>
        <div style={{ fontSize: 18, lineHeight: 1.45, color: 'var(--color-neutral-200)', textWrap: 'pretty' }}>{c.text}</div>
      </div>
    </div>
  );
}

function ChunksPanel({ T, C }) {
  const S = C.Split;
  const o = MOTION.enter(T, S - 0.4, S + 0.3);
  const scroll = MOTION.draw(T, S + 4.0, S + 4.9) - MOTION.draw(T, S + 5.2, S + 5.95);
  return (
    <Panel x={2240} y={480} w={620} h={1080} k="03" title="List[ChunkDocument]" meta="48 chunks" o={o} active={activeOf(T, S + 0.8, C.Embed + 0.4)}>
      <div style={{ position: 'absolute', right: 8, top: 84, bottom: 20, width: 4, borderRadius: 2, background: 'var(--color-neutral-800)' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: scroll * 120 + '%', height: '16%', borderRadius: 2, background: scroll > 0.01 ? 'var(--color-accent-400)' : 'var(--color-neutral-600)' }} />
      </div>
    </Panel>
  );
}

function ChunkCards({ T, C }) {
  const S = C.Split;
  const scroll = (MOTION.draw(T, S + 4.0, S + 4.9) - MOTION.draw(T, S + 5.2, S + 5.95)) * 520;
  const L = 1440, Tp = 548;
  return (
    <div style={{ position: 'absolute', left: L, top: Tp, width: 1420, height: 1000, overflow: 'hidden' }}>
      {CHUNKS.map((c, i) => {
        const slot = SLOT(i);
        let box = slot, o = 1, co = 1;
        if (c.r) {
          const s = S + 1.2 + i * 0.45;
          const p = MOTION.draw(T, s, s + 0.9);
          const src = { x: 1456, y: MD_Y[c.r[0]] - 4, w: 528, h: MD_Y[c.r[1]] + 38 - MD_Y[c.r[0]] };
          box = { x: lerp(src.x, slot.x, p), y: lerp(src.y, slot.y, p) - 40 * Math.sin(Math.PI * p), w: lerp(src.w, slot.w, p), h: lerp(src.h, slot.h, p) };
          o = MOTION.enter(T, s - 0.05, s + 0.15);
          co = MOTION.enter(T, s + 0.6, s + 1.0);
        } else {
          o = MOTION.enter(T, S + 3.0, S + 3.4); co = 1;
        }
        return <ChunkCard key={c.id} c={c} co={co} o={o} box={{ x: box.x - L, y: box.y - Tp - scroll, w: box.w, h: box.h }} />;
      })}
    </div>
  );
}

/* ---------- 04 Embed ---------- */
const TOKENS = [['full', 2440], ['-', 1011], ['time', 2051], ['employees', 5126], ['acc', 16222], ['##rue', 21332], ['1', 1015], ['.', 1012], ['5', 1019], ['days', 2420], ['of', 1997], ['paid', 3825], ['leave', 2681], ['per', 2566], ['month', 3204]];
const TOK_POS = (() => { let x = 26, y = 178; return TOKENS.map(t => { const w = t[0].length * 9 + 26; if (x + w > 594) { x = 26; y += 60; } const r = { x, y, w }; x += w + 8; return r; }); })();
const LAYERS = [6, 8, 8, 6], LX = [80, 227, 393, 540];
const nodeY = (l, n) => 330 + (n + 0.5) * (190 / LAYERS[l]);

function EmbedPanel({ T, C }) {
  const E = C.Embed;
  const o = MOTION.enter(T, E - 0.3, E + 0.4);
  const wave = pr(T, E + 1.8, E + 3.2) * 4.2 - 0.6;
  const idle = T > C.Ready ? ((T - C.Ready) * 1.2) % 5 - 0.6 : -9;
  const act = l => Math.max(0, 1 - Math.abs(l - wave) / 0.7, 1 - Math.abs(l - idle) / 0.7);
  const cells = pr(T, E + 3.0, E + 3.8);
  const embedded = Math.round(lerp(1, 48, MOTION.draw(T, E + 4.0, E + 5.8)));
  const nums = [0, 1, 2, 3, 4, 5].map(j => fmt(vec(0, j))).join(', ');
  return (
    <Panel x={3040} y={160} w={620} h={900} k="04" title="Embedding model" meta={`all-MiniLM-L6-v2 · ${embedded}/48`} o={o} active={activeOf(T, E + 0.4, C.Store + 0.4)}>
      <div style={{ position: 'absolute', left: 26, top: 84, right: 26, opacity: MOTION.enter(T, E + 0.5, E + 1.0) }}>
        <div style={{ fontFamily: MONO, fontSize: 14, color: 'var(--color-neutral-400)' }}>input · chunk_0001</div>
        <div style={{ fontSize: 18, color: 'var(--color-neutral-200)', marginTop: 6, lineHeight: 1.4 }}>Full-time employees accrue 1.5 days of paid leave per month, up to 18 days.</div>
      </div>
      {TOKENS.map((t, i) => {
        const p = MOTION.pop(T, E + 0.9 + i * 0.05, E + 1.25 + i * 0.05);
        const sink = MOTION.enter(T, E + 1.7, E + 2.2);
        return (
          <div key={i} style={{
            position: 'absolute', left: TOK_POS[i].x, top: TOK_POS[i].y, width: TOK_POS[i].w, height: 50, opacity: c01(p) * (1 - 0.55 * sink),
            transform: `scale(${p})`, borderRadius: 6, background: 'var(--color-accent-900)', boxShadow: '0 0 0 1px var(--color-accent-700)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: MONO,
          }}>
            <span style={{ fontSize: 15, color: 'var(--color-accent-200)' }}>{t[0]}</span>
            <span style={{ fontSize: 11, color: 'var(--color-neutral-500)' }}>{t[1]}</span>
          </div>
        );
      })}
      <svg width="620" height="900" style={{ position: 'absolute', left: 0, top: 0, opacity: MOTION.enter(T, E + 1.4, E + 1.9) }}>
        {LAYERS.slice(0, 3).map((n, l) => Array.from({ length: n }).map((_, a) => Array.from({ length: LAYERS[l + 1] }).map((_, b) => {
          const ia = act(l + 0.5) * (0.35 + 0.65 * rnd(l * 100 + a * 10 + b));
          return <line key={`${l}-${a}-${b}`} x1={LX[l]} y1={nodeY(l, a)} x2={LX[l + 1]} y2={nodeY(l + 1, b)} strokeWidth={1 + ia} style={{ stroke: `color-mix(in srgb, var(--color-accent-300) ${ia * 100}%, var(--color-neutral-700))`, opacity: 0.25 + 0.6 * ia }} />;
        })))}
        {LAYERS.map((n, l) => Array.from({ length: n }).map((_, a) => {
          const ia = act(l);
          return <circle key={`n${l}-${a}`} cx={LX[l]} cy={nodeY(l, a)} r={7 + 3 * ia} style={{ fill: `color-mix(in srgb, var(--color-accent-300) ${ia * 100}%, var(--color-neutral-800))`, stroke: 'var(--color-neutral-600)' }} strokeWidth="1" />;
        }))}
      </svg>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 532, textAlign: 'center', fontFamily: MONO, fontSize: 14, color: 'var(--color-neutral-400)', opacity: MOTION.enter(T, E + 2.6, E + 3.0) }}>transformer · mean pooling → L2 normalize</div>
      <div style={{ position: 'absolute', left: 26, right: 26, top: 580, opacity: MOTION.enter(T, E + 2.9, E + 3.2) }}>
        <div style={{ fontFamily: MONO, fontSize: 15, color: 'var(--color-accent-300)' }}>chunk_0001 → ℝ³⁸⁴</div>
        <div style={{ display: 'flex', gap: 3, marginTop: 10, height: 44 }}>
          {Array.from({ length: 32 }).map((_, j) => {
            const v = vec(0, j), on = cells * 32 > j ? 1 : 0;
            const col = v > 0 ? `color-mix(in srgb, var(--color-accent-300) ${Math.abs(v) * 100}%, var(--color-accent-900))` : `color-mix(in srgb, var(--color-neutral-400) ${Math.abs(v) * 80}%, var(--color-neutral-900))`;
            return <div key={j} style={{ flex: 1, borderRadius: 2, background: col, opacity: on }} />;
          })}
        </div>
        <div style={{ fontFamily: MONO, fontSize: 14, color: 'var(--color-neutral-300)', marginTop: 10, whiteSpace: 'pre' }}>{typed(`[ ${nums}, … ]`, pr(T, E + 3.1, E + 3.9))}</div>
      </div>
      {[1, 2, 3, 4, 5].map(r => {
        const ro = MOTION.enter(T, E + 4.0 + (r - 1) * 0.25, E + 4.3 + (r - 1) * 0.25);
        return (
          <div key={r} style={{ position: 'absolute', left: 26, right: 26, top: 722 + (r - 1) * 30, height: 20, display: 'flex', alignItems: 'center', gap: 12, opacity: ro, transform: `translateX(${(1 - ro) * -30}px)` }}>
            <span style={{ width: 110, fontFamily: MONO, fontSize: 13, color: 'var(--color-neutral-400)' }}>{CHUNKS[r].id}</span>
            <div style={{ flex: 1, display: 'flex', gap: 3, height: 18 }}>
              {Array.from({ length: 32 }).map((_, j) => {
                const v = vec(r, j);
                return <div key={j} style={{ flex: 1, borderRadius: 2, background: v > 0 ? `color-mix(in srgb, var(--color-accent-400) ${Math.abs(v) * 90}%, var(--color-accent-900))` : `color-mix(in srgb, var(--color-neutral-500) ${Math.abs(v) * 70}%, var(--color-neutral-900))` }} />;
              })}
            </div>
          </div>
        );
      })}
    </Panel>
  );
}

/* ---------- 05 Store ---------- */
const CL = [[-0.5, 0.45, 0.35], [0.55, 0.5, -0.35], [0.45, -0.45, 0.5], [-0.45, -0.5, -0.5]];
const CL_NAME = ['leave & benefits', 'remote work', 'expenses', 'security'];
const CL_COL = ['var(--color-accent-300)', 'var(--color-accent-500)', 'var(--color-neutral-300)', 'var(--color-accent-700)'];
const PTS = Array.from({ length: 48 }).map((_, i) => {
  const c = i < 6 ? [0, 0, 1, 2, 3, 0][i] : i % 4;
  const g = k => (rnd(i * 7 + k) + rnd(i * 11 + k + 3) - 1) * 0.42;
  return { c, p: [CL[c][0] + g(1), CL[c][1] + g(2), CL[c][2] + g(3)] };
});
const PLOT = { x: 4050, y: 470, R: 175 };
function proj(p, a, e = 0.38) {
  const x1 = p[0] * Math.cos(a) + p[2] * Math.sin(a), z1 = -p[0] * Math.sin(a) + p[2] * Math.cos(a);
  const y1 = p[1] * Math.cos(e) - z1 * Math.sin(e), z2 = p[1] * Math.sin(e) + z1 * Math.cos(e);
  return [PLOT.x + x1 * PLOT.R, PLOT.y - y1 * PLOT.R, z2];
}
const angleAt = (T, C) => 0.6 + Math.max(0, T - C.Store) * 0.14;

const CODE = [
  'collection.add(',
  '  ids=["chunk_0001", … "chunk_0048"],',
  '  embeddings=[[0.021, -0.113, 0.087, …], …],',
  '  documents=["Full-time employees accrue…", …],',
  '  metadatas=[{"h2": "1. Leave Policy", "page": 1}, …]',
  ')',
];

function StorePanel({ T, C }) {
  const St = C.Store;
  const o = MOTION.enter(T, St - 0.5, St + 0.2);
  const stored = Math.round(lerp(0, 48, pr(T, St + 0.3, St + 2.7)));
  return (
    <Panel x={3740} y={160} w={620} h={900} k="05" title="Chroma" meta={`handbook_2026 · ${stored} vectors`} o={o} active={activeOf(T, St + 0.2, C.Index + 0.3)}>
      <div style={{ position: 'absolute', left: 26, top: 596, fontFamily: MONO, fontSize: 14, color: 'var(--color-neutral-400)', opacity: MOTION.enter(T, St + 0.4, St + 0.8) }}>persist → ./chroma_db</div>
      <div style={{ position: 'absolute', left: 16, right: 16, top: 626, height: 250, borderRadius: 'var(--radius-md)', background: 'color-mix(in srgb, var(--color-bg) 70%, transparent)', boxShadow: '0 0 0 1px var(--color-neutral-800)', padding: '16px 14px', opacity: MOTION.enter(T, St + 0.4, St + 0.8) }}>
        {CODE.map((l, j) => (
          <div key={j} style={{ fontFamily: MONO, fontSize: 14, lineHeight: '34px', whiteSpace: 'pre', color: 'var(--color-neutral-300)' }}>{colorize(typed(l, pr(T, St + 0.6 + j * 0.32, St + 0.9 + j * 0.32)))}</div>
        ))}
      </div>
    </Panel>
  );
}

function VectorCloud({ T, C }) {
  const St = C.Store;
  const a = angleAt(T, C);
  const axO = MOTION.enter(T, St, St + 0.7);
  const P = p => proj(p, a);
  const O = [-1, -1, -1];
  const axes = [[1, -1, -1], [-1, 1, -1], [-1, -1, 1]];
  const floor = [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]].map(P);
  const src = [3380, 900];
  const hl = MOTION.enter(T, St + 3.4, St + 3.9);
  const p0 = P(PTS[0].p);
  return (
    <g>
      <polygon points={floor.map(f => f[0] + ',' + f[1]).join(' ')} style={{ fill: 'color-mix(in srgb, var(--color-accent-900) 40%, transparent)', stroke: 'var(--color-neutral-800)', opacity: axO }} />
      {axes.map((e, i) => {
        const A = P(O), B = P(e);
        return (
          <g key={i} style={{ opacity: axO }}>
            <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} strokeWidth="2" style={{ stroke: 'var(--color-neutral-500)' }} />
            <text x={B[0] + 8} y={B[1] + 5} style={{ fill: 'var(--color-neutral-400)', fontFamily: MONO, fontSize: 15 }}>{['d₁', 'd₂', 'd₃'][i]}</text>
          </g>
        );
      })}
      {[1, 5, 8].map((k, i) => {
        const q = P(PTS[k].p), lo = hl * MOTION.enter(T, St + 3.6 + i * 0.15, St + 4.0 + i * 0.15);
        return (
          <g key={k} style={{ opacity: lo }}>
            <line x1={p0[0]} y1={p0[1]} x2={lerp(p0[0], q[0], lo)} y2={lerp(p0[1], q[1], lo)} strokeWidth="1.5" strokeDasharray="4 4" style={{ stroke: 'var(--color-accent-300)' }} />
            <text x={(p0[0] + q[0]) / 2 + 6} y={(p0[1] + q[1]) / 2 - 6} style={{ fill: 'var(--color-accent-200)', fontFamily: MONO, fontSize: 13 }}>{['0.91', '0.88', '0.83'][i]}</text>
          </g>
        );
      })}
      {PTS.map((pt, i) => {
        const q = P(pt.p);
        const s = St + 0.3 + i * 0.05;
        const f = MOTION.enter(T, s, s + 0.8);
        const x = lerp(src[0], q[0], f), y = lerp(src[1], q[1], f) - 140 * Math.sin(Math.PI * f);
        const r = (5 + 2.2 * (q[2] + 1)) * (i === 0 ? 1 + 0.4 * hl : 1);
        return <circle key={i} cx={x} cy={y} r={r} style={{ fill: CL_COL[pt.c], opacity: f > 0 ? 0.55 + 0.4 * f * ((q[2] + 1.6) / 2.6) : 0 }} />;
      })}
      <circle cx={p0[0]} cy={p0[1]} r={14 + 6 * Math.sin((T - St) * 4)} fill="none" strokeWidth="2" style={{ stroke: 'var(--color-accent)', opacity: hl }} />
    </g>
  );
}

function CloudLabels({ T, C }) {
  const St = C.Store;
  const a = angleAt(T, C);
  const hl = MOTION.enter(T, St + 3.4, St + 3.9);
  const p0 = proj(PTS[0].p, a);
  const tl = Math.max(3770, Math.min(p0[0] - 160, 4340 - 330));
  return (
    <React.Fragment>
      {CL.map((c, i) => {
        const q = proj(c, a), lo = MOTION.enter(T, St + 2.8 + i * 0.12, St + 3.3 + i * 0.12);
        if (i === 0) return null;
        return <div key={i} style={{ position: 'absolute', left: q[0] - 60, top: q[1] - 70, width: 120, textAlign: 'center', fontFamily: MONO, fontSize: 14, color: 'var(--color-neutral-300)', opacity: lo * 0.9 }}>{CL_NAME[i]}</div>;
      })}
      <div style={{
        position: 'absolute', left: tl, top: p0[1] + 34, width: 320, padding: '12px 14px', borderRadius: 'var(--radius-md)', opacity: hl,
        transform: `translateY(${(1 - hl) * 12}px)`, background: 'var(--color-surface)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <span style={{ fontFamily: MONO, fontSize: 15, color: 'var(--color-accent-300)' }}>chunk_0001</span>
        <span style={{ fontSize: 15, color: 'var(--color-neutral-200)' }}>h2 · 1. Leave Policy · leave & benefits</span>
        <span style={{ fontFamily: MONO, fontSize: 13, color: 'var(--color-neutral-400)' }}>[0.021, −0.113, 0.087, …]</span>
      </div>
    </React.Fragment>
  );
}

/* ---------- 06 Index ---------- */
const WORDS = ['full', 'time', 'employees', 'accrue', '1.5', 'days', 'of', 'paid', 'leave', 'per', 'month', 'up', 'to', '18', 'days'];
const STOP = new Set(['of', 'per', 'up', 'to']);
const WPOS = (() => { let x = 30, y = 128; return WORDS.map(w => { const wd = w.length * 10.8 + 22; if (x + wd > 560) { x = 30; y += 48; } const r = { x, y, w: wd }; x += wd + 8; return r; }); })();
const JSON_LINES = [
  '{',
  '  "leave": {',
  '    "chunk_0001": { "freq": 1, "dl": 21 },',
  '    "chunk_0006": { "freq": 1, "dl": 34 }',
  '  },',
  '  "days": {',
  '    "chunk_0001": { "freq": 2, "dl": 21 },',
  '    "chunk_0002": { "freq": 1, "dl": 9 }',
  '  },',
  '  "paid":      { "chunk_0001": { "freq": 1, "dl": 21 } },',
  '  "accrue":    { "chunk_0001": { "freq": 1, "dl": 21 } },',
  '  "employees": { "chunk_0001": { "freq": 1, "dl": 21 } },',
  '  "remote":    { "chunk_0003": { "freq": 3, "dl": 28 } },',
  '  "receipts":  { "chunk_0004": { "freq": 1, "dl": 17 } },',
  '  …',
  '}',
];
const FLY = [[8, 1], [5, 5], [7, 9], [3, 10], [2, 11]];
const jsonAt = (I, i) => I + 2.0 + i * 0.15;

function IndexPanel({ T, C }) {
  const I = C.Index;
  const o = MOTION.enter(T, I - 0.3, I + 0.4);
  const sent = MOTION.enter(T, I + 0.4, I + 0.7) * (1 - MOTION.enter(T, I + 0.7, I + 1.0));
  const formula = 'score(q,d) = Σₜ IDF(t) · f(t,d)·(k₁+1) / ( f(t,d) + k₁·(1 − b + b·|d|/avgdl) )';
  return (
    <Panel x={3040} y={1220} w={1320} h={900} k="06" title="Inverted index" meta="BM25 · rank_bm25" o={o} active={activeOf(T, I + 0.3, C.Ready + 1)}>
      <div style={{ position: 'absolute', left: 30, top: 88, fontFamily: MONO, fontSize: 14, color: 'var(--color-neutral-400)', opacity: MOTION.enter(T, I + 0.3, I + 0.7) }}>chunk_0001 · lowercase → tokenize → drop stopwords</div>
      <div style={{ position: 'absolute', left: 30, top: 128, width: 530, fontSize: 20, color: 'var(--color-neutral-200)', opacity: sent }}>Full-time employees accrue 1.5 days of paid leave per month, up to 18 days.</div>
      {WORDS.map((w, i) => {
        const p = MOTION.pop(T, I + 0.8 + i * 0.03, I + 1.1 + i * 0.03);
        const st = STOP.has(w) ? MOTION.enter(T, I + 1.3, I + 1.8) : 0;
        const fl = FLY.find(f => f[0] === i);
        const lit = fl ? MOTION.enter(T, jsonAt(I, fl[1]) - 0.7, jsonAt(I, fl[1]) - 0.5) : 0;
        return (
          <div key={i} style={{
            position: 'absolute', left: WPOS[i].x, top: WPOS[i].y, width: WPOS[i].w, height: 38, borderRadius: 6, opacity: c01(p) * (1 - 0.75 * st),
            transform: `scale(${p})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: 18,
            color: st ? 'var(--color-neutral-500)' : lit ? 'var(--color-accent-200)' : 'var(--color-neutral-200)', textDecoration: st > 0.3 ? 'line-through' : 'none',
            background: lit ? 'var(--color-accent-800)' : 'var(--color-neutral-900)', boxShadow: `0 0 0 1px ${lit ? 'var(--color-accent-500)' : 'var(--color-neutral-800)'}`,
          }}>{w}</div>
        );
      })}
      {[1, 2, 3, 4, 5, 6].map((r, k) => {
        const ro = MOTION.enter(T, I + 3.0 + k * 0.22, I + 3.3 + k * 0.22);
        return (
          <div key={r} style={{ position: 'absolute', left: 30, top: 300 + k * 34, width: 530, display: 'flex', fontFamily: MONO, fontSize: 15, opacity: ro }}>
            <span style={{ color: 'var(--color-neutral-300)' }}>{CHUNKS[r].id}</span>
            <span style={{ marginLeft: 'auto', color: 'var(--color-neutral-500)' }}>{CHUNKS[r].tok - 6} terms</span>
            <span style={{ marginLeft: 16, color: 'var(--color-accent-400)' }}>✓</span>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 30, top: 520, fontFamily: MONO, fontSize: 16, color: 'var(--color-accent-300)', opacity: MOTION.enter(T, I + 4.4, I + 4.8) }}>48 / 48 chunks · 1,206 unique terms</div>
      <div style={{ position: 'absolute', left: 600, top: 84, width: 700 }}>
        {JSON_LINES.map((l, i) => {
          const lo = MOTION.enter(T, jsonAt(I, i), jsonAt(I, i) + 0.3);
          return <div key={i} style={{ fontFamily: MONO, fontSize: 16, lineHeight: '32px', whiteSpace: 'pre', opacity: lo, transform: `translateX(${(1 - lo) * 16}px)` }}>{colorize(l)}</div>;
        })}
      </div>
      <div style={{ position: 'absolute', left: 30, right: 30, top: 640, height: 0, borderTop: '1px solid var(--color-divider)', opacity: MOTION.enter(T, I + 4.5, I + 4.9) }} />
      <div style={{ position: 'absolute', left: 30, top: 664, fontFamily: MONO, fontSize: 14, color: 'var(--color-neutral-400)', opacity: MOTION.enter(T, I + 4.5, I + 4.9) }}>at query time</div>
      <div style={{ position: 'absolute', left: 30, top: 700, fontFamily: MONO, fontSize: 22, color: 'var(--color-text)', whiteSpace: 'pre' }}>{typed(formula, pr(T, I + 4.6, I + 5.8))}</div>
      <div style={{ position: 'absolute', left: 30, top: 760, fontFamily: MONO, fontSize: 16, color: 'var(--color-neutral-400)', opacity: MOTION.enter(T, I + 5.6, I + 6.0), display: 'flex', gap: 36 }}>
        <span>k₁ = 1.5</span><span>b = 0.75</span><span>N = 48</span><span>avgdl = 24.6</span>
      </div>
    </Panel>
  );
}

function FlyingTerms({ T, C }) {
  const I = C.Index;
  return FLY.map(([wi, li]) => {
    const arr = jsonAt(I, li);
    const p = MOTION.draw(T, arr - 0.6, arr);
    if (p <= 0 || T > arr + 0.25) return null;
    const sx = 3040 + WPOS[wi].x, sy = 1220 + WPOS[wi].y;
    const tx = 3040 + 600 + 2 * 9.6 - 4, ty = 1220 + 84 + li * 32 - 3;
    return (
      <div key={wi} style={{
        position: 'absolute', left: lerp(sx, tx, p), top: lerp(sy, ty, p) - 60 * Math.sin(Math.PI * p), height: 38, padding: '0 11px', borderRadius: 6,
        display: 'flex', alignItems: 'center', fontFamily: MONO, fontSize: lerp(18, 16, p), color: 'var(--color-accent-100)',
        background: 'var(--color-accent-700)', boxShadow: '0 0 24px color-mix(in srgb, var(--color-accent) 50%, transparent)', opacity: 1 - pr(T, arr, arr + 0.25),
      }}>"{WORDS[wi]}"</div>
    );
  });
}

/* ---------- Connectors / world SVG ---------- */
function Connectors({ T, C }) {
  const R = C.Ready;
  const spec = [
    ['up', C.Upload + 3.9, C.Upload + 4.6, null],
    ['split', C.Split + 0.1, C.Split + 0.7, null],
    ['emb', C.Embed + 0.0, C.Embed + 0.7, ['embed', 'with chunk_id']],
    ['store', C.Store - 0.1, C.Store + 0.3, null],
    ['idx', C.Index + 0.1, C.Index + 0.8, ['tokenize', 'for BM25']],
  ];
  const flow = MOTION.enter(T, R + 0.5, R + 1.2);
  return (
    <g>
      {spec.map(([k, s, e, lab]) => {
        const P = CONN[k], p = MOTION.draw(T, s, e), head = bez(P, p);
        const mid = bez(P, 0.5);
        return (
          <g key={k}>
            <path d={dOf(P)} fill="none" strokeWidth="2.5" pathLength="1" strokeDasharray="1 1" strokeDashoffset={1 - p} style={{ stroke: 'var(--color-accent-500)', opacity: p > 0 ? 0.9 : 0 }} />
            <circle cx={head[0]} cy={head[1]} r="7" style={{ fill: 'var(--color-accent-200)', opacity: p > 0 && p < 1 ? 1 : 0 }} />
            {[0, 1, 2].map(j => { const q = bez(P, (((T - R) * 0.55 + j / 3) % 1 + 1) % 1); return <circle key={j} cx={q[0]} cy={q[1]} r="6" style={{ fill: 'var(--color-accent-300)', opacity: flow }} />; })}
            {lab ? lab.map((t, j) => <text key={j} x={mid[0]} y={mid[1] - 10 + j * 20} textAnchor="middle" style={{ fill: 'var(--color-accent-300)', fontFamily: MONO, fontSize: 15, opacity: MOTION.enter(T, e - 0.2, e + 0.2) }}>{t}</text>) : null}
          </g>
        );
      })}
    </g>
  );
}

function ParseParticles({ T, C }) {
  const P = C.Parse;
  return DOC.map((d, i) => {
    const ts = lineStart(P, i), p = MOTION.draw(T, ts - 0.35, ts);
    if (p <= 0 || p >= 1) return null;
    const y0 = 684 + RAW_Y[i] + RAW_H[d.t] / 2, y1 = MD_Y[i] + 17;
    return <circle key={i} cx={lerp(1336, 1466, p)} cy={lerp(y0, y1, p)} r="6" style={{ fill: 'var(--color-accent-200)' }} />;
  });
}

function SplitterBadge({ T, C }) {
  const S = C.Split, o = MOTION.pop(T, S + 0.4, S + 0.9);
  return (
    <div style={{ position: 'absolute', left: 2012, top: 920, width: 216, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, opacity: c01(o), transform: `scale(${o})`, fontFamily: MONO, fontSize: 15, color: 'var(--color-accent-300)', textAlign: 'center' }}>
      <span>MarkdownHeader</span><span>TextSplitter</span>
      <span style={{ color: 'var(--color-neutral-400)', fontSize: 13, marginTop: 4 }}>#, ##, ###</span>
    </div>
  );
}

function Summary({ T, C }) {
  const R = C.Ready;
  const o = MOTION.enter(T, R + 1.4, R + 2.2);
  const stats = [['18', 'pages parsed'], ['48', 'chunks'], ['48 × 384', 'vectors in Chroma'], ['1,206', 'BM25 terms']];
  return (
    <div style={{ position: 'absolute', left: 120, top: 1580, width: 2060, opacity: o, transform: `translateY(${(1 - o) * 40}px)` }}>
      <div style={{ fontFamily: MONO, fontSize: 36, color: 'var(--color-accent-300)' }}>ingest_file() → done</div>
      <div style={{ fontSize: 84, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--color-text)', marginTop: 18 }}>Employee_Handbook_2026.pdf is ready for retrieval.</div>
      <div style={{ display: 'flex', gap: 90, marginTop: 70 }}>
        {stats.map((s, i) => {
          const so = MOTION.enter(T, R + 2.0 + i * 0.15, R + 2.5 + i * 0.15);
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6, opacity: so }}>
              <span style={{ fontSize: 88, fontWeight: 500, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>{s[0]}</span>
              <span style={{ fontSize: 30, color: 'var(--color-neutral-400)' }}>{s[1]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Camera + HUD ---------- */
function camKeys(C, total) {
  return [
    [0, 380, 1060, 1.36],
    [C.Parse - 0.4, 380, 1060, 1.5],
    [C.Parse + 0.9, 1400, 1020, 1.0],
    [C.Split - 0.3, 1400, 1020, 1.08],
    [C.Split + 0.9, 2150, 1030, 0.84],
    [C.Embed - 0.3, 2150, 1030, 0.88],
    [C.Embed + 0.9, 3350, 610, 0.98],
    [C.Store - 0.3, 3350, 610, 1.03],
    [C.Store + 0.7, 3700, 610, 0.82],
    [C.Store + 2.6, 3700, 610, 0.86],
    [C.Store + 3.5, 4050, 600, 1.0],
    [C.Index - 0.3, 4050, 600, 1.04],
    [C.Index + 0.9, 3700, 1615, 0.97],
    [C.Ready - 0.2, 3700, 1615, 1.0],
    [C.Ready + 2.0, 2240, 1140, 0.43],
    [total, 2240, 1140, 0.445],
  ];
}
function camAt(T, K) {
  for (let i = 0; i < K.length - 1; i++) {
    if (T <= K[i + 1][0]) {
      const a = K[i], b = K[i + 1], p = MOTION.draw(T, a[0], b[0]);
      return [lerp(a[1], b[1], p), lerp(a[2], b[2], p), Math.exp(lerp(Math.log(a[3]), Math.log(b[3]), p))];
    }
  }
  const l = K[K.length - 1]; return [l[1], l[2], l[3]];
}

function Hud({ T, C, total }) {
  let idx = 0;
  SECTIONS.forEach((n, i) => { if (T >= C[n]) idx = i; });
  const s = C[SECTIONS[idx]], e = idx < SECTIONS.length - 1 ? C[SECTIONS[idx + 1]] : total;
  const o = Math.min(MOTION.enter(T, s + 0.1, s + 0.5), 1 - MOTION.enter(T, e - 0.35, e - 0.05));
  const cap = CAPS[idx];
  return (
    <React.Fragment>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 210, background: 'linear-gradient(180deg, var(--color-bg) 40%, color-mix(in srgb, var(--color-bg) 70%, transparent) 70%, transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: 64, top: 44, display: 'flex', alignItems: 'baseline', gap: 18, opacity: o, transform: `translateY(${(1 - o) * 10}px)` }}>
        <span style={{ fontFamily: MONO, fontSize: 22, color: 'var(--color-accent-300)' }}>{cap[0]}</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 38, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--color-text)' }}>{cap[1]}</span>
          <span style={{ fontSize: 24, color: 'var(--color-neutral-300)', maxWidth: 980 }}>{cap[2]}</span>
        </div>
      </div>
      <div style={{ position: 'absolute', right: 64, top: 56, display: 'flex', alignItems: 'center', gap: 10 }}>
        {CAPS.slice(0, 6).map((c, i) => {
          const st = i < idx ? 'done' : i === idx ? 'on' : 'off';
          return (
            <React.Fragment key={i}>
              {i ? <div style={{ width: 28, height: 1, background: st === 'off' ? 'var(--color-neutral-800)' : 'var(--color-accent-600)' }} /> : null}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: st === 'off' ? 'var(--color-neutral-700)' : st === 'on' ? 'var(--color-accent)' : 'var(--color-accent-600)', boxShadow: st === 'on' ? '0 0 12px var(--color-accent)' : 'none' }} />
                <span style={{ fontSize: 20, color: st === 'on' ? 'var(--color-text)' : st === 'done' ? 'var(--color-neutral-400)' : 'var(--color-neutral-600)' }}>{c[1]}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
}

function Piece({ hud = true, grid = true }) {
  const { T, CUES: C, authoredTotal } = useComposition();
  const total = authoredTotal;
  const [cx, cy, s] = camAt(T, camKeys(C, total));
  const fade = Math.max(1 - MOTION.enter(T, 0, 0.7), MOTION.draw(T, total - 0.7, total));
  return (
    <div data-screen-label={`t=${Math.floor(T)}s`} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--color-bg)', fontFamily: 'var(--font-body)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 25% 10%, color-mix(in srgb, var(--color-section) 55%, transparent), transparent 70%), radial-gradient(ellipse 60% 60% at 90% 100%, color-mix(in srgb, var(--color-accent-900) 70%, transparent), transparent 70%)' }} />
      <div style={{ position: 'absolute', left: 0, top: 0, width: WW, height: WH, transformOrigin: '0 0', transform: `translate(${960 - cx * s}px, ${590 - cy * s}px) scale(${s})` }}>
        {grid ? <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, color-mix(in srgb, var(--color-neutral-700) 60%, transparent) 1.4px, transparent 1.8px)', backgroundSize: '44px 44px' }} /> : null}
        <UploadPanel T={T} C={C} />
        <RawPanel T={T} C={C} />
        <MdPanel T={T} C={C} />
        <ChunksPanel T={T} C={C} />
        <EmbedPanel T={T} C={C} />
        <StorePanel T={T} C={C} />
        <IndexPanel T={T} C={C} />
        <ChunkCards T={T} C={C} />
        <SplitterBadge T={T} C={C} />
        <svg width={WW} height={WH} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
          <Connectors T={T} C={C} />
          <ParseParticles T={T} C={C} />
          <VectorCloud T={T} C={C} />
        </svg>
        <CloudLabels T={T} C={C} />
        <FlyingTerms T={T} C={C} />
        <FileCard T={T} C={C} />
        <Summary T={T} C={C} />
      </div>
      {hud ? <Hud T={T} C={C} total={total} /> : null}
      <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', opacity: fade, pointerEvents: 'none' }} />
    </div>
  );
}

function RagApp() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  return (
    <React.Fragment>
      <CompositionStage width={1920} height={1080} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="var(--color-bg)">
        <Piece hud={t.showHud} grid={t.showGrid} />
      </CompositionStage>
      <TweaksPanel>
        <TweakSection label="Playback" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={v => setTweak('motionEditor', v)} />
        <TweakSection label="Overlay" />
        <TweakToggle label="Step captions" value={t.showHud} onChange={v => setTweak('showHud', v)} />
        <TweakToggle label="Dot grid" value={t.showGrid} onChange={v => setTweak('showGrid', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}
window.RagApp = RagApp;
