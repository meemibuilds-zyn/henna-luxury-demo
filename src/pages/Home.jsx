import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import WorkImage from '../components/WorkImage'
import Ornament from '../components/Ornament'
import SiteFact from '../components/SiteFact'
import Reviews from '../components/Reviews'
import { site } from '../data/site'
import { services } from '../data/services'
import { steps } from '../data/process'
import { getFeaturedWorks } from '../data/portfolio'
import { waLink } from '../lib/format'

const trust = [
  { label: 'Transparent pricing', to: '/pricing' },
  { label: 'Written booking policy', to: '/policy' },
  { label: 'A clear process', to: '/process' },
  { label: 'Estimate before you message', to: '/book' },
]

export default function Home() {
  const featured = getFeaturedWorks().slice(0, 3)
  const hello = `Hello ${site.name}, I would like to ask about henna.`

  return (
    <>
      {/* Hero */}
      <section className="bg-ivory">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-deep">{site.descriptor}</p>
            <h1 className="mt-5 text-5xl text-henna sm:text-6xl lg:text-7xl">{site.name}</h1>
            <div className="gold-rule mt-7 max-w-[12rem]" />
            <p className="mt-7 font-serif text-2xl text-henna/90 sm:text-3xl">{site.tagline}</p>
            <p className="mt-5 max-w-lg text-base leading-7 text-henna/80">
              Estimate your booking online, then confirm the details with the artist on WhatsApp.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/book" className="btn btn-primary">Book now</Link>
              <Link to="/portfolio" className="btn btn-outline">View portfolio</Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <Ornament className="mx-auto w-60 max-w-full text-gold opacity-80 sm:w-80 lg:w-full lg:max-w-md" />
          </Reveal>
        </div>
      </section>

      {/* Trust strip: only things the site itself provides */}
      <section className="border-y border-gold/30 bg-cream" aria-label="How we work">
        <ul className="mx-auto m-0 grid max-w-6xl list-none grid-cols-2 gap-px p-0 lg:grid-cols-4">
          {trust.map((t) => (
            <li key={t.label} className="text-center">
              <Link
                to={t.to}
                className="block px-4 py-5 text-[0.72rem] uppercase tracking-[0.18em] text-henna/85 hover:text-henna"
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Featured works */}
      <Section labelledBy="works-h">
        <SectionHeading
          id="works-h"
          eyebrow="Portfolio"
          title="Featured work"
          intro="These are sample placeholders. Photos of the artist's real work will replace them."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {featured.map((w) => (
            <figure key={w.id} className="m-0">
              <WorkImage work={w} />
              <figcaption className="mt-3 flex items-baseline justify-between gap-3">
                <span className="font-serif text-xl text-henna">{w.title}</span>
                <span className="text-[0.7rem] uppercase tracking-[0.18em] text-gold-deep">{w.category}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10">
          <Link to="/portfolio" className="btn btn-outline">See all work</Link>
        </div>
      </Section>

      {/* How it works */}
      <Section tone="cream" labelledBy="how-h">
        <SectionHeading id="how-h" eyebrow="How it works" title="A clear, simple process" center />
        <ol className="m-0 mt-14 grid list-none gap-10 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n}>
              <span className="font-serif text-5xl text-gold">{s.n}</span>
              <h3 className="mt-3 text-2xl text-henna">{s.title}</h3>
              <p className="mt-3 text-sm leading-6 text-henna/80">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <Link to="/process" className="text-sm text-gold-deep underline underline-offset-4">
            Read the full process
          </Link>
        </div>
      </Section>

      <Reviews />

      {/* Booking CTAs */}
      <section className="bg-henna text-ivory" aria-labelledby="cta-h">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <p className="text-xs uppercase tracking-[0.3em] text-sand">Booking</p>
          <h2 id="cta-h" className="mt-3 text-3xl text-ivory sm:text-4xl">Start with an estimate</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-ivory/80">
            Pick your occasion, see the estimated price as you choose, then send one message to the artist.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {services.map((s) => (
              <Link
                key={s.id}
                to={s.to}
                className="inline-flex min-h-11 items-center border border-gold px-5 py-2 text-[0.75rem] uppercase tracking-[0.16em] text-ivory no-underline transition-colors hover:bg-ivory hover:text-henna"
              >
                {s.id === 'bridal' ? 'Bridal' : s.id === 'party' ? 'Party' : s.id === 'festive' ? 'Festive' : 'Group'}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <Section tone="cream" labelledBy="contact-h">
        <div className="grid gap-10 md:grid-cols-2">
          <SectionHeading
            id="contact-h"
            eyebrow="Contact"
            title="Get in touch"
            intro="Questions before you book? Send a message and the artist will reply."
          />
          <div>
            <ul className="m-0 list-none space-y-3 p-0 text-sm text-henna/85">
              <li><SiteFact value={site.whatsappDisplay} /></li>
              <li><SiteFact value={site.instagram} /></li>
              <li><SiteFact value={site.email} /></li>
              <li><SiteFact value={site.area} /></li>
            </ul>
            <a
              href={waLink(hello)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-8"
            >
              <MessageCircle size={16} aria-hidden="true" /> Message on WhatsApp
            </a>
          </div>
        </div>
      </Section>
    </>
  )
}
