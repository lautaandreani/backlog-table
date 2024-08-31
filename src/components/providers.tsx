'use client'

import { TasksProvider } from '@/contexts/tasks'

export function Providers({ children }: { children: React.ReactNode }) {
  return <TasksProvider>{children}</TasksProvider>
}
