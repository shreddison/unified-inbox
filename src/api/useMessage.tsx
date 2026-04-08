import { useQuery } from '@tanstack/react-query'
import type { MessageDetailResponse } from '../types'
import { queryKeys } from './queryKeys'

async function fetchMessage(id: string): Promise<MessageDetailResponse> {
  const res = await fetch(`/api/inbox/messages/${id}`)
  if (!res.ok) throw new Error('Failed to fetch message')
  return res.json()
}

export function useMessage(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.message(id),
    queryFn: () => fetchMessage(id as string),
    enabled: !!id,   // don't fire if id is undefined
  })
}