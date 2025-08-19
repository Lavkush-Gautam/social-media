import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { dummyUserData } from '../../assets/assets'
import Loading from '../Loading'

const Layout = () => {
  const user = dummyUserData
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return user ? (
    <div className='w-full h-screen flex'>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className='flex-1 bg-slate-50'>
        <Outlet />
      </div>

      {
        sidebarOpen ? <X className='absolute top-3 right-3 z-100 p-2 bg-white rounded-md w-10 h-10 text-gray-600 sm:hidden cursor-pointer' onClick={() => setSidebarOpen(false)} /> : <Menu onClick={() => setSidebarOpen(true)} className='absolute top-3 right-3 z-100 p-2 bg-white rounded-md w-10 h-10 text-gray-600 sm:hidden cursor-pointer' />
      }
    </div>
  )
    : (
      <Loading />
    )
}

export default Layout