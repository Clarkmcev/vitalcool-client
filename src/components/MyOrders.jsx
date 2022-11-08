import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import uuid from 'react-uuid';

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
            console.log('he',response.data)
            setMyOrders(response.data);
          }
          )
          .catch((err) => console.log(err));
      }
      };

    useEffect(() => {
      getMyOrders()
      console.log(myOrders)
    },[])

    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    });

    if (!user) {
      return <div className="order-container-pay">Loading...</div>
    } else if (myOrders.length === 0) {
      return <div className="order-container-pay">You have no orders</div>
    }

  return (<>
    <div className="inside-container">
        <div className="order-container-pay">
        <table className="w-full">
          <tr className="w-full bg-primary text-fourthy font-thin px-5 rounded-t-3xl m-b-0 ">
            <th >Order ID</th>
            <th>Price</th>
            <th>Customer</th>
            <th>Timestamp</th>
          </tr>
          {myOrders.found && myOrders.found.map((order) => {
              return (
              <tr key={uuid()} className=" text-first bg-ternary">
                <th className="font-thin">Order {order.orderId}</th>
                <th className="font-thin">{formatter.format(order.totalPrice)}</th>
                <th className="font-thin">{order.user?.firstName} {order.user.lastName}</th>
                <th className="font-thin">Purchased at {order.updatedAt}</th>
              </tr>)
          })}
        </table>
      </div>
    </div>
    </>
  )
}

export default MyOrders