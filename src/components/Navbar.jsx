import React, {useContext, useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
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

  return (
    <div className="flex navbar">
      {/* <button onMouseOver={LogoShining} onMouseOut={LogoShiningOff} onClick={() => navigate("/")}> */}
      <button className="home-butt" onMouseOver={LogoShining} onMouseOut={LogoShiningOff} onClick={() => navigate("/")}>
        <FaGlassMartiniAlt size='2rem'/>
      {/* <img src={logoImage} alt="logo" className="logo mx-10"/> */}
      </button>
      {/* <div>
        <NavBarButtonStyle1 icon={<Link to="/">Home</Link>}/>
      </div> */}
      <div>
      <NavBarButtonStyle1 icon={<Link to="/drinks">Shop</Link>}/>
      </div>

      <div>
      <NavBarButtonStyle1 icon={<Link to="/drinks">About</Link>}/>
      </div>

   {!isLoggedIn && 
   <>
   <NavBarButtonStyle1 icon={<Link to="/signup">Signup</Link>}/>
   <NavBarButtonStyle1 icon={<Link to="/login">Login</Link>}/>
   
    </>}

    {isLoggedIn ? <NavBarButtonStyle1 icon={<Link to="/admin">Admin</Link>}/> : null}
    {isLoggedIn ? <NavBarButtonStyle1 icon={<Link to="/account">My Account</Link>}/> : null}
    {/* {basket.length !== 0 && <><NavBarButtonStyle1 icon={basket.length}/></>} */}
    {user &&  <button className="basket flex flex-wrap hover:text-fourthy" onClick={(e) => showBasketFunction()}><FaShoppingBasket size='2rem'/></button>}

    <div className="orders-in-basket">{basket.length === 0 ? null : <div>({basket.length})</div>} </div>

    {/* {user && <BasketStyle icon={<FaShoppingBasket width="200"/>} basket={<Basket/>}/>} */}
  </div>
  )
}

const NavBarButtonStyle1 = ({icon}) => (
  <div className="sidebar-icon">
    {icon}
  </div>
);

// const BasketStyle = ({basket, icon}) => (
//   <div className="basket">
//     {basket}{icon}
//   </div>
// )

export default Navbar;