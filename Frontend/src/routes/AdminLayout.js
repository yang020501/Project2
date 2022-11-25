import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Admin/Header";
import Navbar from "../components/Admin/Navbar";
import Category from "../pages/Admin/Category";
import Customer from "../pages/Admin/Customer";
import Dashboard from "../pages/Admin/Dashboard";
import Order from "../pages/Admin/OrderAdmin";
import ProductAdmin from "../pages/Admin/ProductAdmin";
import Profile from "../pages/Admin/Profile";
import Setting from "../pages/Admin/Setting";
import Staff from "../pages/Admin/Staff";
import ProductViewAdmin from "../pages/Admin/ProductViewAdmin"
import NoPage from "../pages/NoPage";
import OrderViewAdmin from "../pages/Admin/OrderViewAdmin";
import CustomerViewAdmin from "../pages/Admin/CustomerViewAdmin";
const AdminLayout = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Header />
      <div className="content">
        <div className="content-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/product" element={<ProductAdmin />} />
            <Route path="/product/:slug" element={<ProductViewAdmin />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/customer/:id" element={<CustomerViewAdmin />} />
            {/* <Route path="/staff" element={<Staff />} /> */}
            <Route path="/category" element={<Category />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order/:id" element={<OrderViewAdmin />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/setting" element={<Setting />} />
            <Route path="*" element={<NoPage />}></Route>
          </Routes>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AdminLayout;
