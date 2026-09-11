# GroMark — Enhanced Claude Code Build Prompt

Copy everything below the line and paste it into Claude Code as your first message, inside an empty project folder.

---

## PROMPT TO PASTE INTO CLAUDE CODE

I want you to build a full, production-quality, fully functional landing page website for a grocery-delivery brand called **"GroMark"**. Build it as a real working project (not just a mockup) using **React + Vite + Tailwind CSS + Framer Motion + lucide-react icons**. Set up the whole project structure, install dependencies, and make sure `npm run dev` runs without errors or console warnings.

### 1. Brand & Visual Identity
- Brand name: **GroMark** — tagline: "Fresh Groceries, Delivered Fast"
- Mood: fresh, trustworthy, clean, premium-organic, energetic — NOT cluttered or generic. Every section should feel deliberately designed, not templated.
- Color palette (use as Tailwind theme extend, define as CSS variables too):
  - Primary Deep Green: `#1B5E20` (headers, nav, primary buttons)
  - Fresh Green: `#4CAF50` (secondary accents, icons, success states)
  - Warm Accent / CTA Orange: `#FFA726` (buy buttons, badges, highlights)
  - Sale/Discount Red: `#E53935` (discount tags only, used sparingly)
  - Background Cream: `#FAF7F2` (page background, not pure white)
  - Card White: `#FFFFFF`
  - Dark Text: `#1F2937`
  - Muted Text/Gray: `#6B7280`
- Typography: a clean modern sans-serif for body ("Inter") and a slightly rounded, friendly display font for headings ("Poppins" or "Sora"). Load via Google Fonts `<link>` tags in `index.html` (not @import, for performance).
- Use soft shadows, large rounded corners (`rounded-2xl`), generous whitespace, and subtle scroll/hover animations (Framer Motion) — avoid a "template" look; make deliberate spacing and hierarchy choices.
- Fully responsive: mobile-first, tested breakpoints for mobile (< 640px), tablet (640–1024px), and desktop (> 1024px).

### 2. Real Images — Source From The Web, Do Not Use Placeholders
Do NOT use gray placeholder boxes, lorem-picsum, or `via.placeholder.com`. Use **real, free-to-use, commercially licensed grocery/produce photography** hotlinked directly from Unsplash and Pexels CDNs (Unsplash License / Pexels License — free for commercial use, no attribution required, hotlinking permitted).

**Do NOT use `source.unsplash.com`** — that random-redirect endpoint was permanently sunset in June 2024 and no longer works. Only use direct `images.unsplash.com/photo-...` or `images.pexels.com/photos/{id}/...` URLs, and never use `plus.unsplash.com` (paid/restricted license).

Verified working starter URLs (confirmed free-license, high-res):
- Hero — fresh produce display: `https://images.unsplash.com/photo-1683316331413-a8f5b6b5f5e5?w=1600&q=80&auto=format&fit=crop` (fallback search term below if it 404s)
- Category/grid — carrots, celery & broccoli bundle: `https://images.unsplash.com/photo-1760108273106-63b58911a978?w=1200&q=80&auto=format&fit=crop`
- Category/grid — grocery store fruit aisle (oranges): `https://images.unsplash.com/photo-1653222439737-a377eb21c965?w=1200&q=80&auto=format&fit=crop`
- Additional Pexels grocery/produce options: search Pexels for `fresh vegetables`, `grocery basket`, `organic fruit`, `farmers market`, `bakery bread`, `dairy eggs`, `frozen food aisle`, `grocery delivery box` and use the direct `images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w=1200` URL format.

Instructions for you (Claude Code) when building:
1. Before finalizing, **HTTP-check every image URL actually loads** (curl or fetch each one). If any URL 404s, replace it with another real photo from `images.unsplash.com` or `images.pexels.com` matching the same subject — do not leave a broken image or fall back to a gray box.
2. Use category-appropriate photography for every product/category: fruits & vegetables, dairy & eggs, bakery, meat & seafood, beverages, snacks, frozen foods, household — search each category term on Unsplash/Pexels and pick a clean, well-lit, real photo.
3. Keep a consistent visual style across product photos (similar lighting/background) so the grid doesn't look mismatched.
4. Apply proper sizing params on every URL: Unsplash `?w=<size>&q=80&auto=format&fit=crop`; Pexels `?auto=compress&cs=tinysrgb&w=<size>`. Use ~1600w for hero/banner images, ~600–800w for product cards, ~400w for category icons/thumbnails.

