import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { site } from '../data/site'
import { waLink } from '../lib/format'

const types = [
  { to: '/book/bridal', title: 'Bridal', best: 'For the bride', text: 'Choose who has henna (bride, bridesmaids, guests), then length, sides and design for each group.' },
  { to: '/book/party', title: 'Party', best: 'Engagements, mehendi nights, family events', text: 'Stripe designs priced per guest, with an option to set a budget per design.' },
  { to: '/book/festive', title: 'Festive', best: 'Eid, Avurudu and other festivals', text: 'Shorter lengths from palm to mid arm, with the number of people you choose.' },
  { to: '/book/group', title: 'Group', best: 'Bridal party or many guests', text: 'Priced per person with a minimum group size, by length and sides or design count.' },
]

export default function BookHub() {
  const hello = `Hello ${site.name}, I am not sure which booking type to choose.`
  return (
    <Section>
      <Reveal>
        <SectionHeading
          level={1}
          eyebrow="Book"
          title="Choose your booking"
          intro="Pick the type that fits your event. Each one shows a live estimate before you contact the artist. Nothing is booked until the artist confirms on WhatsApp."
        />
      </Reveal>
      <ul className="m-0 mt-12 grid list-none gap-5 p-0 sm:grid-cols-2">
        {types.map((t) => (
          <li key={t.to}>
            <Link
              to={t.to}
              className="group flex h-full flex-col border border-gold/40 bg-ivory p-6 no-underline transition-colors hover:border-gold hover:bg-cream"
            >
              <p className="m-0 text-[0.68rem] uppercase tracking-[0.22em] text-gold-deep">{t.best}</p>
              <h2 className="mt-2 text-3xl text-henna">{t.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-henna/80">{t.text}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-gold-deep">
                Start <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-gold/30 pt-8">
        <p className="m-0 text-sm text-henna/80">Not sure which one to choose?</p>
        <a href={waLink(hello)} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
          <MessageCircle size={16} aria-hidden="true" /> Ask on WhatsApp
        </a>
      </div>
    </Section>
  )
}
