import { useState } from 'react'
import { motion } from 'framer-motion'
import { Apple, CheckCircle2, Loader2, Mail, PlayCircle } from 'lucide-react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | error | loading | success
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!EMAIL_REGEX.test(email.trim())) {
      setStatus('error')
      setError('Please enter a valid email address.')
      return
    }
    setStatus('loading')
    setError('')
    setTimeout(() => {
      setStatus('success')
    }, 900)
  }

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-10 rounded-3xl bg-deep-green p-8 sm:p-12 lg:grid-cols-2 lg:items-center"
      >
        <div>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Get the GroMark App
          </h2>
          <p className="mt-3 max-w-md text-white/85">
            Order on the go, track deliveries in real time, and unlock app-only deals. Or subscribe below for weekly
            offers straight to your inbox.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-white transition-colors hover:bg-white/20"
            >
              <Apple size={22} aria-hidden="true" />
              <span className="text-left leading-tight">
                <span className="block text-[10px] text-white/70">Download on the</span>
                <span className="block text-sm font-semibold">App Store</span>
              </span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-white transition-colors hover:bg-white/20"
            >
              <PlayCircle size={22} aria-hidden="true" />
              <span className="text-left leading-tight">
                <span className="block text-[10px] text-white/70">Get it on</span>
                <span className="block text-sm font-semibold">Google Play</span>
              </span>
            </button>
          </div>
        </div>

        <div id="contact" className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
          <h3 className="font-display text-lg font-semibold text-dark-text">Weekly Deals Newsletter</h3>
          <p className="mt-1 text-sm text-muted-text">
            Fresh discounts and new arrivals — no spam, unsubscribe any time.
          </p>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 flex items-center gap-2 rounded-xl bg-fresh-green/10 px-4 py-3 text-sm font-medium text-deep-green"
              role="status"
            >
              <CheckCircle2 size={18} />
              You&apos;re subscribed! Check your inbox for a welcome offer.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-5">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-text"
                  />
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (status === 'error') setStatus('idle')
                    }}
                    placeholder="you@example.com"
                    aria-invalid={status === 'error'}
                    aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm text-dark-text focus:outline-none focus:ring-2 focus:ring-fresh-green"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex items-center justify-center gap-2 rounded-xl bg-cta-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:brightness-95 disabled:opacity-70"
                >
                  {status === 'loading' && <Loader2 size={15} className="animate-spin" />}
                  {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                </button>
              </div>
              {status === 'error' && (
                <p id="newsletter-error" role="alert" className="mt-2 text-xs font-medium text-sale-red">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </motion.div>
    </section>
  )
}
