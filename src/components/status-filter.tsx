import React, { useCallback, useEffect, useState } from 'react'
import { PlusCircledIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { TaskStatus, TaskStatusMap } from '@/lib/types'
import { Separator } from './ui/separator'
import { useTasks } from '@/contexts/tasks'
import { Checkbox } from './ui/checkbox'

const status = [
  {
    value: TaskStatusMap.Todo,
    label: 'Todo',
  },
  {
    value: TaskStatusMap.In_Progress,
    label: 'In Progress',
  },
  {
    value: TaskStatusMap.Done,
    label: 'Done',
  },
  {
    value: TaskStatusMap.Canceled,
    label: 'Canceled',
  },
]

interface StatusFilterProps {
  onFilterChange: (status: TaskStatus[]) => void | undefined
}

export function StatusFilter({ onFilterChange }: StatusFilterProps) {
  const { tasks } = useTasks()
  const [open, setOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<Array<TaskStatus>>([])

  const getTotalTasksCount = useCallback((status: TaskStatus) => {
    return tasks.filter((t) => t.status === status).length
  }, [])

  const handleSelect = (currentValue: TaskStatus) => {
    setSelectedStatus((prev) => {
      const newStatus = prev.includes(currentValue)
        ? prev.filter((status) => status !== currentValue)
        : [...prev, currentValue]
      return newStatus
    })
  }

  useEffect(() => {
    onFilterChange(selectedStatus)
  }, [selectedStatus])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' role='combobox' size='sm' className='border-dashed gap-1' aria-expanded={open}>
          <PlusCircledIcon scale={10} />
          Status
          <div className='flex gap-1'>
            {selectedStatus.length ? <Separator orientation='vertical' className='h-auto' /> : null}
            {selectedStatus.length > 2 ? (
              <span className='bg-muted rounded p-1 text-xs'>+3 selected</span>
            ) : (
              selectedStatus.map((s) => (
                <span className='bg-muted rounded p-1 text-xs' key={s}>
                  {status.find((st) => st.value === s)?.label}
                </span>
              ))
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search status...' className='h-9' />
          <CommandList>
            <CommandEmpty>No status found.</CommandEmpty>
            <CommandGroup>
              {status.map((s) => (
                <CommandItem
                  key={s.value}
                  value={s.value}
                  onSelect={(currentValue) => {
                    handleSelect(currentValue as TaskStatus)
                    setOpen(false)
                  }}
                  className='flex items-center justify-between'
                >
                  <span className='flex gap-1 items-center'>
                    <Checkbox checked={selectedStatus.includes(s.value)} />
                    {s.label}
                  </span>
                  <span className='text-xs font-semibold'>{getTotalTasksCount(s.value)}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default StatusFilter
