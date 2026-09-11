import { motion } from 'framer-motion'
import {
  Apple,
  Beef,
  Beer,
  Cookie,
  Croissant,
  Egg,
  Snowflake,
  SprayCan,
} from 'lucide-react'
import { categories } from '../data/products.js'

const ICONS = {
  'fruits-vegetables': Apple,
  'dairy-eggs': Egg,
  bakery: Croissant,
  'meat-seafood': Beef,
  beverages: Beer,
  snacks: Cookie,
  frozen: Snowflake,
  household: SprayCan,
}

export default function Categories({ activeCategory, onSelect }) {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <span className="text-sm font-semibold uppercase tracking-wide text-fresh-green">Shop by Category</span>
        <h2 className="mt-2 font-display text-3xl font-bold text-dark-text sm:text-4xl">Everything You Need</h2>
        <p className="mt-3 text-muted-text">
          Browse our full range of fresh and everyday essentials, organized just the way you shop.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4"
      >
        {categories.map((cat) => {
          const Icon = ICONS[cat.id]
          const isActive = activeCategory === cat.id
          return (
            <motion.button
              key={cat.id}
              type="button"
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              onClick={() => onSelect(isActive ? null : cat.id)}
              aria-pressed={isActive}
              className={`group relative overflow-hidden rounded-2xl text-left shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-none ${
                isActive ? 'ring-4 ring-fresh-green' : ''
              }`}
            >
              <div className="aspect-square w-full overflow-hidden bg-gray-100">
                <img
                  src={cat.image}
                  alt=""
                  loading="lazy"
                  width="600"
                  height="600"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div
                className={`absolute inset-0 bg-gradient-to-t transition-colors ${
                  isActive ? 'from-deep-green/85 via-deep-green/30' : 'from-black/70 via-black/10'
                } to-transparent`}
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end gap-1.5 p-4">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    isActive ? 'bg-white text-deep-green' : 'bg-white/90 text-fresh-green'
                  }`}
                >
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span className="font-display text-sm font-semibold text-white sm:text-base">{cat.name}</span>
              </div>
            </motion.button>
          )
        })}
      </motion.div>
    </section>
  )
}
