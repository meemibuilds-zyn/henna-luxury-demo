// One config per booking page. The shared BookingFlow component reads these.
// kind 'wedding': bride / bridesmaids / guests flow. kind 'single': one group of people.
export const bridal = {
  id: 'bridal',
  path: '/book/bridal',
  kind: 'wedding',
  occasion: 'wedding',
  occasionLabel: 'Bridal',
  shortLabel: 'Bridal',
  lineLabel: 'Bride',
}

export const configs = { bridal }
