import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Heart, ShoppingCart, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

const ICONS = {
  cart: ShoppingCart,
  wishlist: Heart,
  success: CheckCircle2,
}

export default function Toast() {
  const { toasts, dismissToast } = useCart()

  return (
    <div
      className="fixed top-20 left-1/2 z-[100] flex -translate-x-1/2 flex-col gap-2"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type] || CheckCircle2
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
              className="flex items-center gap-2 rounded-2xl bg-deep-green px-4 py-3 text-sm font-medium text-white shadow-card-hover"
              role="status"
            >
              <Icon size={18} className="text-fresh-green shrink-0" aria-hidden="true" />
              <span>{toast.message}</span>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                aria-label="Dismiss notification"
                className="ml-1 rounded-full p-0.5 text-white/70 hover:text-white"
              >
                <X size={14} />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
