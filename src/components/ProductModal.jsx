import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Minus, Plus, ShoppingCart, Star, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../data/products.js'

export default function ProductModal({ product, onClose }) {
  const { addToCart, toggleWishlist, wishlist } = useCart()
  const [qty, setQty] = useState(1)

  useEffect(() => {
    if (!product) return
    setQty(1)
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [product, onClose])

  if (!product) return null
  const isWished = wishlist.has(product.id)
  const discount = product.originalPrice
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : null

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        <motion.div
          key="panel"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative grid max-h-[90vh] w-full max-w-3xl grid-cols-1 overflow-y-auto rounded-2xl bg-card-white shadow-card-hover sm:grid-cols-2"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quick view"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-dark-text shadow-sm hover:text-deep-green"
          >
            <X size={18} />
          </button>

          <div className="relative aspect-square bg-gray-100 sm:aspect-auto">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
              width="800"
              height="800"
            />
            {discount && (
              <span className="absolute left-4 top-4 rounded-full bg-sale-red px-3 py-1 text-xs font-bold text-white">
                -{discount}% OFF
              </span>
            )}
          </div>

          <div className="flex flex-col p-6 sm:p-8">
            <div className="mb-2 flex items-center gap-1 text-sm font-medium text-cta-orange">
              <Star size={15} className="fill-cta-orange text-cta-orange" />
              {product.rating}
              <span className="text-muted-text">({product.reviews} reviews)</span>
            </div>
            <h3 id="product-modal-title" className="font-display text-2xl font-bold text-dark-text">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-muted-text">{product.unit}</p>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-deep-green">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-base text-muted-text line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-text">{product.description}</p>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm font-medium text-dark-text">Quantity</span>
              <div className="flex items-center rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-10 w-10 items-center justify-center text-muted-text hover:text-deep-green disabled:opacity-40"
                  disabled={qty <= 1}
                >
                  <Minus size={15} />
                </button>
                <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  aria-label="Increase quantity"
                  className="flex h-10 w-10 items-center justify-center text-muted-text hover:text-deep-green"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  addToCart(product.id, qty)
                  onClose()
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-deep-green py-3.5 text-sm font-semibold text-white transition-colors hover:bg-fresh-green"
              >
                <ShoppingCart size={17} />
                Add to Cart
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
                aria-pressed={isWished}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gray-200 hover:border-sale-red"
              >
                <Heart size={18} className={isWished ? 'fill-sale-red text-sale-red' : 'text-muted-text'} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
