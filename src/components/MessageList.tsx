import { ChevronRightIcon } from '@heroicons/react/20/solid'
import type { Message, Platform } from '../types'

const PLATFORM_BADGE: Record<Platform, { label: string; className: string }> = {
  airbnb:      { label: 'Airbnb',       className: 'bg-rose-50 text-rose-600' },
  booking_com: { label: 'Booking.com',  className: 'bg-blue-50 text-blue-600' },
  expedia:     { label: 'Expedia',      className: 'bg-yellow-50 text-yellow-700' },
  tripadvisor: { label: 'Tripadvisor',  className: 'bg-green-50 text-green-700' },
}

interface MessageListProps {
  messages: Message[]
  onSelect?: (id: string) => void
  selectedId: string | undefined
}

export default function MessageList({ messages, onSelect, selectedId }: MessageListProps) {

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {messages.map((message) => (
        <li
          key={message.id}
          onClick={() => onSelect?.(message.id)}
          className={`relative flex cursor-pointer justify-between gap-x-6 px-4 py-4 transition-colors hover:bg-ha-peach ${
            selectedId === message.id ? 'bg-ha-peach' : ''
          }`}
        >
          <div className="flex min-w-0 gap-x-3">
            
            {message.sender.avatarUrl ? (
              <img
                alt=""
                src={message.sender.avatarUrl}
                className={`size-10 flex-none rounded-full bg-ha-offwhite ring-2 transition-all ${
                  selectedId === message.id ? 'ring-ha-orange' : 'ring-transparent'
                }`}
              />
            ) : (
              <div className={`size-10 flex-none rounded-full flex items-center justify-center ring-2 transition-all ${
                selectedId === message.id
                  ? 'bg-ha-orange ring-ha-orange'
                  : 'bg-ha-peach ring-transparent'
              }`}>
                <span className={`text-sm font-bold ${selectedId === message.id ? 'text-white' : 'text-ha-orange'}`}>
                  {message.sender.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold text-ha-brown">
                <span className="absolute inset-x-0 -top-px bottom-0" />
                {message.sender.name}
              </p>
              <p className="mt-0.5 truncate text-xs text-gray-500">{message.subject}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-3">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${PLATFORM_BADGE[message.platform].className}`}>
                {PLATFORM_BADGE[message.platform].label}
              </span>
              <p className="mt-0.5 text-xs text-gray-400">
                <time dateTime={message.receivedAt}>
                  {new Date(message.receivedAt).toLocaleDateString()}
                </time>
              </p>
            </div>
            <div className="flex w-2 flex-none items-center justify-center">
              {!message.isRead && <div className="size-2 rounded-full bg-ha-orange" />}
            </div>
            <ChevronRightIcon aria-hidden="true" className="size-4 flex-none text-gray-300" />
          </div>
        </li>
      ))}
    </ul>
  )
}
