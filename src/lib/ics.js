const pad = (n) => String(n).padStart(2, '0')
const ymd = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
const local = (d) => `${ymd(d)}T${pad(d.getHours())}${pad(d.getMinutes())}00`
const esc = (s) =>
  String(s || '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')

// Lines longer than 75 characters must be folded (RFC 5545)
function fold(line) {
  const out = []
  let rest = line
  while (rest.length > 72) {
    out.push(rest.slice(0, 72))
    rest = ' ' + rest.slice(72)
  }
  out.push(rest)
  return out.join('\r\n')
}

// dateISO 'YYYY-MM-DD'. time 'HH:MM' or '' (then it is an all-day event).
// Times are "floating": they show at the same clock time in the viewer's own time zone.
export function buildICS({ title, dateISO, time, description, location, uid, minutes = 120 }) {
  const [y, m, d] = dateISO.split('-').map(Number)
  const now = new Date()
  const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`
  const L = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Henna Demo//Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
  ]
  if (time) {
    const [hh, mm] = time.split(':').map(Number)
    const start = new Date(y, m - 1, d, hh, mm)
    const end = new Date(start.getTime() + minutes * 60000)
    L.push(`DTSTART:${local(start)}`, `DTEND:${local(end)}`)
  } else {
    L.push(`DTSTART;VALUE=DATE:${ymd(new Date(y, m - 1, d))}`, `DTEND;VALUE=DATE:${ymd(new Date(y, m - 1, d + 1))}`)
  }
  L.push(`SUMMARY:${esc(title)}`)
  if (description) L.push(`DESCRIPTION:${esc(description)}`)
  if (location) L.push(`LOCATION:${esc(location)}`)
  L.push(
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Henna appointment tomorrow',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  )
  return L.map(fold).join('\r\n') + '\r\n'
}

export function downloadICS(text, filename = 'henna-appointment.ics') {
  const blob = new Blob([text], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}
