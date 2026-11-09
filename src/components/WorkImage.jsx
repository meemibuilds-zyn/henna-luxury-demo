function SamplePlaceholder({ label, alt }) {
  return (
    <svg
      viewBox="0 0 400 500"
      role="img"
      aria-label={alt}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <rect width="400" height="500" fill="#F4ECDD" />
      <rect x="14" y="14" width="372" height="472" fill="none" stroke="#B08D4F" strokeWidth="1" />
      <g transform="translate(200 230)" fill="none" stroke="#B08D4F" strokeWidth="1.2">
        {[0, 45, 90, 135].map((a) => (
          <ellipse key={a} rx="16" ry="70" transform={`rotate(${a})`} />
        ))}
        <circle r="8" />
        <circle r="86" strokeDasharray="2 6" />
        <circle r="108" />
      </g>
      <text x="200" y="400" textAnchor="middle" fontSize="13" letterSpacing="4" fill="#7A5C25" fontFamily="Inter, system-ui, sans-serif">
        SAMPLE PLACEHOLDER
      </text>
      <text x="200" y="424" textAnchor="middle" fontSize="12" letterSpacing="3" fill="#7A5C25" fontFamily="Inter, system-ui, sans-serif">
        {String(label).toUpperCase()}
      </text>
    </svg>
  )
}

// Shows the real photo when work.image is set, otherwise a labeled placeholder.
export default function WorkImage({ work, eager = false, className = '' }) {
  return (
    <div className={'relative aspect-[4/5] overflow-hidden bg-cream ' + className}>
      {work.image ? (
        <img
          src={work.image}
          alt={work.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover"
        />
      ) : (
        <SamplePlaceholder label={work.category} alt={work.alt} />
      )}
    </div>
  )
}
