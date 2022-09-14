import React, {useState, useContext} from 'react'
import { Navigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

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
        console.log(newBeverage)
    }

    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);
        axios
          .post(`${API_URL}/admin/upload`,uploadData)
          .then(response => {
            console.log("response is: ", response.data);
            setImageUrl(response.data.fileUrl);
            setNewBeverage({...newBeverage,imageUrl:response.data.fileUrl})
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };

  return (
    <div className="form">
        <form className="m-auto" onSubmit={(e)=>addNewBeverage(e, newBeverage)} >
        <div className="flex flex-wrap">
            <div className='mx-20'>
            <div>
                    <div>
                        <label className=" text-fourthy">Product name</label>
                    </div>
                    <input className="input" type="text" name="name" onChange={handleChange}></input>
                </div>
            <div>
                <div>
                    <label className=" text-fourthy">Choose a type of drink</label>
                </div>
                    <div className="flex flex-wrap flex-col">
                        <button className='form-button-choose' name="type" value="Soft" onClick={handleChange}>Soft drink</button>
                        <button className='form-button-choose' name="type" value="Liquor" onClick={handleChange}>Liquor & Spirit</button>
                        <button className='form-button-choose' name="type" value="Undistilled" onClick={handleChange}>Undistilled drink</button>
                    </div>
                </div>
            </div>
            <div className="vl"></div>
            <div className='mx-20'>
            {newBeverage.type === "Soft" && 
                        <div>
                            <div>
                        <label className=" text-fourthy">Type</label>
                        </div>
                        <select name="softType" onChange={handleChange}>
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
                                <select name="alcoholType" onChange={handleChange}>
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
                                            <label>Type</label>
                                        </div>
                                        <select name="undistilledType" onChange={handleChange}>
                                            <option value="Beer">Beer</option>
                                            <option value="Wine">Wine</option>
                                            <option value="Cider">Cider</option>
                                            <option value="Mead">Mead</option>
                                            <option value="Sake">Sake</option>
                                        </select>
                                    </div>
            }
            <div>
                <div>
                    <label className=" text-fourthy">Price</label>
                </div>
                <input className="input" type="number" name="price" onChange={handleChange}></input>
            </div>
            <div>
                <div>
                    <label className=" text-fourthy">Quantity</label>
                </div>
                <input className="input" type="number" name="quantity" onChange={handleChange}></input>
            </div>
            <div>
                <div>
                    <input className="input" type="file" name="imageUrl" onChange={(e)=>{handleFileUpload(e)}}></input>
                </div>
            </div>
            </div>
        </div>
        <div className="mx-20">
            <button className="form-button" type="submit">Upload</button>
        </div>
        </form>
    </div>
  )
}

export default BeverageForm