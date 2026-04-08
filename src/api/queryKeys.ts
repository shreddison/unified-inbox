import type { MessageFilters } from './types'

export const queryKeys = {
  messages: (filters?: MessageFilters) => filters ? ['messages', filters] as const : ['messages'] as const,
  message:  (id?: string)             => ['message', id] as const,
}
