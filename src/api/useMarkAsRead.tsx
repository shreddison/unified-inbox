import { useMutation, useQueryClient } from '@tanstack/react-query'

async function markAsRead(id: string): Promise<void> {
  const res = await fetch(`/api/inbox/messages/${id}/read`, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to mark as read')
}

export function useMarkAsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: markAsRead,
    onSuccess: (_, id) => {
      // Invalidate both the list and the detail cache
      queryClient.invalidateQueries({ queryKey: ['messages'] })
      queryClient.invalidateQueries({ queryKey: ['message', id] })
    },
  })
}