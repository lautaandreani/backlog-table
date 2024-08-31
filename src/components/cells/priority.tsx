import { ChevronDownIcon, ChevronUpIcon, PauseIcon } from '@radix-ui/react-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Task, TaskPriority } from '@/lib/types'
import { useTasks } from '@/contexts/tasks'

const PRIORITY_CONFIG = {
  low: {
    label: 'Low',
    icon: <ChevronDownIcon className='text-blue-500' />,
  },
  medium: {
    label: 'Medium',
    icon: <PauseIcon className='rotate-90 text-yellow-500' />,
  },
  high: {
    label: 'High',
    icon: <ChevronUpIcon className='text-red-500' />,
  },
}

interface PriorityProps {
  priority: TaskPriority
  task: Task
}

export function Priority({ priority, task }: PriorityProps) {
  const { onUpdateTask } = useTasks()

  const onUpdatePriority = (priority: TaskPriority) => {
    onUpdateTask(task, { priority })
  }

  return (
    <div className='flex gap-2 items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className='size-5'>
            {PRIORITY_CONFIG[priority].icon}
          </Button>
        </DropdownMenuTrigger>
        {PRIORITY_CONFIG[priority].label}
        <DropdownMenuContent>
          {Object.entries(PRIORITY_CONFIG).map(([key, value]) => {
            return (
              <DropdownMenuItem key={key} className='flex gap-2' onClick={() => onUpdatePriority(key as TaskPriority)}>
                {value.icon} {value.label}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
