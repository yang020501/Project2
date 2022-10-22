import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../components/Admin/Header'
import Navbar from '../components/Admin/Navbar'
import Category from '../pages/Admin/Category'
import Customers from '../pages/Admin/Customers'
import Dashboard from '../pages/Admin/Dashboard'
import Orders from '../pages/Admin/Orders'
import Products from '../pages/Admin/Products'
import Profile from '../pages/Admin/Profile'
import Setting from '../pages/Admin/Setting'
import Staffs from '../pages/Admin/Staffs'
const AdminLayout = () => {
    return (
        <React.Fragment>
            <Navbar />
            <Header />
            <div className='content'>
                <Routes >
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/customers' element={<Customers />} />
                    <Route path='/staffs' element={<Staffs />} />
                    <Route path='/category' element={<Category />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/setting' element={<Setting />} />
                </Routes>
            </div>

        </React.Fragment>
    )
}

export default AdminLayout