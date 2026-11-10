export default function StepTitle({ titleRef, eyebrow, title, sub }) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <p className="m-0 mb-2 text-[0.68rem] uppercase tracking-[0.24em] text-gold-deep">{eyebrow}</p>
      )}
      <h2 ref={titleRef} tabIndex={-1} className="scroll-mt-24 text-2xl text-henna outline-none sm:text-3xl">
        {title}
      </h2>
      {sub && <p className="mt-2 text-sm leading-6 text-henna/75">{sub}</p>}
    </div>
  )
}
