'use client'

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    // TODO: connect to Supabase
    await new Promise((r) => setTimeout(r, 800))
    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <div className="card rounded-lg p-5">
      <h3 className="text-sm font-mono uppercase tracking-wider text-gw-gold mb-2">
        Intelligence Brief
      </h3>
      <p className="text-sm text-gw-tx-2 mb-4">
        Daily geopolitical intelligence delivered to your inbox. No noise, just signal.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 bg-gw-bg-0 border border-gw-border rounded px-3 py-2 text-sm text-gw-tx-0 placeholder:text-gw-tx-3 focus:outline-none focus:border-gw-gold/50 transition-colors"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 bg-gw-gold text-gw-bg-0 text-sm font-medium rounded hover:bg-gw-gold/90 transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? '...' : 'Subscribe'}
        </button>
      </form>
      {status === 'success' && (
        <p className="text-xs text-gw-green mt-2 font-mono">
          Subscribed. Welcome to the brief.
        </p>
      )}
      {status === 'error' && (
        <p className="text-xs text-gw-red mt-2 font-mono">
          Something went wrong. Try again.
        </p>
      )}
    </div>
  )
}