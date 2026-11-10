import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { formatLong } from '../../lib/dates'
import { money, waLink } from '../../lib/format'
import { clientWaNumber, reminderMessage, timeText } from '../../lib/reminder'

const STATUSES = [
  ['pending', 'Pending'],
  ['confirmed', 'Confirmed'],
  ['done', 'Done'],
]
const OCC = { wedding: 'Bridal', party: 'Party', festival: 'Festive', group: 'Group' }

export default function BookingCard({ b, onChange }) {
  const [notes, setNotes] = useState(b.notes || '')
  useEffect(() => setNotes(b.notes || ''), [b.notes])

  const number = clientWaNumber(b.mobile)
  const href = waLink(reminderMessage(b), number)
  const noteId = 'notes-' + b.id

  return (
    <li className="border border-gold/40 bg-ivory p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="m-0 text-[0.68rem] uppercase tracking-[0.2em] text-gold-deep">
            {OCC[b.occasion] || b.occasion}
          </p>
          <h3 className="m-0 mt-1 text-2xl text-henna">{b.name}</h3>
          <p className="m-0 mt-1 text-sm text-henna/80">
            {formatLong(b.eventDate)} &middot; {timeText(b)}
          </p>
        </div>
        <p className="m-0 text-right font-serif text-xl text-henna">{b.total != null ? money(b.total) : 'Price on WhatsApp'}</p>
      </div>

      <p className="mb-0 mt-3 text-sm leading-6 text-henna/85">{b.summary}</p>
      <p className="mb-0 mt-1 text-xs text-henna/70">
        {b.location === 'visit' ? `At client: ${b.address || '-'}` : 'At the artist\u2019s studio'} &middot; {b.mobile}
      </p>

      <div className="mt-4" role="group" aria-label={`Status for ${b.name}`}>
        <div className="flex flex-wrap gap-2">
          {STATUSES.map(([k, label]) => (
            <button
              key={k}
              type="button"
              aria-pressed={b.status === k}
              onClick={() => onChange(b.id, { status: k })}
              className={
                'inline-flex min-h-11 cursor-pointer items-center border px-4 py-2 text-[0.7rem] uppercase tracking-[0.14em] transition-colors ' +
                (b.status === k ? 'border-henna bg-henna text-ivory' : 'border-gold/60 bg-transparent text-henna hover:bg-cream')
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <label className="mt-4 flex min-h-11 cursor-pointer items-center gap-3 text-sm">
        <input
          type="checkbox"
          role="switch"
          checked={!!b.depositPaid}
          onChange={(e) => onChange(b.id, { depositPaid: e.target.checked })}
          className="h-5 w-5 accent-[#3B2218]"
        />
        <span>Deposit paid</span>
      </label>

      <div className="mt-3">
        <label htmlFor={noteId} className="block text-xs uppercase tracking-[0.14em] text-gold-deep">
          Notes
        </label>
        <textarea
          id={noteId}
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={() => notes !== (b.notes || '') && onChange(b.id, { notes })}
          placeholder="Add a note"
          className="mt-1 w-full border border-gold/50 bg-ivory px-3 py-2 text-sm text-henna"
        />
      </div>

      <div className="mt-4">
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-wa w-full sm:w-auto">
          <MessageCircle size={16} aria-hidden="true" /> Send reminder
        </a>
        {!number && (
          <p className="mb-0 mt-2 text-xs text-henna/65">
            This client has a sample number, so WhatsApp will ask you to choose a contact.
          </p>
        )}
      </div>
    </li>
  )
}
