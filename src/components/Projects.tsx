import React, { useState, useEffect } from 'react';
import { Layers, Github, ExternalLink, Cpu, Hammer, Search, Eye } from 'lucide-react';
import { Project } from '../types';
import { FALLBACK_PROJECTS } from '../data/fallbackData';

interface ProjectsProps {}

export default function Projects({}: ProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error("Could not load projects catalog");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Empty or invalid projects list, switching to client-side fallback.");
        }
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Express endpoint '/api/projects' is unreachable. Falling back to high-fidelity static portfolio data:", err);
        setProjects(FALLBACK_PROJECTS);
        setLoading(false);
      });
  }, []);

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 border-t border-zinc-900 bg-zinc-950 relative">
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-violet-900/10 rounded-full glow-blur -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Projects & Builds
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-xl">
              Production-grade code repositories, architectural designs, and customized pipelines optimized for throughput, safety, and agent precision.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-1.5 bg-zinc-900/60 border border-zinc-800 p-1 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all cursor-pointer capitalize ${
                  filter === cat
                    ? 'bg-zinc-800 text-violet-400 border border-zinc-700'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                {cat === 'all' ? 'All Workspace' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 h-64 animate-pulse">
                <div className="w-12 h-12 bg-zinc-850 rounded-lg mb-4"></div>
                <div className="h-5 bg-zinc-800 w-1/2 rounded mb-2"></div>
                <div className="h-3 bg-zinc-800 w-3/4 rounded mb-1"></div>
                <div className="h-3 bg-zinc-800 w-2/3 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-zinc-900/30 hover:bg-zinc-900/60 border border-zinc-850 hover:border-zinc-750 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between group h-full relative overflow-hidden"
              >
                {/* Tech tag list */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-850 text-violet-400 font-mono text-center flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-violet-400" />
                    </div>
                    {project.highlightedMetric && (
                      <span className="text-[10px] font-mono text-violet-400 bg-violet-500/5 border border-violet-500/10 px-2 py-0.5 rounded">
                        {project.highlightedMetric}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-violet-500 uppercase">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1 group-hover:text-violet-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-xs mt-2.5 leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Submitting actions */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-900">
                  <div className="flex items-center space-x-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors flex items-center space-x-1.5 text-xs font-mono"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors flex items-center space-x-1.5 text-xs font-mono"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-zinc-400 hover:text-white transition-colors flex items-center space-x-1.5 text-xs font-mono cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </div>

                  <span className="text-[10px] font-mono text-zinc-500 italic">
                    Production code repository
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal/Detail view */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
              <div className="p-6 border-b border-zinc-850 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase">{selectedProject.category}</span>
                  <h3 className="text-xl font-bold text-white mt-1 font-serif">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto scrollbar">
                <div>
                  <h4 className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-1">Architectural Overview</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed font-light whitespace-pre-wrap">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </div>

                <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-400 block">EVALUATED PERFORMANCE IMPACT</span>
                  <span className="text-sm font-bold font-mono text-violet-400 mt-1 block">
                    {selectedProject.highlightedMetric || "Not Profiled"}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-2">Technologies Handled</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="text-xs font-mono text-zinc-300 bg-zinc-800 px-2.5 py-1 rounded border border-zinc-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-500">ID: {selectedProject.id}</span>
                <div className="flex items-center space-x-3">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white px-3.5 py-1.5 rounded text-xs font-mono flex items-center space-x-1.5 animate-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code Repo</span>
                    </a>
                  )}
                  {selectedProject.liveUrl && selectedProject.liveUrl !== "#" && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-violet-600 hover:bg-violet-500 text-white px-3.5 py-1.5 rounded text-xs font-mono flex items-center space-x-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Site</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
