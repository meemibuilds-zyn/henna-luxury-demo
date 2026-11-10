import { useId } from 'react'
import { lengths } from '../../data/pricing'

// How far down the arm the henna "grows" for each length (viewBox units, 430 tall)
const REVEAL = { palm: 152, wrist: 172, bangle: 206, mid_arm: 282, three_quarter: 354, elbow: 428 }
const H = 430

function ArmShapes() {
  return (
    <>
      <path d="M68 140 L132 140 L126 424 Q100 431 74 424 Z" />
      <rect x="60" y="88" width="80" height="64" rx="14" />
      <rect x="62" y="34" width="16" height="70" rx="8" />
      <rect x="80" y="18" width="16" height="86" rx="8" />
      <rect x="98" y="10" width="16" height="94" rx="8" />
      <rect x="116" y="24" width="16" height="80" rx="8" />
      <rect x="138" y="84" width="16" height="50" rx="8" transform="rotate(-28 146 134)" />
    </>
  )
}

const petals = [0, 45, 90, 135, 180, 225, 270, 315]
const leaves = [0, 1, 2, 3, 4, 5, 6, 7]
const fingers = [
  [70, 46],
  [88, 30],
  [106, 22],
  [124, 36],
]

export default function HandLengthPicker({ value, className = '' }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const y = value ? REVEAL[value] : 0
  const label = (lengths.find((l) => l.key === value) || {}).label
  const move = { transition: 'transform 0.7s ease' }

  return (
    <svg
      viewBox={`0 0 200 ${H}`}
      role="img"
      aria-label={label ? `Henna shown up to the ${label.toLowerCase()} length` : 'Hand and arm length guide'}
      className={className}
    >
      <defs>
        <clipPath id={uid + 'clip'}>
          <ArmShapes />
        </clipPath>
        <mask id={uid + 'mask'} maskUnits="userSpaceOnUse" x="0" y="0" width="200" height={H}>
          <rect
            x="0"
            y="0"
            width="200"
            height={H}
            fill="#fff"
            style={{ transformOrigin: '0 0', transform: `scaleY(${y / H})`, ...move }}
          />
        </mask>
      </defs>

      <g fill="#B08D4F" stroke="#B08D4F" strokeWidth="2.4" strokeLinejoin="round">
        <ArmShapes />
      </g>
      <g fill="#F4ECDD">
        <ArmShapes />
      </g>

      <g clipPath={`url(#${uid}clip)`}>
        <g mask={`url(#${uid}mask)`} fill="none" stroke="#6B3A1F" strokeWidth="1.3" strokeLinecap="round">
          {fingers.map(([x, top]) => (
            <g key={x}>
              <path d={`M${x} ${top} V98`} strokeDasharray="1 4" />
              <ellipse cx={x} cy={top + 14} rx="2.6" ry="5" />
            </g>
          ))}
          <g transform="translate(100 120)">
            <circle r="22" />
            <circle r="11" />
            <circle r="3" />
            {petals.map((a) => (
              <ellipse key={a} cy="-16" rx="3.2" ry="6" transform={`rotate(${a})`} />
            ))}
          </g>
          <path d="M68 158 H132" />
          <path d="M68 164 H132" strokeDasharray="2 3" />
          <path d="M72 200 Q100 208 128 200" />
          <path d="M72 206 Q100 214 128 206" strokeDasharray="2 3" />
          <path d="M100 170 C 84 195, 116 215, 100 240 C 84 265, 116 285, 100 310 C 84 335, 116 355, 100 380 C 84 405, 116 420, 100 430" />
          {leaves.map((i) => (
            <ellipse
              key={i}
              cx={i % 2 ? 114 : 86}
              cy={228 + i * 26}
              rx="7"
              ry="3"
              transform={`rotate(${i % 2 ? -35 : 35} ${i % 2 ? 114 : 86} ${228 + i * 26})`}
            />
          ))}
          {leaves.map((i) => (
            <circle key={'d' + i} cx={i % 2 ? 84 : 116} cy={240 + i * 26} r="1.6" />
          ))}
        </g>
      </g>

      <line
        x1="38"
        x2="162"
        y1="0"
        y2="0"
        stroke="#B08D4F"
        strokeWidth="1"
        strokeDasharray="3 4"
        style={{ transform: `translateY(${y}px)`, opacity: value ? 1 : 0, ...move }}
      />
    </svg>
  )
}
