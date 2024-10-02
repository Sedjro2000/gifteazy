import React from 'react'
import Sidebar from '@/components/admin/sidebar'
import Navbar from '@/components/admin/navbar' 

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mx-auto'>
      
      <Navbar />

      <div className="flex ">
        
        <aside className="w-1/5 bg-white">
          <Sidebar />
        </aside>

        
        <main className="w-4/5 bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
