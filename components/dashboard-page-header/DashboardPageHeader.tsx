import { LucideIcon, Plus } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

interface DashboardPageHeaderProbs {
  title: string,
  desc: string,
  action?: {
    label: string,
    onClick?: () => void,
    icon?: ReactNode
    href?: string
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
        !action?.href && action ? <button onClick={action.onClick} className='flex gap-2 items-center py-2 px-4  rounded-md bg-(--portfolio-accent) hover:bg-(--portfolio-accent-hover) text-white'>
          {action.icon}
          {action?.label}
        </button> : action && action.href && <Link href={action.href} className='flex gap-2 items-center py-2 px-4  rounded-md bg-(--portfolio-accent) hover:bg-(--portfolio-accent-hover) text-white cursor-pointer'>
          {action.icon}
          {action.label}
        </Link>

      }

    </div>
  )
}

export default DashboardPageHeader