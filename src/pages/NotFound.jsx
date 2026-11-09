import { Link } from 'react-router-dom'
import { t } from '../i18n'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-32">
      <p className="text-xs uppercase tracking-[0.28em] text-gold-deep">404</p>
      <h1 className="mt-4 font-serif text-4xl sm:text-5xl">{t('common.notFoundTitle')}</h1>
      <div className="gold-rule-center mx-auto mt-8 max-w-xs" />
      <p className="mt-8 text-henna/80">{t('common.notFoundText')}</p>
      <Link to="/" className="btn btn-primary mt-8">{t('common.backHome')}</Link>
    </section>
  )
}