### 3. Site Structure / Sections (single-page landing, in this order)
1. **Sticky Header/Navbar** — logo, nav links (Home, Shop, Categories, Deals, About, Contact), search bar with icon, cart icon with live item-count badge, "Sign In" button. Collapses into a hamburger + animated slide-in mobile menu on small screens. Background is transparent over the hero and becomes solid Cream with a soft shadow on scroll.
2. **Hero Section** — big headline, subheadline, primary CTA ("Shop Now") + secondary CTA ("View Deals"), real hero photo of fresh produce (see image sourcing above) with a subtle gradient overlay for text legibility, small trust badges (e.g. "Free delivery over $50", "100% Fresh Guarantee", "30-Min Express Delivery").
3. **Category Grid** — 8–10 categories (Fruits & Vegetables, Dairy & Eggs, Bakery, Meat & Seafood, Beverages, Snacks, Frozen Foods, Household) each as a clickable card with a real photo + icon overlay; filters the product grid below on click, with the active category visually highlighted.
4. **Featured / Trending Products Grid** — at least 8 sample products with real image, name, price, discount badge, star rating, "Add to Cart" button with quantity stepper. Include a working **Add to Cart** interaction (state updates, cart drawer opens, toast confirms).
5. **Deals/Promo Banner** — countdown timer component for a limited-time offer (functional countdown using state/useEffect, updates every second, resets gracefully at zero).
6. **Why Choose GroMark** — 4 USP cards with lucide-react icons (Fast Delivery, Fresh Quality, Secure Payment, Easy Returns), short supporting copy each.
7. **Testimonials / Customer Reviews** — auto-rotating, swipeable carousel with 4–5 customer reviews, star ratings, and a real headshot-style photo for each avatar (source diverse, natural-looking portraits from Unsplash/Pexels — search "portrait smiling person").
8. **App Download / Newsletter Section** — email signup form with validation + success state, plus app store badge visuals (styled placeholder buttons, since real App/Play Store badge logos are trademarked — do not use actual Apple/Google logos, use generic "Download on the App Store"-style buttons built from icons + text).
9. **Footer** — logo, short about text, quick links, categories, social icons, contact info, generic payment method icons (lucide-react / simple SVG shapes, not real card-network trademarked logos), and copyright line.

### 4. Required Functionality (must actually work, not just visual)
- **Shopping cart**: global state via Context API (`CartContext.jsx`) — add/remove items, update quantity, live subtotal calculation, slide-out cart drawer with checkout button and an empty-cart state with a friendly illustration/message.
- **Product search**: filters the visible product grid live as the user types, with a "no results found" state.
- **Category filtering**: clicking a category filters products by category tag; clicking again (or an "All" pill) clears the filter.
- **Wishlist/favorite toggle** (heart icon) on each product card with active/inactive state, persisted in local component state.
- **Product quick-view modal**: clicking a product image opens a modal with a larger photo, description, quantity selector, and add-to-cart — closable via overlay click, close button, or Escape key.
- **Countdown timer** on the deals banner (real working timer, updates every second).
- **Mobile responsive nav** with animated open/close (Framer Motion `AnimatePresence`).
- **Newsletter form validation** (basic email format check + success message, no real backend needed — simulate with local state and a brief loading state before success).
- **Smooth scroll** navigation from navbar links to page sections.
- **Scroll-triggered fade/slide-in animations** for sections using Framer Motion (`whileInView`, subtle, not excessive, staggered children where relevant).
- **Toast/notification** on "Add to Cart" and "Added to Wishlist" confirming the action (auto-dismiss after ~2–3 seconds).
- **Loading skeletons** for the product grid on initial mount (simulate a brief fetch delay) instead of a blank flash.
- **Sticky mobile "View Cart" bar** that appears near the bottom of the screen on mobile once the cart has items.

### 5. SEO, Performance & Accessibility
- Add proper `<title>`, meta description, Open Graph tags, and a favicon reference in `index.html`.
- All images: descriptive `alt` text; decorative images `alt=""`. Set explicit `width`/`height` or aspect-ratio classes to prevent layout shift.
- Hero image loads eagerly with `fetchpriority="high"`; all below-the-fold images use `loading="lazy"`.
- Semantic HTML5 (`header`, `nav`, `main`, `section`, `footer`), logical heading order (one `h1`), proper `button`/`label` elements, visible keyboard focus states, `aria-label`s on icon-only buttons, and sufficient WCAG AA color contrast.
- Respect `prefers-reduced-motion` — reduce/disable non-essential animation for users who request it.
- Keep bundle lean: no unused dependencies beyond what's listed above.

### 6. Technical Requirements
- Organize code into clean components: `/components/Navbar.jsx`, `Hero.jsx`, `Categories.jsx`, `ProductCard.jsx`, `ProductGrid.jsx`, `ProductModal.jsx`, `CartDrawer.jsx`, `DealsBanner.jsx`, `WhyChooseUs.jsx`, `Testimonials.jsx`, `Newsletter.jsx`, `Footer.jsx`, `Toast.jsx`.
- Use a `CartContext.jsx` for global cart/wishlist state.
- Store product/category data in a separate `data/products.js` file (not hardcoded inline in components) with realistic grocery product names, prices, categories, and the real sourced image URLs.
- Add a `README.md` explaining the folder structure and how to run the project (`npm install`, `npm run dev`), plus a short note on where the image URLs come from and how to swap them.
- No console errors or warnings on load or during interaction.

### 7. Deliverable
After building, give me:
1. The full working project (all files created).
2. A short summary of the folder structure.
3. Confirmation that all image URLs were checked and load correctly.
4. Instructions to run it locally.

Build this to a professional, portfolio/production-ready standard — the kind of polish you'd see on a real funded grocery-delivery startup's landing page.

---

## Tips for using this in Claude Code
- Paste the whole block above as your **first message** in a new Claude Code session, inside an empty project folder.
- If Claude Code asks clarifying questions, you can just say "use your best judgment" — the prompt already has enough detail to proceed.
- Once it's built, iterate with follow-ups like *"make the hero section more bold,"* *"add a dark mode toggle,"* or *"swap the hero image for something more vibrant."*
- If any hotlinked image ever breaks, just tell Claude Code: *"this image URL is broken, find and swap in a real replacement from Unsplash or Pexels for [category]."*
