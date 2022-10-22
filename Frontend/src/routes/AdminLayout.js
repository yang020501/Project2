import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Admin/Dashboard'
const AdminLayout = () => {
    return (
        <React.Fragment>
            <div> 
                <aside className='navbar'>
                    Hello
                </aside>
            </div>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/products' />
                <Route path='/customers' />
                <Route path='/staffs' />
                <Route path='/category' />
                <Route path='/orders' />
            </Routes>
        </React.Fragment>
    )
}

export default AdminLayout