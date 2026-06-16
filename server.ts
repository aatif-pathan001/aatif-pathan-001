import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Express
const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined in environment variables. Falling back to structured mock intelligence.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY_FOR_SAFETY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// In-memory data store with high-tech pre-population
interface Inquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
  message: string;
  projectInterest?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved';
  sentiment?: 'positive' | 'neutral' | 'critical';
  urgency?: 'high' | 'medium' | 'low';
  summary?: string;
  aiSuggestedReply?: string;
}

const inquiries: Inquiry[] = [
  {
    id: "inq-1",
    name: "Sarah Chen",
    email: "sarah.chen@techsolutions.io",
    company: "TechSolutions IO",
    role: "VP of Product",
    message: "We are looking to build a multi-agent system for our customer service pipeline. Saw your GitHub project on agent orchestrations. Can we schedule a consulting call next Tuesday?",
    projectInterest: "LLM Agents",
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    status: "new",
    sentiment: "positive",
    urgency: "high",
    summary: "Wants consultation for custom customer service multi-agent systems next Tuesday. Discovered through GitHub repository.",
    aiSuggestedReply: "Dear Sarah,\n\nThank you for reaching out! I would love to assist you with TechSolutions IO's customer service workflows. Multi-agent orchestration is a key area of my expertise. I am completely open next Tuesday, June 16th. Let me know if 10:00 AM or 2:00 PM EST works best for you and I'll send a calendar invite."
  },
  {
    id: "inq-2",
    name: "Marcus Aurelius",
    email: "marcus@romeai.com",
    company: "Rome AI Labs",
    role: "Lead Architect",
    message: "Your blog post on low-latency prompt engineering strategies was incredible. Do you have any speaking availability for our AI summit in late July?",
    projectInterest: "Mlopps / Infrastructure",
    createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    status: "contacted",
    sentiment: "positive",
    urgency: "medium",
    summary: "Invited to speak at Rome AI Labs summit in late July, praising the low-latency prompt engineering deep-dive blog post.",
    aiSuggestedReply: "Hi Marcus,\n\nI really appreciate you reading the article and extending this generous invitation! I am highly passionate about low-latency optimization. I would be honored to speak at Rome AI Labs. Let's arrange a brief 10-minute sync to discuss the exact topic focus and audience size."
  }
];

