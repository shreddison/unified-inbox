import type { Message, Property, Booking, BookingStatus } from '../types'
import { PLATFORM_BADGE } from '../utils/platform'

const BOOKING_STATUS: Record<BookingStatus, string> = {
  confirmed: 'bg-green-50 text-green-700',
  pending:   'bg-yellow-50 text-yellow-700',
  cancelled: 'bg-red-50 text-red-600',
}

interface MessageDetailProps {
  message: Message
  property?: Property
  booking?: Booking
}

export default function MessageDetail({ message, property, booking }: MessageDetailProps) {
  return (
    <div className="flex flex-col gap-4">

      {/* Sender header */}
      <div className="flex items-center gap-x-3">
        {message.sender.avatarUrl ? (
          <img
            alt=""
            src={message.sender.avatarUrl}
            className="size-12 flex-none rounded-full bg-ha-offwhite"
          />
        ) : (
          <div className="size-12 flex-none rounded-full bg-ha-peach flex items-center justify-center">
            <span className="text-base font-bold text-ha-orange">
              {message.sender.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-ha-brown">{message.sender.name}</p>
          <p className="text-xs text-gray-500">
            <time dateTime={message.receivedAt}>
              {new Date(message.receivedAt).toLocaleString()}
            </time>
          </p>
        </div>
        <span className={`ml-auto inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${PLATFORM_BADGE[message.platform].className}`}>
          {PLATFORM_BADGE[message.platform].label}
        </span>
      </div>

      {/* Subject */}
      <div className="border-l-2 border-ha-orange pl-3">
        <p className="text-base font-semibold text-ha-brown">{message.subject}</p>
      </div>

      {/* Message body */}
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Message</p>
        <p className="mt-1 text-sm/6 text-ha-brown whitespace-pre-wrap">{message.body}</p>
      </div>

      {/* Property */}
      {property && (
        <div className="py-2">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Property</p>
          <div className="mt-2 flex items-center gap-x-3">
            {property.imageUrl && (
              <img src={property.imageUrl} alt="" className="size-10 flex-none rounded-md object-cover" />
            )}
            <div>
              <p className="text-sm font-semibold text-ha-brown">{property.name}</p>
              <p className="text-xs text-gray-500">{property.address}</p>
            </div>
          </div>
        </div>
      )}

      {/* Booking */}
      {booking && (
        <div className="py-2">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Booking</p>
          <div className="mt-2 flex items-start justify-between gap-x-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-ha-brown">{booking.guestName}</p>
              <p className="text-xs text-gray-500">
                {new Date(booking.checkIn).toLocaleDateString()} — {new Date(booking.checkOut).toLocaleDateString()}
                <span className="ml-1 text-gray-400">({booking.nights}n · {booking.totalGuests} guests)</span>
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${BOOKING_STATUS[booking.status]}`}>
                {booking.status}
              </span>
              <p className="text-xs font-semibold text-ha-brown">
                {booking.totalAmount.toLocaleString()} {booking.currency}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
