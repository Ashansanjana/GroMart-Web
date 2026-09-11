import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Timer, Truck } from 'lucide-react'

const TRUST_BADGES = [
  { icon: Truck, label: 'Free delivery over $50' },
  { icon: ShieldCheck, label: '100% Fresh Guarantee' },
  { icon: Timer, label: '30-Min Express Delivery' },
]

export default function Hero() {
  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative isolate flex min-h-[92vh] items-center overflow-hidden pt-16">
      <img
        src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80&auto=format&fit=crop"
        alt="A paper grocery bag overflowing with fresh vegetables and fruit"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        fetchpriority="high"
        width="1600"
        height="1067"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-deep-green/90 via-deep-green/70 to-deep-green/30"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
          >
            🌱 Sourced fresh, delivered daily
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Fresh Groceries,
            <br />
            Delivered Fast
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-5 max-w-md text-base text-white/90 sm:text-lg"
          >
            Farm-fresh produce, pantry staples, and everyday essentials — handpicked and delivered to your door in
            as little as 30 minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#shop"
              onClick={scrollTo('#shop')}
              className="inline-flex items-center gap-2 rounded-2xl bg-cta-orange px-6 py-3.5 text-base font-semibold text-white shadow-card transition-transform hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              Shop Now
              <ArrowRight size={18} />
            </a>
            <a
              href="#deals"
              onClick={scrollTo('#deals')}
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/80 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white hover:text-deep-green"
            >
              View Deals
            </a>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } } }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
          >
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <motion.li
                key={label}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className="flex items-center gap-2 text-sm font-medium text-white/95"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                  <Icon size={16} />
                </span>
                {label}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