// 1. Projects Endpoint
const PROJECTS = [
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

app.get("/api/projects", (req, res) => {
  res.json(PROJECTS);
});

// 2. Blog Posts Endpoint & Medium Integration
import Parser from "rss-parser";
const parser = new Parser();

const BLOG_POSTS = [
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

let cachedBlogPosts: any[] = [];
let lastFetchedTime = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes cache

async function getMediumPosts() {
  try {
    const feed = await parser.parseURL("https://medium.com/feed/@aatifkhanjodhpur");
    if (!feed || !feed.items || feed.items.length === 0) {
      console.log("No feed items found or empty from Medium RSS.");
      return BLOG_POSTS;
    }

    const mappedPosts = feed.items.map((item, index) => {
      const rawContent = item['content:encoded'] || item.content || "";
      
      let excerpt = item.contentSnippet || "";
      if (!excerpt && rawContent) {
        excerpt = rawContent.replace(/<[^>]*>/g, '').substring(0, 150) + "...";
      }
      if (excerpt.length > 150) {
        excerpt = excerpt.substring(0, 150) + "...";
      }

      // Format simple markup/paragraphs
      let formattedContent = rawContent
        .replace(/<h3>/g, '## ')
        .replace(/<\/h3>/g, '\n\n')
        .replace(/<h4>/g, '### ')
        .replace(/<\/h4>/g, '\n\n')
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '\n\n')
        .replace(/<li>/g, '- ')
        .replace(/<\/li>/g, '\n')
        .replace(/<ul>/g, '')
        .replace(/<\/ul>/g, '\n\n')
        .replace(/<pre>/g, '```ts\n')
        .replace(/<\/pre>/g, '\n```\n\n')
        .replace(/<[^>]*>/g, ''); 

      const tags = (item.categories || []).map(t => typeof t === 'string' ? t : (t as any)._ || "");
      const finalTags = tags.length > 0 ? tags.slice(0, 4) : ["Medium", "Software Engineering"];
      
      const category: 'Research' | 'Tutorial' | 'Engineering' | 'Career' = 
        finalTags.some(t => t.toLowerCase().includes('research') || t.toLowerCase().includes('ai')) ? 'Research' :
        finalTags.some(t => t.toLowerCase().includes('tutorial') || t.toLowerCase().includes('how')) ? 'Tutorial' :
        finalTags.some(t => t.toLowerCase().includes('career') || t.toLowerCase().includes('interview')) ? 'Career' : 'Engineering';

      let displayDate = "";
      try {
        if (item.pubDate) {
          const dateObj = new Date(item.pubDate);
          displayDate = dateObj.toISOString().split('T')[0];
        }
      } catch (err) {
        displayDate = new Date().toISOString().split('T')[0];
      }

      const wordCount = rawContent.split(/\s+/).length || 300;
      const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

      return {
        id: `medium-${index}`,
        title: item.title || "Untitled Article",
        excerpt: excerpt,
        content: formattedContent || "Read the full article directly on Medium.",
        date: displayDate || "2026-06-15",
        readTime: `${readTimeMinutes} min read`,
        tags: finalTags,
        category: category,
        likes: Math.floor(Math.random() * 20) + 15, // Base dynamic likes
        url: item.link
      };
    });

    return mappedPosts;
  } catch (error) {
    console.error("Failed to parse Medium RSS feed, using offline architecture logs:", error);
    return BLOG_POSTS;
  }
}

async function getBlogPosts() {
  const now = Date.now();
  if (cachedBlogPosts.length > 0 && (now - lastFetchedTime) < CACHE_TTL) {
    return cachedBlogPosts;
  }

  const posts = await getMediumPosts();
  if (cachedBlogPosts.length > 0) {
    posts.forEach(newPost => {
      const match = cachedBlogPosts.find(p => p.url === newPost.url || p.title === newPost.title);
      if (match) {
        newPost.likes = match.likes;
        newPost.id = match.id;
      }
    });
  }
  cachedBlogPosts = posts;
  lastFetchedTime = now;
  return cachedBlogPosts;
}

app.get("/api/blog", async (req, res) => {
  try {
    const list = await getBlogPosts();
    res.json(list);
  } catch (err) {
    res.json(BLOG_POSTS);
  }
});

// Increment post likes
app.post("/api/blog/:id/like", async (req, res) => {
  try {
    const list = await getBlogPosts();
    const post = list.find(p => p.id === req.params.id);
    if (post) {
      post.likes += 1;
      res.json({ success: true, likes: post.likes });
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Could not apply interaction status" });
  }
});


// 3. Contact Inquiry Form Processing & Automated AI Analysis
app.post("/api/contact", async (req, res) => {
  const { name, email, company, role, message, projectInterest } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required fields." });
  }

  // Create base inquiry object
  const newInquiry: Inquiry = {
    id: `inq-${Date.now()}`,
    name,
    email,
    company: company || "Freelance / Independent",
    role: role || "Developer / Founder",
    message,
    projectInterest: projectInterest || "General Inquiry",
    createdAt: new Date().toISOString(),
    status: "new"
  };

  try {
    const ai = getGeminiClient();
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== "MOCK_KEY_FOR_SAFETY") {
      // Prompt construction to process the incoming client inquiry
      const prompt = `Analyze the following professional portfolio inquiry from a client.
Visitor Name: ${newInquiry.name}
Email: ${newInquiry.email}
Company: ${newInquiry.company}
Role: ${newInquiry.role}
Project of Interest: ${newInquiry.projectInterest}
Message Content: "${newInquiry.message}"

Please return a structured JSON response evaluating the message. It must fit the following exact JSON format:
{
  "sentiment": "positive" | "neutral" | "critical",
  "urgency": "high" | "medium" | "low",
  "summary": "1-sentence bullet proof summary of what the client is asking for",
  "suggestedReply": "A highly polished, personalized, draft response letter from the AI Engineer (me) to this visitor, addressing their project of interest and message with custom consulting terms or scheduling interest."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are an elite, highly professional operations AI assistant representing an expert AI & Full-Stack Engineer. Your job is to parse incoming client queries, classify their business intent, summarize core action points, and draft professional, customized follow-up emails.",
          responseMimeType: "application/json",
          temperature: 1.0,
        }
      });

      if (response && response.text) {
        try {
          const parsed = JSON.parse(response.text.trim());
          newInquiry.sentiment = parsed.sentiment || "neutral";
          newInquiry.urgency = parsed.urgency || "medium";
          newInquiry.summary = parsed.summary || "Inquiry from website visitor.";
          newInquiry.aiSuggestedReply = parsed.suggestedReply || "Hello! Let's schedule a time to talk about your project interest.";
        } catch (e) {
          console.error("Failed to parse Gemini JSON output:", e);
          // Fallback parsing / defaults
          newInquiry.sentiment = "neutral";
          newInquiry.urgency = "medium";
          newInquiry.summary = "Visitor left a message regarding " + (projectInterest || "general collaboration") + ".";
          newInquiry.aiSuggestedReply = `Hi ${name},\n\nThank you for reaching out! I've received your query about ${projectInterest || "collaboration"}. I am reviewing the details and will get back to you shortly.\n\nBest regards,\nAI Engineer`;
        }
      }
    } else {
      // Fallback simple heuristic processing for offline/dev modes
      newInquiry.sentiment = message.toLowerCase().includes("love") || message.toLowerCase().includes("great") ? "positive" : "neutral";
      newInquiry.urgency = message.toLowerCase().includes("urgent") || message.toLowerCase().includes("schedule") || message.toLowerCase().includes("call") ? "high" : "medium";
      newInquiry.summary = `Wants to collaborate regarding ${projectInterest || "AI systems"}. Message sent by ${name}.`;
      newInquiry.aiSuggestedReply = `Hi ${name},\n\nThank you for getting in touch from my portfolio! I would be delighted to discuss how I can help ${company || "your team"} with ${projectInterest || "custom AI solutions"}.\n\nLet's coordinate a quick Zoom or Google Meet session to outline requirements.\n\nWarm regards,\nPortfolio Assistant (Fallback Context)`;
    }
  } catch (error) {
    console.error("Gemini context analysis failed:", error);
    newInquiry.sentiment = "neutral";
    newInquiry.urgency = "medium";
    newInquiry.summary = "Inquiry logged successfully.";
    newInquiry.aiSuggestedReply = `Hi ${name},\n\nThanks for reaching out! I am currently checking availability and will respond shortly.\n\nBest,`;
  }

  // Push to inquiries list
  inquiries.unshift(newInquiry);
  res.json({ success: true, inquiry: newInquiry });
});

