import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import { DotsHorizontalIcon, TrashIcon } from '@radix-ui/react-icons'
import { Task, TaskLabel, TaskLabelMap } from '@/lib/types'
import { useTasks } from '@/contexts/tasks'

interface ActionProps {
  task: Task
}

export function Actions({ task }: ActionProps) {
  const { onUpdateTask, onDuplicateTask, onDeleteTask } = useTasks()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <DotsHorizontalIcon className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onDuplicateTask(task)}>Make a copy</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Label</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={task.label}
                onValueChange={(label) => onUpdateTask(task, { label: label as TaskLabel })}
              >
                {Object.entries(TaskLabelMap).map(([key, label]) => {
                  return (
                    <DropdownMenuRadioItem key={key} value={label}>
                      {label}
                    </DropdownMenuRadioItem>
                  )
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div
            className='flex gap-1 w-full justify-between items-center text-red-500'
            onClick={() => onDeleteTask(task.id)}
          >
            Delete
            <TrashIcon />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
