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
    const [numberIngredients, setNumberIngredients] = useState([])
    const [listIngredients, setListIngredients] = useState({})
    const { imageUrl, setImageUrl, errorMessage, setErrorMessage } = useContext(AuthContext);


    const handleChange = (e) => {
        setErrorMessage('')
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
        const arr = []
        Object.keys(listIngredients).forEach(function(key) {
            arr.push(listIngredients[key])
        })
        setNewBeverage({...newBeverage,ingredients:arr})
    }

    const handleAddIngredients = (e) => {
        const arr = [...numberIngredients]
        arr.push(1)
        setNumberIngredients([...arr])
        e.preventDefault();
    }

    const handleRemoveIngredients = (index, e) => {
        const arr = [...numberIngredients]
        arr.splice(index, 1)
        let n = index + 1
        delete listIngredients[`ingredient${n}`]
        setNumberIngredients([...arr])

        const arrIngredients = []
        Object.keys(listIngredients).forEach(function(key) {
            arrIngredients.push(listIngredients[key])
        })
        setNewBeverage({...newBeverage,ingredients:arrIngredients})

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
    <div className="inside-container p-5">
        <form className="m-auto" onSubmit={(e)=>addNewBeverage(e, newBeverage)} >
    <div className="flex space-x-10 px-5 justify-evenly items-center">
        <div>
            <p className="text-3xl font-semibold pb-5 text-primary">
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
                        <select name="mainAlcohol" onChange={handleChange} className="w-fit text-center mx-auto">
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
                    <input className="input" type="text" name="ingredient0" onChange={handleChangeIngredients}></input>
                        <button onClick={handleAddIngredients} className="hover:scale-105 text-primary">
                            <BsFillPlusSquareFill size={"35px"}/>
                        </button>
                    </div>
                    {numberIngredients.map((ingredient, index) => 
                        <div key={index} className="flex space-x-4 items-center">
                        <input className="input" type="text" name={`ingredient${index+1}`} onChange={handleChangeIngredients}></input>
                        <button onClick={(e) => handleRemoveIngredients(index, e)} className="hover:scale-105 text-primary">
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
        { errorMessage && <p className="py-5 text-primary text-center">{errorMessage}</p> }
        </div>
        <div className="">
            <div className="flex flex-col items-center max-w-xl">
                <div className="h-fit sm:w-96 bg-ternary overflow-hidden p-5 rounded-2xl my-5">
                    {!imageUrl ? 
                    <img src={imgPng} alt="" className="object-contain"/> :
                    <img src={imageUrl} alt="" className="object-contain"/>}
                </div>
                    <div className="flex flex-col">
                        <label className="text-fourthy">Image upload</label>
                        <input className="w-fu" type="file" name="imageUrl" onChange={(e)=>{handleFileUpload(e)}}></input>
                    </div>
            </div>
        </div>
        </div>
        </form>

    </div>
  )
}

export default BeverageForm