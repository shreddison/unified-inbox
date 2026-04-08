import { ChevronRightIcon } from '@heroicons/react/20/solid'
import type { Message } from '../types'

interface MessageListProps {
  messages: Message[]
  onSelect?: (id: string) => void
  selectedId: string | undefined
}

export default function MessageList({ messages, onSelect, selectedId }: MessageListProps) {

  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-xs outline-1 outline-gray-900/5 sm:rounded-xl dark:divide-white/5 dark:bg-gray-800/50 dark:shadow-none dark:outline-white/10 dark:sm:-outline-offset-1"
    >
      {messages.map((message) => (
        <li
          key={message.id}
          onClick={() => onSelect?.(message.id)}
          className={`relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 dark:hover:bg-white/2.5 ${selectedId === message.id ? 'bg-gray-50 dark:bg-white/5' : ''}`}
        >
          <div className="flex min-w-0 gap-x-4">
            {message.sender.avatarUrl ? (
              <img
                alt=""
                src={message.sender.avatarUrl}
                className="size-12 flex-none rounded-full bg-gray-50 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10"
              />
            ) : (
              <div className="size-12 flex-none rounded-full bg-gray-200 dark:bg-gray-700" />
            )}
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                <span className="absolute inset-x-0 -top-px bottom-0" />
                {message.sender.name}
              </p>
              <p className="mt-1 truncate text-xs/5 text-gray-500 dark:text-gray-400">
                {message.subject}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm/6 text-gray-900 dark:text-white">{message.platform}</p>
              <p className="mt-1 text-xs/5 text-gray-500 dark:text-gray-400">
                <time dateTime={message.receivedAt}>
                  {new Date(message.receivedAt).toLocaleDateString()}
                </time>
              </p>
            </div>
            {!message.isRead && (
              <div className="flex-none rounded-full bg-blue-500/20 p-1 dark:bg-blue-500/30">
                <div className="size-1.5 rounded-full bg-blue-500" />
              </div>
            )}
            <ChevronRightIcon aria-hidden="true" className="size-5 flex-none text-gray-400 dark:text-gray-500" />
          </div>
        </li>
      ))}
    </ul>
  )
}
