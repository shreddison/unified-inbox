import { useState, useEffect } from 'react'
import { useMarkAsRead } from '../api/useMarkAsRead'
import type { Message, Platform } from '../types'

const PLATFORM_BADGE: Record<Platform, { label: string; className: string }> = {
  airbnb:      { label: 'Airbnb',      className: 'bg-rose-50 text-rose-600' },
  booking_com: { label: 'Booking.com', className: 'bg-blue-50 text-blue-600' },
  expedia:     { label: 'Expedia',     className: 'bg-yellow-50 text-yellow-700' },
  tripadvisor: { label: 'Tripadvisor', className: 'bg-green-50 text-green-700' },
}

interface MessageDetailProps {
  message?: Message
}

export default function MessageDetail({ message }: MessageDetailProps) {
  const [reply, setReply] = useState('')
  const { mutate: markAsRead } = useMarkAsRead()

  useEffect(() => {
    if (message && !message.isRead) markAsRead(message.id)
  }, [message?.id])

  if (!message) return <p className="text-sm text-gray-500 dark:text-gray-400">Select a message to view details.</p>

  return (
    <div className="flex flex-col gap-4 h-full">
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
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{message.sender.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <time dateTime={message.receivedAt}>
              {new Date(message.receivedAt).toLocaleString()}
            </time>
          </p>
        </div>
        <span className={`ml-auto inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${PLATFORM_BADGE[message.platform].className}`}>
          {PLATFORM_BADGE[message.platform].label}
        </span>
      </div>

      <div className="border-l-2 border-ha-orange pl-3">
        <p className="text-base font-semibold text-ha-brown">{message.subject}</p>
      </div>

<div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Message</p>
        <p className="mt-1 text-sm/6 text-ha-brown whitespace-pre-wrap">{message.body}</p>
      </div>

      <div className="mt-auto">
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={4}
          placeholder="Write a reply…"
          className="w-full rounded-lg border border-gray-200 bg-ha-offwhite px-3 py-2 text-sm text-ha-brown placeholder-gray-400 focus:border-ha-orange focus:ring-1 focus:ring-ha-orange outline-none transition-colors"
        />
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            disabled={!reply.trim()}
            className="rounded-md bg-ha-orange px-4 py-2 text-sm font-semibold text-white hover:bg-ha-orange-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  )
}
