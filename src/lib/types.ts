export type Task = {
  id: string
  title: string
  label: TaskLabel
  status: TaskStatus
  priority: TaskPriority
  isDuplicate?: boolean
}

export const TaskLabelMap = {
  BUG: 'bug',
  FEATURE: 'feature',
  DOCUMENTATION: 'documentation',
  NONE: 'none',
} as const

export const TaskStatusMap = {
  In_Progress: 'inProgress',
  Done: 'done',
  Todo: 'todo',
  Canceled: 'canceled',
} as const

export type TaskLabel = (typeof TaskLabelMap)[keyof typeof TaskLabelMap]
export type TaskStatus = (typeof TaskStatusMap)[keyof typeof TaskStatusMap]
export type TaskPriority = 'low' | 'medium' | 'high'
