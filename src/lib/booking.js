import {
  designs,
  partyDesigns,
  designExtras,
  lengths,
  travelCharge,
  partyMinBudget,
  getUnitPrice,
  getPartyUnitPrice,
} from '../data/pricing'
import { site } from '../data/site'
import { parseDMY, dmyToISO, formatTime, today } from './dates'
import { money } from './format'

const WEDDING_GROUPS = ['bride', 'bridesmaid', 'guest']
const SCOPE_OF = { bride: 'wedding_bride', bridesmaid: 'wedding_bridesmaid', guest: 'wedding_guest' }
const GROUP_LABEL = { bride: 'Bride', bridesmaid: 'Bridesmaids', guest: 'Guests' }
const COUNT_NOUN = { bridesmaid: 'bridesmaids', guest: 'guests' }
export const BODY_LABEL = { hand: 'Hand', leg: 'Leg', both: 'Hand and leg' }
export const MAX_PEOPLE = 200
export const TAIL_KEYS = ['summary', 'terms', 'details']

export const isDemoNumber = () => !/^\d{8,15}$/.test(site.whatsappNumber || '')

export function initialState() {
  return {
    step: null,
    editReturn: false,
    body: null,
    who: { bride: false, bridesmaid: false, guest: false },
    count: {},
    per: {},
    where: null,
    address: '',
    agree: false,
    form: { name: '', mobile: '', date: '', time: '', wa: false, notes: '', photoLink: '' },
  }
}

export const per = (S, g) => S.per[g] || {}
export const groupsOf = (S, cfg) => (cfg.kind === 'wedding' ? WEDDING_GROUPS.filter((g) => S.who[g]) : ['single'])
export const scopeOf = (g, cfg) => (g === 'single' ? cfg.scope : SCOPE_OF[g])
export const groupLabel = (g, cfg) => (g === 'single' ? cfg.lineLabel : GROUP_LABEL[g])
export const countNoun = (g, cfg) => (g === 'single' ? cfg.countNoun : COUNT_NOUN[g])
export const countQuestion = (g, cfg) =>
  g === 'single'
    ? cfg.countQuestion
    : g === 'bridesmaid'
      ? 'How many bridesmaids will have henna?'
      : 'How many guests will have henna?'
export const minCount = (g, cfg) => (g === 'single' ? cfg.minPeople || 1 : 1)
export const minBudget = (cfg) => (cfg.scope === 'party' ? partyMinBudget : 1)
export const qtyOf = (S, g) => (g === 'bride' ? 1 : S.count[g] > 0 ? S.count[g] : 1)
export const lengthLabel = (key) => (lengths.find((l) => l.key === key) || { label: '-' }).label

export function designOptions(g, cfg) {
  const x = designExtras
  if (cfg.scope === 'party') {
    return [
      ...partyDesigns.map((d) => ({ value: d.key, label: d.label })),
      { value: 'budget', label: x.budget.label },
      { value: 'any', label: x.any.label },
    ]
  }
  const o = designs.map((d) => ({ value: d.key, label: d.label }))
  o.push({ value: 'not_decided', label: x.notDecided.label })
  if (g === 'guest') o.push({ value: 'budget', label: x.budget.label }, { value: 'any', label: x.any.label })
  return o
}

export function designLabel(p, g, cfg) {
  const o = designOptions(g, cfg).find((d) => d.value === p.design)
  return o ? o.label : '-'
}

export function flowKeys(S, cfg) {
  const f = []
  if (cfg.kind === 'wedding') {
    f.push('body', 'who')
    if (S.who.bridesmaid) f.push('count:bridesmaid')
    if (S.who.guest) f.push('count:guest')
    groupsOf(S, cfg).forEach((g) => {
      if (S.body !== 'leg') f.push('length:' + g)
      f.push('sides:' + g, 'design:' + g)
      if (per(S, g).design === 'budget') f.push('budget:' + g)
    })
  } else {
    f.push('count:single', 'sides:single', 'length:single', 'design:single')
    if (per(S, 'single').design === 'budget') f.push('budget:single')
  }
  f.push('where', ...TAIL_KEYS)
  return f
}

