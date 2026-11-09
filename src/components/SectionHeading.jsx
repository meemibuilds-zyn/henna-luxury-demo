export default function SectionHeading({ eyebrow, title, intro, center = false, id, level = 2 }) {
  const Tag = level === 1 ? 'h1' : 'h2'
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className="text-xs uppercase tracking-[0.28em] text-gold-deep">{eyebrow}</p>}
      <Tag id={id} className="mt-3 text-3xl text-henna sm:text-4xl">
        {title}
      </Tag>
      <div className={(center ? 'gold-rule-center mx-auto' : 'gold-rule') + ' mt-6 max-w-[10rem]'} />
      {intro && <p className="mt-6 text-base leading-7 text-henna/80">{intro}</p>}
    </div>
  )
}
