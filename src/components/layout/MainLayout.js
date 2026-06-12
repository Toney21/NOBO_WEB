import React from 'react'

/**
 * High-level layout component for app pages.
 */
const MainLayout = ({ children }) => {
    return (
        <div className="main-layout-wrapper min-h-screen">
            {children}
        </div>
    )
}

export default MainLayout
