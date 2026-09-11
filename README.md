# GroMark — Fresh Groceries, Delivered Fast

A production-quality, fully interactive grocery-delivery landing page built with **React + Vite + Tailwind CSS + Framer Motion + lucide-react**.

## Getting Started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

Other scripts:

```bash
npm run build    # production build to /dist
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

## Folder Structure

```
GroMart/
├── index.html                 # HTML shell, SEO/OG meta tags, Google Fonts
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx                # React entry point, wraps App in CartProvider
│   ├── App.jsx                 # Top-level layout: composes every section
│   ├── index.css               # Tailwind directives + global styles/vars
│   ├── context/
│   │   └── CartContext.jsx     # Global cart, wishlist & toast state (Context API)
│   ├── data/
│   │   └── products.js         # Category & product data, incl. sourced image URLs
│   └── components/
│       ├── Navbar.jsx          # Sticky header, search, cart badge, mobile menu
│       ├── Hero.jsx            # Hero banner with CTAs and trust badges
│       ├── Categories.jsx      # Clickable category grid (filters products)
│       ├── ProductCard.jsx     # Single product card (qty stepper, wishlist, add-to-cart)
│       ├── ProductGrid.jsx     # Search/category filtering, loading skeletons, empty state
│       ├── ProductModal.jsx    # Quick-view modal (Escape/overlay/close-button dismiss)
│       ├── CartDrawer.jsx      # Slide-out cart with subtotal & checkout
│       ├── DealsBanner.jsx     # Countdown-timer promo banner
│       ├── WhyChooseUs.jsx     # USP cards
│       ├── Testimonials.jsx    # Auto-rotating, swipeable review carousel
│       ├── Newsletter.jsx      # Email signup with validation + app download CTAs
│       ├── Footer.jsx          # Site footer
│       ├── Toast.jsx           # Add-to-cart / add-to-wishlist notifications
│       ├── MobileCartBar.jsx   # Sticky "View Cart" bar on mobile
│       └── Skeleton.jsx        # Loading skeleton for product cards
├── tailwind.config.js          # Brand color palette, fonts, shadows, animations
└── postcss.config.js
```

## Where the Images Come From

All photography is hotlinked directly from **Unsplash's CDN** (`images.unsplash.com/photo-...`), which is free for commercial use under the [Unsplash License](https://unsplash.com/license) and explicitly permits hotlinking without attribution. Every image URL used in `src/data/products.js` was HTTP-checked (`curl -I`) and confirmed to return `200 OK` before shipping.

**To swap an image:** open `src/data/products.js` and replace the photo id inside the `unsplash('<id>', <width>)` helper with the id from another `images.unsplash.com/photo-...` or `images.pexels.com/photos/{id}/...` URL of the same subject. Keep the width param appropriate for context (~1600w hero, ~600–800w cards/categories, ~200w avatars).

If an image URL ever breaks, just replace its id with a fresh photo of the same category from Unsplash or Pexels — no other code changes are needed.

## Features

- Global cart & wishlist via Context API, with live subtotal and a slide-out drawer
- Live product search + category filtering with a "no results" state
- Product quick-view modal (closable via Escape, overlay click, or close button)
- Working countdown timer on the deals banner
- Auto-rotating, swipeable testimonial carousel
- Newsletter form with email validation and a simulated loading/success state
- Scroll-triggered Framer Motion animations, respecting `prefers-reduced-motion`
- Sticky mobile "View Cart" bar
- Fully responsive (mobile / tablet / desktop), semantic HTML, keyboard-accessible
