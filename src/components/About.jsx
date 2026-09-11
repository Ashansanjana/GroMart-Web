import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Heart,
  Leaf,
  MapPin,
  Recycle,
  ShoppingBag,
  Sprout,
  Users,
} from 'lucide-react'

/* ── Animated counter ─────────────────────────────────────────── */
function Counter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const steps = 60
    const increment = target / steps
    const interval = duration / steps

    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, interval)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

/* ── Data ──────────────────────────────────────────────────────── */
const STATS = [
  { icon: Users,       label: 'Happy Customers',    target: 50000, suffix: '+' },
  { icon: ShoppingBag, label: 'Orders Delivered',   target: 200000, suffix: '+' },
  { icon: MapPin,      label: 'Cities Covered',     target: 28,    suffix: '' },
  { icon: Award,       label: 'Quality Awards',     target: 14,    suffix: '' },
]

const TIMELINE = [
  {
    year: '2019',
    title: 'The Spark',
    body: 'GroMart was born in a small Colombo kitchen — frustrated by wilted produce and unpredictable delivery windows, our founders decided to rebuild grocery shopping from the ground up.',
  },
  {
    year: '2020',
    title: 'Farm-to-Door Pilot',
    body: 'We partnered with 12 local farms and launched our first 30-minute delivery pilot across 3 neighbourhoods. 800 families signed up in the first week.',
  },
  {
    year: '2022',
    title: 'City-Wide Expansion',
    body: 'Fuelled by community love and a seed round, GroMart expanded to 15 cities, onboarded 200+ supplier partners, and introduced our carbon-neutral cold-chain logistics.',
  },
  {
    year: '2024',
    title: 'Sustainability Milestone',
    body: 'We achieved 100% recyclable packaging across all orders and launched our Zero-Waste Pledge — diverting over 40 tonnes of food waste to composting partners each month.',
  },
]

const VALUES = [
  {
    icon: Leaf,
    title: 'Farm Fresh Always',
    body: 'Every product is quality-checked within 24 hours of harvest. We refuse to compromise on freshness.',
    accent: 'bg-emerald-50 text-emerald-700',
    ring: 'ring-emerald-200',
  },
  {
    icon: Globe2,
    title: 'Local First',
    body: 'Over 70% of our inventory comes from farms within 150 km. Supporting local economies is part of our DNA.',
    accent: 'bg-blue-50 text-blue-700',
    ring: 'ring-blue-200',
  },
  {
    icon: Recycle,
    title: 'Planet Positive',
    body: 'Recyclable packaging, electric-fleet deliveries, and composting partnerships — we treat sustainability as a responsibility, not a marketing line.',
    accent: 'bg-lime-50 text-lime-700',
    ring: 'ring-lime-200',
  },
  {
    icon: Heart,
    title: 'Community Driven',
    body: 'From food banks to school nutrition programs, every order you place helps fund community initiatives across our cities.',
    accent: 'bg-rose-50 text-rose-700',
    ring: 'ring-rose-200',
  },
]

