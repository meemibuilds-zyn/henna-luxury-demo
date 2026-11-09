import { Link } from 'react-router-dom'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import WorkImage from '../components/WorkImage'
import Confirm from '../components/Confirm'
import { works } from '../data/portfolio'
import { getUnitPrice, getPartyUnitPrice, SAMPLE_NOTE } from '../data/pricing'
import { listBookings, tomorrowsBookings } from '../data/bookingsStore'
import { money } from '../lib/format'

// TEMPORARY preview for Batch 1. Batch 2 replaces this file with the real Home page.
export default function Home() {
  const bride = getUnitPrice('wedding_bride', 'wrist', 2, 'arabic')
  const party = getPartyUnitPrice('wrist', 'stripe_fingers')
  return (
    <>
      <Section>
        <Reveal>
          <SectionHeading
            level={1}
            eyebrow="Batch 1 preview"
            title="Components and sample data"
            intro="This temporary page proves the shared components and the data layer work. Batch 2 replaces it with the real Home page."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book" className="btn btn-primary">Primary button</Link>
            <Link to="/portfolio" className="btn btn-outline">Outline button</Link>
          </div>
          <p className="mt-8 text-sm">
            Placeholder tag: <Confirm>years of experience</Confirm>
          </p>
        </Reveal>
      </Section>

      <Section tone="cream">
        <SectionHeading eyebrow="Data layer" title="Pricing and bookings" />
        <ul className="mt-8 list-none space-y-2 p-0 text-sm">
          <li>Bride, wrist, 2 sides, Arabic: <b>{money(bride)}</b> (expected LKR 9,900)</li>
          <li>Party, wrist, stripe and fingers: <b>{money(party)}</b> (expected LKR 1,100)</li>
          <li>Bookings in the demo store: <b>{listBookings().length}</b> (expected 5)</li>
          <li>Tomorrow's events: <b>{tomorrowsBookings().length}</b> (expected 2)</li>
          <li className="text-henna/70">{SAMPLE_NOTE}</li>
        </ul>
      </Section>

      <Section>
        <SectionHeading eyebrow="Images" title="Sample placeholders" />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {works.slice(0, 6).map((w) => (
            <WorkImage key={w.id} work={w} />
          ))}
        </div>
      </Section>
    </>
  )
}
