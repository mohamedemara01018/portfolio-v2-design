'use client'

import React, { ChangeEvent, useState } from 'react'
import DashboardSidebar from '../dashboard-sidebar/DashboardSidebar'
import DashboardHeader from '../dashboard-header/DashboardHeader'
import InputForm from '../input-form/InputForm'
import Notification, { NotificationState } from '../notification/Notification'
import { authenticate } from '@/utils/actions/publicActions'

function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [isLogin, setLogin] = useState(false)
    const [notification, setNotification] = useState<NotificationState | null>(null)
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const { name, value } = e.currentTarget;
        setFormData((prev) => ({ ...prev, [name]: value }))

    }


    const handleSubmit = async () => {


        const result = await authenticate(formData)

        if (result.success) {
            setNotification({ message: 'Login succeeded', type: 'success' });
            setLogin(true);
        } else {
            setNotification({ message: 'Error Failed', type: 'error' });
        }

    }
    return (
        <>

            {isLogin ?
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
                : <div className=' h-screen flex items-center justify-center'>
                    <form method='POST' action={handleSubmit} className='bg-card shadow p-10 rounded-xl w-100 border border-border space-y-6'>
                        <InputForm id='username' label='Username' name='username' placeholder='username' value={formData.username} handleChange={handleChange} />
                        <InputForm id='password' label='Password' name='password' placeholder='password' value={formData.password} handleChange={handleChange} type='password' />
                        <button className='bg-(--portfolio-accent) hover:bg-(--portfolio-accent-hover) text-white  p-2 rounded-sm w-full'>
                            Login
                        </button>
                    </form>
                </div>
            }
            <Notification notification={notification} onClose={() => setNotification(null)} />
        </>
    )
}

export default DashboardLayout