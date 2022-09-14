import React, { useContext } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function NavbarAccount() {
  const { logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logOutUserAccount = () => {
    logOutUser();
    navigate("/");
  }

  return (
    <>
    <div className="subnavbar">
        <div>
          <NavBarButtonStyle2 icon={<Link to="orders">Orders</Link>}/>
        </div>
        <div>
        <NavBarButtonStyle2 icon={<Link to="details">Details</Link>}/>
        </div>
        <div>
        <NavBarButtonStyle2 icon={<Link to="payments">Payments</Link>}/>
        </div>
        <div>
        <NavBarButtonStyle2 icon={<button onClick={logOutUserAccount}>Logout</button>}/>
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