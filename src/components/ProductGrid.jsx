import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { SearchX } from 'lucide-react'
import { products, categories } from '../data/products.js'
import ProductCard from './ProductCard.jsx'
import ProductCardSkeleton from './Skeleton.jsx'

export default function ProductGrid({ searchTerm, activeCategory, onQuickView }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(timer)
  }, [])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = !activeCategory || p.category === activeCategory
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [searchTerm, activeCategory])

  const activeCategoryName = categories.find((c) => c.id === activeCategory)?.name

  return (
    <section id="shop" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-fresh-green">Trending Now</span>
          <h2 className="mt-2 font-display text-3xl font-bold text-dark-text sm:text-4xl">
            {activeCategoryName ? activeCategoryName : 'Featured Products'}
          </h2>
        </div>
        {activeCategory && (
          <p className="text-sm text-muted-text">
            Showing <strong className="text-deep-green">{activeCategoryName}</strong> — click the category again to
            clear the filter.
          </p>
        )}
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <motion.div
          key={activeCategory ?? 'all'}
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
        >
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-card-white py-20 text-center shadow-card">
          <SearchX size={40} className="text-muted-text" aria-hidden="true" />
          <p className="font-display text-lg font-semibold text-dark-text">No products found</p>
          <p className="max-w-xs text-sm text-muted-text">
            We couldn&apos;t find anything matching your search. Try a different keyword or clear the category
            filter.
          </p>
        </div>
      )}
    </section>
  )
}
