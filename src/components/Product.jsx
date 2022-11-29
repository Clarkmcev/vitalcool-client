import React, { useContext, useState } from 'react'
import { AuthContext } from "../context/auth.context";
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import LoadingSpinner from './LoadingSpinner';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function Product() {
    const [isLoading, setIsLoading] = useState(true)
    const [drink, setDrink] = useState({})
    let { id } = useParams()

    const getBeverageInformation = () => {
        axios.get(`${API_URL}/user/drinks/${id}`)
        .then((response) => {
            setIsLoading(false)
            console.log(response)
            setDrink(response.data.drink)
        })
    }

    useEffect(() => {
        getBeverageInformation()
    },[])

  return (
    <>
        <div className="head-title">
            Shop
        </div>
        <div className="inside-container bg-secondary text-fourthy">
            {isLoading ? <LoadingSpinner/> : <>{drink.name}</>}
        </div>
    </>
  )
}

export default Product