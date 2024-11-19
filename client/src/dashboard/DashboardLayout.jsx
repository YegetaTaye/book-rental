import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'
import Dashboard from './dashboard'

function DashboardLayout() {
  return (
    <div className='flex gap-4 h-screen'>
        <SideBar className="h-screen w-10"/>
        <Outlet />
    </div>
  )
}

export default DashboardLayout