export function isAnswered(S, key, cfg) {
  const [id, g] = key.split(':')
  const p = per(S, g)
  switch (id) {
    case 'body':
      return !!S.body
    case 'who':
      return S.who.bride || S.who.bridesmaid || S.who.guest
    case 'count':
      return S.count[g] >= minCount(g, cfg)
    case 'length':
      return !!p.length
    case 'sides':
      return !!p.sides || p.designCount > 0
    case 'design':
      return !!p.design
    case 'budget':
      return p.budget >= minBudget(cfg)
    case 'where':
      return !!S.where && (S.where !== 'visit' || (S.address || '').trim().length >= 5)
    default:
      return true
  }
}

export function firstUnanswered(S, cfg) {
  for (const k of flowKeys(S, cfg)) {
    if (TAIL_KEYS.includes(k)) return null
    if (!isAnswered(S, k, cfg)) return k
  }
  return null
}

export function calc(S, cfg) {
  const out = {
    lines: [],
    leg: S.body === 'leg' || S.body === 'both',
    travel: S.where === 'visit' ? travelCharge : 0,
    sum: 0,
    anyKnown: false,
    allKnown: true,
  }
  groupsOf(S, cfg).forEach((g) => {
    const p = per(S, g)
    const qty = qtyOf(S, g)
    const scope = scopeOf(g, cfg)
    const dc = p.designCount > 0 ? p.designCount : 0
    const partyUnits = dc || (p.sides ? qty * p.sides : 0)
    let total = null
    let detail = ''
    let budget = false

    if (p.design === 'budget' && p.budget > 0) {
      const units = cfg.scope === 'party' ? partyUnits : dc || qty
      if (units) {
        total = p.budget * units
        budget = true
        detail = `your budget, ${units} ${units === 1 ? 'design' : 'designs'} x ${money(p.budget)}`
      }
    } else if (S.body !== 'leg' && p.length && p.design && p.design !== 'any') {
      if (cfg.scope === 'party') {
        const u = getPartyUnitPrice(p.length, p.design)
        if (u != null && partyUnits) {
          total = u * partyUnits
          detail = `${partyUnits} ${partyUnits === 1 ? 'design' : 'designs'} x ${money(u)}`
        }
      } else if (dc) {
        const u = getUnitPrice(scope, p.length, 1, p.design)
        if (u != null) {
          total = u * dc
          detail = `${dc} ${dc === 1 ? 'design' : 'designs'} x ${money(u)}`
        }
      } else if (p.sides) {
        const u = getUnitPrice(scope, p.length, p.sides, p.design)
        if (u != null) {
          total = u * qty
          detail = qty > 1 ? `${qty} x ${money(u)}` : ''
        }
      }
    }

    out.lines.push({ g, label: groupLabel(g, cfg), detail, total, budget })
    if (total != null) {
      out.sum += total
      out.anyKnown = true
    } else {
      out.allKnown = false
    }
  })
  if (!out.lines.length) out.allKnown = false
  return out
}

export function totalParts(c) {
  const t = c.sum + c.travel
  if (!c.anyKnown) return { big: 'Price on WhatsApp', note: 'Confirmed by the artist' }
  if (c.allKnown && !c.leg) {
    return { big: money(t), note: c.travel ? 'Includes the travel charge. The artist confirms the final price.' : 'Estimate. The artist confirms the final price.' }
  }
  return { big: money(t), note: 'Plus items priced on WhatsApp. The artist confirms the final price.' }
}

function totalText(c) {
  const p = totalParts(c)
  if (!c.anyKnown) return p.big
  return c.allKnown && !c.leg ? p.big : `${p.big} + items priced on WhatsApp`
}

export function whoText(S) {
  return WEDDING_GROUPS.filter((g) => S.who[g]).map((g) => GROUP_LABEL[g]).join(', ') || '-'
}

export function validMobile(v) {
  return /^(\+94|94|0)\d{9}$/.test(String(v || '').replace(/[\s\-()]/g, ''))
}

