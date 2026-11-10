import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import ProductCard from '../components/ProductCard'
import { searchProducts, SAMPLE_PRODUCTS_NOTE } from '../data/products'
import { site } from '../data/site'
import { waLink } from '../lib/format'

export default function Products() {
  const [q, setQ] = useState('')
  const list = searchProducts(q)

  return (
    <Section>
      <Reveal>
        <SectionHeading
          level={1}
          eyebrow="Shop"
          title="Explore our products"
          intro="Choose an option, add it to your cart, and send one WhatsApp message to place your order."
        />
        <p className="mt-6 inline-block border border-dashed border-gold bg-cream px-3 py-2 text-sm text-gold-deep">
          {SAMPLE_PRODUCTS_NOTE}.
        </p>
      </Reveal>

      <div className="mt-10 max-w-md">
        <label htmlFor="product-search" className="sr-only">Search products</label>
        <input
          id="product-search"
          type="search"
          autoComplete="off"
          placeholder="Search products"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full border border-gold/60 bg-ivory px-4 py-3 text-base text-henna"
        />
      </div>

      <p className="mt-4 text-sm text-henna/70" aria-live="polite">
        {list.length} {list.length === 1 ? 'product' : 'products'}
      </p>

      {list.length === 0 ? (
        <div className="mt-6 border border-gold/30 bg-cream p-6">
          <p className="m-0 text-sm">No products match your search.</p>
          <a
            href={waLink(`Hello ${site.name}, I would like to ask about your products.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline mt-4"
          >
            <MessageCircle size={16} aria-hidden="true" /> Ask on WhatsApp
          </a>
        </div>
      ) : (
        <ul className="m-0 mt-6 grid list-none grid-cols-2 gap-5 p-0 sm:gap-8 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </ul>
      )}
    </Section>
  )
}
