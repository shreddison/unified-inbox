import { useEffect } from 'react'
import { useMessage } from '../api/useMessage'
import { useMarkAsRead } from '../api/useMarkAsRead'
import MessageDetail from './MessageDetail'
import ReplyComposer from './ReplyComposer'

interface MessageDetailPanelProps {
  selectedId: string | undefined
}

export default function MessageDetailPanel({ selectedId }: MessageDetailPanelProps) {
  const { data, isLoading, isError } = useMessage(selectedId)
  const { mutate: markAsRead } = useMarkAsRead()

  useEffect(() => {
    if (data?.message && !data.message.isRead) markAsRead(data.message.id)
  }, [data?.message.id, markAsRead])

  return (
    <div className="flex flex-col rounded-xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-base font-semibold text-ha-brown">Message</h2>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto px-6 py-4" aria-live="polite">
        {isLoading && <p className="text-sm text-gray-400">Loading…</p>}
        {isError && <p className="text-sm text-red-500">Error loading message.</p>}
        {!isLoading && !data && (
          <p className="text-sm text-gray-500">Select a message to view details.</p>
        )}
        {!isLoading && data && (
          <>
            <MessageDetail
              message={data.message}
              property={data.property}
              booking={data.booking}
            />
            <ReplyComposer />
          </>
        )}
      </div>
    </div>
  )
}
