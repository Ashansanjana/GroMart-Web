import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { products } from '../data/products.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]) // [{ id, qty }]
  const [wishlist, setWishlist] = useState(new Set())
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [toasts, setToasts] = useState([])
  const toastId = useRef(0)

  const addToast = useCallback((message, type = 'success') => {
    const id = ++toastId.current
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2600)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToCart = useCallback(
    (productId, qty = 1) => {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.id === productId)
        if (existing) {
          return prev.map((item) => (item.id === productId ? { ...item, qty: item.qty + qty } : item))
        }
        return [...prev, { id: productId, qty }]
      })
      const product = products.find((p) => p.id === productId)
      addToast(`${product ? product.name : 'Item'} added to cart`, 'cart')
    },
    [addToast],
  )

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }, [])

  const updateQty = useCallback(
    (productId, qty) => {
      if (qty <= 0) {
        removeFromCart(productId)
        return
      }
      setCartItems((prev) => prev.map((item) => (item.id === productId ? { ...item, qty } : item)))
    },
    [removeFromCart],
  )

  const toggleWishlist = useCallback(
    (productId) => {
      setWishlist((prev) => {
        const next = new Set(prev)
        const product = products.find((p) => p.id === productId)
        if (next.has(productId)) {
          next.delete(productId)
        } else {
          next.add(productId)
          addToast(`${product ? product.name : 'Item'} added to wishlist`, 'wishlist')
        }
        return next
      })
    },
    [addToast],
  )

  const cartDetails = useMemo(
    () =>
      cartItems
        .map((item) => {
          const product = products.find((p) => p.id === item.id)
          if (!product) return null
          return { ...product, qty: item.qty }
        })
        .filter(Boolean),
    [cartItems],
  )

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.qty, 0), [cartItems])

  const subtotal = useMemo(
    () => cartDetails.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartDetails],
  )

  const value = {
    cartItems,
    cartDetails,
    cartCount,
    subtotal,
    addToCart,
    removeFromCart,
    updateQty,
    wishlist,
    toggleWishlist,
    isCartOpen,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    toasts,
    addToast,
    dismissToast,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
