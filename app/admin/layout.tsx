import DashboardLayout from '@/components/dashboard-layout/DashboardLayout'
import React, { ReactNode } from 'react'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <DashboardLayout children={children} />
        </>
    )
}

export default layout