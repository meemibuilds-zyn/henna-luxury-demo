import Section from './Section'
import SectionHeading from './SectionHeading'
import { reviews } from '../data/reviews'

// Renders nothing until real reviews are added to src/data/reviews.js
export default function Reviews() {
  if (!reviews || reviews.length === 0) return null
  return (
    <Section tone="cream" labelledBy="reviews-h">
      <SectionHeading id="reviews-h" eyebrow="Reviews" title="Kind words from clients" center />
      <ul className="m-0 mt-12 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <li key={r.id} className="border border-gold/40 bg-ivory p-6">
            <blockquote className="m-0 font-serif text-xl leading-snug text-henna">{r.text}</blockquote>
            <p className="mt-5 text-sm text-henna/80">
              {r.name}
              {r.source ? <span className="text-gold-deep"> &middot; {r.source}</span> : null}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
