import { Link } from 'react-router-dom'
import { site } from '../data/site'
import SiteFact from './SiteFact'
import { t } from '../i18n'

const colTitle = 'text-[0.7rem] uppercase tracking-[0.24em] text-gold-deep'
const linkCls = 'text-sm text-henna/80 hover:text-henna'

export default function Footer() {
  return (
    <footer className="border-t border-gold/40 bg-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div>
          <p className="font-serif text-2xl font-semibold">{site.name}</p>
          <p className="mt-2 text-sm text-henna/75">{site.tagline}</p>
        </div>

        <div>
          <h2 className={colTitle + ' font-sans font-medium'}>{t('footer.explore')}</h2>
          <ul className="mt-4 flex list-none flex-col gap-2 p-0">
            <li><Link className={linkCls} to="/portfolio">{t('nav.portfolio')}</Link></li>
            <li><Link className={linkCls} to="/products">{t('nav.products')}</Link></li>
            <li><Link className={linkCls} to="/about">{t('nav.about')}</Link></li>
            <li><Link className={linkCls} to="/book">{t('nav.book')}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className={colTitle + ' font-sans font-medium'}>{t('footer.trust')}</h2>
          <ul className="mt-4 flex list-none flex-col gap-2 p-0">
            <li><Link className={linkCls} to="/process">{t('nav.process')}</Link></li>
            <li><Link className={linkCls} to="/pricing">{t('nav.pricing')}</Link></li>
            <li><Link className={linkCls} to="/policy">{t('footer.policy')}</Link></li>
            <li><Link className={linkCls} to="/expect">{t('footer.expect')}</Link></li>
            <li><Link className={linkCls} to="/aftercare">{t('footer.aftercare')}</Link></li>
            <li><Link className={linkCls} to="/faq">{t('nav.faq')}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className={colTitle + ' font-sans font-medium'}>{t('footer.contact')}</h2>
          <ul className="mt-4 flex list-none flex-col gap-2 p-0 text-sm text-henna/80">
            <li><SiteFact value={site.whatsappDisplay} /></li>
            <li><SiteFact value={site.instagram} /></li>
            <li><SiteFact value={site.email} /></li>
            <li><SiteFact value={site.area} /></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-henna/70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="m-0">{t('footer.demoNotice')}</p>
          <Link className="text-henna/70 underline hover:text-henna" to="/admin">
            {t('footer.admin')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
