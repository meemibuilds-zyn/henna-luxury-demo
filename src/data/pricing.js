// SAMPLE PRICING. Every number here is a placeholder to be confirmed by the artist.
// The booking pages and the Services & Pricing page both read from this file only.

export const SAMPLE_NOTE = 'Sample values, to be confirmed by the artist'

export const lengths = [
  { key: 'palm', label: 'Palm', hint: 'The palm and fingers', festivalParty: true },
  { key: 'wrist', label: 'Wrist', hint: 'Up to the wrist', festivalParty: true },
  { key: 'bangle', label: 'Bangle', hint: 'Up to the bangle line', festivalParty: true },
  { key: 'mid_arm', label: 'Mid arm', hint: 'Up to the middle of the forearm', festivalParty: true },
  { key: 'three_quarter', label: '3-Quarter', hint: 'Three quarters of the way to the elbow', festivalParty: false },
  { key: 'elbow', label: 'Elbow', hint: 'All the way to the elbow', festivalParty: false },
]

export const sides = [1, 2, 3, 4]

// tier controls a sample surcharge: 0 = base, 1 = +15%, 2 = +30%
export const designs = [
  { key: 'khafif', label: 'Khafif (light, modern)', tier: 0 },
  { key: 'gulf_khaleeji', label: 'Gulf-Khaleeji', tier: 0 },
  { key: 'arabic', label: 'Arabic', tier: 1 },
  { key: 'indo_arabic', label: 'Indo-Arabic', tier: 1 },
  { key: 'indian', label: 'Indian floral', tier: 2 },
  { key: 'floral', label: 'Intricate floral', tier: 2 },
  { key: 'moroccan', label: 'Moroccan', tier: 2 },
]

export const partyDesigns = [
  { key: 'stripe_only', label: 'Stripe only' },
  { key: 'stripe_fingers', label: 'Stripe and fingers' },
]

// Extra answers offered on the design step
export const designExtras = {
  notDecided: { key: 'not_decided', label: 'Not decided yet' },
  budget: { key: 'budget', label: 'Based on my budget' },
  any: { key: 'any', label: 'Any design chosen by the guests' },
}

// Who the henna is for. "factor" scales the sample base price.
export const scopes = {
  wedding_bride: { label: 'Bride', who: 'the bride', factor: 1.6 },
  wedding_bridesmaid: { label: 'Bridesmaids', who: 'each bridesmaid', factor: 1.0 },
  wedding_guest: { label: 'Guests', who: 'each guest', factor: 0.85 },
  festival: { label: 'Festive', who: 'each person', factor: 0.9 },
  group: { label: 'Group', who: 'each person', factor: 0.8 },
}

const baseOneSide = { palm: 2500, wrist: 3000, bangle: 3500, mid_arm: 4500, three_quarter: 5500, elbow: 6500 }
const sideFactor = { 1: 1, 2: 1.8, 3: 2.6, 4: 3.4 }
const tierSurcharge = { 0: 0, 1: 0.15, 2: 0.3 }

const partyBase = {
  stripe_only: { palm: 700, wrist: 900, bangle: 1100, mid_arm: 1400 },
  stripe_fingers: { palm: 900, wrist: 1100, bangle: 1300, mid_arm: 1600 },
}

export const travelCharge = 3000 // sample, applies when the artist visits the client
export const partyMinBudget = 500 // sample minimum budget per design for "based on budget"
export const groupMinPeople = 4 // sample minimum for the group page

const round100 = (n) => Math.round(n / 100) * 100

// Price for ONE person (or one design) for hand henna. Returns null if unknown.
export function getUnitPrice(scope, length, sidesCount, design) {
  const sc = scopes[scope]
  const base = baseOneSide[length]
  const sf = sideFactor[sidesCount]
  if (!sc || base == null || sf == null) return null
  const d = designs.find((x) => x.key === design)
  const tier = d ? d.tier : 0 // not decided / budget / any use the base price
  return round100(base * sf * sc.factor * (1 + tierSurcharge[tier]))
}

// Party henna is priced per stripe design. Returns null if unknown.
export function getPartyUnitPrice(length, design) {
  const v = partyBase[design] && partyBase[design][length]
  return v == null ? null : v
}

// Festive and party bookings offer the shorter lengths only
export function lengthsFor(scope) {
  return scope === 'festival' || scope === 'party' ? lengths.filter((l) => l.festivalParty) : lengths
}

// Terms and notes shown before the client confirms. All text is placeholder.
export const bookingTerms = [
  '[ARTIST TO CONFIRM: advance payment amount and whether it is refundable]',
  '[ARTIST TO CONFIRM: rescheduling rules]',
  '[ARTIST TO CONFIRM: cancellation rules]',
  '[ARTIST TO CONFIRM: late arrival and waiting charges]',
  '[ARTIST TO CONFIRM: travel charge rules]',
  'The final price and availability are confirmed by the artist on WhatsApp.',
]

export const bookingNotes = [
  '[ARTIST TO CONFIRM: preparation notes for the client before the appointment]',
  '[ARTIST TO CONFIRM: space and lighting needed at the venue]',
  '[ARTIST TO CONFIRM: anything the artist needs to know in advance]',
]
