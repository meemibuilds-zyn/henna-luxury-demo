import { Link } from 'react-router-dom'
import Section from '../Section'
import SectionHeading from '../SectionHeading'
import Reveal from '../Reveal'
import BookingFlow from './BookingFlow'
import { SAMPLE_NOTE } from '../../data/pricing'

// Shared layout for a booking landing page: focused copy, the booking flow, then option cards.
export default function BookingPage({ cfg, eyebrow, title, intro, cardsEyebrow, cardsTitle, cards, children }) {
  return (
    <>
      <Section>
        <Reveal>
          <SectionHeading level={1} eyebrow={eyebrow} title={title} intro={intro} />
          <p className="mt-6 inline-block border border-dashed border-gold bg-cream px-3 py-2 text-sm text-gold-deep">
            {SAMPLE_NOTE}.
          </p>
        </Reveal>
      </Section>

      <section className="bg-cream" aria-label={`${eyebrow} estimate`}>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-14">
          <BookingFlow cfg={cfg} />
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow={cardsEyebrow} title={cardsTitle} />
        <ul className="m-0 mt-10 grid list-none gap-5 p-0 md:grid-cols-3">
          {cards.map((o) => (
            <li key={o.title} className="border border-gold/40 p-6">
              <h3 className="m-0 text-2xl">{o.title}</h3>
              <p className="mb-0 mt-3 text-sm leading-6 text-henna/80">{o.text}</p>
            </li>
          ))}
        </ul>
        {children}
        <p className="mt-10 text-sm leading-6 text-henna/80">
          Read the <Link className="text-gold-deep underline underline-offset-4" to="/policy">booking policy</Link>,
          see the full <Link className="text-gold-deep underline underline-offset-4" to="/pricing">price table</Link>,
          or <Link className="text-gold-deep underline underline-offset-4" to="/book">choose a different booking type</Link>.
        </p>
      </Section>
    </>
  )
}
