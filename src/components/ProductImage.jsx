// Shows the real photo when product.image is set, otherwise a clearly labeled sample placeholder.
export default function ProductImage({ product, eager = false, className = '' }) {
  return (
    <div className={'relative aspect-square overflow-hidden bg-cream ' + className}>
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover"
        />
      ) : (
        <svg viewBox="0 0 400 400" role="img" aria-label={`Sample placeholder for ${product.name}`} className="h-full w-full">
          <rect width="400" height="400" fill="#F4ECDD" />
          <rect x="14" y="14" width="372" height="372" fill="none" stroke="#B08D4F" strokeWidth="1" />
          <g fill="none" stroke="#B08D4F" strokeWidth="1.4" strokeLinejoin="round">
            <path d="M200 70 L252 250 Q200 282 148 250 Z" />
            <path d="M163 205 Q200 226 237 205" />
            <path d="M156 230 Q200 254 244 230" />
            <path d="M200 70 L200 52" strokeLinecap="round" />
            <circle cx="200" cy="170" r="3" />
          </g>
          <text x="200" y="332" textAnchor="middle" fontSize="13" letterSpacing="4" fill="#7A5C25" fontFamily="Inter, system-ui, sans-serif">
            SAMPLE PRODUCT
          </text>
        </svg>
      )}
    </div>
  )
}
