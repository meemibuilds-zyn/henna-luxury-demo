export default function PageStub({ eyebrow, title, note }) {
  return (
    <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
      <p className="text-xs uppercase tracking-[0.28em] text-gold-deep">{eyebrow}</p>
      <h1 className="mt-4 font-serif text-4xl text-henna sm:text-5xl">{title}</h1>
      <div className="gold-rule mt-8 max-w-xs" />
      <p className="mt-8 max-w-xl text-base leading-7 text-henna/80">
        {note || 'This page is built in a later batch.'}
      </p>
    </section>
  )
}
