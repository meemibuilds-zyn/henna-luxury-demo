import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { waLink } from '../../lib/format'
import { buildMessage, validateDetails, bookingRecord, isDemoNumber, summaryLine, totalParts } from '../../lib/booking'
import { buildICS, downloadICS } from '../../lib/ics'
import { site } from '../../data/site'
import { addBooking, updateBooking } from '../../data/bookingsStore'
import StepTitle from './StepTitle'

const field = 'mt-2 w-full border border-gold/60 bg-ivory px-4 py-3 text-base text-henna'
const lbl = 'block text-sm font-medium text-henna'

function Err({ id, text }) {
  return text ? (
    <p id={id} role="alert" className="mt-2 text-sm text-red-800">
      {text}
    </p>
  ) : null
}

export default function DetailsStep({ S, cfg, c, commit, titleRef }) {
  const f = S.form
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [note, setNote] = useState('')
  const savedId = useRef(null)
  const msgRef = useRef(null)
  const msg = buildMessage(S, cfg, c)

  const setF = (k, v) =>
    commit((n) => {
      n.form[k] = v
    })

  const onDate = (e) => {
    const d = e.target.value.replace(/\D/g, '').slice(0, 8)
    const out = d.length > 4 ? `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}` : d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
    setF('date', out)
  }

  const check = () => {
    const errs = validateDetails(f)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) document.getElementById('f-' + first)?.focus()
    return !first
  }

  const save = () => {
    const rec = bookingRecord(S, cfg, c)
    if (savedId.current) updateBooking(savedId.current, rec)
    else savedId.current = addBooking(rec).id
    setSent(true)
  }

  const onSend = (e) => {
    if (!check()) {
      e.preventDefault()
      return
    }
    save()
  }

  const onCalendar = () => {
    if (!check()) return
    const rec = bookingRecord(S, cfg, c)
    const ics = buildICS({
      title: `Henna appointment (${site.name})`,
      dateISO: rec.eventDate,
      time: rec.eventTime,
      description: [
        summaryLine(S, cfg),
        `Estimated total: ${totalParts(c).big}`,
        'The final price and availability are confirmed by the artist.',
        rec.notes ? `Notes: ${rec.notes}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
      location: S.where === 'visit' ? rec.address : 'Artist location (address to be confirmed)',
      uid: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}@henna-demo`,
    })
    downloadICS(ics)
    setNote('Calendar file downloaded. Open it to add the event. It includes a reminder 1 day before.')
  }

  const onCopy = async () => {
    if (!check()) return
    try {
      await navigator.clipboard.writeText(msg)
      setNote('Message copied. Paste it into WhatsApp.')
    } catch (err) {
      msgRef.current?.select()
      setNote('Select the message above and copy it, then paste it into WhatsApp.')
    }
    save()
  }

  return (
    <>
      <StepTitle titleRef={titleRef} title="Your details" sub="One last step before WhatsApp." />
      <div className="space-y-5">
        <div>
          <label htmlFor="f-name" className={lbl}>Your name</label>
          <input id="f-name" type="text" autoComplete="name" value={f.name} onChange={(e) => setF('name', e.target.value)} className={field} aria-invalid={errors.name ? 'true' : undefined} aria-describedby={errors.name ? 'e-name' : undefined} />
          <Err id="e-name" text={errors.name} />
        </div>
        <div>
          <label htmlFor="f-mobile" className={lbl}>Mobile number</label>
          <input id="f-mobile" type="tel" inputMode="tel" autoComplete="tel" placeholder="07X XXX XXXX" value={f.mobile} onChange={(e) => setF('mobile', e.target.value)} className={field} aria-invalid={errors.mobile ? 'true' : undefined} aria-describedby={errors.mobile ? 'e-mobile' : undefined} />
          <Err id="e-mobile" text={errors.mobile} />
        </div>
        <div>
          <label htmlFor="f-date" className={lbl}>Date of the event</label>
          <input id="f-date" type="text" inputMode="numeric" autoComplete="off" placeholder="DD/MM/YYYY" maxLength={10} value={f.date} onChange={onDate} className={field} aria-invalid={errors.date ? 'true' : undefined} aria-describedby={errors.date ? 'e-date' : undefined} />
          <Err id="e-date" text={errors.date} />
        </div>
        <div>
          <label htmlFor="f-time" className={lbl}>Preferred time</label>
          <input id="f-time" type="time" value={f.time} disabled={f.wa} onChange={(e) => setF('time', e.target.value)} className={field + ' disabled:opacity-50'} aria-invalid={errors.time ? 'true' : undefined} aria-describedby={errors.time ? 'e-time' : undefined} />
          <label className="mt-3 flex cursor-pointer items-center gap-3 text-sm">
            <input type="checkbox" checked={f.wa} onChange={(e) => setF('wa', e.target.checked)} className="h-5 w-5 accent-[#3B2218]" />
            <span>I will discuss the time on WhatsApp</span>
          </label>
          <Err id="e-time" text={errors.time} />
        </div>
        <div>
          <label htmlFor="f-notes" className={lbl}>
            Notes <span className="font-normal text-henna/60">(optional)</span>
          </label>
          <textarea id="f-notes" rows={3} value={f.notes} onChange={(e) => setF('notes', e.target.value)} className={field} />
        </div>
        <div>
          <label htmlFor="f-photoLink" className={lbl}>
            Reference photo link <span className="font-normal text-henna/60">(optional)</span>
          </label>
          <input id="f-photoLink" type="url" inputMode="url" placeholder="https://" value={f.photoLink} onChange={(e) => setF('photoLink', e.target.value)} className={field} />
          <p className="mt-2 text-xs text-henna/70">Paste a link to a design you like. It is added to your message.</p>
        </div>

        <div>
          <label htmlFor="f-msg" className={lbl}>Your message</label>
          <textarea id="f-msg" ref={msgRef} readOnly rows={10} value={msg} className={field + ' text-sm'} />
        </div>

        {isDemoNumber() && (
          <p className="m-0 border border-dashed border-gold bg-cream p-3 text-xs leading-5 text-gold-deep">
            Demo: the artist&apos;s WhatsApp number is not set yet, so WhatsApp will ask you to choose a contact.
          </p>
        )}

        <div className="flex flex-col gap-3">
          <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" onClick={onSend} className="btn btn-wa w-full">
            Send on WhatsApp
          </a>
          <button type="button" onClick={onCopy} className="btn btn-outline w-full">
            Copy message
          </button>
          <button type="button" onClick={onCalendar} className="btn btn-outline w-full">
            Add to calendar
          </button>
        </div>
        {note && <p role="status" className="m-0 text-sm text-henna/80">{note}</p>}
        {sent && (
          <p role="status" className="m-0 border border-gold/40 bg-cream p-3 text-sm leading-6">
            Your booking was added to the demo admin list on this device. <Link to="/admin" className="text-gold-deep underline underline-offset-4">Open the admin demo</Link>
          </p>
        )}
      </div>
    </>
  )
}
