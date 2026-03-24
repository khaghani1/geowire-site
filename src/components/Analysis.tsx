"use client";
import { useState, useEffect, useRef } from "react";

interface Section {
  id: string;
  title: string;
  content: string;
}

interface Article {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  published_at: string;
  updated_at: string;
  category: string;
  tags: string[];
  reading_time: number;
  day: number;
  sections: Section[];
}

function renderMarkdown(text: string) {
  const parts: React.ReactNode[] = [];
  const lines = text.split("\n");
  let key = 0;
  for (const line of lines) {
    if (line.trim() === "") {
      parts.push(<br key={key++} />);
      continue;
    }
    // Parse bold and bullet points
    const parsed = line.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
    if (line.startsWith("• ") || line.startsWith("- ")) {
      parts.push(
        <div key={key++} className="flex gap-2 pl-4 my-1">
          <span className="text-accent-blue shrink-0">•</span>
          <span dangerouslySetInnerHTML={{ __html: parsed.replace(/^[•\-]\s*/, '') }} />
        </div>
      );
    } else {
      parts.push(<span key={key++} dangerouslySetInnerHTML={{ __html: parsed }} />);
      parts.push(<span key={key++}> </span>);
    }
  }
  return parts;
}

function CategoryBadge({ cat }: { cat: string }) {
  const colors: Record<string, string> = {
    strategic_analysis: "bg-red-900/60 text-red-300 border-red-700/50",
    deep_dive: "bg-blue-900/60 text-blue-300 border-blue-700/50",
    market_impact: "bg-green-900/60 text-green-300 border-green-700/50",
    scenario: "bg-purple-900/60 text-purple-300 border-purple-700/50",
  };
  const labels: Record<string, string> = {
    strategic_analysis: "STRATEGIC ANALYSIS",
    deep_dive: "DEEP DIVE",
    market_impact: "MARKET IMPACT",
    scenario: "SCENARIO",
  };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded border font-mono tracking-wider ${colors[cat] || colors.strategic_analysis}`}>
      {labels[cat] || cat.toUpperCase().replace(/_/g, " ")}
    </span>
  );
}

function ArticleList({ articles, onSelect }: { articles: Article[]; onSelect: (a: Article) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-txt-primary">Intelligence Briefings</h2>
          <p className="text-xs text-txt-muted mt-1">Strategic analysis updated daily</p>
        </div>
        <div className="text-xs text-txt-muted font-mono">{articles.length} REPORT{articles.length !== 1 ? "S" : ""}</div>
      </div>
      {articles.map((article) => (
        <button
          key={article.id}
          onClick={() => onSelect(article)}
          className="w-full text-left bg-bg-card border border-border rounded-lg p-5 hover:border-accent-blue/50 transition-all group"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <CategoryBadge cat={article.category} />
                <span className="text-[10px] font-mono text-yellow-400">DAY {article.day}</span>
                <span className="text-[10px] text-txt-muted font-mono">
                  {new Date(article.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <h3 className="text-base font-semibold text-txt-primary group-hover:text-accent-blue transition-colors leading-tight mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-txt-muted leading-relaxed line-clamp-2">{article.subtitle}</p>
              <div className="flex items-center gap-3 mt-3 text-[10px] text-txt-muted font-mono">
                <span>{article.author}</span>
                <span>•</span>
                <span>{article.reading_time} MIN READ</span>
                <span>•</span>
                <span>{article.sections.length} SECTIONS</span>
              </div>
            </div>
            <div className="text-txt-muted group-hover:text-accent-blue transition-colors shrink-0 mt-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function ArticleReader({ article, onBack }: { article: Article; onBack: () => void }) {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.findIndex((ref) => ref === entry.target);
            if (idx >= 0) setActiveSection(idx);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    sectionRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, [article]);

  const scrollToSection = (idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex gap-6">
      {/* Table of Contents - sticky sidebar */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-4">
          <button onClick={onBack} className="flex items-center gap-1 text-xs text-txt-muted hover:text-accent-blue mb-4 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            All Briefings
          </button>
          <div className="text-[10px] font-mono text-txt-muted mb-3 tracking-wider">TABLE OF CONTENTS</div>
          <nav className="space-y-1">
            {article.sections.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(idx)}
                className={`block w-full text-left text-xs py-1.5 px-2 rounded transition-all leading-tight ${
                  activeSection === idx
                    ? "text-accent-blue bg-accent-blue/10 font-medium"
                    : "text-txt-muted hover:text-txt-secondary"
                }`}
              >
                <span className="font-mono text-[10px] mr-1.5 opacity-50">{String(idx + 1).padStart(2, "0")}</span>
                {section.title}
              </button>
            ))}
          </nav>
          <div className="mt-6 pt-4 border-t border-border">
            <div className="text-[10px] font-mono text-txt-muted space-y-1">
              <div>PUBLISHED {new Date(article.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase()}</div>
              <div>{article.reading_time} MIN READ</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="bg-bg-primary px-1.5 py-0.5 rounded text-[9px]">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="flex-1 min-w-0 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <button onClick={onBack} className="lg:hidden flex items-center gap-1 text-xs text-txt-muted hover:text-accent-blue mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            Back
          </button>
          <div className="flex items-center gap-2 mb-3">
            <CategoryBadge cat={article.category} />
            <span className="text-[10px] font-mono text-yellow-400">OPERATION EPIC FURY — DAY {article.day}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-txt-primary leading-tight mb-3">{article.title}</h1>
          <p className="text-base text-txt-secondary leading-relaxed mb-4">{article.subtitle}</p>
          <div className="flex items-center gap-3 text-xs text-txt-muted font-mono pb-4 border-b border-border">
            <span>{article.author}</span>
            <span>•</span>
            <span>{new Date(article.published_at).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span>
            <span>•</span>
            <span>{article.reading_time} min read</span>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {article.sections.map((section, idx) => (
            <div
              key={section.id}
              ref={(el) => { sectionRefs.current[idx] = el; }}
              className="scroll-mt-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-mono text-accent-blue/60">{String(idx + 1).padStart(2, "0")}</span>
                <h2 className="text-lg font-bold text-txt-primary">{section.title}</h2>
              </div>
              <div className="text-sm text-txt-secondary leading-relaxed space-y-1">
                {renderMarkdown(section.content)}
              </div>
              {idx < article.sections.length - 1 && (
                <div className="border-b border-border/50 mt-8" />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-border">
          <div className="bg-bg-card rounded-lg p-4 text-xs text-txt-muted">
            <div className="font-mono text-[10px] tracking-wider mb-2 text-txt-secondary">DISCLAIMER</div>
            GeoWire Intelligence provides analysis for informational purposes only. This is not investment advice.
            Analysis reflects publicly available information as of the publication date.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Analysis() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selected, setSelected] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/data/analysis")
      .then((r) => r.json())
      .then((d) => { setArticles(d.articles || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-txt-muted font-mono text-sm animate-pulse">Loading intelligence briefings...</div>
      </div>
    );
  }

  if (selected) {
    return <ArticleReader article={selected} onBack={() => setSelected(null)} />;
  }

  return <ArticleList articles={articles} onSelect={setSelected} />;
}
