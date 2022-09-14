import React, { useContext, useState } from 'react';
import { AuthContext } from "../context/auth.context";
import uuid from 'react-uuid';


function BeverageList() {
    const { user, basket, setBasket, beverage, isLoggedIn } = useContext(AuthContext); 

      const addBeverageToBasket = (idUser, elem) => {
        setBasket([...basket,elem])
      }

    var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  });

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <>
      <div className="title">
        Shop
      </div>
        <div className="inside-container bg-secondary">
          <div className="flex flex-wrap justify-evenly mx-10">
              {beverage.map((elem) => 
                  <div key={uuid()} >
                      <img src={elem.imageUrl} alt="beverage" className={isHovering ? 'img-product card' : 'img-product card'} onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}/>
                      <div>
                      <h1 className="text-fourthy font-bold">{elem.name}</h1>
                      <div className="flex justify-between text-ternary">
                        <p>{formatter.format(elem.price)}</p>
                        <p>{elem.quantity} cl</p>
                      </div>
                      </div>
                  {isLoggedIn && <ButtonStyle butt={<button className="button-style" onClick={()=> {addBeverageToBasket(user._id, elem)}}>Add to Basket</button>}/>}
                  </div>
              )}
          </div>
    </div>
    </>
  )
}

const ButtonStyle = ({butt}) => {
  return <div className="butt">{butt}</div>
}

export default BeverageList;