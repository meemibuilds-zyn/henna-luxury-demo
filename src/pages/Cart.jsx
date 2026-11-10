import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, MessageCircle } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import ProductImage from '../components/ProductImage'
import { useCart } from '../lib/useCart'
import { setQty, removeItem, clearCart } from '../data/cart'
import { getProductById, priceText } from '../data/products'
import { validMobile } from '../lib/booking'
import { money, waLink } from '../lib/format'
import { site } from '../data/site'

const field = 'mt-2 w-full border border-gold/60 bg-ivory px-4 py-3 text-base text-henna'
const lbl = 'block text-sm font-medium text-henna'
const round = 'inline-flex h-11 w-11 items-center justify-center border border-gold/60 bg-ivory text-henna hover:bg-cream cursor-pointer'

export default function Cart() {
  const { items } = useCart()
  const [f, setF] = useState({ name: '', mobile: '', address: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [note, setNote] = useState('')

  // Names and prices always come from the current product data
  const lines = items
    .map((i) => {
      const p = getProductById(i.pid)
      const v = p && p.variants.find((x) => x.id === i.vid)
      return p && v ? { ...i, p, v } : null
    })
    .filter(Boolean)
  const buyable = lines.filter((l) => l.p.inStock)

  let sum = 0
  let unknown = false
  buyable.forEach((l) => {
    if (l.v.price == null) unknown = true
    else sum += l.v.price * l.qty
  })
  const totalText = sum || !unknown ? money(sum) : 'Price on WhatsApp'

  const msg = () => {
    const L = [`Hello ${site.name} \u{1F44B}`, 'I would like to order:', '']
    buyable.forEach((l, n) =>
      L.push(`${n + 1}. ${l.p.name} (${l.v.label}) x ${l.qty} - ${l.v.price == null ? 'Price on WhatsApp' : money(l.v.price * l.qty)}`),
    )
    L.push('', `Total: ${totalText}${unknown && sum ? ' (plus items marked Price on WhatsApp)' : ''}`)
    L.push('', '*Delivery details*', `Name: ${f.name.trim() || '-'}`, `Mobile: ${f.mobile.trim() || '-'}`, `Address: ${f.address.trim() || '-'}`)
    if (f.notes.trim()) L.push(`Notes: ${f.notes.trim()}`)
    L.push('', 'Please confirm availability, the delivery charge and payment details. Thank you!')
    return L.join('\n')
  }

  const check = () => {
    const e = {}
    if (!f.name.trim()) e.name = 'Enter your name.'
    if (!validMobile(f.mobile)) e.mobile = 'Enter a valid mobile number, for example 0712345678.'
    if (f.address.trim().length < 5) e.address = 'Enter your delivery address.'
    setErrors(e)
    const first = Object.keys(e)[0]
    if (first) document.getElementById('c-' + first)?.focus()
    return !first
  }

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const onCopy = async () => {
    if (!check()) return
    try {
      await navigator.clipboard.writeText(msg())
      setNote('Order message copied. Paste it into WhatsApp.')
    } catch (err) {
      setNote('Could not copy. Use the Send button instead.')
    }
  }

  if (lines.length === 0) {
    return (
      <Section>
        <SectionHeading level={1} eyebrow="Cart" title="Your cart is empty" />
        <p className="mt-6 text-sm text-henna/80">Add something from the shop and it will appear here.</p>
        <Link to="/products" className="btn btn-primary mt-6">Explore our products</Link>
      </Section>
    )
  }

  return (
    <Section>
      <SectionHeading level={1} eyebrow="Cart" title="Your cart" />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <ul className="m-0 list-none divide-y divide-gold/30 border-y border-gold/30 p-0">
            {lines.map((l) => (
              <li key={l.k} className="grid grid-cols-[5rem_1fr] gap-4 py-5 sm:grid-cols-[6rem_1fr]">
                <ProductImage product={l.p} />
                <div>
                  <h2 className="m-0 text-xl sm:text-2xl">
                    <Link to={`/products/${l.p.slug}`} className="text-henna no-underline">{l.p.name}</Link>
                  </h2>
                  <p className="m-0 mt-1 text-sm text-henna/75">{l.v.label}</p>
                  <p className="m-0 mt-1 text-sm">{priceText(l.v.price)}</p>
                  {!l.p.inStock ? (
                    <p className="mt-2 text-sm text-gold-deep">Out of stock. This item is not included in your order.</p>
                  ) : (
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div role="group" aria-label={`Quantity for ${l.p.name}`} className="flex items-center gap-1">
                        <button type="button" className={round} aria-label="Decrease quantity" onClick={() => setQty(l.k, l.qty - 1)}>
                          <Minus size={16} aria-hidden="true" />
                        </button>
                        <output className="inline-flex h-11 min-w-10 items-center justify-center">{l.qty}</output>
                        <button type="button" className={round} aria-label="Increase quantity" onClick={() => setQty(l.k, l.qty + 1)}>
                          <Plus size={16} aria-hidden="true" />
                        </button>
                      </div>
                      <span className="text-sm font-medium">{l.v.price == null ? 'Price on WhatsApp' : money(l.v.price * l.qty)}</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeItem(l.k)}
                    className="mt-3 cursor-pointer border-0 bg-transparent p-0 text-xs uppercase tracking-[0.14em] text-gold-deep underline underline-offset-4"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between border-b border-gold/30 pb-4">
            <span className="text-lg">Total</span>
            <span className="font-serif text-3xl">{totalText}</span>
          </div>
          {unknown && (
            <p className="mt-3 text-xs text-henna/70">Items marked Price on WhatsApp are not included in the total.</p>
          )}
          <button
            type="button"
            onClick={clearCart}
            className="mt-4 cursor-pointer border-0 bg-transparent p-0 text-xs uppercase tracking-[0.14em] text-henna/70 underline underline-offset-4"
          >
            Clear cart
          </button>
        </div>

        <div className="border border-gold/40 bg-ivory p-5 sm:p-7">
          <h2 className="m-0 text-2xl sm:text-3xl">Delivery details</h2>
          <div className="mt-5 space-y-5">
            <div>
              <label htmlFor="c-name" className={lbl}>Your name</label>
              <input id="c-name" type="text" autoComplete="name" value={f.name} onChange={set('name')} className={field} aria-invalid={errors.name ? 'true' : undefined} aria-describedby={errors.name ? 'ce-name' : undefined} />
              {errors.name && <p id="ce-name" role="alert" className="mt-2 text-sm text-red-800">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="c-mobile" className={lbl}>Mobile number</label>
              <input id="c-mobile" type="tel" inputMode="tel" autoComplete="tel" value={f.mobile} onChange={set('mobile')} className={field} aria-invalid={errors.mobile ? 'true' : undefined} aria-describedby={errors.mobile ? 'ce-mobile' : undefined} />
              {errors.mobile && <p id="ce-mobile" role="alert" className="mt-2 text-sm text-red-800">{errors.mobile}</p>}
            </div>
            <div>
              <label htmlFor="c-address" className={lbl}>Delivery address</label>
              <textarea id="c-address" rows={3} autoComplete="street-address" value={f.address} onChange={set('address')} className={field} aria-invalid={errors.address ? 'true' : undefined} aria-describedby={errors.address ? 'ce-address' : undefined} />
              {errors.address && <p id="ce-address" role="alert" className="mt-2 text-sm text-red-800">{errors.address}</p>}
            </div>
            <div>
              <label htmlFor="c-notes" className={lbl}>
                Notes <span className="font-normal text-henna/60">(optional)</span>
              </label>
              <textarea id="c-notes" rows={2} value={f.notes} onChange={set('notes')} className={field} />
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={waLink(msg())}
                target="_blank"
                rel="noopener noreferrer"
                className={'btn btn-wa w-full' + (buyable.length ? '' : ' pointer-events-none opacity-45')}
                aria-disabled={buyable.length ? undefined : 'true'}
                onClick={(e) => {
                  if (!buyable.length || !check()) e.preventDefault()
                }}
              >
                <MessageCircle size={16} aria-hidden="true" /> Send order on WhatsApp
              </a>
              <button type="button" className="btn btn-outline w-full" onClick={onCopy}>Copy order message</button>
            </div>
            {note && <p role="status" className="m-0 text-sm text-henna/80">{note}</p>}
            <p className="m-0 text-xs leading-5 text-henna/70">
              The artist confirms availability, the delivery charge and payment details on WhatsApp.
              <br />
              [ARTIST TO CONFIRM: delivery areas, delivery charge and payment methods]
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
