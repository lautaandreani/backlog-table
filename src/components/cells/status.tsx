import { Task, TaskStatus, TaskStatusMap } from '@/lib/types'
import { CheckCircledIcon, CircleIcon, CrossCircledIcon, TimerIcon } from '@radix-ui/react-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useTasks } from '@/contexts/tasks'

interface StatusProps {
  status: TaskStatus
  task: Task
}

const STATUS_CONFIG: Record<TaskStatus, { label: string; icon: JSX.Element }> = {
  [TaskStatusMap.Canceled]: {
    label: 'Canceled',
    icon: <CrossCircledIcon />,
  },
  [TaskStatusMap.Done]: {
    label: 'Done',
    icon: <CheckCircledIcon />,
  },
  [TaskStatusMap.In_Progress]: {
    label: 'In Progress',
    icon: <TimerIcon />,
  },
  [TaskStatusMap.Todo]: {
    label: 'Todo',
    icon: <CircleIcon />,
  },
}

export function Status({ task, status }: StatusProps) {
  const { onUpdateTask } = useTasks()
  return (
    <div className='flex gap-1 items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className='size-6'>
            {STATUS_CONFIG[status].icon}
          </Button>
        </DropdownMenuTrigger>
        {STATUS_CONFIG[status].label}
        <DropdownMenuContent>
          {Object.entries(STATUS_CONFIG).map(([key, value]) => {
            return (
              <DropdownMenuItem
                key={key}
                className='flex gap-2'
                onClick={() => onUpdateTask(task, { status: key as TaskStatus })}
              >
                {value.icon} {value.label}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
