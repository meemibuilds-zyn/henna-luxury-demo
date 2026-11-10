import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'
import Section from '../components/Section'
import Confirm from '../components/Confirm'
import ProductImage from '../components/ProductImage'
import OptionList from '../components/booking/OptionList'
import { getProduct, priceText } from '../data/products'
import { addToCart } from '../data/cart'
import { site } from '../data/site'

const round = 'inline-flex h-11 w-11 items-center justify-center border border-gold/60 bg-ivory text-henna hover:bg-cream cursor-pointer'

export default function ProductDetail() {
  const { slug } = useParams()
  const p = getProduct(slug)
  const [vid, setVid] = useState(p ? p.variants[0].id : null)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (p) document.title = `${p.name} | ${site.name}`
    setVid(p ? p.variants[0].id : null)
    setQty(1)
    setAdded(false)
  }, [slug]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!p) {
    return (
      <Section>
        <h1 className="text-4xl">Product not found</h1>
        <p className="mt-4 text-sm text-henna/80">This product could not be found.</p>
        <Link to="/products" className="btn btn-outline mt-6">Back to products</Link>
      </Section>
    )
  }

  const v = p.variants.find((x) => x.id === vid) || p.variants[0]
  const many = p.variants.length > 1

  return (
    <Section>
      <p className="m-0 mb-8 text-sm">
        <Link to="/products" className="text-gold-deep underline underline-offset-4">All products</Link>
      </p>
      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <ProductImage product={p} eager />

        <div>
          <h1 className="text-4xl text-henna sm:text-5xl">{p.name}</h1>
          <p className="m-0 mt-4 font-serif text-3xl text-henna" aria-live="polite">{priceText(v.price)}</p>
          <p className="mt-4 text-sm leading-7 text-henna/85">{p.description}</p>
          {p.confirm && (
            <p className="mt-3 text-sm">
              <Confirm>{p.confirm}</Confirm>
            </p>
          )}

          {many && (
            <div className="mt-6">
              <OptionList
                label="Choose an option"
                name="variant"
                value={vid}
                onPick={(id) => {
                  setVid(id)
                  setAdded(false)
                }}
                options={p.variants.map((x) => ({ value: x.id, label: x.label, hint: priceText(x.price) }))}
              />
            </div>
          )}

          {p.inStock ? (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div role="group" aria-label="Quantity" className="flex items-center gap-1">
                <button type="button" className={round} aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}>
                  <Minus size={16} aria-hidden="true" />
                </button>
                <output className="inline-flex h-11 min-w-12 items-center justify-center text-lg">{qty}</output>
                <button type="button" className={round} aria-label="Increase quantity" onClick={() => setQty(Math.min(99, qty + 1))}>
                  <Plus size={16} aria-hidden="true" />
                </button>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  addToCart({ pid: p.id, vid: v.id, qty })
                  setAdded(true)
                }}
              >
                Add to cart
              </button>
            </div>
          ) : (
            <p className="mt-6 border border-gold/30 bg-cream p-3 text-sm">
              This product is out of stock. Ask the artist on WhatsApp when it will be back.
            </p>
          )}

          <p role="status" className="m-0 mt-4 text-sm">
            {added && (
              <>
                Added to your cart.{' '}
                <Link to="/cart" className="text-gold-deep underline underline-offset-4">View cart</Link>
              </>
            )}
          </p>
        </div>
      </div>
    </Section>
  )
}
