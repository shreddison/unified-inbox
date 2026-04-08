import { useState } from 'react'
import hostawayLogo from '../assets/logo.svg'
import MessageListPanel from '../components/MessageListPanel'
import MessageDetailPanel from '../components/MessageDetailPanel'
import type { Platform } from '../types'

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState<string | undefined>()
  const [platform, setPlatform] = useState<Platform | undefined>()

  return (
    <div className="min-h-screen bg-ha-offwhite font-sans">
      <div className="bg-white border-b border-gray-200 px-6 py-4 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center gap-3">
          <img src={hostawayLogo} alt="Hostaway" className="h-6" />
          <span className="h-5 w-px bg-gray-200" />
          <span className="text-sm font-medium text-gray-500">Unified Inbox</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <MessageListPanel
            platform={platform}
            selectedId={selectedId}
            onPlatformChange={setPlatform}
            onSelect={setSelectedId}
          />
          <MessageDetailPanel selectedId={selectedId} />
        </div>
      </div>
    </div>
  )
}
