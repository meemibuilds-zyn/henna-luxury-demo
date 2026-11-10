import TrustPage from '../components/TrustPage'
import StepList from '../components/StepList'
import { t } from '../i18n'

export default function Expect() {
  return (
    <TrustPage eyebrow={t('trust.expect.eyebrow')} title={t('trust.expect.title')} intro={t('trust.expect.intro')}>
      <StepList steps={t('trust.expect.steps')} youLabel={t('trust.expect.youLabel')} />
    </TrustPage>
  )
}
