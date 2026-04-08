import { useState } from 'react'
import type { Message } from '../types'

interface MessageDetailProps {
  message?: Message
}

export default function MessageDetail({ message }: MessageDetailProps) {
  const [reply, setReply] = useState('')

  if (!message) return <p className="text-sm text-gray-500 dark:text-gray-400">Select a message to view details.</p>

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-x-3">
        {message.sender.avatarUrl ? (
          <img
            alt=""
            src={message.sender.avatarUrl}
            className="size-10 flex-none rounded-full bg-gray-50 dark:bg-gray-800"
          />
        ) : (
          <div className="size-10 flex-none rounded-full bg-gray-200 dark:bg-gray-700" />
        )}
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{message.sender.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <time dateTime={message.receivedAt}>
              {new Date(message.receivedAt).toLocaleString()}
            </time>
          </p>
        </div>
        {!message.isRead && (
          <span className="ml-auto inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            Unread
          </span>
        )}
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">Subject</p>
        <p className="mt-1 text-sm text-gray-900 dark:text-white">{message.subject}</p>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">Platform</p>
        <p className="mt-1 text-sm text-gray-900 dark:text-white">{message.platform}</p>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">Message</p>
        <p className="mt-1 text-sm/6 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{message.body}</p>
      </div>

      <div className="mt-2">
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={4}
          placeholder="Write a reply…"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-white/10 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
        />
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            disabled={!reply.trim()}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  )
}
