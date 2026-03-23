import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-6xl font-display text-gw-gold mb-4">404</h1>
        <p className="text-lg text-gw-tx-2 mb-8">
          Intelligence not found. The asset you're looking for may have been
          moved or redacted.
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-2 bg-gw-gold text-gw-bg-0 font-medium rounded hover:bg-gw-gold/90 transition-colors"
        >
          Return to HQ
        </Link>
      </main>
      <Footer />
    </>
  )
}