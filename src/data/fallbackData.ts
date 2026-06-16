import { Project, BlogPost } from '../types';

export const FALLBACK_PROJECTS: Project[] = [
  {
    id: "proj-youtube-triage",
    title: "YouTube Video Triage",
    description: "Specialized productivity tool designed for professional self-learners to determine if a long-form video (1–4 hours) is worth their time before they commit to watching it.",
    longDescription: "YouTube Video Triage is a specialized productivity tool designed for professional self-learners to determine if a long-form video (1–4 hours) is worth their time before they commit to watching it.\n\nRather than relying on unreliable indicators like 'likes' or general descriptions, the application provides a 'one-shot' verification of whether a specific topic is covered.\n\n### Core Purpose:\nThe app solves the 'lost in explanation' problem. It targets professionals (specifically ages 22–27) who spend 5–6 hours weekly on technical tutorials but often find themselves skimming at 2x speed, only to realize halfway through that a video doesn't actually answer their specific question.\n\n### Key Features:\n• Topic Verification: Paste a URL and ask a specific question; the app confirms if the answer exists within the video.\n• Exact Timestamps: If the topic is present, it provides clickable timestamps to jump directly to the relevant section.\n• Negative Scenario Handling: If the topic isn't found, the app provides a 'Skip' button to quickly move on to a different search result.\n• Interactive Breakdown: Users receive a brief breakdown and teaching summary within 60 seconds to facilitate immediate decision-making.\n\n### Strategic Positioning:\n• Dedicated: Focused solely on the 'triage' phase of learning.\n• One-Shot: Delivers exact information without requiring long chat threads.\n• Frictionless: Designed to work without mandatory logins or browser extensions in its V1.\n\n### Setup:\n1. Clone the repository:\n   git clone https://github.com/aatif-pathan001/youtube_triage.git\n   cd youtube_triage\n2. Create environment file:\n   cp .env.example .env\n   # Add your GOOGLE_API_KEY to .env\n3. Install dependencies:\n   pip install -e \".[dev]\"\n4. Verify installation:\n   pytest tests/unit/ -v\n   # Expected: 2 passed\n\n### Usage:\nRun the application with a YouTube URL and question:\n   python main.py\n\nExpected output: a printed answer based on the video content.",
    tags: ["Python", "Gemini API", "Pytest", "Triage Pipeline", "YouTube API"],
    category: "LLM Agents",
    githubUrl: "https://github.com/aatif-pathan001/youtube_triage",
    liveUrl: "#",
    demoType: "none",
    icon: "Video",
    featured: true,
    highlightedMetric: "One-shot verification results in under 60s."
  }
];

export const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    id: "post-low-latency",
    title: "Architecting Low-Latency LLM Pipelines: Cache Strategies",
    excerpt: "Exploring prompt caching architectures, local-routing fallback chains, and semantic search indices designed to bring round-trip API responses under 400 milliseconds.",
    content: `## The Latency Crisis in Production GenAI

When moving from a sandbox playground to production, developers quickly realize that raw inference latency is the primary bottleneck for conversational interfaces. A default roundtrip to state-of-the-art models often takes between 1.5 to 3 seconds. For crisp, human-like reaction times, our target must be **sub-400 milliseconds**.

In this article, we outline three architectural pillars to drastically decrease response times.

---

### 1. Semantic Query Caching

Instead of sending every user request to the LLM, we can intercept requests at the edge. A local Redis instance stores historically generated completions mapped to *vector embeddings* of the inquiries.

\`\`\`ts
// Pseudocode for local Semantic Cache lookup
const normalizedQuery = normalizeUserInput(req.body.text);
const queryEmbedding = await generateEmbedding(normalizedQuery);
const nearestMatch = await redis.search({
  vector: queryEmbedding,
  metric: "COSINE",
  threshold: 0.96 // Strict similarity threshold
});

if (nearestMatch) {
  return res.json({ text: nearestMatch.response, cached: true });
}
\`\`\`

By bypassing model invocation entirely for repeated, FAQ-like topics, latency drops from **1800ms** to **14ms**.

---

### 2. Multi-Model Hierarchical Routing

Not every prompt requires a deep reasoning model. By establishing a micro-router (e.g. running a fast, low-cost model like \`gemini-3.1-flash-lite\`), we can grade user intent and triage queries:

- **Simple/Conversational Queries ("hi", "how are you", "what is your pricing")** → Routed directly to \`gemini-3.1-flash-lite\` with minimal temperature. Latency: **~150ms**.
- **Complex Analytical/Coding Queries** → Escalated to core reasoning engines. Latency: **~800ms**.

---

### 3. Progressive Markdown Chunk Streaming

Ensure you stream tokens incrementally back to the browser rather than waiting for the entire inference block to resolve. We use Server-Sent Events (SSE) or Fetch Streams combined with custom rendering hooks to start typesetting text inside the customer module immediately upon receiving the first chunk.`,
    date: "2026-05-28",
    readTime: "6 min read",
    tags: ["LLM Performance", "Caching", "Architecture", "System Engineering"],
    category: "Engineering",
    likes: 42,
    url: "https://medium.com/@aatifkhanjodhpur"
  },
  {
    id: "post-system-instruct",
    title: "Mastering System Instructions: Structuring LLM State Control",
    excerpt: "System instructions are not just fancy prompts. Learn how to treat system prompts as compilation layers, compile structural schemas, and enforce deterministic output constraints.",
    content: `## System Instructions: The Compilation Layer of GenAI

Many engineers treat the 'System Instruction' as simply a place to write *"You are a helpful assistant."* In reality, the system instruction is the bootloader of the LLM thread. It anchors the core state-space, defines hard security guidelines, determines default response schemas, and sets grammar constraints.

---

### Structural vs. Narrative Commands

When designing instructions, segregate narrative configuration (personality, tone) from structural restrictions (formatting boundaries, output limits).

Here is a recommended production blueprint:

\`\`\`markdown
# CORE IDENTITY
You are the autonomous operations coordinator for AI Studio.

# SYSTEM RULES & BOUNDARIES
1. OUTPUT: You MUST only communicate using valid RFC 8259 JSON format.
2. DO NOT include any markdown block symbols (\`\`\`json) or trailing formatting characters.
3. If an execution request is outside authorized scopes, return the following exact structure:
   {"error": "Unauthorized scope exception", "code": 403}
\`\`\`

---

### Restricting Output with strict MimeTypes and JSON Schema

By passing a strict \`responseSchema\` through the SDK structure, we completely bypass the need to constantly write *"please return JSON"* in our prompts. The model's decoder will organically enforce types at the token level, saving massive token size and ensuring the backend doesn't crash during JSON parsing!`,
    date: "2026-06-02",
    readTime: "8 min read",
    tags: ["Prompt Engineering", "JSON Enforcement", "Security"],
    category: "Tutorial",
    likes: 58,
    url: "https://medium.com/@aatifkhanjodhpur"
  }
];
