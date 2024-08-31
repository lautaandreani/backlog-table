import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { useTasks } from '@/contexts/tasks'
import { Task } from '@/lib/types'

interface TitleProps {
  task: Task
  value: string
  isEditing: string | null
  setIsEditing: (id: string | null) => void
}

export function Title({ task, value, isEditing, setIsEditing }: TitleProps) {
  const { onUpdateTask } = useTasks()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = formData.get('title') as string
    setIsEditing(null)
    onUpdateTask(task, { title })
  }

  return (
    <div className='flex gap-1 items-center group relative'>
      {task.label !== 'none' && <Badge variant='outline'>{task.label}</Badge>}
      {isEditing === task.id ? (
        <form onSubmit={handleSubmit}>
          <Input defaultValue={value} className='w-fit' autoFocus name='title' />
        </form>
      ) : (
        <span className='truncate max-w-[15rem]' title={value}>
          {value}
        </span>
      )}
      <Button
        variant='ghost'
        size='icon'
        className='size-5 group-hover:visible invisible'
        onClick={() => setIsEditing(isEditing === task.id ? null : task.id)}
      >
        <Pencil1Icon />
      </Button>
    </div>
  )
}
