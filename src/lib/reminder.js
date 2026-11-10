import { site } from '../data/site'
import { formatLong, formatTime } from './dates'

// Sri Lankan mobile (07X XXX XXXX or +94...) -> digits for wa.me. Returns '' if it is not a real number.
export function clientWaNumber(mobile) {
  const s = String(mobile || '').replace(/[\s\-()+]/g, '')
  if (/^94\d{9}$/.test(s)) return s
  if (/^0\d{9}$/.test(s)) return '94' + s.slice(1)
  return ''
}

export function timeText(b) {
  return b.eventTime ? formatTime(b.eventTime) : b.eventTimeNote || 'Time to be discussed'
}

export function reminderMessage(b) {
  const when = formatLong(b.eventDate) + (b.eventTime ? ` at ${formatTime(b.eventTime)}` : '')
  const L = [
    `Hello ${b.name || ''}`.trim() + ',',
    '',
    `This is a reminder from ${site.name} about your henna appointment on ${when}.`,
  ]
  if (!b.eventTime) L.push('We still need to agree on the time.')
  if (b.summary) L.push(`Booking: ${b.summary}`)
  L.push(b.location === 'visit' ? `Location: ${b.address || 'your location'}` : 'Location: the artist\u2019s studio')
  L.push('', 'Please reply to confirm that the date and time still work for you. Thank you!')
  return L.join('\n')
}
