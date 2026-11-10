import { ChevronDown } from 'lucide-react'
import TrustPage from '../components/TrustPage'
import Confirm from '../components/Confirm'
import { t } from '../i18n'

export default function Faq() {
  const items = t('trust.faq.items')
  return (
    <TrustPage eyebrow={t('trust.faq.eyebrow')} title={t('trust.faq.title')} intro={t('trust.faq.intro')}>
      <div className="mt-10 max-w-3xl border-t border-gold/30">
        {items.map((it) => (
          <details key={it.q} className="group border-b border-gold/30">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-serif text-xl text-henna sm:text-2xl [&::-webkit-details-marker]:hidden">
              <span>{it.q}</span>
              <ChevronDown size={20} aria-hidden="true" className="shrink-0 text-gold-deep transition-transform group-open:rotate-180" />
            </summary>
            <div className="pb-6 text-sm leading-7 text-henna/85">
              {it.a && <p className="m-0">{it.a}</p>}
              {it.confirm && (
                <p className={it.a ? 'mb-0 mt-3' : 'm-0'}>
                  <Confirm>{it.confirm}</Confirm>
                </p>
              )}
            </div>
          </details>
        ))}
      </div>
    </TrustPage>
  )
}
