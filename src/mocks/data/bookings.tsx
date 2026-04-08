// src/mocks/data/bookings.ts
import type { Booking } from '../../types'

export const bookings: Booking[] = [
  {
    id: 'book-1',
    propertyId: 'prop-1',
    guestName: 'Sophie Turner',
    checkIn: '2026-04-10',
    checkOut: '2026-04-17',
    nights: 7,
    totalGuests: 2,
    status: 'confirmed',
    totalAmount: 1050,
    currency: 'EUR',
  },
  {
    id: 'book-2',
    propertyId: 'prop-2',
    guestName: 'Marcus Webb',
    checkIn: '2026-04-20',
    checkOut: '2026-04-25',
    nights: 5,
    totalGuests: 4,
    status: 'confirmed',
    totalAmount: 875,
    currency: 'EUR',
  },
  {
    id: 'book-3',
    propertyId: 'prop-3',
    guestName: 'Yuki Tanaka',
    checkIn: '2026-05-01',
    checkOut: '2026-05-04',
    nights: 3,
    totalGuests: 1,
    status: 'pending',
    totalAmount: 420,
    currency: 'GBP',
  },
]