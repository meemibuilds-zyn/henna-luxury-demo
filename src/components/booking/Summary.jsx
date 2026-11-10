import { bookingTerms, bookingNotes } from '../../data/pricing'
import { money } from '../../lib/format'
import {
  BODY_LABEL,
  whoText,
  groupsOf,
  per,
  groupLabel,
  countNoun,
  lengthLabel,
  designLabel,
  totalParts,
} from '../../lib/booking'
import StepTitle from './StepTitle'

function buildRows(S, cfg) {
  const r = [{ label: 'Occasion', value: cfg.occasionLabel }]
  if (cfg.kind === 'wedding') {
    r.push({ label: 'Area', value: BODY_LABEL[S.body] || '-', edit: 'body' })
    r.push({ label: 'Henna for', value: whoText(S), edit: 'who' })
  }
  groupsOf(S, cfg).forEach((g) => {
    const p = per(S, g)
    if (cfg.kind === 'wedding') r.push({ head: groupLabel(g, cfg) })
    if (g !== 'bride') r.push({ label: `Number of ${countNoun(g, cfg)}`, value: String(S.count[g] || '-'), edit: 'count:' + g })
    if (S.body !== 'leg') r.push({ label: 'Length', value: lengthLabel(p.length), edit: 'length:' + g })
    r.push(
      p.designCount > 0
        ? { label: 'Design count', value: String(p.designCount), edit: 'sides:' + g }
        : { label: g === 'bride' ? 'Sides' : 'Sides per person', value: String(p.sides || '-'), edit: 'sides:' + g },
    )
    r.push({ label: 'Design', value: designLabel(p, g, cfg), edit: 'design:' + g })
    if (p.design === 'budget') r.push({ label: 'Budget per design', value: money(p.budget || 0), edit: 'budget:' + g })
  })
  r.push({ label: 'Location', value: S.where === 'visit' ? 'My location' : "Artist's location", edit: 'where' })
  if (S.where === 'visit') r.push({ label: 'Address', value: (S.address || '').trim(), edit: 'where' })
  return r
}

export function Summary({ S, cfg, c, onEdit, onContinue, titleRef }) {
  const rows = buildRows(S, cfg)
  const t = totalParts(c)
  return (
    <>
      <StepTitle titleRef={titleRef} title="Review your booking" sub="Check everything, then continue." />
      <ul className="m-0 list-none p-0">
        {rows.map((r, i) =>
          r.head ? (
            <li key={i} className="pb-1 pt-5 text-[0.7rem] uppercase tracking-[0.22em] text-gold-deep">
              {r.head}
            </li>
          ) : (
            <li key={i} className="flex items-start justify-between gap-4 border-b border-gold/20 py-3">
              <span className="min-w-0">
                <span className="block text-xs text-henna/65">{r.label}</span>
                <span className="block break-words text-sm font-medium text-henna">{r.value}</span>
              </span>
              {r.edit && (
                <button
                  type="button"
                  onClick={() => onEdit(r.edit)}
                  aria-label={`Change ${r.label}`}
                  className="shrink-0 cursor-pointer border-0 bg-transparent p-2 text-xs uppercase tracking-[0.14em] text-gold-deep underline underline-offset-4"
                >
                  Change
                </button>
              )}
            </li>
          ),
        )}
      </ul>

      <div className="mt-6 border border-gold/40 bg-cream p-4">
        <h3 className="m-0 text-xl text-henna">Estimated price</h3>
        <ul className="m-0 mt-3 list-none space-y-2 p-0 text-sm">
          {c.lines.map((l) => (
            <li key={l.g} className="flex justify-between gap-4">
              <span>
                {l.label}
                {l.detail ? <span className="block text-xs text-henna/65">{l.detail}</span> : null}
              </span>
              <span className="text-right">{l.total != null ? money(l.total) : 'Price on WhatsApp'}</span>
            </li>
          ))}
          {c.leg && (
            <li className="flex justify-between gap-4">
              <span>Leg henna</span>
              <span>Price on WhatsApp</span>
            </li>
          )}
          {S.where === 'visit' && (
            <li className="flex justify-between gap-4">
              <span>Travel charge</span>
              <span>{money(c.travel)}</span>
            </li>
          )}
          <li className="flex justify-between gap-4 border-t border-gold/40 pt-3 font-medium">
            <span>Total</span>
            <span className="text-right">{t.big}</span>
          </li>
        </ul>
        <p className="mb-0 mt-3 text-xs text-henna/70">
          Sample prices. {t.note} Designs not yet chosen are estimated at the lightest style.
        </p>
      </div>

      <button type="button" className="btn btn-primary mt-6 w-full" onClick={onContinue}>
        Continue
      </button>
    </>
  )
}

export function TermsStep({ S, commit, titleRef }) {
  return (
    <>
      <StepTitle titleRef={titleRef} title="Booking terms" sub="Please read these before you continue." />
      <div
        tabIndex={0}
        aria-label="Booking terms and appointment notes"
        className="max-h-72 overflow-y-auto border border-gold/40 bg-cream p-4 text-sm leading-6 text-henna/90"
      >
        <h3 className="m-0 text-xl">Terms and conditions</h3>
        <ul className="mt-2 pl-5">
          {bookingTerms.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <h3 className="m-0 mt-4 text-xl">Before your appointment</h3>
        <ul className="mt-2 pl-5">
          {bookingNotes.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
      <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm">
        <input
          type="checkbox"
          checked={!!S.agree}
          onChange={(e) =>
            commit((n) => {
              n.agree = e.target.checked
            })
          }
          className="mt-1 h-5 w-5 accent-[#3B2218]"
        />
        <span>I have read and agree to the booking terms.</span>
      </label>
      <button
        type="button"
        className="btn btn-primary mt-6 w-full"
        disabled={!S.agree}
        onClick={() =>
          commit((n) => {
            n.step = 'details'
          })
        }
      >
        Continue
      </button>
    </>
  )
}
