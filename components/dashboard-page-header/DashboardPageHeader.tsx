import { LucideIcon, Plus } from 'lucide-react'

interface DashboardPageHeaderProbs {
  title: string,
  desc: string,
  action?: {
    label: string,
    onClick: () => void,
    icon?: LucideIcon
  }
}

function DashboardPageHeader({ title, desc, action }: DashboardPageHeaderProbs) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-col items-start gap-2'>
        <h1 className='text-3xl font-bold '>{title}</h1>
        <p className='text-muted-foreground'>{desc}</p>
      </div>
      {
        action && <button className='flex gap-2 items-center py-2 px-4  rounded-md bg-(--portfolio-accent) hover:bg-(--portfolio-accent-hover) text-white'>
          {action?.icon && <Plus className='w-4 h-4' />}
          {action?.label}
        </button>
      }
    </div>
  )
}

export default DashboardPageHeader