import React from 'react'
import { NavLink, Outlet } from "react-router-dom";


function NavbarAdmin() {
  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";

  return (
    <>
    <div className="subnavbar">
      <div>
        <NavBarButtonStyle2 className="content-navbar" icon={<NavLink to="products" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Products</NavLink>}/>
      </div>
      <div>
      <NavBarButtonStyle2 className="content-navbar" icon={<NavLink to="new-product" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>New product</NavLink>}/>
      </div>
      <div>
      <NavBarButtonStyle2 className="content-navbar" icon={<NavLink to="orders" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Orders</NavLink>}/>
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