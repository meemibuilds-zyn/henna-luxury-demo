import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import WorkImage from './WorkImage'

// Accessible image viewer built on the native <dialog> element:
// focus is trapped, Escape closes it, and focus returns to the thumbnail you tapped.
export default function Lightbox({ items, index, onChange, onClose }) {
  const ref = useRef(null)
  const touchX = useRef(null)
  const open = index !== null && index !== undefined && items.length > 0
  const count = items.length

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const go = (step) => onChange((index + step + count) % count)

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(-1)
    }
  }

  const onTouchStart = (e) => {
    touchX.current = e.changedTouches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current === null || count < 2) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1)
  }

  const work = open ? items[index] : null
  const navBtn =
    'inline-flex h-11 w-11 items-center justify-center border border-gold/60 text-henna transition-colors hover:bg-cream'

  return (
    <dialog
      ref={ref}
      aria-label="Portfolio viewer"
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
      className="m-auto w-[min(94vw,34rem)] max-h-[94vh] overflow-y-auto border border-gold bg-ivory p-0 text-henna backdrop:bg-henna-deep/75"
    >
      {work && (
        <div className="p-4 sm:p-6" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="mb-4 flex items-center justify-between">
            <button type="button" className={navBtn} onClick={onClose} aria-label="Close viewer">
              <X size={20} aria-hidden="true" />
            </button>
            <p className="m-0 text-xs uppercase tracking-[0.2em] text-gold-deep" aria-live="polite">
              {index + 1} / {count}
            </p>
          </div>

          <div
            className="mx-auto"
            style={{ maxWidth: 'min(100%, calc(52vh * 0.8))' }}
          >
            <WorkImage work={work} eager />
          </div>

          <div className="mt-5 text-center">
            <p className="m-0 text-[0.7rem] uppercase tracking-[0.22em] text-gold-deep">{work.category}</p>
            <h2 className="mt-1 text-2xl text-henna">{work.title}</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-henna/80">{work.caption}</p>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button type="button" className={navBtn} onClick={() => go(-1)} aria-label="Previous design" disabled={count < 2}>
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <Link to="/book" className="btn btn-outline">Start a booking</Link>
            <button type="button" className={navBtn} onClick={() => go(1)} aria-label="Next design" disabled={count < 2}>
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}
