import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import uuid from 'react-uuid';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function MyOrders() {
    const { user, myOrders, setMyOrders } = useContext(AuthContext);
    const [showContent, setShowContent] = useState(false)

    const getMyOrders = () => {
      if (user) {
        const idUser = user._id;
        axios
          .get(`${API_URL}/user/account/my-orders/${idUser}`)
          .then((response) => 
          {
            setMyOrders(response.data);
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

    const showContentFunction = () => {
      setShowContent(!showContent)
    }

    console.log(myOrders.length)

    if (!user) {
      return <div className="order-container-pay">Loading...</div>
    } else if (myOrders.length === 0) {
      console.log('yes')
      return <div className="order-container-pay">You have no orders</div>
    }

  return (<>
    <div className="inside-container">
      <div className="order-container-pay">
        <div className="order-row-order bg-primary px-5 rounded-t-3xl m-b-0 ">
          <div>Number</div>
          <div>Total</div>
          <div>Timestamps</div>
          <div className="w-60"></div>
        </div>
          {myOrders.elem.map((order) => {
              return <><hr/>
              <div key={uuid()} className="order-row-order px-5">
                        <h1 className="text-primary">Order {order.orderId}</h1>
                        <div>{formatter.format(order.totalPrice)}</div>
                        <p className="text-ternary">Purchased at {order.updatedAt}</p>
                        <button className="butt-delete" onClick={()=> {showContentFunction()}}>Details</button>
                        </div>
                  {/* {showContent && order.products.map((product) => {
                      return <div key={uuid()}>
                          {product.name} {formatter.format(product.price)}
                      </div>
                  })} */}
                      </>
          })}
      </div>
    </div>
    </>
  )
}

export default MyOrders