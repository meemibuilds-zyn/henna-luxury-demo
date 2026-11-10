import { Bell, Volume2, VolumeX } from 'lucide-react'
import { formatTime } from '../../lib/dates'

export default function TomorrowBanner({ items, soundOn, supported, onEnable, onChime }) {
  const has = items.length > 0
  return (
    <section
      aria-labelledby="tomorrow-h"
      className={'border p-5 sm:p-6 ' + (has ? 'border-henna bg-henna text-ivory' : 'border-gold/40 bg-cream text-henna')}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id="tomorrow-h" className={'m-0 flex items-center gap-2 text-2xl sm:text-3xl ' + (has ? 'text-ivory' : 'text-henna')}>
            <Bell size={22} aria-hidden="true" /> Tomorrow&apos;s events
          </h2>
          <p className={'m-0 mt-1 text-sm ' + (has ? 'text-ivory/85' : 'text-henna/75')}>
            {has ? `${items.length} ${items.length === 1 ? 'event' : 'events'} tomorrow. Send each client a reminder below.` : 'No events tomorrow.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {!soundOn ? (
            <button
              type="button"
              onClick={onEnable}
              disabled={!supported}
              className={'btn ' + (has ? 'border-gold bg-ivory text-henna hover:bg-cream' : 'btn-outline')}
            >
              <VolumeX size={16} aria-hidden="true" /> Enable sound
            </button>
          ) : (
            <button type="button" onClick={onChime} className={'btn ' + (has ? 'border-gold bg-ivory text-henna hover:bg-cream' : 'btn-outline')}>
              <Volume2 size={16} aria-hidden="true" /> Play chime
            </button>
          )}
        </div>
      </div>

      {has && (
        <ul className="m-0 mt-5 list-none space-y-2 p-0 text-sm">
          {items.map((b) => (
            <li key={b.id} className="border-t border-gold/40 pt-2">
              <b className="font-medium">{b.eventTime ? formatTime(b.eventTime) : b.eventTimeNote || 'Time to be discussed'}</b>
              {' \u00B7 '}
              {b.name}
              {' \u00B7 '}
              <span className="text-ivory/85">{b.summary}</span>
            </li>
          ))}
        </ul>
      )}

      <p role="status" className={'m-0 mt-4 text-xs ' + (has ? 'text-ivory/75' : 'text-henna/65')}>
        {!supported
          ? 'This browser does not support Web Audio, so there is no chime.'
          : soundOn
            ? 'Sound is on. The chime is made in the browser, with no audio files.'
            : 'Sound is off. Browsers only allow sound after you tap Enable sound. On an iPad, the silent switch may also mute it.'}
      </p>
    </section>
  )
}
