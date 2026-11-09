export default function Section({ tone = 'ivory', id, labelledBy, className = '', children }) {
  const bg = tone === 'cream' ? 'bg-cream' : tone === 'dark' ? 'bg-henna text-ivory' : 'bg-ivory'
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${bg} ${className}`}>
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">{children}</div>
    </section>
  )
}
