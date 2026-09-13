import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../data/products.js'

const FREE_DELIVERY_THRESHOLD = 5000

export default function CartDrawer() {
  const { isCartOpen, closeCart, cartDetails, updateQty, removeFromCart, subtotal, addToast } = useCart()

  useEffect(() => {
    if (!isCartOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isCartOpen, closeCart])

  const freeDeliveryGap = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal)

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[90] bg-black/50"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed right-0 top-0 z-[95] flex h-full w-full max-w-md flex-col bg-cream shadow-card-hover"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h2 className="font-display text-lg font-bold text-dark-text">
                Your Cart {cartDetails.length > 0 && `(${cartDetails.length})`}
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted-text hover:bg-black/5 hover:text-dark-text"
              >
                <X size={19} />
              </button>
            </div>

            {cartDetails.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-fresh-green/10">
                  <ShoppingBag size={36} className="text-fresh-green" aria-hidden="true" />
                </div>
                <p className="font-display text-lg font-semibold text-dark-text">Your cart is empty</p>
                <p className="max-w-[22rem] text-sm text-muted-text">
                  Looks like you haven&apos;t added anything yet. Start exploring fresh produce and everyday
                  essentials!
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-2 rounded-2xl bg-deep-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-fresh-green"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  {freeDeliveryGap > 0 && (
                    <p className="mb-4 rounded-xl bg-fresh-green/10 px-3 py-2 text-xs font-medium text-deep-green">
                      Add {formatPrice(freeDeliveryGap)} more to unlock free delivery!
                    </p>
                  )}
                  <ul className="flex flex-col gap-4">
                    {cartDetails.map((item) => (
                      <li key={item.id} className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          width="72"
                          height="72"
                          className="shrink-0 rounded-xl object-cover"
                          style={{ height: '4.5rem', width: '4.5rem' }}
                        />
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold text-dark-text">{item.name}</p>
                            <button
                              type="button"
                              onClick={() => {
                                removeFromCart(item.id)
                                addToast(`${item.name} removed from cart`, 'success')
                              }}
                              aria-label={`Remove ${item.name} from cart`}
                              className="text-muted-text hover:text-sale-red"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                          <p className="text-xs text-muted-text">{formatPrice(item.price)} each</p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center rounded-lg border border-gray-200">
                              <button
                                type="button"
                                onClick={() => updateQty(item.id, item.qty - 1)}
                                aria-label={`Decrease quantity of ${item.name}`}
                                className="flex h-7 w-7 items-center justify-center text-muted-text hover:text-deep-green"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-5 text-center text-xs font-semibold">{item.qty}</span>
                              <button
                                type="button"
                                onClick={() => updateQty(item.id, item.qty + 1)}
                                aria-label={`Increase quantity of ${item.name}`}
                                className="flex h-7 w-7 items-center justify-center text-muted-text hover:text-deep-green"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className="font-display text-sm font-bold text-deep-green">
                              {formatPrice(item.price * item.qty)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 px-5 py-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-text">Subtotal</span>
                    <span className="font-display text-xl font-bold text-dark-text">{formatPrice(subtotal)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => addToast('Checkout is a demo in this build — thanks for trying GroMark!', 'success')}
                    className="w-full rounded-2xl bg-cta-orange py-3.5 text-sm font-semibold text-white shadow-card hover:brightness-95"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
