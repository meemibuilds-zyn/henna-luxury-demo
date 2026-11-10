import { useId, useState } from 'react'

export default function NumberStep({ label, hint, initial, min = 1, max, fmt, onSubmit }) {
  const id = useId()
  const [val, setVal] = useState(initial ? String(initial) : '')
  const [err, setErr] = useState('')
  const show = (n) => (fmt ? fmt(n) : n)

  const submit = (e) => {
    e.preventDefault()
    const n = Number(val)
    if (!val.trim() || !Number.isInteger(n)) return setErr('Please enter a whole number.')
    if (n < min) return setErr(`The minimum is ${show(min)}.`)
    if (max && n > max) return setErr(`The maximum is ${show(max)}.`)
    setErr('')
    onSubmit(n)
  }

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor={id} className="block text-sm font-medium text-henna">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        value={val}
        onChange={(e) => setVal(e.target.value.replace(/[^\d]/g, ''))}
        aria-invalid={err ? 'true' : undefined}
        aria-describedby={err ? id + '-err' : hint ? id + '-hint' : undefined}
        className="mt-2 w-full border border-gold/60 bg-ivory px-4 py-3 text-lg text-henna"
      />
      {hint && !err && (
        <p id={id + '-hint'} className="mt-2 text-xs text-henna/70">
          {hint}
        </p>
      )}
      {err && (
        <p id={id + '-err'} role="alert" className="mt-2 text-sm text-red-800">
          {err}
        </p>
      )}
      <button type="submit" className="btn btn-primary mt-6 w-full">
        Continue
      </button>
    </form>
  )
}
