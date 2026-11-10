import { totalParts } from '../../lib/booking'

export default function PriceBar({ c, final = false }) {
  const p = totalParts(c)
  const empty = !c.anyKnown && !final
  return (
    <div
      className="sticky bottom-0 z-30 flex items-center justify-between gap-4 border-t border-gold bg-ivory/95 px-5 py-3 backdrop-blur"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div>
        <p className="m-0 text-[0.68rem] uppercase tracking-[0.2em] text-gold-deep">Estimated total</p>
        <p className="m-0 max-w-[13rem] text-xs leading-4 text-henna/70">
          {empty ? 'Your estimate appears as you choose.' : p.note}
        </p>
      </div>
      <p className="m-0 text-right font-serif text-2xl leading-tight text-henna" aria-live="polite">
        {empty ? '\u2014' : p.big}
      </p>
    </div>
  )
}
