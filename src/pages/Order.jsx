import React, {useContext, useEffect} from 'react'
import { AuthContext } from "../context/auth.context";
import uuid from 'react-uuid';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { BsDashSquareFill, BsFillPlusSquareFill } from 'react-icons/bs';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function Order() {
  const { user, basket, setBasket, setAllOrders } = useContext(AuthContext);
  const navigate = useNavigate();

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  });

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
      return a + b.price * b.number
    },0);

    const ordersId = basket.map((elem)=>
      elem._id
    )

    axios.post(`${API_URL}/user/new-order`, {ordersId , idUser, sumTot})
    .then((elem) => {
      
      getAllOrders();
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
        let n = formatter.format(basket.reduce((a,b) =>{ return a + b.price * b.number},0));
        return <>{n}</>
    } catch(err) {
    }
  }

  useEffect(() => {
  },[])

  return (
    <>
    <h1 className="head-title">Your order</h1>
    <div className="inside-container">
    <div className="m-10">
      <table className="w-full">
        <tbody>
          <tr className="bg-primary text-fourthy font-thin px-5 rounded-t-3xl">
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>

      {basket.map((elem) =>  
            <tr key={uuid()} className="text-primary bg-ternary">
              <th className="font-thin">{elem.name} <div className="text-secondary text-xs">{elem.quantity} cl</div></th>
              <th className="font-thin">{formatter.format(elem.price)}</th>
              <div className="flex items-center justify-center space-x-10 m-5">
                <button className="text-primary hover:scale-105" onClick={()=> {removeItem(elem)}}><BsDashSquareFill size={"32px"}/></button>
                <p>{elem.number}</p>
                <button className="text-primary  hover:scale-105" onClick={()=> {addItem(elem)}}><BsFillPlusSquareFill size={"32px"}/></button>
              </div>
            </tr>)}
            <tr className="text-primary bg-ternary">
              <th></th>
              <th></th>
              <th>Total: {sumTot()}</th>
            </tr>
        </tbody>
        </table>
        <button className="butt-admin my-5" onClick={() => addNewOrder(basket, user._id)}>Confirm and pay</button>
    </div>
    </div>
    </>
  )
}

export default Order;