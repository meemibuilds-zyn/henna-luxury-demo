import { Link } from 'react-router-dom'
import TrustPage from '../components/TrustPage'
import StepList from '../components/StepList'
import { t } from '../i18n'

export default function Process() {
  return (
    <TrustPage eyebrow={t('trust.process.eyebrow')} title={t('trust.process.title')} intro={t('trust.process.intro')}>
      <StepList steps={t('trust.process.steps')} youLabel={t('trust.process.youLabel')} />
      <p className="mt-8 text-sm text-henna/80">
        Also see <Link className="text-gold-deep underline underline-offset-4" to="/expect">what to expect on the day</Link>{' '}
        and the <Link className="text-gold-deep underline underline-offset-4" to="/aftercare">aftercare guide</Link>.
      </p>
    </TrustPage>
  )
}
