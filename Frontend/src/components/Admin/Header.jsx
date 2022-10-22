import React from 'react'
import { Dropdown } from 'react-bootstrap'

const Header = () => {
    return (

        <div className='ad_header'>
            <Dropdown>
                <Dropdown.Toggle bsPrefix='dropdown-toggle dropdown-avatar' >
                    <img src='https://static-admin-dashboard-example.netlify.app/images/favicon.png' />

                </Dropdown.Toggle>

                <Dropdown.Menu align={{ xxl: "end" }}>
                    <Dropdown.Item href="/admin/profile">My profile</Dropdown.Item>
                    <Dropdown.Item href="/admin/setting">Setting</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="" style={{ color: 'red' }}>Đăng xuất</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {/* <div class="dropdown nav-item">
                <a class="dropdown-toggle" data-bs-toggle="dropdown" href="/products" aria-expanded="false">
                    <img class="img-xs rounded-circle" src="/images/favicon.png" alt="User" />
                </a>
                <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="/">My profile</a>
                    <a class="dropdown-item" href="/products">Settings</a>
                    <a class="dropdown-item text-danger" href="/products">Exit</a>
                </div>
            </div> */}
        </div >

    )
}

export default Header