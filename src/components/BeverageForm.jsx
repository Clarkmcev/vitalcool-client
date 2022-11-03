import React, {useState, useContext, useEffect} from 'react'
import { Navigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { MdNoDrinks } from 'react-icons/md';
import imgPng from '../img/—Pngtree—drink icon_4690686.png'

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function BeverageForm({addNewBeverage}) {
    const [newBeverage, setNewBeverage] = useState({
        name: '',
        type: '',
        softType: '',
        alcoholType: '',
        undistilledType: '',
        imageUrl: '',
        price: 0,
        quantity: 0,
    })

    const { imageUrl, setImageUrl } = useContext(AuthContext);

    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.name;
        setNewBeverage({...newBeverage,[name]:value});
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
    <div className="bg-secondary rounded-3xl text-primary shadow-md mx-10 p-5 w-fit mx-auto">
        <form className="m-auto" onSubmit={(e)=>addNewBeverage(e, newBeverage)} >
    <div className="flex space-x-6 items-center">
        <div className="px-20 flex-wrap">
            <div>
                <div className="w-96 h-96 bg-ternary overflow-hidden p-5 rounded-2xl my-5">
                    {!imageUrl ? 
                    <img src={imgPng} alt="" className="object-contain"/> :
                    <img src={imageUrl} alt="" className="object-contain"/>}
                </div>
            <div className="flex space-x-10">
                <div>
                    <label className="text-fourthy">Choose a type of drink</label>
                    <div className="flex flex-col justify-evenly">
                        <button className='form-button-choose' name="type" value="Soft" onClick={handleChange}>Soft drink</button>
                        <button className='form-button-choose' name="type" value="Liquor" onClick={handleChange}>Liquor & Spirit</button>
                        <button className='form-button-choose' name="type" value="Undistilled" onClick={handleChange}>Undistilled drink</button>
                    </div>
                </div>
            {newBeverage.type === "Soft" && 
                        <div>
                            <div>
                        <label className=" text-fourthy">Type</label>
                        </div>
                        <select name="softType" onChange={handleChange} className="w-fit text-center mx-auto">
                            <option value="Juice">Juice</option>
                            <option value="Soda">Soda</option>
                        </select>
                    </div>
            }
            {newBeverage.type === "Liquor" && 
                                <div>
                                    <div >
                                <label className=" text-fourthy">Type</label>
                                </div>
                                <select name="alcoholType" onChange={handleChange} className="w-fit text-center mx-auto">
                                    <option value="Gin">Gin</option>
                                    <option value="Brandy">Brandy</option>
                                    <option value="Whiskey">Whiskey</option>
                                    <option value="Rum">Rum</option>
                                    <option value="Vodka">Vodka</option>
                                    <option value="Absinthe">Absinthe</option>
                                </select>
                            </div>
            }
            {newBeverage.type === "Undistilled" && 
                                <div>
                                    <div>
                                        <label className=" text-fourthy">Type</label>
                                    </div>
                                    <select name="undistilledType" onChange={handleChange} className="w-fit text-center mx-auto">
                                        <option value="Beer">Beer</option>
                                        <option value="Wine">Wine</option>
                                        <option value="Cider">Cider</option>
                                        <option value="Mead">Mead</option>
                                        <option value="Sake">Sake</option>
                                    </select>
                                </div>
            }
        </div>
            <div>
                <div>
                <label className=" text-fourthy">Image upload</label>
                </div>
                <input className="w-full" type="file" name="imageUrl" onChange={(e)=>{handleFileUpload(e)}}></input>
            </div>
        </div>
            <div>
                <div>
                        <label className="text-fourthy">Product name</label>
                        <input className="input" type="text" name="name" onChange={handleChange}></input>
                </div>
                <div>
                        <label className="text-fourthy">Price</label>
                        <input className="input" type="number" name="price" onChange={handleChange}></input>
                </div>
                <div>
                        <label className="text-fourthy">Quantity</label>
                        <input className="input" type="number" name="quantity" onChange={handleChange}></input>
                </div>
            </div>
            <div className="">
            <button className="form-button w-full" type="submit">Upload</button>
        </div>
        </div>
        </div>
        </form>
    </div>
  )
}

export default BeverageForm