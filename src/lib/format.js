import { site } from '../data/site'

export function money(n) {
  return `${site.currency} ${Number(n).toLocaleString('en-LK', { maximumFractionDigits: 0 })}`
}

// Opens WhatsApp with a prefilled message. Without a number it opens the
// WhatsApp chooser, so the sender picks the contact.
export function waLink(message, number = site.whatsappNumber) {
  const base = number ? `https://wa.me/${number}` : 'https://wa.me/'
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
