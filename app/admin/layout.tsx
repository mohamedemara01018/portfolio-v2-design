import React, { ReactNode } from 'react'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>{children}</div>
    )
}

export default layout