// 4. Admin inquiries management
app.get("/api/inquiries", (req, res) => {
  res.json(inquiries);
});

// Update inquiry status
app.post("/api/inquiries/:id/status", (req, res) => {
  const { status } = req.body;
  const inquiry = inquiries.find(i => i.id === req.params.id);
  if (inquiry) {
    inquiry.status = status;
    res.json({ success: true, inquiry });
  } else {
    res.status(404).json({ error: "Inquiry not found" });
  }
});


// 5. Interactive Demo Playground endpoint
app.post("/api/playground/chat", async (req, res) => {
  const { messages, model, temperature, systemInstruction } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  try {
    const ai = getGeminiClient();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "MOCK_KEY_FOR_SAFETY") {
      // Mock sandbox mode
      const lastMessage = messages[messages.length - 1];
      const modelSelection = model || "gemini-3.5-flash";
      const systemSnippet = systemInstruction ? `[System: "${systemInstruction.substring(0, 40)}..."]` : "";
      
      const mockReply = `🤖 [SIMULATED SANDBOX RESPONDER - ${modelSelection}]
${systemSnippet}
Thank you so much for testing the AI Playground demo! 
Because this app is running in a local verification environment without secrets, I am generating this simulated developer model callback to preserve performance.

Your inquiry was: "${lastMessage.content}"

When deployed with a live API Key in AI Studio, this playground communicates server-to-server with absolute token streaming, customized temperatures (currently set to **${temperature || 0.7}**), and full structured system contexts. Type "hello" or "analyze prompt" to check behavior.`;

      return res.json({
        content: mockReply,
        modelUsed: modelSelection,
        tokensAnalyzed: lastMessage.content.split(" ").length * 2
      });
    }

    // Prepare contents array for @google/genai SDK
    // Filter to standard format
    const contentsPayload = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : m.role === "system" ? "user" : m.role || "user",
      parts: [{ text: m.content }]
    }));

    // Call Gemini generateContent API
    const response = await ai.models.generateContent({
      model: model || "gemini-3.5-flash",
      contents: contentsPayload,
      config: {
        systemInstruction: systemInstruction || "You are an expert, creative AI Engineer assistant answering questions on technical architectures.",
        temperature: parseFloat(temperature) || 0.7,
      }
    });

    if (response && response.text) {
      res.json({
        content: response.text,
        modelUsed: model || "gemini-3.5-flash",
        tokensAnalyzed: response.text.length / 4 // Simple heuristic for UI telemetry
      });
    } else {
      res.status(500).json({ error: "No response text generated from Gemini model." });
    }

  } catch (error: any) {
    console.error("Playground execution threw exception:", error);
    res.status(500).json({ error: `AI Execution failed: ${error.message || error}` });
  }
});


// Express static server integration for production and Vite middleware for dev
const setupServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Configuring dev mode with Vite server middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Configuring production mode with static direct paths...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server launched successfully. Listening at http://0.0.0.0:${PORT}`);
  });
};

setupServer().catch((err) => {
  console.error("FATAL: Failed to launch Express server bootstrap:", err);
});
