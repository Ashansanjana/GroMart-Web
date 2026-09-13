import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../data/products.js'

export default function MobileCartBar() {
  const { cartCount, subtotal, openCart } = useCart()

  return (
    <AnimatePresence>
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-x-3 bottom-3 z-40 lg:hidden"
        >
          <button
            type="button"
            onClick={openCart}
            className="flex w-full items-center justify-between rounded-2xl bg-deep-green px-5 py-3.5 text-white shadow-card-hover"
          >
            <span className="flex items-center gap-2 text-sm font-semibold">
              <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                <ShoppingCart size={15} />
                <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-cta-orange px-1 text-[10px] font-bold">
                  {cartCount}
                </span>
              </span>
              View Cart
            </span>
            <span className="font-display text-sm font-bold">{formatPrice(subtotal)}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
