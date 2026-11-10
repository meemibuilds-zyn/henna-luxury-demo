import { Link } from 'react-router-dom'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Confirm from '../components/Confirm'
import {
  lengths,
  designs,
  partyDesigns,
  sides,
  travelCharge,
  tierSurcharge,
  getUnitPrice,
  getPartyUnitPrice,
  SAMPLE_NOTE,
} from '../data/pricing'
import { money } from '../lib/format'

const BASE = 'khafif'
const th =
  'border-b border-gold/60 px-3 py-3 text-left text-[0.68rem] font-medium uppercase tracking-[0.16em] text-gold-deep whitespace-nowrap'
const td = 'border-b border-gold/20 px-3 py-3 text-sm whitespace-nowrap'

const personCols = [
  ['wedding_bride', 'Bride'],
  ['wedding_bridesmaid', 'Bridesmaid'],
  ['wedding_guest', 'Guest'],
  ['festival', 'Festive'],
  ['group', 'Group'],
]

function Table({ label, children }) {
  return (
    <div
      className="mt-6 overflow-x-auto border border-gold/40 bg-ivory"
      role="region"
      aria-label={label}
      tabIndex={0}
    >
      <table className="w-full border-collapse">{children}</table>
    </div>
  )
}

export default function Pricing() {
  const tiers = [0, 1, 2].map((t) => ({
    tier: t,
    pct: Math.round(tierSurcharge[t] * 100),
    names: designs.filter((d) => d.tier === t).map((d) => d.label),
  }))
  const partyLengths = lengths.filter((l) => l.festivalParty)

  return (
    <>
      <Section>
        <Reveal>
          <SectionHeading
            level={1}
            eyebrow="Transparent pricing"
            title="Pricing"
            intro="Prices are shown openly so you know what to expect before you message the artist."
          />
          <p className="mt-6 inline-block border border-dashed border-gold bg-cream px-3 py-2 text-sm text-gold-deep">
            {SAMPLE_NOTE}. The final price is always confirmed by the artist on WhatsApp.
          </p>
        </Reveal>

        <h2 className="mt-16 text-2xl sm:text-3xl">Hand henna, one side, per person</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-henna/80">
          Starting prices for the lightest style. Detailed styles cost more (see styles below).
        </p>
        <Table label="Price per person for one side by length and group">
          <caption className="sr-only">Sample price per person for one side, by length and group</caption>
          <thead>
            <tr>
              <th scope="col" className={th}>Length</th>
              {personCols.map(([, name]) => (
                <th key={name} scope="col" className={th}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lengths.map((l) => (
              <tr key={l.key}>
                <th scope="row" className={td + ' text-left font-medium'}>{l.label}</th>
                {personCols.map(([scope, name]) => {
                  const unavailable = scope === 'festival' && !l.festivalParty
                  return (
                    <td key={name} className={td}>
                      {unavailable ? '\u2014' : money(getUnitPrice(scope, l.key, 1, BASE))}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </Table>

        <h2 className="mt-16 text-2xl sm:text-3xl">Bridal, by number of sides</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-henna/80">
          One side is the front or back of one hand. Prices below are for the bride, lightest style.
        </p>
        <Table label="Bridal price by length and number of sides">
          <caption className="sr-only">Sample bridal price by length and number of sides</caption>
          <thead>
            <tr>
              <th scope="col" className={th}>Length</th>
              {sides.map((s) => (
                <th key={s} scope="col" className={th}>{s} {s === 1 ? 'side' : 'sides'}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lengths.map((l) => (
              <tr key={l.key}>
                <th scope="row" className={td + ' text-left font-medium'}>{l.label}</th>
                {sides.map((s) => (
                  <td key={s} className={td}>{money(getUnitPrice('wedding_bride', l.key, s, BASE))}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>

        <h2 className="mt-16 text-2xl sm:text-3xl">Party stripe designs</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-henna/80">
          For larger gatherings. Priced per design.
        </p>
        <Table label="Party stripe design prices by length">
          <caption className="sr-only">Sample party price per design by length</caption>
          <thead>
            <tr>
              <th scope="col" className={th}>Design</th>
              {partyLengths.map((l) => (
                <th key={l.key} scope="col" className={th}>{l.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {partyDesigns.map((d) => (
              <tr key={d.key}>
                <th scope="row" className={td + ' text-left font-medium'}>{d.label}</th>
                {partyLengths.map((l) => (
                  <td key={l.key} className={td}>{money(getPartyUnitPrice(l.key, d.key))}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>

      <Section tone="cream">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl sm:text-3xl">Design styles</h2>
            <p className="mt-2 text-sm leading-6 text-henna/80">
              The more detailed the design, the longer it takes. Sample adjustments:
            </p>
            <ul className="m-0 mt-5 list-none space-y-4 p-0">
              {tiers.map((t) => (
                <li key={t.tier} className="border-l border-gold pl-4">
                  <p className="m-0 text-sm font-medium text-henna">
                    {t.pct === 0 ? 'Base price' : `Base price + ${t.pct}%`}
                  </p>
                  <p className="m-0 mt-1 text-sm text-henna/75">{t.names.join(', ')}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl">Travel and leg henna</h2>
            <ul className="m-0 mt-5 list-none space-y-4 p-0 text-sm leading-6 text-henna/85">
              <li>
                <b>Travel fee:</b> {money(travelCharge)} when the artist comes to your location (sample value).{' '}
                <Confirm>travel area and any distance-based charges</Confirm>
              </li>
              <li>
                <b>Leg henna:</b> priced and confirmed on WhatsApp.
              </li>
              <li>
                <b>Final price:</b> can vary with design and detail. The artist confirms it before you pay anything.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl sm:text-3xl">What is included</h2>
        <ul className="m-0 mt-6 grid list-none gap-4 p-0 text-sm leading-6 text-henna/85 md:grid-cols-2">
          <li><Confirm>henna cones and materials included or not</Confirm></li>
          <li><Confirm>how long an appointment usually takes</Confirm></li>
          <li><Confirm>design consultation included or not</Confirm></li>
          <li><Confirm>what is included in the price for touch-ups, if anything</Confirm></li>
        </ul>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link to="/book/bridal" className="btn btn-primary">Bridal booking</Link>
          <Link to="/book/party" className="btn btn-outline">Party</Link>
          <Link to="/book/festive" className="btn btn-outline">Festive</Link>
          <Link to="/book/group" className="btn btn-outline">Group</Link>
        </div>
      </Section>
    </>
  )
}
