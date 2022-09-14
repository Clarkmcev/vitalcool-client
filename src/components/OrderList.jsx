import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from "../context/auth.context";
import uuid from 'react-uuid';
import axios from "axios";

const API_URL = "http://localhost:5005";


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
        // console.log(order)
        // order.products.map((elem) => console.log(elem))
        // return <>{order.name} {formatter.format(order.price)}</>
      }

  return (
    <div className="inside-container">
        <div className="order-container-pay">
        {allOrders.found.map((order) => {
            return <div key={uuid()} className="order-row-order">
              <div className="text-primary">Order {order.orderId}</div>
              <div>Total :{formatter.format(order.totalPrice)}</div>
              {/* <div>{order.user.address}</div>
              <div>{order.user.town}</div> */}
              <div>By {order.user.firstName} {order.user.lastName}</div>
              <div>Purchased at {order.updatedAt}</div>
              <button className="butt-details" onClick={()=>showContentOrder(order._id)}>Details</button>
                    </div>
        })}
        </div>
    </div>
  )
}

export default OrderList;