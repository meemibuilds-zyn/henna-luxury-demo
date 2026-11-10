import Confirm from './Confirm'

export default function StepList({ steps, youLabel }) {
  return (
    <ol className="m-0 mt-12 list-none divide-y divide-gold/30 border-y border-gold/30 p-0">
      {steps.map((s) => (
        <li key={s.n} className="grid gap-4 py-8 sm:grid-cols-[5rem_1fr] sm:gap-8">
          <span className="font-serif text-5xl leading-none text-gold">{s.n}</span>
          <div>
            <h2 className="text-2xl text-henna sm:text-3xl">{s.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-henna/85">{s.text}</p>
            {s.you && (
              <p className="mt-3 max-w-2xl text-sm leading-7 text-henna/85">
                <b className="font-medium text-henna">{youLabel}:</b> {s.you}
              </p>
            )}
            {s.confirm && (
              <p className="mt-3 text-sm">
                <Confirm>{s.confirm}</Confirm>
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
