import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../context/auth.context";
import uuid from 'react-uuid';
import LoadingSpinner from './LoadingSpinner';


function BeverageList() {
    const { user, basket, setBasket, beverage, isLoggedIn, isLoading, setBeverage, searchField, setSearchField } = useContext(AuthContext);
    const [filter, setFilter] = useState('Soft')

      const addBeverageToBasket = (idUser, elem) => {
        setBasket([...basket,elem])
      }

    var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  });

  const [isHovering, setIsHovering] = useState(false);

  const searchFunction = (event) => {
    var lowerCase = event.toLowerCase();
    setSearchField(lowerCase);
    }

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className="head-title">
        Shop
      </div>
      {isLoading && <LoadingSpinner/>}
      {!isLoading &&
        <div className="inside-container bg-secondary">
              <div className="filter-section">
                <input className="input search w-96 text-primary" placeholder='Search ...' value={searchField} onChange={(event) => searchFunction(event.target.value)}/>
                <select value={filter} onChange={(e)=>setFilter(e.target.value)}>
                  <option value="Soft">Soft drinks</option>
                  <option value="Liquor">Liquor & Spirits</option>
                  <option value="Undistilled">Undistilled</option>
                  </select>
              </div>
              <hr className="bg-primary mx-10"/>
          <div className="flex flex-wrap justify-evenly m-10">
              {beverage.filter((elem) => elem.name.toLowerCase().includes(searchField)).map((elem) => 
                  <div key={uuid()} className="cursor-pointer">
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
    </div>}
    </>
  )
}

const ButtonStyle = ({butt}) => {
  return <div className="butt">{butt}</div>
}

export default BeverageList;