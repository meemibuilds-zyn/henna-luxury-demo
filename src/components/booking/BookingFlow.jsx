import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { lengthsFor, sides as SIDES } from '../../data/pricing'
import { money } from '../../lib/format'
import {
  initialState,
  flowKeys,
  firstUnanswered,
  isAnswered,
  calc,
  per,
  groupLabel,
  countQuestion,
  countNoun,
  minCount,
  minBudget,
  designOptions,
  MAX_PEOPLE,
  TAIL_KEYS,
} from '../../lib/booking'
import OptionList from './OptionList'
import NumberStep from './NumberField'
import HandLengthPicker from './HandLengthPicker'
import PriceBar from './PriceBar'
import StepTitle from './StepTitle'
import { Summary, TermsStep } from './Summary'
import DetailsStep from './DetailsStep'

const REDUCED = typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const P = (n, g) => (n.per[g] ||= {})

function Continue({ ok, onClick }) {
  return (
    <button type="button" className="btn btn-primary mt-6 w-full" disabled={!ok} onClick={onClick}>
      Continue
    </button>
  )
}

function SidesStep({ S, g, cfg, commit, pick, titleRef, eyebrow }) {
  const p = per(S, g)
  const canDc = g !== 'bride'
  const [dc, setDc] = useState(p.designCount > 0)
  const opts = SIDES.map((n) => ({ value: String(n), label: `${n} ${n === 1 ? 'side' : 'sides'}` }))
  if (canDc) opts.push({ value: 'dc', label: 'Or enter a number of designs', hint: 'Type how many designs you need' })

  return (
    <>
      <StepTitle
        titleRef={titleRef}
        eyebrow={eyebrow}
        title={g === 'bride' ? 'How many sides?' : 'How many sides per person?'}
        sub="Each side is the front or back of one hand."
      />
      <OptionList
        label="Number of sides"
        name={'sides-' + g}
        options={opts}
        value={dc ? 'dc' : p.sides}
        onPick={(v, byPointer) => {
          if (v === 'dc') return setDc(true)
          setDc(false)
          pick((n, val) => {
            const q = P(n, g)
            q.sides = Number(val)
            delete q.designCount
          })(v, byPointer)
        }}
      />
      {dc ? (
        <div className="mt-6">
          <NumberStep
            label="Number of designs"
            initial={p.designCount}
            min={1}
            max={50}
            onSubmit={(v) =>
              commit((n) => {
                const q = P(n, g)
                q.designCount = v
                delete q.sides
              }, true)
            }
          />
        </div>
      ) : (
        <Continue ok={!!p.sides} onClick={() => commit(() => {}, true)} />
      )}
    </>
  )
}

