import { motion } from 'framer-motion'
import { Leaf, RefreshCw, ShieldCheck, Truck } from 'lucide-react'

const USPS = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    copy: 'Order in minutes and get groceries at your door in as little as 30 minutes, 7 days a week.',
  },
  {
    icon: Leaf,
    title: 'Fresh Quality',
    copy: 'Every item is quality-checked and sourced from trusted local farms and suppliers.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    copy: 'Bank-level encryption keeps your payment details safe on every single order.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    copy: 'Not satisfied? Get a full refund or free replacement within 24 hours, no questions asked.',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="about" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wide text-fresh-green">Why GroMark</span>
          <h2 className="mt-2 font-display text-3xl font-bold text-dark-text sm:text-4xl">
            Built for How You Actually Shop
          </h2>
          <p className="mt-3 text-muted-text">
            We obsess over the details so your weekly grocery run feels effortless.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {USPS.map(({ icon: Icon, title, copy }) => (
            <motion.div
              key={title}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="rounded-2xl bg-cream p-6 text-center shadow-card transition-transform hover:-translate-y-1"
            >
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-deep-green">
                <Icon size={24} className="text-white" aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-semibold text-dark-text">{title}</h3>
              <p className="mt-2 text-sm text-muted-text">{copy}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
