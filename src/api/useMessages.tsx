import { useQuery } from '@tanstack/react-query'
import type { MessagesResponse, Platform } from '../types'

interface MessageFilters {
  platform?: Platform
}

async function fetchMessages(filters: MessageFilters): Promise<MessagesResponse> {
  const params = new URLSearchParams()
  if (filters.platform) params.set('platform', filters.platform)

  const res = await fetch(`/api/inbox/messages?${params}`)
  if (!res.ok) throw new Error('Failed to fetch messages')
  return res.json()
}

export function useMessages(filters: MessageFilters = {}) {
  return useQuery({
    queryKey: ['messages', filters],
    queryFn: () => fetchMessages(filters),
  })
}