import React, {useContext, useState} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Basket from './Basket';
import { FaShoppingBasket, FaGlassMartiniAlt } from 'react-icons/fa';
import logoImage from "../img/vitalcool.png";
import logoImage2 from "../img/vitalcool3.png";

function Navbar() {
  const { isLoggedIn, user, showBasket, setShowBasket, basket } = useContext(AuthContext);
  let navigate = useNavigate();
  
  const LogoShining = (e) => {
    e.target.src = logoImage2;
  }

  const LogoShiningOff = (e) => {
    e.target.src = logoImage;
  }

  const showBasketFunction = () => {
    setShowBasket(!showBasket);
    console.log(showBasket)
  }

  let activeStyle = {
    color: "#C3FF99",
    textDecoration: 'none'
  };

  // let activeClassName = "underline";

  return (
    <div className="flex navbar">
      <button className="home-butt" onMouseOver={LogoShining} onMouseOut={LogoShiningOff} onClick={() => navigate("/")}>
        <FaGlassMartiniAlt size='2rem'/>
      </button>
      <div>
      <NavBarButtonStyle1 icon={<NavLink  to="/drinks" style={({ isActive }) =>
              isActive ? activeStyle : { textDecoration: 'none' }
            }>Shop</NavLink>}/>
      </div>
      {/* <div>
      <NavBarButtonStyle1 icon={<NavLink to="/drinks" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>About</NavLink>}/>
      </div> */}

   {!isLoggedIn && 
   <>
   <NavBarButtonStyle1 icon={<NavLink to="/signup" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Signup</NavLink>}/>
   <NavBarButtonStyle1 icon={<NavLink to="/login" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Login</NavLink>}/>
   
    </>}
    {isLoggedIn ? <NavBarButtonStyle1 icon={<NavLink to="/admin" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Admin</NavLink>}/> : null}
    {isLoggedIn ? <NavBarButtonStyle1 icon={<NavLink to="/account" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>My Account</NavLink>}/> : null}
    {user &&  <button className="basket flex flex-wrap hover:text-fourthy" onClick={(e) => showBasketFunction()}><FaShoppingBasket size='2rem'/></button>}
    <div className="orders-in-basket">{basket.length === 0 ? null : <div>({basket.length})</div>} </div>
  </div>
  )
}

const NavBarButtonStyle1 = ({icon}) => (
  <div className="sidebar-icon">
    {icon}
  </div>
);

export default Navbar;