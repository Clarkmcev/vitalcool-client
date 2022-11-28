import React, { useContext, useEffect } from 'react';
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import uuid from 'react-uuid';
import NavbarAdmin from '../components/NavbarAdmin';


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
        <div className="flex flex-wrap space-x-10 space-y-2 m-10">
            {beverage.map((elem)=> 
            <div className="" key={uuid()}>
                <img src={elem.imageUrl} alt="beverage" className="img-product card"/>
                <h1 className="text-fourthy font-bold text-center">{elem.name}</h1>
                <div className="flex justify-evenly  text-ternary mb-2">
                    <div>{formatter.format(elem.price)}</div>
                    <div>{elem.quantity}{'  '}cl</div>
                  </div>
                  <div className="flex justify-evenly my-1">
                    <button className="butt-admin">Edit</button>
                    <button className="butt-delete" onClick={() => removeItem(elem._id)}>Delete</button>
                  </div>
            </div>)}
        </div>
      </div>
  )
}

const ButtonStyle = ({butt}) => {
  return <div className="butt">{butt}</div>
}

export default BeverageListManagement