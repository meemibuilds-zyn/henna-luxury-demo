import TrustPage from '../components/TrustPage'
import Confirm from '../components/Confirm'
import { t } from '../i18n'

export default function Policy() {
  const sections = t('trust.policy.sections')
  return (
    <TrustPage eyebrow={t('trust.policy.eyebrow')} title={t('trust.policy.title')} intro={t('trust.policy.intro')}>
      <p className="mt-8 max-w-2xl border border-dashed border-gold bg-cream p-4 text-sm leading-6 text-gold-deep">
        {t('trust.policy.notice')}
      </p>
      <div className="mt-10 max-w-3xl divide-y divide-gold/30 border-y border-gold/30">
        {sections.map((s) => (
          <section key={s.title} className="py-7" aria-labelledby={'pol-' + s.title.replace(/\s+/g, '-')}>
            <h2 id={'pol-' + s.title.replace(/\s+/g, '-')} className="text-2xl text-henna sm:text-3xl">{s.title}</h2>
            {s.text && <p className="mt-3 text-sm leading-7 text-henna/85">{s.text}</p>}
            {s.confirm && (
              <p className="mt-3 text-sm">
                <Confirm>{s.confirm}</Confirm>
              </p>
            )}
          </section>
        ))}
      </div>
      <p className="mt-8 text-sm text-henna/80">
        Last updated: <Confirm>{t('trust.policy.updated')}</Confirm>
      </p>
    </TrustPage>
  )
}
