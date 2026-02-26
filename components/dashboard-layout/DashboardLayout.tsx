import React from 'react'
import DashboardSidebar from '../dashboard-sidebar/DashboardSidebar'
import DashboardHeader from '../dashboard-header/DashboardHeader'

function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex items-center '>
            <div>
                <DashboardSidebar className='w-80' />
            </div>
            <div className='ml-80 w-full'>
                <DashboardHeader />
                <main className='wrapper py-8    '>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout