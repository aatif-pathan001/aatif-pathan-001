export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: 'LLM Agents' | 'Computer Vision' | 'Mlopps / Infrastructure' | 'Voice AI';
  githubUrl?: string;
  liveUrl?: string;
  demoType: 'text-agent' | 'prompt-compiler' | 'data-analyst' | 'none';
  icon: string; // Lucide icon name
  featured: boolean;
  highlightedMetric?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown supported content
  date: string;
  readTime: string;
  tags: string[];
  category: 'Research' | 'Tutorial' | 'Engineering' | 'Career';
  likes: number;
  url?: string;
}

export interface Inquiry {
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

export interface PlaygroundConfig {
  model: 'gemini-3.5-flash' | 'gemini-3.1-flash-lite';
  temperature: number;
  systemInstruction: string;
  maxOutputTokens?: number;
}

export interface Message {
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: string;
}
