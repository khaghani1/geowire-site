import Link from 'next/link'
import { Article, CATEGORIES } from '@/lib/types'

interface ArticleCardProps {
  article: Article
  variant?: 'hero' | 'standard' | 'compact'
}

export default function ArticleCard({
  article,
  variant = 'standard',
}: ArticleCardProps) {
  const cat = CATEGORIES[article.category]
  const timeAgo = getTimeAgo(article.published_at)

  if (variant === 'hero') {
    return (
      <Link
        href={`/article/${article.slug}`}
        className="block card card-hover rounded-lg overflow-hidden group"
      >
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-xs font-mono uppercase tracking-wider ${cat.color}`}>
              {cat.label}
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className={`tag-${tag} text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded`}
              >
                {tag}
              </span>
            ))}
            {article.threat_level && (
              <span
                className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded threat-${article.threat_level}`}
              >
                {article.threat_level}
              </span>
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-display text-gw-tx-0 group-hover:text-gw-gold transition-colors leading-tight mb-3">
            {article.title}
          </h2>
          <p className="text-gw-tx-2 leading-relaxed mb-4 max-w-2xl">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-4 text-xs text-gw-tx-3 font-mono">
            <span>{article.author}</span>
            <span>&middot;</span>
            <span>{timeAgo}</span>
            <span>&middot;</span>
            <span>{article.read_time_minutes} min read</span>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link
        href={`/article/${article.slug}`}
        className="flex items-start gap-3 py-3 border-b border-gw-border last:border-0 hover:bg-gw-bg-2/50 px-2 -mx-2 rounded transition-colors group"
      >
        <div className="flex-1 min-w-0">
          <span className={`text-[10px] font-mono uppercase tracking-wider ${cat.color}`}>
            {cat.label}
          </span>
          <h4 className="text-sm text-gw-tx-0 font-medium leading-snug mt-1 group-hover:text-gw-gold transition-colors">
            {article.title}
          </h4>
          <span className="text-[11px] text-gw-tx-3 font-mono mt-1 block">
            {timeAgo}
          </span>
        </div>
        {article.threat_level && (
          <span
            className={`shrink-0 w-2 h-2 rounded-full mt-2 ${
              article.threat_level === 'critical'
                ? 'bg-gw-red'
                : article.threat_level === 'elevated'
                ? 'bg-gw-orange'
                : article.threat_level === 'moderate'
                ? 'bg-gw-blue'
                : 'bg-gw-green'
            }`}
          />
        )}
      </Link>
    )
  }

  // Standard variant
  return (
    <Link
      href={`/article/${article.slug}`}
      className="block card card-hover rounded-lg p-5 group"
    >
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className={`text-[11px] font-mono uppercase tracking-wider ${cat.color}`}>
          {cat.label}
        </span>
        {article.tags.map((tag) => (
          <span
            key={tag}
            className={`tag-${tag} text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded`}
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-lg font-display text-gw-tx-0 group-hover:text-gw-gold transition-colors leading-snug mb-2">
        {article.title}
      </h3>
      <p className="text-sm text-gw-tx-2 leading-relaxed mb-3 line-clamp-2">
        {article.excerpt}
      </p>
      <div className="flex items-center gap-3 text-[11px] text-gw-tx-3 font-mono">
        <span>{article.author}</span>
        <span>&middot;</span>
        <span>{timeAgo}</span>
        <span>&middot;</span>
        <span>{article.read_time_minutes} min</span>
      </div>
    </Link>
  )
}

function getTimeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 60) return `${diffMins}m ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d ago`
}