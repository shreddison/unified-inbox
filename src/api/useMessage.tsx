// src/api/useMessage.ts
import { useQuery } from '@tanstack/react-query'
import type { MessageDetailResponse } from '../types'

async function fetchMessage(id: string): Promise<MessageDetailResponse> {
  const res = await fetch(`/api/inbox/messages/${id}`)
  if (!res.ok) throw new Error('Failed to fetch message')
  return res.json()
}

export function useMessage(id: string | undefined) {
  return useQuery({
    queryKey: ['message', id],
    queryFn: () => fetchMessage(id!),
    enabled: !!id,   // don't fire if id is undefined
  })
}