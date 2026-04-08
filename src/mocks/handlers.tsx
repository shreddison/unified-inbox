import { http, HttpResponse, delay } from 'msw'
import { messages } from './data/messages'
import { properties } from './data/properties'
import { bookings } from './data/bookings'
import type { MessagesResponse, MessageDetailResponse } from '../types'

export const handlers = [

  // GET /api/inbox/messages
  // Supports: ?platform=airbnb&unreadOnly=true
  http.get('/api/inbox/messages', async ({ request }) => {
    await delay(300) // simulate network latency

    const url = new URL(request.url)
    const platform = url.searchParams.get('platform')
    const unreadOnly = url.searchParams.get('unreadOnly') === 'true'

    let filtered = [...messages].sort(
      (a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
    )

    if (platform) filtered = filtered.filter(m => m.platform === platform)
    if (unreadOnly) filtered = filtered.filter(m => !m.isRead)

    const body: MessagesResponse = { data: filtered, total: filtered.length }
    return HttpResponse.json(body)
  }),

  // GET /api/inbox/messages/:id
  http.get('/api/inbox/messages/:id', async ({ params }) => {
    await delay(200)

    const message = messages.find(m => m.id === params.id)
    if (!message) return new HttpResponse(null, { status: 404 })

    const property = properties.find(p => p.id === message.propertyId)
    const booking = message.bookingId
      ? bookings.find(b => b.id === message.bookingId)
      : undefined

    const body: MessageDetailResponse = { message, property: property!, booking }
    return HttpResponse.json(body)
  }),

  // POST /api/messages/:id/read
  http.post('/api/inbox/messages/:id/read', async ({ params }) => {
    await delay(100)

    const message = messages.find(m => m.id === params.id)
    if (!message) return new HttpResponse(null, { status: 404 })

    message.isRead = true // mutate the in-memory fixture
    return HttpResponse.json({ success: true })
  }),
]