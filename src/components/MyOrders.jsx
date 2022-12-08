import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import uuid from 'react-uuid';
import TimeAgo from 'timeago-react';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function MyOrders() {
    const { user, myOrders, setMyOrders } = useContext(AuthContext);

    const getMyOrders = () => {
      if (user) {
        const idUser = user._id;
        axios
          .get(`${API_URL}/user/account/my-orders/${idUser}`)
          .then((response) => 
          {
            setMyOrders(response.data.elem);
          }
          )
          .catch((err) => console.log(err));
      }
      };

    useEffect(() => {
      getMyOrders()
    },[])

    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    });

    if (!user) {
      return <div className="order-container-pay">Loading...</div>
    } else if (myOrders.length === 0) {
      return <div className="order-container-pay inside-container">You have no orders</div>
    }

  return (<>
    <div className="inside-container">
        <div className="order-container-pay">
            <p className="sub-title pb-10">
                My orders
            </p>
        <table className="w-full">
          <tr className="w-full bg-primary text-fourthy font-thin px-5 rounded-t-3xl">
            <th>Order ID</th>
            <th>Price</th>
            <th>Customer</th>
            <th>Timestamp</th>
          </tr>
          {myOrders ? myOrders.map((order) => {
              return (
              <tr key={uuid()} className=" text-first bg-ternary">
                <th className="font-thin">Order {order.orderId}</th>
                <th className="font-thin">{formatter.format(order.totalPrice)}</th>
                <th className="font-thin">{order.user?.firstName} {order.user.lastName}</th>
                <th className="font-thin">Purchased <TimeAgo datetime={order.updatedAt}/></th>
              </tr>)
          }) : null}
        </table>
      </div>
    </div>
    </>
  )
}

export default MyOrders