export default function BookingFlow({ cfg }) {
  const [S, setS] = useState(initialState)
  const titleRef = useRef(null)
  const mounted = useRef(false)
  const timer = useRef(null)

  const keys = flowKeys(S, cfg)
  const cur = S.step && keys.includes(S.step) ? S.step : keys[0]
  const idx = keys.indexOf(cur)
  const [id, g] = cur.split(':')
  const p = per(S, g)
  const c = calc(S, cfg)
  const qn = keys.length - TAIL_KEYS.length
  const eyebrow = cfg.kind === 'wedding' && g ? groupLabel(g, cfg) : null

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    const t = titleRef.current
    if (t) {
      t.focus({ preventScroll: true })
      t.scrollIntoView({ block: 'start', behavior: REDUCED ? 'auto' : 'smooth' })
    }
  }, [cur])

  useEffect(() => () => clearTimeout(timer.current), [])

  const commit = (fn, advance = false) =>
    setS((prev) => {
      const n = structuredClone(prev)
      fn(n)
      if (advance) {
        const ks = flowKeys(n, cfg)
        const c0 = n.step && ks.includes(n.step) ? n.step : ks[0]
        if (isAnswered(n, c0, cfg)) {
          if (n.editReturn) {
            const fu = firstUnanswered(n, cfg)
            n.step = fu || 'summary'
            if (!fu) n.editReturn = false
          } else {
            n.step = ks[Math.min(ks.indexOf(c0) + 1, ks.length - 1)]
          }
        }
      }
      return n
    })

  // Choice steps: select, then move on after a short pause when tapped (not when using the keyboard)
  const pick = (fn) => (value, byPointer) => {
    commit((n) => fn(n, value))
    if (byPointer) {
      clearTimeout(timer.current)
      timer.current = setTimeout(() => commit(() => {}, true), REDUCED ? 0 : 180)
    }
  }

  const back = () =>
    setS((prev) => {
      const ks = flowKeys(prev, cfg)
      const c0 = prev.step && ks.includes(prev.step) ? prev.step : ks[0]
      return { ...prev, editReturn: false, step: ks[Math.max(0, ks.indexOf(c0) - 1)] }
    })

  const edit = (key) => setS((prev) => ({ ...prev, step: key, editReturn: true }))
  const next = () => commit(() => {}, true)

  const progress =
    id === 'summary' ? 'Review' : id === 'terms' ? 'Booking terms' : id === 'details' ? 'Your details' : `Step ${idx + 1} of ${qn}`
  const pct = Math.round(((idx + 1) / keys.length) * 100)
  const iconBtn =
    'inline-flex h-11 w-11 shrink-0 items-center justify-center border border-gold/50 text-henna hover:bg-cream'

  let body = null
  switch (id) {
    case 'body':
      body = (
        <>
          <StepTitle titleRef={titleRef} title="Where would you like your henna?" sub="Choose the area for the henna." />
          <OptionList
            label="Henna area"
            name="body"
            value={S.body}
            onPick={pick((n, v) => {
              n.body = v
            })}
            options={[
              { value: 'hand', label: 'Hand', hint: 'Palm and arm' },
              { value: 'leg', label: 'Leg' },
              { value: 'both', label: 'Hand and leg' },
            ]}
          />
          <p className="mt-5 border border-gold/30 bg-cream p-3 text-sm leading-6">
            Hand henna is estimated here. Leg henna is priced and confirmed on WhatsApp.
          </p>
          <Continue ok={!!S.body} onClick={next} />
        </>
      )
      break

    case 'who':
      body = (
        <>
          <StepTitle
            titleRef={titleRef}
            title="Who is the henna for?"
            sub="Select everyone who will have henna. You can choose more than one."
          />
          <OptionList
            type="checkbox"
            label="Who is the henna for"
            name="who"
            value={Object.keys(S.who).filter((k) => S.who[k])}
            onPick={(v) =>
              commit((n) => {
                n.who[v] = !n.who[v]
              })
            }
            options={[
              { value: 'bride', label: 'Bride' },
              { value: 'bridesmaid', label: 'Bridesmaids' },
              { value: 'guest', label: 'Guests' },
            ]}
          />
          <Continue ok={isAnswered(S, 'who', cfg)} onClick={next} />
        </>
      )
      break

    case 'count':
      body = (
        <>
          <StepTitle
            titleRef={titleRef}
            eyebrow={eyebrow}
            title={countQuestion(g, cfg)}
            sub={`Enter the number of ${countNoun(g, cfg)}.`}
          />
          <NumberStep
            label={`Number of ${countNoun(g, cfg)}`}
            hint={minCount(g, cfg) > 1 ? `The minimum is ${minCount(g, cfg)}.` : undefined}
            initial={S.count[g]}
            min={minCount(g, cfg)}
            max={MAX_PEOPLE}
            onSubmit={(v) =>
              commit((n) => {
                n.count[g] = v
              }, true)
            }
          />
        </>
      )
      break

    case 'length': {
      const opts = lengthsFor(cfg.scope || 'wedding').map((l) => ({ value: l.key, label: l.label, hint: l.hint }))
      body = (
        <>
          <StepTitle
            titleRef={titleRef}
            eyebrow={eyebrow}
            title="How far should the henna go?"
            sub="Watch the guide as you choose."
          />
          <div className="grid grid-cols-[6.5rem_1fr] items-start gap-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <HandLengthPicker value={p.length} className="w-full" />
            <OptionList
              label="Henna length"
              name={'length-' + g}
              value={p.length}
              options={opts}
              onPick={(v) =>
                commit((n) => {
                  P(n, g).length = v
                })
              }
            />
          </div>
          <Continue ok={!!p.length} onClick={next} />
        </>
      )
      break
    }

    case 'sides':
      body = <SidesStep S={S} g={g} cfg={cfg} commit={commit} pick={pick} titleRef={titleRef} eyebrow={eyebrow} />
      break

    case 'design':
      body = (
        <>
          <StepTitle titleRef={titleRef} eyebrow={eyebrow} title="Which design type do you prefer?" />
          <OptionList
            label="Design type"
            name={'design-' + g}
            value={p.design}
            options={designOptions(g, cfg)}
            onPick={pick((n, v) => {
              const q = P(n, g)
              q.design = v
              if (v !== 'budget') delete q.budget
            })}
          />
          <Continue ok={!!p.design} onClick={next} />
        </>
      )
      break

    case 'budget':
      body = (
        <>
          <StepTitle
            titleRef={titleRef}
            eyebrow={eyebrow}
            title="What is your budget per design?"
            sub={`Enter the amount for one design in LKR. The minimum is ${money(minBudget(cfg))}. The artist will suggest what fits on WhatsApp.`}
          />
          <NumberStep
            label="Budget per design (LKR)"
            initial={p.budget}
            min={minBudget(cfg)}
            fmt={money}
            onSubmit={(v) =>
              commit((n) => {
                P(n, g).budget = v
              }, true)
            }
          />
        </>
      )
      break

    case 'where':
      body = (
        <>
          <StepTitle titleRef={titleRef} title="Where would you like to host your henna session?" />
          <OptionList
            label="Session location"
            name="where"
            value={S.where}
            onPick={(v) =>
              commit((n) => {
                n.where = v
              })
            }
            options={[
              { value: 'studio', label: "Artist's location", hint: 'Visit the artist at their studio' },
              { value: 'visit', label: 'My location', hint: 'The artist comes to you. A travel charge is added.' },
            ]}
          />
          {S.where === 'studio' && (
            <div className="mt-5 border border-gold/30 bg-cream p-4 text-sm leading-6">
              <h3 className="m-0 text-xl">Artist&apos;s location</h3>
              <p className="mb-0 mt-2">[ARTIST TO CONFIRM: studio address]</p>
            </div>
          )}
          {S.where === 'visit' && (
            <div className="mt-5">
              <label htmlFor="f-address" className="block text-sm font-medium text-henna">Your address</label>
              <textarea
                id="f-address"
                rows={3}
                autoComplete="street-address"
                placeholder="House number, street, town"
                value={S.address}
                onChange={(e) =>
                  commit((n) => {
                    n.address = e.target.value
                  })
                }
                className="mt-2 w-full border border-gold/60 bg-ivory px-4 py-3 text-base text-henna"
              />
            </div>
          )}
          <Continue ok={isAnswered(S, 'where', cfg)} onClick={next} />
        </>
      )
      break

    case 'summary':
      body = (
        <Summary
          S={S}
          cfg={cfg}
          c={c}
          titleRef={titleRef}
          onEdit={edit}
          onContinue={() =>
            commit((n) => {
              n.step = 'terms'
            })
          }
        />
      )
      break

    case 'terms':
      body = <TermsStep S={S} commit={commit} titleRef={titleRef} />
      break

    default:
      body = <DetailsStep S={S} cfg={cfg} c={c} commit={commit} titleRef={titleRef} />
  }

  return (
    <div className="mx-auto max-w-xl border border-gold/40 bg-ivory">
      <div className="flex items-center gap-4 border-b border-gold/30 px-5 py-4">
        {idx > 0 ? (
          <button type="button" onClick={back} aria-label="Back" className={iconBtn + ' cursor-pointer bg-transparent'}>
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
        ) : (
          <Link to="/book" aria-label="Back to booking options" className={iconBtn}>
            <ArrowLeft size={18} aria-hidden="true" />
          </Link>
        )}
        <div className="flex-1">
          <p className="m-0 text-xs uppercase tracking-[0.2em] text-gold-deep">{progress}</p>
          <div className="mt-2 h-0.5 bg-gold/25">
            <div className="h-0.5 bg-gold-deep" style={{ width: pct + '%', transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </div>

      <div key={cur} className="p-5 sm:p-8">
        {body}
      </div>

      <PriceBar c={c} final={TAIL_KEYS.includes(id)} />
    </div>
  )
}
