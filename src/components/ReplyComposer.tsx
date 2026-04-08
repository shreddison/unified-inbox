import { useState } from 'react'


export default function ReplyComposer() {
  const [reply, setReply] = useState('')

  return (
    <div className="mt-auto">
      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        rows={4}
        placeholder="Write a reply…"
        aria-label="Reply"
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
  )
}
