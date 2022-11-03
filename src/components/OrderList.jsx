import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from "../context/auth.context";
import uuid from 'react-uuid';
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function OrderList() {
    const { allOrders, setAllOrders } = useContext(AuthContext);
    const [showContent, setShowContent] = useState(false)

    console.log(allOrders)
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      });

      const getAllOrders = () => {
        axios
          .get(`${API_URL}/admin/orders`)
          .then((response) => {
            setAllOrders(response.data);
          })
          .catch((err) => console.log(err));
      };

      useEffect(() =>{
        getAllOrders()
      },[])

      const showContentOrder= (id) => {
        setShowContent(!showContent);
        let order = allOrders.found.filter((elem) => elem._id === id)
        console.log(order)
        order.products.map((elem) => console.log(elem))
        return <>{order.name} {formatter.format(order.price)}</>
      }

  return (
    <div className="inside-container">
        <div className="order-container-pay">
        <div className="order-row-order bg-primary px-5 rounded-t-3xl m-b-0 ">
          <div>Number</div>
          <div>Total</div>
          <div>User</div>
          <div>Timestamps</div>
          <div className="w-60"></div>
        </div>
        {allOrders.found.map((order) => {
            return (
            <div key={uuid()} className="order-row-order">
              <div className="text-primary">Order {order.orderId}</div>
              <div className="text-ternary">{formatter.format(order.totalPrice)}</div>
              <div className="text-ternary">By {order.user.firstName} {order.user.lastName}</div>
              <div className="text-ternary">Purchased at {order.updatedAt}</div>
              <button className="butt-details" onClick={()=>showContentOrder(order._id)}>Details</button>
            </div>)
        })}

        <table className="w-full">
          <tr>
            <th>Order ID</th>
            <th>Price</th>
            <th>Customer</th>
            <th>Timestamp</th>
          </tr>
          {allOrders.found.map((order) => {
              return (
              <tr key={uuid()} className="">
                <th className="text-primary">Order {order.orderId}</th>
                <th className="text-ternary">{formatter.format(order.totalPrice)}</th>
                <th className="text-ternary">By {order.user?.firstName} {order.user.lastName}</th>
                <th className="text-ternary">Purchased at {order.updatedAt}</th>
                {/* <button className="butt-details" onClick={()=>showContentOrder(order._id)}>Details</button> */}
              </tr>)
          })}
        </table>

        </div>
    </div>
  )
}

export default OrderList;