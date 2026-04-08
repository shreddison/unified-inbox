import { http, HttpResponse, delay } from 'msw'
import { messages } from './data/messages'
import { properties } from './data/properties'
import { bookings } from './data/bookings'
import type { MessagesResponse, MessageDetailResponse } from '../types'

// Pre-built lookups — O(1) access per request
const messageById = new Map(messages.map(m => [m.id, m]))
const propertyById = new Map(properties.map(p => [p.id, p]))
const bookingById = new Map(bookings.map(b => [b.id, b]))

// Pre-sorted once at module load
const sortedMessages = [...messages].sort(
  (a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
)

export const handlers = [

  // GET /api/inbox/messages
  // Supports: ?platform=airbnb
  http.get('/api/inbox/messages', async ({ request }) => {
    await delay(300)

    const platform = new URL(request.url).searchParams.get('platform')

    const data = platform
      ? sortedMessages.filter(m => m.platform === platform)
      : sortedMessages

    const body: MessagesResponse = { data }
    return HttpResponse.json(body)
  }),

  // GET /api/inbox/messages/:id
  http.get('/api/inbox/messages/:id', async ({ params }) => {
    await delay(200)

    const message = messageById.get(params.id as string)
    if (!message) return new HttpResponse(null, { status: 404 })

    const property = propertyById.get(message.propertyId)
    const booking = message.bookingId ? bookingById.get(message.bookingId) : undefined

    const body: MessageDetailResponse = { message, property, booking }
    return HttpResponse.json(body)
  }),

  // POST /api/inbox/messages/:id/read
  http.post('/api/inbox/messages/:id/read', async ({ params }) => {
    await delay(100)

    const message = messageById.get(params.id as string)
    if (!message) return new HttpResponse(null, { status: 404 })

    message.isRead = true
    return HttpResponse.json({ success: true })
  }),
]
