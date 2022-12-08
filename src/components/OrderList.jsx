import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from "../context/auth.context";
import uuid from 'react-uuid';
import axios from "axios";
import TimeAgo from 'timeago-react';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function OrderList() {
    const { allOrders, setAllOrders } = useContext(AuthContext);

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

  return (
    <div className="inside-container">
            <p className="sub-title ml-10">
                Orders
            </p>
        <div className="order-container-pay">
        <table className="w-full">
        <tbody>
          <tr className="w-full bg-primary text-fourthy font-thin px-5 rounded-t-3xl">
            <th>Order ID</th>
            <th>Price</th>
            <th>Customer</th>
            <th>Timestamp</th>
          </tr>
          {allOrders.found.map((order) => {
              return (
              <tr key={uuid()} className="bg-ternary">
                <th className="font-thin">Order {order.orderId}</th>
                <th className="font-thin">{formatter.format(order.totalPrice)}</th>
                <th className="font-thin">{order.user?.firstName} {order.user?.lastName}</th>
                <th className="font-thin">Purchased <TimeAgo datetime={order.updatedAt}/></th>
              </tr>)
          })}
        </tbody>
        </table>
        </div>
    </div>
  )
}

export default OrderList;