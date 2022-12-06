import React, {useState, useContext, useEffect} from 'react'
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import imgPng from '../img/—Pngtree—drink icon_4690686.png'
import { BsFillPlusSquareFill, BsDashSquareFill } from 'react-icons/bs';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function BeverageForm({addNewBeverage}) {
    const [newBeverage, setNewBeverage] = useState({
        name: '',
        imageUrl: imgPng,
        price: 0,
        quantity: 0,
        ingredients: [],
        description: '',
        mainAlcohol: ''
    })
    const [ingredients, setIngredients] = useState([])
    const [listIngredients, setListIngredients] = useState({})
    const { imageUrl, setImageUrl } = useContext(AuthContext);

    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.name;
        setNewBeverage({...newBeverage,[name]:value});
    }

    const handleChangeIngredients = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.name;
        setListIngredients({...listIngredients, [name]:value})
        console.log(listIngredients)
        const arr = []
        Object.keys(listIngredients).forEach(function(key) {
            arr.push(listIngredients[key])
        })
        setNewBeverage({...newBeverage,ingredients:arr})
        console.log(newBeverage)
    }

    const handleAddIngredients = (e) => {
        const arr = [...ingredients]
        arr.push(1)
        setIngredients([...arr])
        e.preventDefault();
    }

    const handleRemoveIngredients = (e) => {
        const arr = [...ingredients]
        arr.pop()
        setIngredients([...arr])
        e.preventDefault();
    }

    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);
        axios
          .post(`${API_URL}/admin/upload`,uploadData)
          .then(response => {
            setImageUrl(response.data.fileUrl);
            setNewBeverage({...newBeverage,imageUrl:response.data.fileUrl})
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };

      useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

  return (
    <div className="bg-secondary rounded-3xl text-primary shadow-md p-5 w-fit mx-5 sm:mx-auto">
        <form className="m-auto" onSubmit={(e)=>addNewBeverage(e, newBeverage)} >
    <div className="flex space-x-10 px-5">
        <div className="">
            <div className="flex flex-col items-center max-w-xl">
                <div className="w-full h-fit bg-ternary overflow-hidden p-5 rounded-2xl my-5">
                    {!imageUrl ? 
                    <img src={imgPng} alt="" className="object-contain"/> :
                    <img src={imageUrl} alt="" className="object-contain"/>}
                </div>
                    <div className="flex flex-col">
                        <label className=" text-fourthy">Image upload</label>
                        <input className="w-fu" type="file" name="imageUrl" onChange={(e)=>{handleFileUpload(e)}}></input>
                    </div>
            </div>
        </div>
        <div>
            <p className="text-3xl font-semibold pb-5">
                New product
            </p>
            <div>
                <label className="text-fourthy">Product name</label>
                <input className="input" type="text" name="name" onChange={handleChange}></input>
            </div>
            <div className="flex space-x-4">
                <div>
                    <label className="text-fourthy">Price</label>
                    <input className="input" type="number" name="price" onChange={handleChange} ></input>
                </div>
                <div>
                    <label className="text-fourthy">Quantity</label>
                    <input className="input" type="number" name="quantity" onChange={handleChange}></input>
                </div>
                <div>
                        <div >
                            <label className="text-fourthy">Type</label>
                        </div>
                        <select name="alcoholType" onChange={handleChange} className="w-fit text-center mx-auto">
                            <option value="Gin">Gin</option>
                            <option value="Whiskey">Whiskey</option>
                            <option value="Rum">Rum</option>
                            <option value="Vodka">Vodka</option>
                        </select>
                    </div>
            </div>
            <div className="">
                <div>
                    <label className="text-fourthy">Ingredients</label>
                    <div className="flex space-x-4 items-center">
                    <input className="input" type="text" name="ingredient" onChange={handleChangeIngredients}></input>
                        <button onClick={handleAddIngredients} className="hover:scale-105">
                            <BsFillPlusSquareFill size={"35px"}/>
                        </button>
                    </div>
                    {ingredients.map((ingredient, index) => 
                        <div className="flex space-x-4 items-center">
                        <input className="input" type="text" name={`ingredient${index}`} onChange={handleChangeIngredients}></input>
                        <button onClick={handleRemoveIngredients} className="hover:scale-105">
                            <BsDashSquareFill size={"35px"}/>
                        </button>
                        </div>    
                        )}
                </div>
            </div>
            <div>
                <label className="text-fourthy">Description</label>
                <input className="input h-60" type="text" name="description" onChange={handleChange}></input>
            </div>
            <div>
                <button className="form-button w-full" type="submit">Upload</button>
            </div>
        </div>
        </div>
        </form>
    </div>
  )
}

export default BeverageForm