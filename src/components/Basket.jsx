import React, {useContext, useEffect} from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import uuid from 'react-uuid';
import { FaWindowClose } from 'react-icons/fa';
import { BsDashSquareFill, BsFillPlusSquareFill } from 'react-icons/bs';

function Basket() {
    const { user, basket, setBasket, setShowBasket, showBasket } = useContext(AuthContext);

    const removeItem = (elem) => {
      if (elem.number === 1) {
        const index = basket.indexOf(elem)
        const arr = [...basket]
        arr.splice(index, 1)
        setBasket([...arr])
      } else {
        elem.number --
        const arr = [...basket]
        setBasket([...arr])
      }
    }

    const addItem = (elem) => {
      elem.number ++
      const arr = [...basket]
      setBasket([...arr])
    }

    var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      });

    const sumTot = () => {
        if (basket.length === 1) {
            let n = formatter.format(basket[0].price);
            return <div>{n}</div>;
        }

        try {
            let n = formatter.format(basket.reduce((a,b) =>{ return a + b.price * b.number},0));
            return <div>{n}</div>
        } catch(err) {
        }
      }

      useEffect(() => {
        sumTot();
      },[])

      if (basket.length === 0) {
        return <></>
      }

  return (
    <div className="basket-container absolute">
        <div className='my-5 text-primary title ml-2 '>Your basket<button onClick={()=>setShowBasket(!showBasket)}><FaWindowClose className="cross" size="2rem"/></button></div>
        <hr/>

        <div>{basket.map((elem) =>  
            <div key={uuid()} className="order-row text-left">
              <div className="w-32">{elem.name}</div> 
              <div className="w-32">{formatter.format(elem.price * elem.number)}</div>

              <button className="text-primary hover:scale-105" onClick={()=> {removeItem(elem)}}><BsDashSquareFill size={"32px"}/></button>
              <p>{elem.number}</p>
              <button className="text-primary  hover:scale-105" onClick={()=> {addItem(elem)}}><BsFillPlusSquareFill size={"32px"}/></button>
            </div>)}
        </div>
        <hr/>
        {basket.length > 0 && user ? <div className="order-row text-left"><div className="w-32">Total :</div><div className="w-32">{sumTot()}</div><div className="w-32"></div><button onClick={()=> setShowBasket(!showBasket)}><ButtonStyleOrder butt={<Link to="/order">Order</Link>}/></button></div> : null}
        
    </div>
  )
}

const ButtonStyleOrder = ({butt}) => {
  return <div className="butt-order">{butt}</div>
}

export default Basket