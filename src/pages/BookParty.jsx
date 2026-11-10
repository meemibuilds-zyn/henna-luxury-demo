import BookingPage from '../components/booking/BookingPage'
import Confirm from '../components/Confirm'
import { party } from '../data/bookingConfigs'

const cards = [
  { title: 'Stripe only', text: 'A simple stripe design for each guest.' },
  { title: 'Stripe and fingers', text: 'A stripe design with added finger detail.' },
  { title: 'Based on your budget', text: 'Enter a budget per design. The artist suggests what fits on WhatsApp.' },
]

export default function BookParty() {
  return (
    <BookingPage
      cfg={party}
      eyebrow="Party booking"
      title="Henna for parties and gatherings"
      intro="For engagements, mehendi nights and family events. Enter your number of guests, choose a style and length, and see the estimate as you go. Nothing is booked until the artist confirms."
      cardsEyebrow="Party packages"
      cardsTitle="Simple options for many guests"
      cards={cards}
    >
      <p className="mt-8 text-sm leading-6 text-henna/85">
        <Confirm>how many guests one artist can usually serve, and whether extra artists can be arranged</Confirm>
      </p>
    </BookingPage>
  )
}
