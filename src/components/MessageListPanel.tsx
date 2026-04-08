import { useMessages } from '../api/useMessages'
import type { Platform } from '../types'
import Filters from './Filters'
import MessageList from './MessageList'

interface MessageListPanelProps {
  platform: Platform | undefined
  selectedId: string | undefined
  onPlatformChange: (platform: Platform | undefined) => void
  onSelect: (id: string) => void
}

export default function MessageListPanel({ platform, selectedId, onPlatformChange, onSelect }: MessageListPanelProps) {
  const { data, isLoading, isError } = useMessages({ platform })

  return (
    <div className="flex flex-col rounded-xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-base font-semibold text-ha-brown">Messages</h2>
      </div>
      <div className="px-6 py-4 border-b border-gray-100">
        <Filters platform={platform} onPlatformChange={onPlatformChange} />
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {isLoading && <p className="text-sm text-gray-400">Loading messages…</p>}
        {isError && <p className="text-sm text-red-500">Error loading messages.</p>}
        {data && data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-sm font-medium text-ha-brown">No messages</p>
            <p className="mt-1 text-xs text-gray-400">
              {platform ? `No messages from ${platform.replace('_', '.')}` : 'Your inbox is empty'}
            </p>
          </div>
        )}
        {data && data.length > 0 && (
          <MessageList
            messages={data}
            onSelect={onSelect}
            selectedId={selectedId}
          />
        )}
      </div>
    </div>
  )
}
