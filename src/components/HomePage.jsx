import React, {useContext, useState, useNavigate} from 'react'
import logo from "../img/logo-main2.png";
import { AuthContext } from "../context/auth.context";
import imgAlcool from "../img/alcool-bar.jpg"
import { MdBorderColor } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { BiHappyHeartEyes } from 'react-icons/bi';
import uuid from 'react-uuid';


function HomePage() {
  const { isLoggedIn, user, showBasket, setShowBasket, beverage, basket, setBasket } = useContext(AuthContext);
  const [isHovering, setIsHovering] = useState(false);


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

  return (

    <div> 
          {user && 
      <div className="container-home">
          <div className="home-container">
            <div className="home-1">
                {/* <img src={imgAlcool} alt="img-alcohol" className="img-home"/> */}
                <div className='text-right mr-10 py-40 '>
                  <div className="text-lg font-bold">Thirsty? Missing your energy for the night? Vitalcool got you!</div>
                  <div className="italic">Since 1867</div>
                </div>
              </div>
            <div className="logo2">
                <img src={logo} alt="logo" className="relative w-8/12 m-auto"/>
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
          <button className="butt">Shop</button>
    </div>
  </div>
  
  </div>
              <div className="home-3">
              <div className="flex-arrow1">
                  <div className="arrow-down m-auto"></div>
                </div>
                <div className="title">Wanna know more?</div>
                <button className="butt">Contact us</button>
          </div>
      </div>
    </div>}

      {!user ?  
      <div className="wrapper">
        <div className="flex flex-wrap flex-col">
          <img src={logo} alt="logo" className="logo-main relative mx-auto"/>
          {/* <button className="form-button relative mx-auto">Login</button> */}
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