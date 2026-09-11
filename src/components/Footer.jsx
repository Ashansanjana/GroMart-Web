import { Facebook, Instagram, Mail, MapPin, Phone, Sprout, Twitter, Wallet } from 'lucide-react'
import { categories } from '../data/products.js'

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#shop' },
  { label: 'Deals', href: '#deals' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const SOCIALS = [
  { icon: Facebook, label: 'Facebook' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'Twitter' },
]

export default function Footer() {
  const handleClick = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-deep-green px-4 pt-16 text-white/85 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1">
          <a href="#home" onClick={(e) => handleClick(e, '#home')} className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
              <Sprout size={20} className="text-fresh-green" />
            </span>
            <span className="font-display text-xl font-bold text-white">GroMark</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Fresh groceries delivered fast. Sourced from trusted local farms, picked at peak quality, and brought to
            your door in minutes.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                onClick={(e) => e.preventDefault()}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-fresh-green"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={(e) => handleClick(e, link.href)} className="hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">Categories</h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {categories.slice(0, 5).map((cat) => (
              <li key={cat.id}>
                <a href="#shop" onClick={(e) => handleClick(e, '#shop')} className="hover:text-white">
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">Contact</h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              123 Market Street, Green City
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0" aria-hidden="true" />
              <a href="tel:+15551234567" className="hover:text-white">
                +1 (555) 123-4567
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0" aria-hidden="true" />
              <a href="mailto:hello@gromark.com" className="hover:text-white">
                hello@gromark.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-white/70 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} GroMark. All rights reserved.</p>
          <div className="flex items-center gap-3" aria-label="Accepted payment methods">
            <Wallet size={16} aria-hidden="true" />
            <span className="rounded border border-white/25 px-2 py-1 font-mono text-[10px] tracking-wide">VISA</span>
            <span className="rounded border border-white/25 px-2 py-1 font-mono text-[10px] tracking-wide">MC</span>
            <span className="rounded border border-white/25 px-2 py-1 font-mono text-[10px] tracking-wide">AMEX</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
