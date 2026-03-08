'use client';
import { FileText, FolderGit2, Home, LayoutDashboard, Award, Briefcase, MessageSquare, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react'

interface DashboardSidebarProbs {
  className: string
}
function DashboardSidebar({ className }: DashboardSidebarProbs) {
  const [activeLink, setActiveLink] = useState('Hero Section');
  const navItems = [
    { icon: Home, label: "Hero Section", href: "/admin" },
    { icon: FolderGit2, label: "Projects", href: "/admin/projects" },
    { icon: Award, label: "Certificates", href: "/admin/certificates" },
    { icon: FileText, label: "Blog Posts", href: "/admin/blogs" },
    { icon: Award, label: "Skills", href: "/admin/skills" },
    { icon: Briefcase, label: "Experience", href: "/admin/experiences" },
    { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
  ];

  const pathName = usePathname();

  useEffect(() => {
    navItems.map((item) => {
      if (String(item.href).trim() == String(pathName).trim() || String(pathName).trim() == '/admin/blogs/create') {
        if (String(pathName).trim() == '/admin/blogs/create') {
          setActiveLink('Blog Posts')
        } else {
          setActiveLink(item.label)
        }
      }
    })
  }, [pathName])


  return (
    <div className={`fixed top-0 bottom-0 left-0 p-4 w-70 bg-background dark:bg-(--portfolio-bg-secondary) border border-r border-border  shadow-sm ${className}`}>
      <div className='flex flex-col justify-between  h-full'>
        <div className='flex flex-col items-start gap-8 '>
          <div className='flex gap-2 p-2 border-b border-border w-full'>
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-(--portfolio-accent) to-purple-600 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Admin</h2>
              <p className="text-xs text-muted-foreground">Portfolio CMS</p>
            </div>
          </div>

          <div className='w-full'>
            <ul className='space-y-2'>
              {
                navItems && navItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <li key={idx}>
                      <Link

                        href={`${item.href}`}
                        className={`flex gap-2 text-muted-foreground w-full py-3 px-4 rounded-md ${activeLink == item.label ? '' : 'hover:bg-accent hover:text-(--portfolio-accent)'}  ${activeLink == item.label ? 'bg-(--portfolio-accent-hover) text-white' : ''}`}>
                        <Icon className='' />
                        <p className=''>{item.label}</p>
                      </Link>
                    </li>

                  )
                })
              }

            </ul>
          </div>
        </div>
        <div className='py-4 px-2  border-t border-border'>
          <Link href={'/'} className='flex gap-2 text-muted-foreground hover:bg-accent hover:text-(--portfolio-accent) p-4 rounded-md'>
            <Home />
            <p>Back to Portfolio</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar