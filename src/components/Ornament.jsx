// Decorative line-art motif. Not a photo and not a claim about the artist's work.
export default function Ornament({ className = '' }) {
  const petals = [0, 30, 60, 90, 120, 150]
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
    >
      <circle cx="200" cy="200" r="190" strokeWidth="1" />
      <circle cx="200" cy="200" r="172" strokeWidth="0.6" strokeDasharray="2 7" />
      <g transform="translate(200 200)" strokeWidth="1.1">
        {petals.map((a) => (
          <ellipse key={a} rx="18" ry="120" transform={`rotate(${a})`} />
        ))}
        {petals.map((a) => (
          <ellipse key={'s' + a} rx="9" ry="60" transform={`rotate(${a + 15})`} />
        ))}
        <circle r="140" strokeWidth="0.6" />
        <circle r="22" />
        <circle r="9" />
      </g>
    </svg>
  )
}
