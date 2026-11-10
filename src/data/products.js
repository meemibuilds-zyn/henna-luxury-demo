// SAMPLE PRODUCTS. Every name, option, price and description here is a placeholder
// the artist must replace. price: null shows "Price on WhatsApp".
// To use a real photo: copy it into public/products/ and set image: '/products/your-file.jpg'
import { money } from '../lib/format'

export const SAMPLE_PRODUCTS_NOTE = 'Sample products and prices, to be confirmed by the artist'

export const products = [
  {
    id: 'p1',
    slug: 'henna-cone',
    name: 'Henna cone',
    description: 'A single henna cone. Choose a size.',
    confirm: 'product description, ingredients, shelf life and storage',
    image: null,
    inStock: true,
    variants: [
      { id: 'small', label: 'Small', price: 300 },
      { id: 'medium', label: 'Medium', price: 450 },
      { id: 'large', label: 'Large', price: 650 },
    ],
  },
  {
    id: 'p2',
    slug: 'henna-cone-set',
    name: 'Henna cone set',
    description: 'A set of henna cones in one pack.',
    confirm: 'what is in each set, ingredients, shelf life and storage',
    image: null,
    inStock: true,
    variants: [
      { id: 'set3', label: 'Set of 3', price: 1100 },
      { id: 'set6', label: 'Set of 6', price: 2100 },
    ],
  },
  {
    id: 'p3',
    slug: 'design-stencil-pack',
    name: 'Design stencil pack',
    description: 'A pack of reusable design stencils.',
    confirm: 'stencil size, material and what each pack contains',
    image: null,
    inStock: true,
    variants: [
      { id: 'floral', label: 'Floral', price: 800 },
      { id: 'arabic', label: 'Arabic', price: 800 },
      { id: 'mixed', label: 'Mixed', price: 1400 },
    ],
  },
  {
    id: 'p4',
    slug: 'practice-sheet-pad',
    name: 'Practice sheet pad',
    description: 'A pad of practice sheets for trying designs.',
    confirm: 'sheet size and number of sheets',
    image: null,
    inStock: true,
    variants: [{ id: 'standard', label: 'Standard', price: 600 }],
  },
  {
    id: 'p5',
    slug: 'gift-box',
    name: 'Gift box',
    description: 'A gift box. The artist confirms the contents and price on WhatsApp.',
    confirm: 'what the gift box contains',
    image: null,
    inStock: true,
    variants: [{ id: 'standard', label: 'Standard', price: null }],
  },
  {
    id: 'p6',
    slug: 'bridal-henna-set',
    name: 'Bridal henna set',
    description: 'A set for bridal henna. Currently out of stock.',
    confirm: 'what the set contains and when it is back in stock',
    image: null,
    inStock: false,
    variants: [{ id: 'standard', label: 'Standard', price: 4500 }],
  },
]

export const getProduct = (slug) => products.find((p) => p.slug === slug) || null
export const getProductById = (id) => products.find((p) => p.id === id) || null

export const searchProducts = (q) => {
  const t = String(q || '').trim().toLowerCase()
  return t ? products.filter((p) => p.name.toLowerCase().includes(t)) : products
}

export const priceText = (price) => (price == null ? 'Price on WhatsApp' : money(price))

// Price shown on a product card: "From LKR 300" when options differ, one price when they do not
export function fromPrice(p) {
  const known = p.variants.map((v) => v.price).filter((n) => n != null)
  if (!known.length) return 'Price on WhatsApp'
  const min = Math.min(...known)
  const max = Math.max(...known)
  return min !== max || known.length < p.variants.length ? `From ${money(min)}` : money(min)
}
