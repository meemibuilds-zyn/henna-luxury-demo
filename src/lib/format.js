import { site } from '../data/site'

export function money(n) {
  return `${site.currency} ${Number(n).toLocaleString('en-LK', { maximumFractionDigits: 0 })}`
}

// Opens WhatsApp with a prefilled message. While the number is still a
// placeholder, it opens WhatsApp's contact chooser so the sender picks who to message.
export function waLink(message, number = site.whatsappNumber) {
  const valid = /^\d{8,15}$/.test(number || '')
  const base = valid ? `https://wa.me/${number}` : 'https://wa.me/'
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