/* ── Horizontal Timeline Slider ────────────────────────────────── */
function TimelineSlider() {
  const [active, setActive] = useState(0)
  const trackRef = useRef(null)
  const total = TIMELINE.length

  const scrollToCard = (index) => {
    if (!trackRef.current) return
    const card = trackRef.current.children[index]
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
    setActive(index)
  }

  const prev = () => scrollToCard(Math.max(0, active - 1))
  const next = () => scrollToCard(Math.min(total - 1, active + 1))

  /* sync active dot while user drags/scrolls natively */
  const handleScroll = () => {
    if (!trackRef.current) return
    const { scrollLeft, clientWidth } = trackRef.current
    const index = Math.round(scrollLeft / clientWidth)
    setActive(Math.min(total - 1, Math.max(0, index)))
  }

  const COLORS = [
    { dot: 'bg-fresh-green', badge: 'bg-fresh-green', ring: 'ring-fresh-green/40', icon: 'text-fresh-green' },
    { dot: 'bg-cta-orange',  badge: 'bg-cta-orange',  ring: 'ring-cta-orange/40',  icon: 'text-cta-orange' },
    { dot: 'bg-deep-green',  badge: 'bg-deep-green',  ring: 'ring-deep-green/40',  icon: 'text-deep-green' },
    { dot: 'bg-sale-red',    badge: 'bg-sale-red',    ring: 'ring-sale-red/40',    icon: 'text-sale-red' },
  ]

  return (
    <div className="relative">
      {/* ── Horizontal scroll track ── */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TIMELINE.map(({ year, title, body }, i) => {
          const col = COLORS[i % COLORS.length]
          return (
            <div
              key={year}
              className="w-full flex-shrink-0 snap-center px-4 sm:px-10 lg:px-24"
            >
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className={`relative mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-card ring-2 ${col.ring} sm:p-10`}
              >
                {/* large year watermark */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-6 top-4 font-display text-7xl font-black text-gray-100 select-none sm:text-9xl"
                >
                  {year}
                </span>

                {/* step number */}
                <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-deep-green text-sm font-bold text-white">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold text-white ${col.badge} ml-3`}>
                  {year}
                </div>

                <h3 className="mt-4 font-display text-2xl font-bold text-dark-text sm:text-3xl">
                  {title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-text">{body}</p>

                {/* step counter */}
                <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-muted-text">
                  Step {i + 1} of {total}
                </p>
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* ── Progress line + dots ── */}
      <div className="mt-8 flex items-center justify-center gap-3">
        {TIMELINE.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToCard(i)}
            aria-label={`Go to step ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === active
                ? `${COLORS[i % COLORS.length].dot} w-8`
                : 'w-2.5 bg-gray-200 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* ── Prev / Next arrows ── */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          disabled={active === 0}
          aria-label="Previous milestone"
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-deep-green text-deep-green transition-all hover:bg-deep-green hover:text-white disabled:border-gray-200 disabled:text-gray-300"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="font-display text-sm font-semibold text-muted-text">
          {active + 1} / {total}
        </span>

        <button
          type="button"
          onClick={next}
          disabled={active === total - 1}
          aria-label="Next milestone"
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-deep-green text-deep-green transition-all hover:bg-deep-green hover:text-white disabled:border-gray-200 disabled:text-gray-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

/* ── Component ─────────────────────────────────────────────────── */
export default function About() {
  return (
    <section id="about-us" aria-labelledby="about-heading" className="overflow-hidden bg-cream">

      {/* ── Hero Story ──────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* decorative blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-fresh-green/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-[360px] w-[360px] rounded-full bg-cta-orange/10 blur-3xl"
        />

        <div className="relative grid items-center gap-16 lg:grid-cols-2">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-fresh-green/10 px-4 py-1.5 text-sm font-semibold text-fresh-green">
              <Sprout size={15} aria-hidden="true" />
              Our Story
            </span>
            <h2
              id="about-heading"
              className="mt-4 font-display text-4xl font-bold leading-tight text-dark-text sm:text-5xl"
            >
              Groceries Reimagined,{' '}
              <span className="bg-gradient-to-r from-fresh-green to-deep-green bg-clip-text text-transparent">
                From Farm to You
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-text">
              GroMart started with one simple belief — that everyone deserves{' '}
              <strong className="text-dark-text">fresh, honest food</strong> delivered with speed and
              care. We're not just a grocery app; we're a community that connects farmers, families,
              and the future of sustainable eating.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-text">
              Today we serve over 50,000 households across 28 cities, yet our commitment remains the
              same: <strong className="text-dark-text">quality you can taste</strong>, service you
              can count on, and a planet we're proud to look after.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#shop"
                className="inline-flex items-center gap-2 rounded-xl bg-deep-green px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-fresh-green hover:shadow-card-hover"
              >
                <ShoppingBag size={16} />
                Start Shopping
              </a>
              <a
                href="#categories"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-deep-green px-6 py-3 text-sm font-semibold text-deep-green transition-all hover:-translate-y-0.5 hover:bg-deep-green hover:text-white"
              >
                Explore Categories
              </a>
            </div>
          </motion.div>

          {/* Right image collage */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="relative hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80&auto=format&fit=crop"
                alt="Fresh vegetables at a local market"
                width={600}
                height={700}
                className="h-72 w-full rounded-3xl object-cover shadow-card"
              />
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80&auto=format&fit=crop"
                alt="Farmer harvesting organic produce"
                width={600}
                height={700}
                className="mt-10 h-72 w-full rounded-3xl object-cover shadow-card"
              />
            </div>
            {/* floating badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-white px-6 py-4 shadow-card-hover">
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-text">
                Trusted Since
              </p>
              <p className="mt-0.5 text-center font-display text-3xl font-bold text-deep-green">
                2019
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Stats Bar ───────────────────────────────────────────── */}
      <div className="bg-deep-green">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="grid grid-cols-2 gap-8 lg:grid-cols-4"
          >
            {STATS.map(({ icon: Icon, label, target, suffix }) => (
              <motion.div
                key={label}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <Icon size={22} className="text-cta-orange" aria-hidden="true" />
                </span>
                <p className="font-display text-4xl font-bold text-white">
                  <Counter target={target} suffix={suffix} />
                </p>
                <p className="text-sm font-medium text-white/70">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Our Values ──────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wide text-fresh-green">
            What We Stand For
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-dark-text sm:text-4xl">
            Values That Guide Every Order
          </h2>
          <p className="mt-3 text-muted-text">
            Our four core principles shape every decision — from which farms we partner with to how
            we pack your bag.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {VALUES.map(({ icon: Icon, title, body, accent, ring }) => (
            <motion.div
              key={title}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              className={`group rounded-2xl border bg-white p-6 shadow-card ring-1 ${ring} transition-all hover:-translate-y-1.5 hover:shadow-card-hover`}
            >
              <span
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${accent}`}
              >
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-semibold text-dark-text">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-text">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Journey Timeline (Horizontal Slider) ─────────────────── */}
      <div className="bg-white py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mb-14 text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-wide text-fresh-green">
              Our Journey
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-dark-text sm:text-4xl">
              How We Got Here
            </h2>
            <p className="mt-3 text-muted-text">Swipe or use the arrows to explore our story.</p>
          </motion.div>
        </div>

        <TimelineSlider />
      </div>

      {/* ── CTA Strip ───────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-deep-green to-fresh-green px-4 py-20 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12)_0%,transparent_60%)]"
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <Sprout size={40} className="mx-auto mb-4 text-white/80" aria-hidden="true" />
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Join the GroMart Family
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Fresh produce, everyday essentials, and lightning-fast delivery — all in one place. Your
            first order ships free.
          </p>
          <a
            href="#shop"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-deep-green shadow-lg transition-all hover:-translate-y-0.5 hover:bg-cream hover:shadow-xl"
          >
            <ShoppingBag size={16} />
            Shop Now — It's Free to Join
          </a>
        </motion.div>
      </div>
    </section>
  )
}
