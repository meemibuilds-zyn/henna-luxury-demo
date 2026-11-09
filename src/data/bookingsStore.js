// DEMO BOOKINGS STORE (browser storage only, no real security).
// This file is the single place that reads and writes bookings. When Supabase
// is added later, only this file needs to change.
import { addDays, today, toISO } from '../lib/dates'

const KEY = 'henna-demo-bookings-v1'
let memory = null // fallback when browser storage is blocked

// Sample bookings. seedOffset = days from today, so "tomorrow" is always tomorrow.
const seed = [
  { id: 'seed-1', seedOffset: 1, eventTime: '10:00', name: 'Sample Client A', mobile: '07X XXX XXXX', occasion: 'wedding', summary: 'Bridal: bride, elbow length, 2 sides', total: 48500, location: 'visit', address: 'Sample address', status: 'confirmed', depositPaid: true, notes: 'Sample note: venue has good natural light.' },
  { id: 'seed-2', seedOffset: 1, eventTime: '16:30', name: 'Sample Client B', mobile: '07X XXX XXXX', occasion: 'party', summary: 'Party: 6 guests, stripe and fingers', total: 6600, location: 'studio', address: '', status: 'pending', depositPaid: false, notes: '' },
  { id: 'seed-3', seedOffset: 3, eventTime: '', eventTimeNote: 'Time to be discussed', name: 'Sample Client C', mobile: '07X XXX XXXX', occasion: 'festival', summary: 'Festive: 4 people, wrist length', total: 15200, location: 'studio', address: '', status: 'confirmed', depositPaid: false, notes: '' },
  { id: 'seed-4', seedOffset: 9, eventTime: '09:00', name: 'Sample Client D', mobile: '07X XXX XXXX', occasion: 'group', summary: 'Group: 8 people, mid arm', total: null, location: 'visit', address: 'Sample address', status: 'pending', depositPaid: false, notes: '' },
  { id: 'seed-5', seedOffset: -4, eventTime: '14:00', name: 'Sample Client E', mobile: '07X XXX XXXX', occasion: 'wedding', summary: 'Bridal: bride, bangle length, 1 side', total: 12700, location: 'studio', address: '', status: 'done', depositPaid: true, notes: '' },
]

function read() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    /* storage blocked, use memory */
  }
  return memory
}

function write(list) {
  memory = list
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch (e) {
    /* storage blocked, memory only */
  }
}

function load() {
  let list = read()
  if (!list) {
    const now = new Date().toISOString()
    list = seed.map((s) => ({ ...s, createdAt: now }))
    write(list)
  }
  return list
}

function withDates(list) {
  const t = today()
  return list.map((b) => (b.seedOffset !== undefined ? { ...b, eventDate: toISO(addDays(t, b.seedOffset)) } : b))
}

export function listBookings() {
  return withDates(load()).sort((a, b) =>
    (a.eventDate + (a.eventTime || '99:99')).localeCompare(b.eventDate + (b.eventTime || '99:99')),
  )
}

// data: { name, mobile, eventDate 'YYYY-MM-DD', eventTime, occasion, summary, total, location, address, notes }
export function addBooking(data) {
  const list = load()
  const b = {
    status: 'pending',
    depositPaid: false,
    notes: '',
    ...data,
    id: 'b-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    createdAt: new Date().toISOString(),
  }
  list.push(b)
  write(list)
  return b
}

export function updateBooking(id, patch) {
  const list = load().map((b) => (b.id === id ? { ...b, ...patch } : b))
  write(list)
  return withDates(list).find((b) => b.id === id)
}

export function resetDemoBookings() {
  memory = null
  try {
    localStorage.removeItem(KEY)
  } catch (e) {
    /* ignore */
  }
}

export function bookingsOn(iso) {
  return listBookings().filter((b) => b.eventDate === iso && b.status !== 'done')
}

export function tomorrowsBookings() {
  return bookingsOn(toISO(addDays(today(), 1)))
}
