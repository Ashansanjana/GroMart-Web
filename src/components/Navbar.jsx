import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Search, ShoppingCart, Sprout, User, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#shop' },
  { label: 'Categories', href: '#categories' },
  { label: 'Deals', href: '#deals' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ searchTerm, onSearchChange }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { cartCount, openCart } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const solid = scrolled || mobileOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-cream/95 shadow-soft backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex shrink-0 items-center gap-2 font-display text-xl font-bold"
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
              solid ? 'bg-deep-green' : 'bg-white/90'
            }`}
          >
            <Sprout size={20} className={solid ? 'text-fresh-green' : 'text-deep-green'} aria-hidden="true" />
          </span>
          <span className={solid ? 'text-deep-green' : 'text-white drop-shadow-sm'}>GroMark</span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium transition-colors hover:text-fresh-green ${
                    solid ? 'text-dark-text' : 'text-white drop-shadow-sm'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden sm:block">
            <Search
              size={16}
              className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
                solid ? 'text-muted-text' : 'text-white/80'
              }`}
              aria-hidden="true"
            />
            <label htmlFor="navbar-search" className="sr-only">
              Search products
            </label>
            <input
              id="navbar-search"
              type="search"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search groceries..."
              className={`w-40 rounded-full border py-2 pl-9 pr-3 text-sm transition-all placeholder:text-current/60 focus:w-56 focus:outline-none focus:ring-2 focus:ring-fresh-green md:w-52 ${
                solid
                  ? 'border-gray-200 bg-white text-dark-text'
                  : 'border-white/40 bg-white/15 text-white placeholder:text-white/70'
              }`}
            />
          </div>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              solid ? 'text-deep-green hover:bg-deep-green/10' : 'text-white hover:bg-white/15'
            }`}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-cta-orange px-1 text-[11px] font-bold text-white">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`hidden items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors sm:flex ${
              solid
                ? 'border-deep-green text-deep-green hover:bg-deep-green hover:text-white'
                : 'border-white/70 text-white hover:bg-white/15'
            }`}
          >
            <User size={15} />
            Sign In
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className={`flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
              solid ? 'text-deep-green' : 'text-white'
            }`}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden bg-cream shadow-soft lg:hidden"
          >
            <div className="px-4 pb-4 sm:px-6">
              <div className="relative mb-3 sm:hidden">
                <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" />
                <label htmlFor="navbar-search-mobile" className="sr-only">
                  Search products
                </label>
                <input
                  id="navbar-search-mobile"
                  type="search"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search groceries..."
                  className="w-full rounded-full border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-dark-text focus:outline-none focus:ring-2 focus:ring-fresh-green"
                />
              </div>
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="block rounded-lg px-2 py-2.5 text-sm font-medium text-dark-text hover:bg-fresh-green/10 hover:text-deep-green"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="mt-1">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-1.5 rounded-full border border-deep-green px-4 py-2.5 text-sm font-semibold text-deep-green hover:bg-deep-green hover:text-white"
                  >
                    <User size={15} />
                    Sign In
                  </button>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
