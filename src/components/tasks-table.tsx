'use client'

import { Task, TaskStatus } from '@/lib/types'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Priority } from './cells/priority'
import { Status } from './cells/status'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useMemo, useState } from 'react'
import { Title } from './cells/title'
import { useTasks } from '@/contexts/tasks'
import { Actions } from './cells/actions'
import { cn } from '@/lib/utils'
import StatusFilter from './status-filter'

export function TasksTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const { tasks } = useTasks()

  const columns: ColumnDef<Task>[] = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: 'Task',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell({ row }) {
          return <Status task={row.original} status={row.getValue('status')} />
        },
      },
      {
        accessorKey: 'title',
        header: 'Title',
        cell({ row }) {
          return (
            <Title
              task={row.original}
              value={row.getValue('title')}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          )
        },
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        cell({ row }) {
          return <Priority task={row.original} priority={row.getValue('priority')} />
        },
      },
      {
        accessorKey: 'actions',
        header: undefined,
        cell({ row }) {
          return <Actions task={row.original} />
        },
      },
    ]
  }, [isEditing])

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <>
      <div className='flex items-center gap-1'>
        <Input
          type='text'
          placeholder='Filter tasks...'
          className='w-fit'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
        />
        <StatusFilter
          onFilterChange={(statuses: TaskStatus[]) => {
            console.log(statuses)
            table.getColumn('status')?.setFilterValue(statuses.join(','))
          }}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild className='ml-auto'>
            <Button variant='outline' size='sm' className='gap-1'>
              <MixerHorizontalIcon />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .filter((column) => column.id !== 'actions' && column.id !== 'id')
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    checked={column.getIsVisible()}
                  >
                    {column.id === 'id' ? 'Task' : column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn('overflow-hidden', {
                    'animate-grow-background bg-opacity-10': row.original.isDuplicate,
                  })}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className='text-right'>{table.getRowCount()}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  )
}
