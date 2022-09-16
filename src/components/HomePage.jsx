import React, {useContext, useState, useEffect} from 'react'
import logo from "../img/vitalcool-logo-main.png";
import { AuthContext } from "../context/auth.context";
import imgAlcool from "../img/alcool-bar.jpg"
import imgSince from "../img/since.png"
import { MdBorderColor } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { BiHappyHeartEyes } from 'react-icons/bi';
import uuid from 'react-uuid';
import { useNavigate } from "react-router-dom";
import LoadingSpinner from './LoadingSpinner';


function HomePage() {
  const { isLoggedIn, user, showBasket, setShowBasket, beverage, basket, setBasket, isLoading, setIsLoading } = useContext(AuthContext);
  const [isHovering, setIsHovering] = useState(false);

  const navigate = useNavigate()

  const addBeverageToBasket = (idUser, elem) => {
    setBasket([...basket,elem])
  }

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  });

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // setTimeout(setShowBasket(true),2000)

  return (
    <div> 
      {isLoading && <LoadingSpinner/>}
          {user && 
      <div className="container-home">
          <div className="home-container">
            <div className="home-1">
                  <div className="catch">Get rid of the thirst</div>
              </div>
            <div className="logo2">
                <img src={logo} alt="logo" className="relative w-6/12 m-auto"/>
                <img src={imgSince} alt="logo" className="since"/>
                <div className="pb-5 text-ternary">
                  <div>Thirsty? Missing your energy for the night? Vitalcool got you!</div>
                  <div className="italic">"Delightful"</div>
                </div>
            </div>
              <div className="home-2 text-primary">
              <div className="row">
                  <p className="title-home">Choose</p>
                  <div className="ml-20 my-5"><FaSearch size="4em"/></div>
                  <p className="font-light">Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
                </div>
                <div className='vl2'></div>
                <div className="row">
                  <p className="title-home">Order</p>
                  <div className="ml-20 my-5"><MdBorderColor size="4em" /></div>
                  <p className="font-light">Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
                </div>
                <div className='vl2'></div>
                  <div className="row">
                  <p className="title-home">Drink</p>
                    <div className="ml-20 my-5"><BiHappyHeartEyes size="4em"/></div>
                  <p className="font-light">Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
                </div>
              </div>
              <div className="home-3 bg-secondary">
                <div className="flex-arrow1">
                  <div className="arrow-down m-auto"></div>
                </div>
                <div className="title-home text-4xl">Our products</div>
         <div>
            <div className="inside-container-home">
              <div className="flex flex-wrap justify-evenly">
              {beverage.filter((item,idx) => idx < 3).map((elem) => 
                  <div key={uuid()} >
                      <img src={elem.imageUrl} alt="beverage" className={isHovering ? 'img-product card' : 'img-product card'} onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}/>
                        <div>
                          <h1 className="text-fourthy font-bold">{elem.name}</h1>
                          <div className="flex justify-evenly text-ternary mx-20">
                            <p>{formatter.format(elem.price)}</p>
                            <p>{elem.quantity} cl</p>
                          </div>
                      </div>
                  </div>
              )}
          </div>
          <button onClick={()=>{navigate("drinks")}} className="butt">Shop</button>
    </div>
  </div>
  </div>
            <div className="home-3">
              <div className="flex-arrow1">
                  <div className="arrow-down m-auto"></div>
                </div>
                <div className="catch font-thin">Wanna know more?</div>
                <button className="butt my-5">Contact us</button>
          </div>
          <div className="home-1-bis">
                <div className='text-right mr-10 py-40 '>
                  <div className="text-4xl">vitalcool@vital.com</div>
                </div>
              </div>
      </div>
    </div>}
      {!user ?  
      <div className="wrapper">
        <div className="flex flex-wrap flex-col relative">
          <img src={logo} alt="logo" className="logo-main relative mx-auto"/>
          <div className="inside-container-home1 mx-auto">
            <div>Login now!</div>
            <button onClick={()=>{navigate("login")}} className="form-button relative mx-auto">Login</button>
            <div>No account? register right now</div>
            <button onClick={()=>{navigate("signup")}} className="form-button relative mx-auto">Register</button>
          </div>
         </div>
        <div>
      </div>
      </div> : null}
  </div>
  )
}

const ButtonStyle = ({butt}) => {
  return <div className="butt">{butt}</div>
}

export default HomePage;