import { Link } from 'react-router-dom'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Confirm from '../components/Confirm'
import { site } from '../data/site'

const rows = [
  ['Based in', 'base area in Sri Lanka'],
  ['Areas served', 'areas the artist travels to'],
  ['Languages spoken', 'languages'],
  ['Years of experience', 'years of experience, only if true'],
  ['Training', 'training or learning background, only if any'],
  ['Styles offered', 'styles the artist offers'],
]

export default function About() {
  return (
    <>
      <Section>
        <div className="grid items-start gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div
              className="flex aspect-[4/5] items-center justify-center border border-dashed border-gold bg-cream p-6 text-center"
              role="img"
              aria-label="Placeholder for a photo of the artist or studio"
            >
              <p className="m-0 text-sm leading-6 text-gold-deep">
                [ARTIST TO CONFIRM: portrait or studio photo]
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading level={1} eyebrow="About the artist" title={site.name} />
            <h2 className="mt-10 text-2xl">The story</h2>
            <p className="mt-3 text-sm leading-7 text-henna/85">
              <Confirm>the artist&apos;s own story in their words: how they started and what they enjoy about henna</Confirm>
            </p>
            <h2 className="mt-10 text-2xl">Approach</h2>
            <p className="mt-3 text-sm leading-7 text-henna/85">
              <Confirm>how the artist works with clients, in their words</Confirm>
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="cream">
        <h2 className="text-2xl sm:text-3xl">At a glance</h2>
        <dl className="m-0 mt-8 grid max-w-3xl gap-x-10 gap-y-0 sm:grid-cols-[14rem_1fr]">
          {rows.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="border-b border-gold/30 py-4 text-[0.72rem] uppercase tracking-[0.18em] text-gold-deep">
                {k}
              </dt>
              <dd className="m-0 border-b border-gold/30 py-4 text-sm text-henna/85">
                <Confirm>{v}</Confirm>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <h2 className="text-2xl sm:text-3xl">Booking with confidence</h2>
        <ul className="m-0 mt-6 list-none space-y-3 p-0 text-sm leading-6 text-henna/85">
          <li>Prices are published on the <Link className="text-gold-deep underline underline-offset-4" to="/services">pricing page</Link>.</li>
          <li>The booking terms are written on the <Link className="text-gold-deep underline underline-offset-4" to="/policy">booking policy page</Link>.</li>
          <li>The <Link className="text-gold-deep underline underline-offset-4" to="/process">process</Link> shows what happens from first message to aftercare.</li>
        </ul>
        <div className="mt-10">
          <Link to="/book" className="btn btn-primary">Book now</Link>
        </div>
      </Section>
    </>
  )
}
