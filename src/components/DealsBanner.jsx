import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Tag } from 'lucide-react'

const DEAL_DURATION_SECONDS = 6 * 60 * 60 // 6-hour rolling promo window

function getSecondsRemaining() {
  const now = Date.now()
  const cyclePosition = now % (DEAL_DURATION_SECONDS * 1000)
  return Math.floor((DEAL_DURATION_SECONDS * 1000 - cyclePosition) / 1000)
}

function formatUnit(value) {
  return String(value).padStart(2, '0')
}

export default function DealsBanner() {
  const [secondsLeft, setSecondsLeft] = useState(getSecondsRemaining)

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 0 ? DEAL_DURATION_SECONDS : prev - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const hours = Math.floor(secondsLeft / 3600)
  const minutes = Math.floor((secondsLeft % 3600) / 60)
  const seconds = secondsLeft % 60

  const units = [
    { label: 'Hours', value: hours },
    { label: 'Min', value: minutes },
    { label: 'Sec', value: seconds },
  ]

  return (
    <section id="deals" className="px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 overflow-hidden rounded-3xl bg-deep-green px-6 py-12 text-center sm:px-12 lg:flex-row lg:justify-between lg:text-left"
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-fresh-green/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-cta-orange/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-lg">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cta-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            <Tag size={13} />
            Limited-Time Offer
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Up to 30% Off Fresh Produce
          </h2>
          <p className="mt-3 text-white/85">
            Stock up on seasonal fruits and vegetables before this weekly deal window closes. New deals drop every
            cycle.
          </p>
          <a
            href="#shop"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-deep-green shadow-card transition-transform hover:-translate-y-0.5"
          >
            Grab the Deal
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="relative flex items-center gap-3 sm:gap-4" role="timer" aria-live="polite">
          {units.map((unit, idx) => (
            <div key={unit.label} className="flex items-center gap-3 sm:gap-4">
              <div className="flex w-20 flex-col items-center rounded-2xl bg-white/10 py-4 backdrop-blur-sm">
                <span className="font-display text-3xl font-bold text-white tabular-nums">
                  {formatUnit(unit.value)}
                </span>
                <span className="mt-1 text-xs font-medium uppercase tracking-wide text-white/70">{unit.label}</span>
              </div>
              {idx < units.length - 1 && <span className="font-display text-2xl font-bold text-white/50">:</span>}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
