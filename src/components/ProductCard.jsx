import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, toggleWishlist, wishlist } = useCart()
  const [qty, setQty] = useState(1)
  const isWished = wishlist.has(product.id)
  const discount = product.originalPrice
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : null

  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-card-white shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="block h-full w-full"
          aria-label={`Quick view ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width="800"
            height="800"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </button>

        {discount && (
          <span className="absolute left-3 top-3 rounded-full bg-sale-red px-2.5 py-1 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={isWished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={isWished}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition-transform hover:scale-110"
        >
          <Heart size={17} className={isWished ? 'fill-sale-red text-sale-red' : 'text-muted-text'} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center gap-1 text-xs font-medium text-cta-orange">
          <Star size={13} className="fill-cta-orange text-cta-orange" />
          {product.rating}
          <span className="text-muted-text">({product.reviews})</span>
        </div>

        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="text-left font-display text-sm font-semibold text-dark-text hover:text-deep-green sm:text-base"
        >
          {product.name}
        </button>
        <p className="mt-0.5 text-xs text-muted-text">{product.unit}</p>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-display text-lg font-bold text-deep-green">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-text line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <div className="flex items-center rounded-xl border border-gray-200">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label={`Decrease quantity of ${product.name}`}
              className="flex h-9 w-8 items-center justify-center text-muted-text hover:text-deep-green disabled:opacity-40"
              disabled={qty <= 1}
            >
              <Minus size={14} />
            </button>
            <span className="w-6 text-center text-sm font-semibold" aria-live="polite">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(20, q + 1))}
              aria-label={`Increase quantity of ${product.name}`}
              className="flex h-9 w-8 items-center justify-center text-muted-text hover:text-deep-green"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              addToCart(product.id, qty)
              setQty(1)
            }}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-deep-green py-2.5 text-sm font-semibold text-white transition-colors hover:bg-fresh-green"
          >
            <ShoppingCart size={15} />
            Add
          </button>
        </div>
      </div>
    </motion.article>
  )
}
