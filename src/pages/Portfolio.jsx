import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import WorkImage from '../components/WorkImage'
import Lightbox from '../components/Lightbox'
import { categories, getWorks } from '../data/portfolio'

const chip =
  'inline-flex min-h-11 items-center border px-4 py-2 text-[0.72rem] uppercase tracking-[0.16em] transition-colors cursor-pointer '

export default function Portfolio() {
  const [params, setParams] = useSearchParams()
  const raw = params.get('cat')
  const active = categories.includes(raw) ? raw : 'All'
  const list = getWorks(active)
  const [openIdx, setOpenIdx] = useState(null)

  const setCat = (c) => {
    setOpenIdx(null)
    setParams(c === 'All' ? {} : { cat: c }, { replace: true })
  }

  return (
    <Section>
      <Reveal>
        <SectionHeading
          level={1}
          eyebrow="Portfolio"
          title="Our work"
          intro="These are sample placeholders. Photos of the artist's real work will replace them."
        />
      </Reveal>

      <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter by style">
        {['All', ...categories].map((c) => {
          const on = c === active
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => setCat(c)}
              className={
                chip +
                (on
                  ? 'border-henna bg-henna text-ivory'
                  : 'border-gold/60 bg-transparent text-henna hover:bg-cream')
              }
            >
              {c}
            </button>
          )
        })}
      </div>

      <p className="mt-6 text-sm text-henna/70" aria-live="polite">
        Showing {list.length} {list.length === 1 ? 'design' : 'designs'}
        {active !== 'All' ? ` in ${active}` : ''}
      </p>

      <ul className="m-0 mt-6 grid list-none grid-cols-2 gap-4 p-0 sm:gap-6 lg:grid-cols-3">
        {list.map((w, i) => (
          <li key={w.id}>
            <button
              type="button"
              onClick={() => setOpenIdx(i)}
              aria-label={`Open ${w.title}`}
              className="group block w-full cursor-pointer border-0 bg-transparent p-0 text-left"
            >
              <div className="overflow-hidden border border-transparent transition-colors group-hover:border-gold">
                <WorkImage work={w} />
              </div>
              <span className="mt-3 flex items-baseline justify-between gap-2">
                <span className="font-serif text-lg text-henna sm:text-xl">{w.title}</span>
                <span className="hidden text-[0.68rem] uppercase tracking-[0.16em] text-gold-deep sm:inline">
                  {w.category}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox items={list} index={openIdx} onChange={setOpenIdx} onClose={() => setOpenIdx(null)} />
    </Section>
  )
}
