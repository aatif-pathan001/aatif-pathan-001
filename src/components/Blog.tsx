import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, ThumbsUp, ChevronRight, Search, FileText } from 'lucide-react';
import { BlogPost } from '../types';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [likingId, setLikingId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => {
        if (!res.ok) throw new Error("Could not fetch blog directory.");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleLikePost = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likingId) return;
    setLikingId(id);

    try {
      const res = await fetch(`/api/blog/${id}/like`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: data.likes } : p));
        if (selectedPost?.id === id) {
          setSelectedPost(prev => prev ? { ...prev, likes: data.likes } : null);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLikingId(null);
    }
  };

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="blog" className="py-20 border-t border-zinc-900 bg-zinc-950 relative">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-violet-950/10 rounded-full glow-blur -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded text-[11px] font-mono text-violet-400 mb-3">
              <BookOpen className="w-3.5 h-3.5 animate-pulse text-violet-400" />
              <span>Technical Deep Dives</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The Architecture logs
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-xl">
              Concrete walkthroughs, research summaries, and systems strategies written to demystify complex neural execution architectures in real production states.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search concepts or components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-violet-500 placeholder-zinc-500"
            />
          </div>
        </div>

        {/* Loading card slots */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2].map(i => (
              <div key={i} className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 h-44 animate-pulse">
                <div className="h-4 bg-zinc-800 w-2/3 rounded mb-3"></div>
                <div className="h-3 bg-zinc-800 w-full mb-1 rounded"></div>
                <div className="h-3 bg-zinc-800 w-4/5 rounded mb-4"></div>
                <div className="flex space-x-3">
                  <div className="w-16 h-3 bg-zinc-800 rounded"></div>
                  <div className="w-16 h-3 bg-zinc-800 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-zinc-900/30 hover:bg-zinc-900/60 border border-zinc-850 hover:border-zinc-750 p-6 rounded-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-3 text-[10px] font-mono text-zinc-500 mb-3">
                    <span className="text-violet-400 bg-violet-500/5 border border-violet-500/10 px-1.5 py-0.5 rounded capitalize">
                      {post.category}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-zinc-550" />
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-zinc-550" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-serif text-white group-hover:text-violet-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-zinc-400 text-xs mt-2.5 leading-normal font-light line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-900/85">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => handleLikePost(post.id, e)}
                      className="flex items-center space-x-1.5 text-xs font-mono text-zinc-400 hover:text-violet-400 transition-colors cursor-pointer"
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${likingId === post.id ? 'animate-bounce' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                    <span className="text-[10px] uppercase tracking-wider font-mono text-violet-400 group-hover:translate-x-1 transition-transform flex items-center space-x-0.5 font-bold">
                      <span>Article</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {filteredPosts.length === 0 && (
              <div className="bg-zinc-900/20 border border-zinc-800 p-12 text-center rounded-xl font-mono text-xs text-zinc-500">
                No articles matching execution filter directories found.
              </div>
            )}
          </div>
        )}

        {/* Detailed Modal Readout viewport */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col h-[85vh]">
              {/* Header */}
              <div className="p-6 border-b border-zinc-800 bg-zinc-950/50 flex align-middle justify-between">
                <div>
                  <div className="flex items-center space-x-3 text-[10px] font-mono text-zinc-500">
                    <span className="text-violet-400 uppercase">{selectedPost.category}</span>
                    <span>•</span>
                    <span>{selectedPost.date}</span>
                    <span>•</span>
                    <span>{selectedPost.readTime}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1.5">
                    {selectedPost.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 h-8 w-8 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 overflow-y-auto scrollbar bg-zinc-950/20 leading-relaxed font-light text-zinc-300 text-sm space-y-4">
                {/* Parse manual markup style inside content */}
                {selectedPost.content.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h4 key={idx} className="text-lg font-bold text-white pt-4 font-serif border-b border-zinc-900 pb-2">
                        {paragraph.replace('## ', '')}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h5 key={idx} className="text-sm font-mono tracking-wider font-bold text-violet-400 pt-2 uppercase">
                        {paragraph.replace('### ', '')}
                      </h5>
                    );
                  }
                  if (paragraph.startsWith('```ts')) {
                    // Quick crude code block formatting
                    const lines = paragraph.replace('```ts\n', '').replace('```', '').trim();
                    return (
                      <pre key={idx} className="bg-zinc-950 p-4 border border-zinc-850 rounded-lg font-mono text-xs text-violet-400 overflow-x-auto scrollbar">
                        <code>{lines}</code>
                      </pre>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n');
                    return (
                      <ul key={idx} className="list-disc pl-5 space-y-1 bg-zinc-900/20 p-3 rounded-lg border border-zinc-800">
                        {items.map((item, itemIdx) => (
                          <li key={itemIdx} className="text-zinc-300">
                            {item.replace('- ', '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={idx} className="text-zinc-300 leading-relaxed whitespace-pre-line">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {selectedPost.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={(e) => handleLikePost(selectedPost.id, e)}
                    className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-100 px-4 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-1.5 cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-violet-400" />
                    <span>{selectedPost.likes} Loves</span>
                  </button>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-1.5 rounded-lg text-xs font-mono font-medium cursor-pointer"
                  >
                    Finish Reading
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
