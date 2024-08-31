import { TasksTable } from '@/components/tasks-table'
import { TypographyP, TypographyH2 } from '@/components/ui/typography'

export default function Home() {
  return (
    <main className='flex flex-col items-start space-y-4 max-w-screen-xl border rounded-lg my-auto p-4 w-full mx-8'>
      <header>
        <TypographyH2 className='font-bold'>Backlog</TypographyH2>
        <TypographyP className='text-muted-foreground'>Here&apos;s a list of your tasks</TypographyP>
      </header>

      <section className='w-full space-y-4'>
        <TasksTable />
      </section>
    </main>
  )
}
