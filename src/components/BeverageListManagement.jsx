import React, { useContext, useEffect } from 'react';
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import uuid from 'react-uuid';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function BeverageListManagement() {
    const { beverage, setBeverage } = useContext(AuthContext);

    var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      });

    const removeItem = (id) => {
        axios.get(`${API_URL}/admin/delete/${id}`)
        .then(() => console.log())
        .catch((err) => console.log(err))
        getAllBeverage();
    }
    
    const getAllBeverage = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
          .get(`${API_URL}/auth/drinks`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            setBeverage(response.data);
          })
          .catch((error) => console.log(error));
      };

      useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

  return (
    <div className="inside-container">
            <p className="sub-title ml-10 pb-0">
                My products
            </p>
        <div className="flex flex-col m-10">
            <table className="w-full">
            <tbody>
              <tr className="w-full bg-primary text-fourthy font-thin px-5 rounded-t-3xl m-b-0 ">
              <th>Product name</th>
              <th>Alcohol type</th>
              <th>Price</th>
              <th>Quantity</th>
              </tr>
            {beverage.map((elem, index)=> 

              <tr key={index} className="text-primary bg-ternary">
                <th className="font-thin">{elem.name}</th>
                <th className="font-thin">{elem.mainAlcohol}</th>
                <th className="font-thin">{formatter.format(elem.price)}</th>
                <th className="font-thin">{elem.quantity} cl</th>
                {/* <th className="font-thin">
                  <div className="flex justify-center space-x-2">
                    <button className="">
                      <AiFillEdit/>
                    </button>
                    <button className="">
                      <AiFillDelete/>
                    </button>
                  </div>
                </th> */}
              </tr>)}
              </tbody>
            </table>
        </div>
      </div>
  )
}

export default BeverageListManagement