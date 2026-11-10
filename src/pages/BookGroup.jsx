import BookingPage from '../components/booking/BookingPage'
import { group } from '../data/bookingConfigs'
import { lengthsFor, getUnitPrice, groupMinPeople } from '../data/pricing'
import { money } from '../lib/format'

const cards = [
  { title: 'Price per person', text: 'Each person is priced by length and sides, and the total is shown as you choose.' },
  { title: 'Minimum group size', text: `Group pricing starts from ${groupMinPeople} people (sample value).` },
  { title: 'Design count option', text: 'Instead of sides, you can enter how many designs your group needs.' },
]

export default function BookGroup() {
  const from = lengthsFor('group').map((l) => [l.label, getUnitPrice('group', l.key, 1, 'khafif')])
  return (
    <BookingPage
      cfg={group}
      eyebrow="Group booking"
      title="Group henna, priced per person"
      intro="For a bridal party or many guests. Enter the number of people, choose a length and style, and see the price per person and the total. Nothing is booked until the artist confirms."
      cardsEyebrow="Groups"
      cardsTitle="How group pricing works"
      cards={cards}
    >
      <div className="mt-10 border border-gold/40 bg-cream p-6">
        <h3 className="m-0 text-2xl">Starting price per person</h3>
        <p className="mt-2 text-sm text-henna/75">One side, lightest style. Sample values, to be confirmed by the artist.</p>
        <ul className="m-0 mt-4 grid list-none gap-x-8 gap-y-2 p-0 text-sm sm:grid-cols-2">
          {from.map(([label, price]) => (
            <li key={label} className="flex justify-between gap-4 border-b border-gold/20 py-2">
              <span>{label}</span>
              <span>{money(price)}</span>
            </li>
          ))}
        </ul>
      </div>
    </BookingPage>
  )
}
