import { useCallback, useEffect, useMemo, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import TomorrowBanner from '../components/admin/TomorrowBanner'
import Availability from '../components/admin/Availability'
import BookingCard from '../components/admin/BookingCard'
import { listBookings, updateBooking, resetDemoBookings, tomorrowsBookings } from '../data/bookingsStore'
import { enableSound, playChime, isSoundOn, soundSupported } from '../lib/chime'
import { formatLong } from '../lib/dates'

const FILTERS = [
  ['all', 'All'],
  ['pending', 'Pending'],
  ['confirmed', 'Confirmed'],
  ['done', 'Done'],
]

export default function Admin() {
  const [bookings, setBookings] = useState(() => listBookings())
  const [filter, setFilter] = useState('all')
  const [day, setDay] = useState(null)
  const [soundOn, setSoundOn] = useState(isSoundOn())
  const [confirmReset, setConfirmReset] = useState(false)

  const refresh = useCallback(() => setBookings(listBookings()), [])

  useEffect(() => {
    window.addEventListener('storage', refresh)
    return () => window.removeEventListener('storage', refresh)
  }, [refresh])

  const tomorrow = useMemo(() => tomorrowsBookings(), [bookings])

  const change = (id, patch) => {
    updateBooking(id, patch)
    refresh()
  }

  const onEnable = async () => {
    const ok = await enableSound()
    setSoundOn(ok)
    if (ok) playChime()
  }

  const onReset = () => {
    resetDemoBookings()
    setConfirmReset(false)
    setDay(null)
    setFilter('all')
    refresh()
  }

  const counts = { all: bookings.length }
  bookings.forEach((b) => {
    counts[b.status] = (counts[b.status] || 0) + 1
  })
  const visible = bookings.filter((b) => (filter === 'all' || b.status === filter) && (!day || b.eventDate === day))

  return (
    <Section>
      <p
        role="note"
        className="m-0 border-2 border-dashed border-gold bg-cream p-4 text-sm font-medium leading-6 text-gold-deep"
      >
        Demo mode, sample data, no real security. Anyone can open this page. Bookings are stored only in this browser.
      </p>

      <div className="mt-10">
        <SectionHeading level={1} eyebrow="Admin demo" title="Bookings" />
      </div>

      <div className="mt-8">
        <TomorrowBanner
          items={tomorrow}
          soundOn={soundOn}
          supported={soundSupported()}
          onEnable={onEnable}
          onChime={playChime}
        />
      </div>

      <div className="mt-12">
        <Availability bookings={bookings} selected={day} onSelect={setDay} />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl sm:text-3xl">All bookings</h2>
        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by status">
          {FILTERS.map(([k, label]) => (
            <button
              key={k}
              type="button"
              aria-pressed={filter === k}
              onClick={() => setFilter(k)}
              className={
                'inline-flex min-h-11 cursor-pointer items-center border px-4 py-2 text-[0.72rem] uppercase tracking-[0.14em] transition-colors ' +
                (filter === k ? 'border-henna bg-henna text-ivory' : 'border-gold/60 bg-transparent text-henna hover:bg-cream')
              }
            >
              {label} ({counts[k] || 0})
            </button>
          ))}
        </div>
        {day && (
          <p className="mt-4 text-sm">
            Showing {formatLong(day)}.{' '}
            <button type="button" onClick={() => setDay(null)} className="cursor-pointer border-0 bg-transparent p-0 text-gold-deep underline underline-offset-4">
              Show all dates
            </button>
          </p>
        )}

        {visible.length === 0 ? (
          <p className="mt-8 text-sm text-henna/75">No bookings match this view.</p>
        ) : (
          <ul className="m-0 mt-6 grid list-none gap-5 p-0 lg:grid-cols-2">
            {visible.map((b) => (
              <BookingCard key={b.id} b={b} onChange={change} />
            ))}
          </ul>
        )}
      </div>

      <div className="mt-14 border-t border-gold/30 pt-8">
        <h2 className="text-2xl">Demo data</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-henna/75">
          Bookings you make on the public booking pages appear here on this device. Reset brings back the original sample
          bookings.
        </p>
        {!confirmReset ? (
          <button type="button" onClick={() => setConfirmReset(true)} className="btn btn-outline mt-4">
            <RotateCcw size={16} aria-hidden="true" /> Reset demo data
          </button>
        ) : (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button type="button" onClick={onReset} className="btn btn-primary">Confirm reset</button>
            <button type="button" onClick={() => setConfirmReset(false)} className="btn btn-outline">Cancel</button>
          </div>
        )}
      </div>
    </Section>
  )
}
