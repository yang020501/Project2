import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Admin/Header";
import Navbar from "../components/Admin/Navbar";
import Category from "../pages/Admin/Category";
import Customers from "../pages/Admin/Customers";
import Dashboard from "../pages/Admin/Dashboard";
import Orders from "../pages/Admin/Orders";
import Products from "../pages/Admin/Products";
import Profile from "../pages/Admin/Profile";
import Setting from "../pages/Admin/Setting";
import Staffs from "../pages/Admin/Staffs";
const AdminLayout = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Header />
      <div className="content">
        <div className="content-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/product" element={<Products />} />
            <Route path="/product/:slug" element={<Products />} />
            <Route path="/customer" element={<Customers />} />
            <Route path="/staff" element={<Staffs />} />
            <Route path="/category" element={<Category />} />
            <Route path="/order" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AdminLayout;
