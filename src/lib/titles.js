import { site } from '../data/site'

const TITLES = {
  '/': '',
  '/portfolio': 'Portfolio',
  '/products': 'Products',
  '/cart': 'Cart',
  '/pricing': 'Pricing',
  '/about': 'About',
  '/process': 'Our process',
  '/policy': 'Booking policy',
  '/faq': 'FAQ',
  '/expect': 'What to expect',
  '/aftercare': 'Aftercare guide',
  '/admin': 'Admin demo',
  '/book': 'Book',
  '/book/bridal': 'Bridal booking',
  '/book/party': 'Party booking',
  '/book/festive': 'Festive booking',
  '/book/group': 'Group booking',
}

// Returns the page title, or null when the page sets its own (product pages)
export function titleFor(pathname) {
  const p = pathname.replace(/\/+$/, '') || '/'
  if (p.startsWith('/products/')) return null
  if (p in TITLES) return TITLES[p] ? `${TITLES[p]} | ${site.name}` : `${site.name} | Henna & Mehendi (Demo)`
  return `Page not found | ${site.name}`
}
