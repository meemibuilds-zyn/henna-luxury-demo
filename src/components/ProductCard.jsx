import { Link } from 'react-router-dom'
import ProductImage from './ProductImage'
import { fromPrice } from '../data/products'

export default function ProductCard({ p }) {
  return (
    <li>
      <Link to={`/products/${p.slug}`} className="group block no-underline">
        <div className="relative overflow-hidden border border-transparent transition-colors group-hover:border-gold">
          <ProductImage product={p} />
          {!p.inStock && (
            <span className="absolute left-2 top-2 bg-henna px-2 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-ivory">
              Out of stock
            </span>
          )}
        </div>
        <h3 className="mt-3 text-xl text-henna sm:text-2xl">{p.name}</h3>
        <p className="m-0 mt-1 text-sm text-henna/80">{fromPrice(p)}</p>
      </Link>
    </li>
  )
}
