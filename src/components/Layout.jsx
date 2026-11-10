import { Suspense, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import { titleFor } from '../lib/titles'
import { t } from '../i18n'

export default function Layout() {
  const { pathname } = useLocation()
  const first = useRef(true)

  // Each page gets its own title, and focus moves to the page after you navigate (for screen readers)
  useEffect(() => {
    const title = titleFor(pathname)
    if (title) document.title = title
    if (first.current) {
      first.current = false
      return
    }
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">{t('common.skip')}</a>
      <ScrollToTop />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
            <Outlet />
          </Suspense>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
