import React from 'react'
import { Link, useLocation } from 'react-router-dom'
const Navbar = () => {
    const mainNav = [
        {
            display: "Dashboard",
            path: "/admin"
        },
        {
            display: "Products",
            path: "/admin/products"
        },
        {
            display: "Category",
            path: "/admin/category"
        },
        {
            display: "Orders",
            path: "/admin/orders"
        },
        {
            display: "Customers",
            path: "/admin/customers"
        },
        {
            display: "Staffs",
            path: "/admin/staffs"
        },
        {
            display: "Profile",
            path: "/admin/profile"
        },
    ]
    const location = useLocation();
    const { pathname } = useLocation();
    const activeNav = mainNav.findIndex(e => e.path === pathname)
    console.log(pathname);
    return (

        <aside className='navbar'>
            <div className='navbar-header'>
                Hello
                <div className='navbar-header-icon'>
                    <button>icon</button>
                </div>
            </div>
            <nav className='navbar-body'>
                <ul className='navbar-body-menu'>
                    {
                        mainNav.map((item, index) => (
                            <li key={index} className={`navbar-body-menu-item  ${index === activeNav ? 'active' : ''}`}><Link className='navbar-body-menu-item-link' to={item.path}>{item.display}</Link></li>
                        )
                        )
                    }
                </ul>
            </nav>
        </aside>

    )
}

export default Navbar