import { useState } from "react";
import hostawayLogo from "../assets/logo.svg";
import { useMessages } from "../api/useMessages";
import MessageList from "../components/MessageList";
import { useMessage } from "../api/useMessage";
import MessageDetail from "../components/MessageDetail";
import Filters from "../components/Filters";
import type { Platform } from "../types";

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState<string | undefined>()
  const [platform, setPlatform] = useState<Platform | undefined>()
  const { data: messagesData, isLoading: isLoadingMessages, isError: isErrorMessages } = useMessages({ platform })
  const { data: messageDetailData, isLoading: isLoadingMessageDetail, isError: isErrorMessageDetail } = useMessage(selectedId)

  return (
    <div className="min-h-screen bg-ha-offwhite font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center gap-3">
          <img src={hostawayLogo} alt="Hostaway" className="h-6" />
          <span className="h-5 w-px bg-gray-200" />
          <span className="text-sm font-medium text-gray-500">Unified Inbox</span>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Message list panel */}
          <div className="flex flex-col rounded-xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
            <div className="border-b border-gray-100 px-6 py-4">
              <h2 className="text-base font-semibold text-ha-brown">Messages</h2>
            </div>
            <div className="px-6 py-4 border-b border-gray-100">
              <Filters platform={platform} onPlatformChange={setPlatform} />
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {isLoadingMessages && (
                <p className="text-sm text-gray-400">Loading messages…</p>
              )}
              {isErrorMessages && (
                <p className="text-sm text-red-500">Error loading messages.</p>
              )}
              {messagesData && (
                <MessageList
                  messages={messagesData.data}
                  onSelect={setSelectedId}
                  selectedId={selectedId}
                />
              )}
            </div>
          </div>

          {/* Message detail panel */}
          <div className="flex flex-col rounded-xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
            <div className="border-b border-gray-100 px-6 py-4">
              <h2 className="text-base font-semibold text-ha-brown">Message</h2>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {isLoadingMessageDetail && (
                <p className="text-sm text-gray-400">Loading…</p>
              )}
              {isErrorMessageDetail && (
                <p className="text-sm text-red-500">Error loading message detail.</p>
              )}
              {!isLoadingMessageDetail && (
                <MessageDetail
                  message={messageDetailData?.message}
                  property={messageDetailData?.property}
                  booking={messageDetailData?.booking}
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
