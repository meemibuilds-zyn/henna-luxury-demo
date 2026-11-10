// One config per booking page. The shared BookingFlow component reads these.
// kind 'wedding': bride / bridesmaids / guests flow. kind 'single': one group of people.
import { groupMinPeople } from './pricing'

export const bridal = {
  id: 'bridal',
  path: '/book/bridal',
  kind: 'wedding',
  occasion: 'wedding',
  occasionLabel: 'Bridal',
  shortLabel: 'Bridal',
  lineLabel: 'Bride',
}

export const party = {
  id: 'party',
  path: '/book/party',
  kind: 'single',
  scope: 'party',
  occasion: 'party',
  occasionLabel: 'Party',
  shortLabel: 'Party',
  lineLabel: 'Party henna',
  countNoun: 'guests',
  countQuestion: 'How many guests are planning to get henna done?',
}

export const festive = {
  id: 'festive',
  path: '/book/festive',
  kind: 'single',
  scope: 'festival',
  occasion: 'festival',
  occasionLabel: 'Festive',
  shortLabel: 'Festive',
  lineLabel: 'Festive henna',
  countNoun: 'people',
  countQuestion: 'How many people are planning to get henna done?',
}

export const group = {
  id: 'group',
  path: '/book/group',
  kind: 'single',
  scope: 'group',
  occasion: 'group',
  occasionLabel: 'Group',
  shortLabel: 'Group',
  lineLabel: 'Group henna',
  countNoun: 'people',
  countQuestion: 'How many people will have henna?',
  minPeople: groupMinPeople,
}

export const configs = { bridal, party, festive, group }
