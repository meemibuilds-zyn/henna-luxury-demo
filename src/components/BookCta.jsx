import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { site } from '../data/site'
import { waLink } from '../lib/format'
import { t } from '../i18n'

export default function BookCta() {
  return (
    <section className="bg-henna text-ivory" aria-labelledby="bookcta-h">
      <div className="mx-auto max-w-6xl px-5 py-14 text-center sm:px-8">
        <h2 id="bookcta-h" className="text-3xl text-ivory sm:text-4xl">{t('trust.cta.title')}</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ivory/80">{t('trust.cta.text')}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/book"
            className="inline-flex min-h-11 items-center border border-gold bg-ivory px-6 py-2 text-[0.75rem] uppercase tracking-[0.16em] text-henna no-underline hover:bg-cream"
          >
            {t('trust.cta.book')}
          </Link>
          <a
            href={waLink(`Hello ${site.name}, I have a question before booking.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 border border-gold px-6 py-2 text-[0.75rem] uppercase tracking-[0.16em] text-ivory no-underline hover:bg-ivory hover:text-henna"
          >
            <MessageCircle size={16} aria-hidden="true" /> {t('trust.cta.ask')}
          </a>
        </div>
      </div>
    </section>
  )
}
