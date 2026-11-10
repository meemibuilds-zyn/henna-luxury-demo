import TrustPage from '../components/TrustPage'
import Confirm from '../components/Confirm'
import { t } from '../i18n'

export default function Aftercare() {
  const sections = t('trust.aftercare.sections')
  return (
    <TrustPage eyebrow={t('trust.aftercare.eyebrow')} title={t('trust.aftercare.title')} intro={t('trust.aftercare.intro')}>
      <p className="mt-8 max-w-2xl border border-dashed border-gold bg-cream p-4 text-sm leading-6 text-gold-deep">
        {t('trust.aftercare.notice')}
      </p>
      <div className="mt-10 max-w-3xl divide-y divide-gold/30 border-y border-gold/30">
        {sections.map((s) => (
          <section key={s.title} className="py-7">
            <h2 className="text-2xl text-henna sm:text-3xl">{s.title}</h2>
            <p className="mt-3 text-sm">
              <Confirm>{s.confirm}</Confirm>
            </p>
          </section>
        ))}
      </div>
    </TrustPage>
  )
}
