import React, { useContext, useState } from 'react'
import { AuthContext } from "../context/auth.context";
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import axios from "axios";
import LoadingSpinner from './LoadingSpinner';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function Product() {
    const { user, basket, setBasket, beverage, isLoggedIn, searchField, setSearchField } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)
    const [drink, setDrink] = useState({})
    let { id } = useParams()
    const navigate = useNavigate();

    const getBeverageInformation = () => {
        axios.get(`${API_URL}/user/drinks/${id}`)
        .then((response) => {
            setIsLoading(false)
            setDrink(response.data.drink)
        })
    }

    const addBeverageToBasket = (idUser, elem) => {
        setBasket([...basket,elem])
      }

    useEffect(() => {
        window.scrollTo(0, 0)
        getBeverageInformation()
    },[])

  return (
    <>
        <div className="head-title">
            Shop
        </div>
        <div className="inside-container w-fit bg-secondary text-fourthy mx-5 sm:mx-auto">
            {isLoading ? <LoadingSpinner/> : 
            <div className="px-10">
                <div className="flex space-x-10 justify-center items-center">
                    <div className="max-w-xl">
                        <div className="text-4xl font-semibold text-primary">
                            {drink.name}
                        </div>
                        <p className="py-5">
                            <p className="text-primary font-semibold text-xl">
                                Description
                            </p>
                            {drink.description}
                        </p>
                        <p className="text-primary font-semibold text-xl">
                            Ingredients
                        </p>
                        {drink.ingredients.map((ingredient) => 
                            <div>{ingredient}</div>
                        )}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div className="card">
                            <img src={drink.imageUrl} alt="" className="img-product"/>
                        </div>
                        <div className="flex items-center justify-between">
                            {isLoggedIn && <ButtonStyle butt={<button className="button-style" onClick={()=> {addBeverageToBasket(user._id, drink)}}>Add to Basket</button>}/>}
                            <button className="hover:text-primary" onClick={()=>navigate("/drinks")}><AiOutlineArrowLeft size={"32px"}/></button>
                        </div> 
                    </div>
                </div>

            </div>}
        </div>
    </>
  )
}

const ButtonStyle = ({butt}) => {
    return <div className="butt">{butt}</div>
  }

export default Product