import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Categories from './components/Categories.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import ProductModal from './components/ProductModal.jsx'
import DealsBanner from './components/DealsBanner.jsx'
import WhyChooseUs from './components/WhyChooseUs.jsx'
import About from './components/About.jsx'
import Testimonials from './components/Testimonials.jsx'
import Newsletter from './components/Newsletter.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import MobileCartBar from './components/MobileCartBar.jsx'
import Toast from './components/Toast.jsx'

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  return (
    <div className="min-h-screen bg-cream">
      <a
        href="#shop"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-deep-green"
      >
        Skip to product listings
      </a>

      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <main>
        <Hero />
        <Categories activeCategory={activeCategory} onSelect={setActiveCategory} />
        <ProductGrid
          searchTerm={searchTerm}
          activeCategory={activeCategory}
          onQuickView={setQuickViewProduct}
        />
        <DealsBanner />
        <WhyChooseUs />
        <About />
        <Testimonials />
        <Newsletter />
      </main>

      <Footer />

      <CartDrawer />
      <MobileCartBar />
      <Toast />
      <ProductModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  )
}
