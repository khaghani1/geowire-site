'use client';

import Link from 'next/link';
import type { Article } from '@/lib/articles';

interface ArticleCardProps {
  article: Article;
  index?: number;
  variant?: 'grid' | 'hero' | 'compact';
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const hours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function ArticleCard({ article, index, variant = 'grid' }: ArticleCardProps) {
  if (variant === 'hero') {
    return (
      <Link href={`/article/${article.slug}`} className="block group">
        <div className="bg-bg-2 border border-border rounded-xl p-6 sm:p-8 hover:border-border-hover transition-colors">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {article.tags.map((tag) => (
              <span key={tag} className={`font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded ${
                tag === 'breaking' || tag === 'critical'
                  ? 'bg-accent-red/15 text-accent-red'
                  : tag === 'analysis'
                  ? 'bg-accent-blue/15 text-accent-blue'
                  : 'bg-bg-4 text-tx-2'
              }`}>{tag}</span>
            ))}
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-tx-0 leading-tight mb-4 group-hover:text-accent-gold transition-colors">
            {article.title}
          </h2>
          <p className="text-tx-2 text-base sm:text-lg leading-relaxed mb-6 max-w-3xl">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-4 text-tx-3 font-mono text-xs">
            <span>{article.author}</span>
            <span>·</span>
            <span>{article.readTime} min read</span>
            <span>·</span>
            <span>{timeAgo(article.publishedAt)}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.slug}`} className="block group relative">
      <div className="bg-bg-2 border border-border rounded-lg p-5 hover:border-border-hover transition-colors h-full">
        {typeof index === 'number' && (
          <span className="article-number select-none">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {article.tags.slice(0, 2).map((tag) => (
            <span key={tag} className={`font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded ${
              tag === 'breaking' || tag === 'critical'
                ? 'bg-accent-red/15 text-accent-red'
                : tag === 'analysis'
                ? 'bg-accent-blue/15 text-accent-blue'
                : tag === 'exclusive'
                ? 'bg-accent-gold/15 text-accent-gold'
                : 'bg-bg-4 text-tx-2'
            }`}>{tag}</span>
          ))}
        </div>
        <h3 className="font-display text-lg text-tx-0 leading-snug mb-3 group-hover:text-accent-gold transition-colors pr-8">
          {article.title}
        </h3>
        <div className="flex items-center gap-3 text-tx-3 font-mono text-[10px]">
          <span>{timeAgo(article.publishedAt)}</span>
          <span>·</span>
          <span>{article.readTime} min</span>
        </div>
      </div>
    </Link>
  );
}
