interface AdZoneProps {
  size: 'leaderboard' | 'sidebar' | 'in-article' | 'sticky-bottom'
  className?: string
}

const SIZES = {
  leaderboard: { width: '728px', height: '90px', label: '728×90' },
  sidebar: { width: '300px', height: '250px', label: '300×250' },
  'in-article': { width: '100%', height: '100px', label: 'In-Article' },
  'sticky-bottom': { width: '100%', height: '60px', label: '320×50' },
}

export default function AdZone({ size, className = '' }: AdZoneProps) {
  const config = SIZES[size]

  return (
    <div
      className={`ad-zone rounded ${className}`}
      style={{
        maxWidth: config.width,
        minHeight: config.height,
        width: '100%',
      }}
    >
      <span className="text-[10px]">AD — {config.label}</span>
    </div>
  )
}