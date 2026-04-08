import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import MessageList from './MessageList'
import type { Message } from '../types'

const messages: Message[] = [
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
  {
    id: 'msg-2',
    platform: 'booking_com',
    platformMessageId: 'bdc-1',
    subject: 'Parking question',
    body: 'Is there parking?',
    isRead: true,
    receivedAt: '2026-04-05T08:00:00Z',
    sender: { name: 'Marcus Webb' },
    propertyId: 'prop-2',
  },
]

describe('MessageList', () => {
  it('renders a row for each message', () => {
    render(<MessageList messages={messages} selectedId={undefined} />)
    expect(screen.getByText('Sophie Turner')).toBeInTheDocument()
    expect(screen.getByText('Marcus Webb')).toBeInTheDocument()
  })

  it('fires onSelect with the message id when a row is clicked', async () => {
    const onSelect = vi.fn()
    render(<MessageList messages={messages} selectedId={undefined} onSelect={onSelect} />)

    await userEvent.click(screen.getByText('Sophie Turner'))

    expect(onSelect).toHaveBeenCalledOnce()
    expect(onSelect).toHaveBeenCalledWith('msg-1')
  })

  it('fires onSelect when a row is activated via keyboard', async () => {
    const onSelect = vi.fn()
    render(<MessageList messages={messages} selectedId={undefined} onSelect={onSelect} />)

    screen.getByLabelText(/Sophie Turner/i).focus()
    await userEvent.keyboard('{Enter}')

    expect(onSelect).toHaveBeenCalledWith('msg-1')
  })

  it('shows unread indicator only for unread messages', () => {
    render(<MessageList messages={messages} selectedId={undefined} />)

    // msg-1 is unread — aria-label starts with "Unread."
    expect(screen.getByLabelText(/^Unread\./)).toBeInTheDocument()
    // msg-2 is read — no "Unread." prefix
    expect(screen.queryByLabelText(/^Unread\..*Marcus/)).not.toBeInTheDocument()
  })
})
