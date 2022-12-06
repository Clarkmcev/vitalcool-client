import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { NavLink, useNavigate, Outlet } from "react-router-dom";

function NavbarAdmin() {
  const { logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logOutUserAccount = () => {
    logOutUser();
    navigate("/");
  }

  let activeStyle = {
    textDecoration: "underline",
  };

  return (
    <>
    <div className="subnavbar flex justify-between">
    <div className="flex">
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
      <div className="">
        <NavBarButtonStyle2 icon={<button className="butt-admin" onClick={logOutUserAccount}>Logout</button>}/>
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