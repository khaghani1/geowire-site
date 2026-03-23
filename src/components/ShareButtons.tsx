'use client'

import { useState } from 'react'

interface ShareButtonsProps {
  title: string
  slug: string
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const url = `https://geowire.org/article/${slug}`

  const share = (platform: string) => {
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    }
    window.open(urls[platform], '_blank', 'noopener,noreferrer,width=600,height=400')
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-mono text-gw-tx-3 uppercase tracking-wider">
        Share
      </span>
      {['twitter', 'telegram', 'linkedin', 'whatsapp'].map((p) => (
        <button
          key={p}
          onClick={() => share(p)}
          className="w-8 h-8 flex items-center justify-center rounded bg-gw-bg-2 text-gw-tx-2 hover:text-gw-tx-0 hover:bg-gw-bg-3 transition-colors text-xs font-mono uppercase"
          title={`Share on ${p}`}
        >
          {p[0].toUpperCase()}
        </button>
      ))}
      <button
        onClick={copyLink}
        className="flex items-center gap-1 px-2 py-1 rounded bg-gw-bg-2 text-gw-tx-2 hover:text-gw-tx-0 hover:bg-gw-bg-3 transition-colors text-xs font-mono"
      >
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  )
}