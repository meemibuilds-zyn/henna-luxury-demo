import BookingPage from '../components/booking/BookingPage'
import Confirm from '../components/Confirm'
import { festive } from '../data/bookingConfigs'

const cards = [
  { title: 'Eid', text: 'Henna for you, your family and your friends.' },
  { title: 'Avurudu', text: 'Henna for the Sinhala and Tamil New Year celebrations.' },
  { title: 'Other festivals', text: 'Tell the artist about the occasion and what you have in mind.' },
]

export default function BookFestive() {
  return (
    <BookingPage
      cfg={festive}
      eyebrow="Festive booking"
      title="Henna for Eid, Avurudu and other festivals"
      intro="Enter how many people will have henna, choose a style, and see the estimate as you go. Festive bookings offer the shorter lengths, from palm to mid arm. Nothing is booked until the artist confirms."
      cardsEyebrow="Festivals"
      cardsTitle="Celebrate with henna"
      cards={cards}
    >
      <p className="mt-8 text-sm leading-6 text-henna/85">
        <Confirm>festival-season availability and how far in advance to book</Confirm>
      </p>
    </BookingPage>
  )
}
