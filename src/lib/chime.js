// A soft three-note chime made with the Web Audio API. No audio files.
// Browsers only allow sound after a tap, so enableSound() must be called from a button press.
let ctx = null

const AC = () => (typeof window !== 'undefined' ? window.AudioContext || window.webkitAudioContext : null)

export const soundSupported = () => !!AC()

export const isSoundOn = () => !!ctx && ctx.state === 'running'

export async function enableSound() {
  const Ctor = AC()
  if (!Ctor) return false
  if (!ctx) ctx = new Ctor()
  if (ctx.state === 'suspended') {
    try {
      await ctx.resume()
    } catch (e) {
      return false
    }
  }
  return ctx.state === 'running'
}

export function playChime() {
  if (!isSoundOn()) return false
  const now = ctx.currentTime
  const notes = [
    [659.25, 0],
    [830.61, 0.2],
    [987.77, 0.4],
  ]
  notes.forEach(([freq, delay]) => {
    ;[
      [freq, 0.22],
      [freq * 2, 0.06],
    ].forEach(([f, peak]) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = f
      gain.gain.setValueAtTime(0.0001, now + delay)
      gain.gain.exponentialRampToValueAtTime(peak, now + delay + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 1.4)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now + delay)
      osc.stop(now + delay + 1.5)
    })
  })
  return true
}
