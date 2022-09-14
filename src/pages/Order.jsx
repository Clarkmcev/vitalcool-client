import React, {useContext, useEffect} from 'react'
import { AuthContext } from "../context/auth.context";
import uuid from 'react-uuid';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function Order() {
  const { user, basket, setBasket, setAllOrders, allOrders } = useContext(AuthContext);
  const navigate = useNavigate();

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  });

  const removeItem = (id) => { 
    let index = basket.map(function(e) { return e._id; }).indexOf(id);
    basket.splice(index,1);
    setBasket([...basket]);
}

  const getAllOrders = () => {
    axios
      .get(`${API_URL}/admin/orders`)
      .then((response) => {
        setAllOrders(response.data);
      })
      .catch((err) => console.log(err));
  };

  const addNewOrder = (basket, idUser) => {
    let sumTot = basket.reduce((a,b) => {
      return a + b.price
    },0);

    const ordersId = basket.map((elem)=>
      elem._id
    )

    axios.post(`${API_URL}/user/new-order`, {ordersId , idUser, sumTot})
    .then((elem) => {
      
      getAllOrders();
      console.log(allOrders);
    })
    .catch((err) => console.log(err))
    setBasket([]);
    navigate("/user/order/success");
  }

  const sumTot = () => {
    if (basket.length === 1) {
        let n = formatter.format(basket[0].price);
        return <>{n}</>;
    }

    try {
        let n = formatter.format(basket.reduce((a,b) =>{ return a + b.price},0));
        return <>{n}</>
    } catch(err) {
    }
  }

  useEffect(() => {
  },[])

  return (
    <div className="order-container-pay">
      <h1 className="title">Your order</h1>
      <hr/>
      {basket.map((elem) =>  
            <div key={uuid()} className="order-row-order text-primary">
              <div className="w-32">{elem.name} <div className="text-secondary text-xs">{elem.quantity} cl</div></div>
              <div className="w-32">{formatter.format(elem.price)}</div>
              <div className="w-32">x1</div>
              <div><ButtonStyleRemove butt={<button onClick={()=> {removeItem(elem._id)}}>Remove</button>}/></div>
            </div>)}
            <hr/>
            <div className="flex flex-wrap justify-between">
                <div className="my-5">Total : {sumTot()}</div>
                <ButtonStyleOrder butt={<button onClick={() => addNewOrder(basket, user._id)}>Confirm and pay</button>}/>
            </div>
    </div>
  )
}

const ButtonStyleRemove = ({butt}) => {
  return <div className="butt-remove">{butt}</div>
}

const ButtonStyleOrder = ({butt}) => {
  return <div className="butt-oder-and-pay">{butt}</div>
}

export default Order;