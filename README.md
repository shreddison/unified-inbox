# Unified Inbox — by Edison Lizano

# Getting Started

## Prerequisites
- Node.js 18+
- npm

## Install dependencies
```bash
npm install
```

## Run the development server
```bash
npm run dev
```

## Assumptions

### Users
- A single property owner managing multiple listings — no multi-user or team inbox requirements

### Data Volume
- Assumed a manageable inbox size (tens to low hundreds of messages) — no pagination or virtualised list needed for an MVP
- Messages are relatively static during a session — `staleTime: 30_000` avoids redundant refetches without needing real-time updates

### Real-Time
- No real-time requirement for MVP — a polling or manual refresh pattern would be acceptable for a first iteration
- In production, new messages from platforms would arrive via webhooks to the BFF, which would push to the client via SSE or WebSocket — the frontend would need only to invalidate the `['messages']` query key on receipt
- `isRead` state is local to the session — no conflict resolution needed between multiple devices or users


# API Design

## Pattern: BFF (Backend for Frontend)

Each platform (Airbnb, Booking.com, Expedia, Tripadvisor) has its own auth, rate limits, and data shape — the browser shouldn't deal with that complexity, and CORS makes direct calls impractical. The BFF normalises everything into one schema and exposes clean endpoints to the frontend. MSW simulates what that BFF would return.

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/inbox/messages` | All messages. Supports `?platform=` |
| GET | `/api/inbox/messages/:id` | Single message + property + booking in one response |
| POST | `/api/inbox/messages/:id/read` | Mark message as read |

The detail endpoint deliberately joins message + property + booking server-side — one round trip instead of three.

## Data Shape
```typescript
interface Message {
  id: string
  platform: 'airbnb' | 'booking_com' | 'expedia' | 'tripadvisor'
  platformMessageId: string
  subject: string
  body: string
  isRead: boolean
  receivedAt: string        // ISO 8601
  sender: { name: string; avatarUrl?: string }
  propertyId: string
  bookingId?: string        // not every message ties to a booking
}

interface Property {
  id: string
  name: string
  address: string
  imageUrl: string
}

interface Booking {
  id: string
  propertyId: string
  guestName: string
  checkIn: string           // ISO 8601
  checkOut: string          // ISO 8601
  nights: number
  totalGuests: number
  status: 'confirmed' | 'pending' | 'cancelled'
  totalAmount: number
  currency: string
}
```

## In Production

The BFF would fan out to each platform's API in parallel, normalise responses into the schema above, and push new messages to the client via WebSocket or SSE. Authentication, rate limiting, and per-platform error handling would all live in the BFF — invisible to the frontend.




# Implementation

I chose Vite for MVP simplicity; migrating to Next.js App Router would be straightforward and worthwhile if server components, auth middleware, or SSR for initial load performance become requirements.

## Tech Stack

| Tool | Why |
|------|-----|
| React + TypeScript + Vite | Fast dev server, first-class TS, industry standard |
| TanStack Query | Server state, caching, and loading/error states with minimal boilerplate |
| Tailwind CSS | Utility-first, fast to iterate on design without a component library getting in the way |
| MSW (Mock Service Worker) | Mocks at the network layer — fetch calls are identical to what production would look like |
| Vitest + Testing Library | Fast unit and component tests, co-located with source, reuses MSW handlers |

## Structure
```
src/
  api/          → typed query hooks (useMessages, useMessage, useMarkAsRead) + queryKeys factory
  mocks/        → MSW handlers + fixture data for messages, properties, bookings
  components/   → MessageList, MessageDetail, MessageListPanel, MessageDetailPanel, Filters
  pages/        → InboxPage (state orchestration only)
  types/        → shared TypeScript interfaces
  utils/        → shared utilities (platform badge config)
  test/         → vitest setup
```

## Data Flow
```
InboxPage (state only: selectedId, platform)
├── MessageListPanel
│   ├── useMessages(filters)     → GET /api/inbox/messages
│   ├── Filters                  → platform pill buttons
│   └── MessageList              → renders rows, fires onSelect
└── MessageDetailPanel
    ├── useMessage(id)           → GET /api/inbox/messages/:id
    ├── useMarkAsRead()          → POST /api/inbox/messages/:id/read
    ├── MessageDetail            → renders message + property + booking
    └── ReplyComposer            → reply textarea + send button
