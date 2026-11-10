import { useRef } from 'react'
import { Check } from 'lucide-react'

// Big tappable choices built on real radio / checkbox inputs (keyboard and screen reader friendly).
// onPick(value, byPointer): byPointer is false for keyboard use, so keyboard users are never auto-advanced.
export default function OptionList({ label, name, options, value, onPick, type = 'radio' }) {
  const keyboard = useRef(false)
  const isOn = (v) => (type === 'checkbox' ? (value || []).includes(v) : String(value ?? '') === String(v))

  return (
    <div
      role={type === 'radio' ? 'radiogroup' : 'group'}
      aria-label={label}
      className="flex flex-col gap-3"
      onKeyDown={() => {
        keyboard.current = true
      }}
      onPointerDown={() => {
        keyboard.current = false
      }}
    >
      {options.map((o) => (
        <label key={o.value} className="block cursor-pointer">
          <input
            type={type}
            name={name}
            className="peer sr-only"
            checked={isOn(o.value)}
            onChange={() => {}}
            onClick={() => onPick(o.value, !keyboard.current)}
          />
          <span className="flex min-h-14 items-center justify-between gap-3 border border-gold/50 bg-ivory px-4 py-3 transition-colors hover:border-gold peer-checked:border-henna peer-checked:bg-cream peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-deep peer-checked:[&_.mark]:opacity-100">
            <span>
              <span className="block text-[0.95rem] font-medium text-henna">{o.label}</span>
              {o.hint && <span className="block text-xs text-henna/70">{o.hint}</span>}
            </span>
            <Check size={18} aria-hidden="true" className="mark shrink-0 text-gold-deep opacity-0" />
          </span>
        </label>
      ))}
    </div>
  )
}
