import { createContext, useContext, useState } from 'react'
import { MOCK_TASKS } from '@/lib/data'
import { Task } from '@/lib/types'
import { generateId } from '@/lib/utils'

interface TaskContextType {
  tasks: Task[]
  onUpdateTask: (task: Task, payload: Partial<Task>) => void
  onDeleteTask: (taskId: string) => void
  onDuplicateTask: (task: Task) => void
}

const TaskContext = createContext<TaskContextType | null>(null)

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)

  const onUpdateTask = (task: Task, payload: Partial<Task>) => {
    setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? { ...t, ...payload } : t)))
  }

  const onDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId))
  }

  const onDuplicateTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, { ...task, id: generateId(), isDuplicate: true }])
  }

  return (
    <TaskContext.Provider value={{ tasks, onUpdateTask, onDeleteTask, onDuplicateTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider')
  }
  return context
}
