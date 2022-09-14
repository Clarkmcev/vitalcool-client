import React from 'react'
import { Link, Outlet } from "react-router-dom";


function NavbarAdmin() {
  return (
    <>
    <div className="subnavbar">
      <div>
        <NavBarButtonStyle2 className="content-navbar" icon={<Link to="products">Products</Link>}/>
      </div>
      <div>
      <NavBarButtonStyle2 className="content-navbar" icon={<Link to="new-product">New product</Link>}/>
      </div>
      <div>
      <NavBarButtonStyle2 className="content-navbar" icon={<Link to="orders">Orders</Link>}/>
      </div>
    </div>

    <Outlet/>
    </>
  )
}

const NavBarButtonStyle2 = ({icon}) => {
  return <div className="sub-icon">
    {icon}
  </div>
}

export default NavbarAdmin