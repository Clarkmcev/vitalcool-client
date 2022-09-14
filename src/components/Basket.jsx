import React, {useContext, useEffect} from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import uuid from 'react-uuid';
import { FaWindowClose } from 'react-icons/fa';

function Basket() {
    const { user, basket, setBasket, setShowBasket, showBasket } = useContext(AuthContext);

    const removeItem = (id) => { 
        let index = basket.map(function(e) { return e._id; }).indexOf(id);
        basket.splice(index,1);
        setBasket([...basket]);
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
            let n = formatter.format(basket.reduce((a,b) =>{ return a + b.price},0));
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
      const str = '  ';
  return (
    <div className="basket-container absolute">
        {/* {user && <div>Connected as {user.firstName}</div>} */}
        {/* {basket.length > 0 ? <><div>{basket.length} Items in basket</div></> : null} */}
        
        <div className='my-5 text-primary title ml-2 '>Your basket <button onClick={()=>setShowBasket(!showBasket)}><FaWindowClose className="cross" size="2rem"/></button></div>
        <hr/>

        <div>{basket.map((elem) =>  
            <div key={uuid()} className="order-row text-left">
              <div className="w-32">{elem.name}</div>
              <div className="w-32">x1</div>
              <div className="w-32">{formatter.format(elem.price)}</div>
              <div><ButtonStyleRemove butt={<button onClick={()=> {removeItem(elem._id)}}>Remove</button>}/></div>
            </div>)}
        </div>
        <hr/>
        {basket.length > 0 && user ? <div className="order-row text-left"><div className="w-32">Total :</div><div className="w-32">{sumTot()}</div><div className="w-32"></div><button onClick={()=> setShowBasket(!showBasket)}><ButtonStyleOrder butt={<Link to="/order">Order</Link>}/></button></div> : null}
        
    </div>
  )
}

const ButtonStyleRemove = ({butt}) => {
  return <div className="butt-remove">{butt}</div>
}

const ButtonStyleOrder = ({butt}) => {
  return <div className="butt-order">{butt}</div>
}

export default Basket