import React, { useState, useContext } from 'react'
import { useEffect } from 'react';
import { AuthContext } from "../context/auth.context";


function Signup({addNewUser}) {
  const {
    errorMessage,
    setErrorMessage, mewUser,
  } = useContext(AuthContext);
  
    const [newUser, setNewUser] = useState({
        firstName : '',
        lastName : '',
        address : '',
        town : '',
        password : '',
    })

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setNewUser({...newUser,[name]:value})
    }

    useEffect(()=> {
      setErrorMessage(null)
    },[newUser])

  return (
    <>
    <div className='form mt-5'>
    <form onSubmit={(e)=>{addNewUser(e,newUser)}}>
      <div className="signup">
        <div className="mb-5">
          <div className="title-in-container">Signup form</div>
              <div className="title mx-20">User information</div>
              <div className='mx-20 flex space-x-6'>
                <div className="my-1 flex-1">
                  <label className="text-fourthy">First name</label>
                  <input  className="input"
                type="text"
                name="firstName"
                onChange={handleChange}
              />
                  </div>
                <div className="my-1 flex-1">
                  <label className="text-fourthy">Last name</label>
                  <input className="input"
                type="text"
                name="lastName"
                onChange={handleChange}
              />
                </div>
              </div>
{/* 
              <div className='mx-20'>
              </div> */}

              <div className='mx-20'>
                <div className="my-1">
                  <label className=" text-fourthy">Address</label>
                </div>
              <input className="input"
                type="text"
                name="address"
                onChange={handleChange}
              />
              </div>

              <div className='mx-20'>
                <div className="my-1">
                  <label className=" text-fourthy">Town</label>
                </div>
              <input className="input"
                type="text"
                name="town"
                onChange={handleChange}
              />
              </div>
            </div>
            <div className="mb-5">
            <div className="title mx-20">Credentials</div>
              <div className='mx-20'>
              <div className="my-1">
              <label className=" text-fourthy">Email</label>
                </div>
                  <input className="input"
                type="text"
                name="email"
                onChange={handleChange}
              />
              </div>

              <div className='mx-20'>
              <div className="my-1">
              <label className=" text-fourthy">Password</label>
                </div>
                  <input className="input"
                type="password"
                name="password"
                onChange={handleChange}
              />
              </div>
              <button className="form-button mx-20" type="submit">Create Account</button>
              { errorMessage && <p className="error-message mx-20">{errorMessage}</p> }
            </div>
            
      </div>
    </form>
</div>
</>
  )
}

export default Signup;