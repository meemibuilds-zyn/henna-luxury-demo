import { addDays, today, toISO } from '../../lib/dates'

const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const mo = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function Availability({ bookings, selected, onSelect }) {
  const start = today()
  const counts = {}
  bookings.forEach((b) => {
    if (b.status !== 'done') counts[b.eventDate] = (counts[b.eventDate] || 0) + 1
  })
  const days = Array.from({ length: 14 }, (_, i) => addDays(start, i))

  return (
    <section aria-labelledby="avail-h">
      <h2 id="avail-h" className="text-2xl sm:text-3xl">Availability</h2>
      <p className="mt-2 text-sm text-henna/75">
        The next 14 days, based on the bookings in this demo. Tap a day to list its bookings.
      </p>
      <ul className="m-0 mt-5 grid list-none grid-cols-4 gap-2 p-0 sm:grid-cols-7">
        {days.map((d, i) => {
          const iso = toISO(d)
          const n = counts[iso] || 0
          const on = selected === iso
          const label = `${wd[d.getDay()]} ${d.getDate()} ${mo[d.getMonth()]}, ${n === 0 ? 'free' : n + (n === 1 ? ' booking' : ' bookings')}`
          return (
            <li key={iso}>
              <button
                type="button"
                aria-pressed={on}
                aria-label={label}
                onClick={() => onSelect(on ? null : iso)}
                className={
                  'w-full cursor-pointer border px-2 py-3 text-center transition-colors ' +
                  (on ? 'border-henna bg-henna text-ivory' : n > 0 ? 'border-gold bg-cream text-henna hover:bg-sand/60' : 'border-gold/40 bg-ivory text-henna hover:bg-cream')
                }
              >
                <span className="block text-[0.65rem] uppercase tracking-[0.16em] opacity-80">
                  {i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : wd[d.getDay()]}
                </span>
                <span className="block font-serif text-2xl leading-tight">{d.getDate()}</span>
                <span className="block text-[0.65rem] uppercase tracking-[0.12em] opacity-80">{mo[d.getMonth()]}</span>
                <span className="mt-1 block text-xs">{n === 0 ? 'Free' : `${n} booked`}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
