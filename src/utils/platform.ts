import type { Platform } from '../types'

export const PLATFORM_BADGE: Record<Platform, { label: string; className: string }> = {
  airbnb:      { label: 'Airbnb',      className: 'bg-rose-50 text-rose-600' },
  booking_com: { label: 'Booking.com', className: 'bg-blue-50 text-blue-600' },
  expedia:     { label: 'Expedia',     className: 'bg-yellow-50 text-yellow-700' },
  tripadvisor: { label: 'Tripadvisor', className: 'bg-green-50 text-green-700' },
}
