import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faShoppingBag, faList, faCartPlus, faUser, faUserShield, faAddressCard, faGear } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const mainNav = [
        {
            display: "Dashboard",
            path: "/admin",
            icon: faHouse
        },
        {
            display: "Products",
            path: "/admin/products",
            icon: faShoppingBag
        },
        {
            display: "Category",
            path: "/admin/category",
            icon: faList
        },
        {
            display: "Orders",
            path: "/admin/orders",
            icon: faCartPlus
        },
        {
            display: "Customers",
            path: "/admin/customers",
            icon: faUser
        },
        {
            display: "Staffs",
            path: "/admin/staffs",
            icon: faUserShield
        },
        {
            display: "Profile",
            path: "/admin/profile",
            icon: faAddressCard
        },
        {
            display: "Setting",
            path: "/admin/setting",
            icon: faGear
        },
    ]
    const { pathname } = useLocation();
    const activeNav = mainNav.findIndex(e => e.path === pathname)
    return (

        <aside className='navbar'>
            <div className='navbar-header'>
                Logo
                {/* <div className='navbar-header-icon'>
                    <button>icon</button>
                </div> */}
            </div>
            <nav className='navbar-body'>
                <ul className='navbar-body-menu'>
                    {
                        mainNav.map((item, index) => (
                            <React.Fragment key={index}>
                                {item.display === 'Profile' ? <hr /> : '' } 
                                <li  className={`navbar-body-menu-item  ${index === activeNav ? 'active' : ''}`}>
                                    <Link className='navbar-body-menu-item-link' to={item.path}>
                                        <FontAwesomeIcon icon={item.icon} />
                                        <span>{item.display}</span>

                                    </Link>

                                </li>
                            </React.Fragment>
                        )
                        )
                    }
                </ul>
            </nav>

        </aside>

    )
}

export default Navbar