```

MSW intercepts all fetch calls in development. Swapping in a real API requires only removing the MSW initialiser in `main.tsx` — no changes to hooks or components.

## Limitations

- BFF is mocked via MSW — no real platform integrations
- No SSR — initial load fetches data client-side
- No mobile layout — optimised for desktop two-panel view
- No authentication



# Development Steps

## 1. Define the Domain Schema
Started by defining the normalised TypeScript interfaces (`Message`, `Property`, `Booking`) before writing any component or fetch logic. The schema is the contract everything else builds toward — getting this right first prevents refactoring later.

## 2. Mock the BFF with MSW
Built fixture data and MSW handlers before touching any UI. This means the frontend always fetches from a real network request — no `if (isDev)` branches in components, no hardcoded arrays passed as props. The code is identical to what production would look like.

## 3. Build the Inbox Layout
Created `InboxPage` as the single data-owning component with a two-panel layout — message list on the left, detail on the right. `selectedId` state lives here and is passed down, keeping both panels in sync without a global store.

## 4. MessageList and MessageDetail Components
Both components are purely presentational — they receive data as props and have no knowledge of how it was fetched. Loading and error states are handled in `InboxPage` before the return, so `messagesData` is always defined when passed down.

## 5. TanStack Query Hooks
Three hooks cover the full data layer:

| Hook | Endpoint |
|------|----------|
| `useMessages(filters)` | `GET /api/inbox/messages` |
| `useMessage(id)` | `GET /api/inbox/messages/:id` |
| `useMarkAsRead()` | `POST /api/inbox/messages/:id/read` |

`useMarkAsRead` invalidates both `['messages']` and `['message', id]` on success — the list unread count and detail view stay in sync automatically without manual state updates. This is the core value of TanStack Query's cache invalidation pattern.

# AI-Assisted Development

Used Claude (Anthropic) throughout the implementation as a collaborator — not to generate code blindly, but to accelerate boilerplate. All outputs were reviewed and adapted.

### Prompts

**1. Domain schema**
```
Create src/types/index.ts with TypeScript interfaces for Property, Booking, and Message.
Use normalised schemas — no nested duplicated data, foreign keys only (propertyId, bookingId).
Platform should be a union type.
```

**2. MSW setup**
```
Create a base MSW implementation with:
- src/mocks/data/ fixture files for messages (7+), properties (3), bookings (3)
- src/mocks/handlers.ts with route handlers for:
    GET  /api/inbox/messages       (supports for platform filter)
    GET  /api/inbox/messages/:id   (returns message + joined property + booking)
    POST /api/inbox/messages/:id/read
- Add realistic delay() to each handler to simulate network latency
```

**3. TanStack Query hook layer**
```
Create a hook layer in src/api/ using TanStack Query v5:
- useMessages(filters)   → GET /api/inbox/messages, queryKey includes filters for cache isolation
- useMessage(id)         → GET /api/inbox/messages/:id, enabled only when id is defined
- useMarkAsRead()        → POST mutation, on success invalidate ['messages'] and ['message', id]
Wire up QueryClient in main.tsx
```

### What was validated manually
- MSW handler query param parsing and filter logic
- Cache invalidation behaviour after markAsRead
- TypeScript types across the hook/component boundary



# If I Had More Time

## Error Handling
- **Typed API errors** — replace generic `new Error('...')` with an `ApiError` class carrying `status` and `code` fields, so components can distinguish a 404 from a 503 and respond accordingly
- **Error boundaries** — wrap panels in React `ErrorBoundary` components so a failed detail fetch doesn't crash the whole inbox
- **Retry logic** — configure TanStack Query `retry` and `retryDelay` with exponential backoff for transient failures

## Performance
- **Optimistic updates on markAsRead** — instead of invalidating the full `['messages']` query, patch the cache in-place with `setQueryData` to avoid a refetch on every read
- **Virtualised list** — for inboxes with hundreds of messages, replace the `<ul>` with `@tanstack/react-virtual` to avoid rendering off-screen rows
- **`useSuspenseQuery`** — swap `useQuery` for `useSuspenseQuery` and move loading/error handling to `<Suspense>` + `<ErrorBoundary>` boundaries, removing the guard branches from `InboxPage`

## UX
- **Skeleton loaders** — replace plain "Loading…" text with shimmer placeholder cards that match the message row layout
- **Unread filter** — restore `unreadOnly` as a toggle in the `Filters` component, now that it was removed from the mock
- **Reply send logic** — wire the Reply button to a `POST /api/inbox/messages/:id/reply` mutation with optimistic feedback
- **Empty states** — show a contextual illustration when the filtered list is empty (e.g. "No Airbnb messages")
- **Mobile layout** — the current two-panel layout breaks on small screens; a slide-in detail panel or stacked layout is needed

## Architecture
- **Environment-aware API base URL** — hardcoded `/api/` paths work for MSW but would need a `VITE_API_BASE_URL` env variable for staging/production


## Testing
- Add more tests cases and e2e tests

## Accessibility (a11y)

**Implemented**
- Keyboard navigation on message rows — Enter and Space trigger selection
- `role="button"` + `tabIndex={0}` on list rows — fully keyboard focusable
- `aria-pressed` on each row — screen readers announce selected state
- `aria-label` on each row — announces unread status, sender name, and subject
- `focus-visible` ring using brand colour — visible keyboard focus indicator
- `aria-live="polite"` on the detail panel — screen readers announce content changes on selection
- Decorative elements marked `aria-hidden`

**If I had more time**
- `aria-current="true"` on the active row as an alternative to `aria-pressed` (more semantically appropriate for a navigation list)
- Focus management — move focus to the detail panel header when a message is selected
- Colour contrast audit on platform badges across different backgrounds
- Reduced motion support for transition animations
