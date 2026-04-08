import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MessageListPanel from './MessageListPanel'

const server = setupServer()
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function renderWithQuery(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  )
}

const defaultProps = {
  platform: undefined,
  selectedId: undefined,
  onPlatformChange: () => {},
  onSelect: () => {},
}

describe('MessageListPanel', () => {
  it('shows empty state when API returns no messages', async () => {
    server.use(
      http.get('/api/inbox/messages', () =>
        HttpResponse.json({ data: [] })
      )
    )

    renderWithQuery(<MessageListPanel {...defaultProps} />)

    expect(await screen.findByText('No messages')).toBeInTheDocument()
    expect(screen.getByText('Your inbox is empty')).toBeInTheDocument()
  })

  it('renders message rows when API returns data', async () => {
    server.use(
      http.get('/api/inbox/messages', () =>
        HttpResponse.json({
          data: [
            {
              id: 'msg-1',
              platform: 'airbnb',
              platformMessageId: 'airbnb-1',
              subject: 'Early check-in request',
              body: 'Can we check in early?',
              isRead: false,
              receivedAt: '2026-04-06T08:00:00Z',
              sender: { name: 'Sophie Turner' },
              propertyId: 'prop-1',
            },
          ],
        })
      )
    )

    renderWithQuery(<MessageListPanel {...defaultProps} />)

    expect(await screen.findByText('Sophie Turner')).toBeInTheDocument()
  })

  it('shows platform-specific empty state when filtered', async () => {
    server.use(
      http.get('/api/inbox/messages', () =>
        HttpResponse.json({ data: [] })
      )
    )

    renderWithQuery(<MessageListPanel {...defaultProps} platform="airbnb" />)

    expect(await screen.findByText('No messages from airbnb')).toBeInTheDocument()
  })

  it('shows error state when API fails', async () => {
    server.use(
      http.get('/api/inbox/messages', () =>
        new HttpResponse(null, { status: 500 })
      )
    )

    renderWithQuery(<MessageListPanel {...defaultProps} />)

    expect(await screen.findByText('Error loading messages.')).toBeInTheDocument()
  })
})
