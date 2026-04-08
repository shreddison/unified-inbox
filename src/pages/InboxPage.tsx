import { useState } from "react";
import { useMessages } from "../api/useMessages";
import MessageList from "../components/MessageList";
import { useMessage } from "../api/useMessage";
import MessageDetail from "../components/MessageDetail";

export default function InboxPage() {3
  const [selectedId, setSelectedId] = useState<string | undefined>()
  const { data: messagesData, isLoading: isLoadingMessages, isError: isErrorMessages } = useMessages()
  const { data: messageDetailData, isLoading: isLoadingMessageDetail, isError: isErrorMessageDetail } = useMessage(selectedId)

  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">Hostaway</h2>
        <p className="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-gray-950 sm:text-5xl dark:text-white">
          Agregated Inboxes
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <div className="relative lg:col-span-3">
            <div className="absolute inset-0 rounded-lg bg-white max-lg:rounded-t-4xl lg:rounded-tl-4xl dark:bg-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
              <div className="p-10 pt-4">
                <h3 className="mt-2 text-lg font-medium tracking-tight text-gray-950 dark:text-white">
                  Message List
                </h3>
                
                <div className="mt-2 max-w-lg">
                  {isLoadingMessages && <p>Loading...</p>}
                  {isErrorMessages && <p>Error loading messages</p>}
                  {messagesData && <MessageList messages={messagesData.data} onSelect={setSelectedId} selectedId={selectedId}/>}
                </div>
                
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl lg:rounded-tl-4xl dark:outline-white/15" />
          </div>
          <div className="relative lg:col-span-3">
            <div className="absolute inset-0 rounded-lg bg-white lg:rounded-tr-4xl dark:bg-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
              
              <div className="p-10 pt-4">
                <h3 className="mt-2 text-lg font-medium tracking-tight text-gray-950 dark:text-white">Messge Detail</h3>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400">

                  {isLoadingMessageDetail   && <p>Loading...</p>}
                  {isErrorMessageDetail && <p>Error loading message detail</p>}
                  {messageDetailData && <MessageDetail message={messageDetailData.message} />}
                
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 lg:rounded-tr-4xl dark:outline-white/15" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="absolute inset-0 rounded-lg bg-white lg:rounded-bl-4xl dark:bg-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
              
              
              <div className="p-10 pt-4">
                <h3 className="mt-2 text-lg font-medium tracking-tight text-gray-950 dark:text-white">
                  Booking.com
                </h3>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400">
                  Sed congue eros non finibus molestie. Vestibulum euismod augue.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 lg:rounded-bl-4xl dark:outline-white/15" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="absolute inset-0 rounded-lg bg-white dark:bg-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="p-10 pt-4">
                <h3 className="mt-2 text-lg font-medium tracking-tight text-gray-950 dark:text-white">
                  Expedia
                </h3>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400">
                  Maecenas at augue sed elit dictum vulputate, in nisi aliquam maximus arcu.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 dark:outline-white/15" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="absolute inset-0 rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-br-4xl dark:bg-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
              <div className="p-10 pt-4">
                <h3 className="mt-2 text-lg font-medium tracking-tight text-gray-950 dark:text-white">
                  Airbnb
                </h3>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400">
                  Aenean vulputate justo commodo auctor vehicula in malesuada semper.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-br-4xl dark:outline-white/15" />
          </div>
        </div>
      </div>
    </div>
  )
}