export function validateDetails(f) {
  const e = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!validMobile(f.mobile)) e.mobile = 'Enter a valid mobile number, for example 07X XXX XXXX.'
  const d = parseDMY(f.date)
  if (!d) e.date = 'Enter the date as DD/MM/YYYY.'
  else if (d < today()) e.date = 'The date cannot be in the past.'
  if (!f.wa && !f.time) e.time = 'Choose a time, or tick the box to discuss it on WhatsApp.'
  return e
}

export function buildMessage(S, cfg, c) {
  const f = S.form
  const L = [
    `Hello ${site.name} \u{1F44B}`,
    'I would like to book henna.',
    '',
    '*Booking details*',
    `Occasion: ${cfg.occasionLabel}`,
    `Area: ${BODY_LABEL[S.body || 'hand']}`,
  ]
  if (cfg.kind === 'wedding') L.push(`Henna for: ${whoText(S)}`)
  groupsOf(S, cfg).forEach((g) => {
    const p = per(S, g)
    L.push('', `*${groupLabel(g, cfg)}*`)
    if (g !== 'bride') L.push(`Number of ${countNoun(g, cfg)}: ${S.count[g] || '-'}`)
    if (S.body !== 'leg') L.push(`Length: ${lengthLabel(p.length)}`)
    L.push(
      p.designCount > 0 ? `Design count: ${p.designCount}` : `${g === 'bride' ? 'Sides' : 'Sides per person'}: ${p.sides || '-'}`,
      `Design: ${designLabel(p, g, cfg)}`,
    )
    if (p.design === 'budget') L.push(`Budget per design: ${money(p.budget || 0)}`)
  })
  L.push('', '*Location*')
  L.push(S.where === 'visit' ? `My location: ${(S.address || '').trim()}` : "Artist's location (studio)")
  L.push('', '*Estimated price*')
  c.lines.forEach((l) => L.push(`${l.label}${l.detail ? ' (' + l.detail + ')' : ''}: ${l.total != null ? money(l.total) : 'Price on WhatsApp'}`))
  if (c.leg) L.push('Leg henna: Price on WhatsApp')
  if (S.where === 'visit') L.push(`Travel charge: ${money(c.travel)}`)
  L.push(`Total: ${totalText(c)}`, '(The final price is confirmed by the artist.)')
  L.push(
    '',
    '*My details*',
    `Name: ${f.name.trim() || '-'}`,
    `Mobile: ${f.mobile.trim() || '-'}`,
    `Event date: ${f.date || '-'}`,
    `Preferred time: ${f.wa ? 'I will discuss the time on WhatsApp' : formatTime(f.time) || '-'}`,
  )
  if (f.notes.trim()) L.push(`Notes: ${f.notes.trim()}`)
  if (f.photoLink.trim()) L.push(`Reference photo link: ${f.photoLink.trim()}`)
  L.push('', 'I have read and agree to the booking terms.', 'Please confirm the final price and availability. Thank you!')
  return L.join('\n')
}

export function summaryLine(S, cfg) {
  const parts = groupsOf(S, cfg).map((g) => {
    const p = per(S, g)
    const bits = [groupLabel(g, cfg)]
    if (g !== 'bride' && S.count[g]) bits[0] += ` x${S.count[g]}`
    if (S.body !== 'leg' && p.length) bits.push(lengthLabel(p.length))
    if (p.designCount > 0) bits.push(`${p.designCount} ${p.designCount === 1 ? 'design' : 'designs'}`)
    else if (p.sides) bits.push(`${p.sides} ${p.sides === 1 ? 'side' : 'sides'}`)
    return bits.join(', ')
  })
  return `${cfg.shortLabel}: ${parts.join('; ')}`
}

// Shape stored by the demo bookings store (read later by /admin)
export function bookingRecord(S, cfg, c) {
  const f = S.form
  return {
    name: f.name.trim(),
    mobile: f.mobile.trim(),
    eventDate: dmyToISO(f.date),
    eventTime: f.wa ? '' : f.time,
    eventTimeNote: f.wa ? 'Time to be discussed' : '',
    occasion: cfg.occasion,
    summary: summaryLine(S, cfg),
    total: c.allKnown && !c.leg ? c.sum + c.travel : null,
    location: S.where || 'studio',
    address: S.where === 'visit' ? (S.address || '').trim() : '',
    notes: f.notes.trim(),
  }
}
