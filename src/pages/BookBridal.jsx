import { Link } from 'react-router-dom'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import BookingFlow from '../components/booking/BookingFlow'
import { bridal } from '../data/bookingConfigs'
import { SAMPLE_NOTE } from '../data/pricing'

const options = [
  { title: 'Bride only', text: 'Choose the length, number of sides and design for the bride.' },
  { title: 'Bride and bridesmaids', text: 'Add bridesmaids with their own count, length and design.' },
  { title: 'Bride, bridesmaids and guests', text: 'Add guests too, including a design-based-on-budget option.' },
]

export default function BookBridal() {
  return (
    <>
      <Section>
        <Reveal>
          <SectionHeading
            level={1}
            eyebrow="Bridal booking"
            title="Bridal henna, planned with you"
            intro="Build your estimate step by step, then send your details to the artist on WhatsApp. Nothing is booked until the artist confirms."
          />
          <p className="mt-6 inline-block border border-dashed border-gold bg-cream px-3 py-2 text-sm text-gold-deep">
            {SAMPLE_NOTE}.
          </p>
        </Reveal>
      </Section>

      <section className="bg-cream" aria-label="Bridal booking estimate">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-14">
          <BookingFlow cfg={bridal} />
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Options" title="Who is it for?" />
        <ul className="m-0 mt-10 grid list-none gap-5 p-0 md:grid-cols-3">
          {options.map((o) => (
            <li key={o.title} className="border border-gold/40 p-6">
              <h3 className="m-0 text-2xl">{o.title}</h3>
              <p className="mb-0 mt-3 text-sm leading-6 text-henna/80">{o.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm leading-6 text-henna/80">
          Read the <Link className="text-gold-deep underline underline-offset-4" to="/policy">booking policy</Link>{' '}
          and see the full <Link className="text-gold-deep underline underline-offset-4" to="/pricing">price table</Link>.
        </p>
      </Section>
    </>
  )
}
