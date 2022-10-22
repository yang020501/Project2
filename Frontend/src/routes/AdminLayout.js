import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Admin/Navbar'
import Dashboard from '../pages/Admin/Dashboard'
const AdminLayout = () => {
    return (
        <React.Fragment>
            <Navbar />
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