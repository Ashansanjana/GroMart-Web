import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { testimonials } from '../data/products.js'

const AUTO_ROTATE_MS = 5000

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setDirection(1)
      setIndex((i) => (i + 1) % testimonials.length)
    }, AUTO_ROTATE_MS)
    return () => clearInterval(timer)
  }, [paused])

  const go = (dir) => {
    setDirection(dir)
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length)
  }

  const current = testimonials[index]

  return (
    <section className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wide text-fresh-green">Testimonials</span>
          <h2 className="mt-2 font-display text-3xl font-bold text-dark-text sm:text-4xl">What Our Customers Say</h2>
        </motion.div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.figure
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1)
                else if (info.offset.x > 60) go(-1)
              }}
              className="cursor-grab rounded-3xl bg-card-white p-8 text-center shadow-card active:cursor-grabbing sm:p-12"
            >
              <Quote size={32} className="mx-auto mb-4 text-fresh-green/40" aria-hidden="true" />
              <blockquote className="font-display text-lg font-medium leading-relaxed text-dark-text sm:text-xl">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <div
                className="mt-5 flex justify-center gap-1"
                aria-label={`${current.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < current.rating ? 'fill-cta-orange text-cta-orange' : 'text-gray-300'}
                  />
                ))}
              </div>

              <figcaption className="mt-6 flex items-center justify-center gap-3">
                <img
                  src={current.avatar}
                  alt=""
                  loading="lazy"
                  width="48"
                  height="48"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="text-sm font-semibold text-dark-text">{current.name}</p>
                  <p className="text-xs text-muted-text">{current.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 hidden -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 text-deep-green shadow-card hover:bg-fresh-green hover:text-white sm:flex"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-4 items-center justify-center rounded-full bg-white p-2 text-deep-green shadow-card hover:bg-fresh-green hover:text-white sm:flex"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setDirection(i > index ? 1 : -1)
                setIndex(i)
              }}
              aria-label={`Go to testimonial from ${t.name}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-6 bg-deep-green' : 'w-2 bg-gray-300 hover:bg-fresh-green/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
