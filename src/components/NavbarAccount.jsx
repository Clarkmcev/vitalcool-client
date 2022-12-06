import React, { useContext } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function NavbarAccount() {
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
          <NavBarButtonStyle2 icon={<NavLink  to="orders" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Orders</NavLink>}/>
        </div>
        <div>
        <NavBarButtonStyle2 icon={<NavLink to="details" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Details</NavLink>}/>
        </div>
        <div>
        <NavBarButtonStyle2 icon={<NavLink to="payments" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Payments</NavLink>}/>
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

export default NavbarAccount