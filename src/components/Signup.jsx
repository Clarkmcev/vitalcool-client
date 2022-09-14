import React, { useState } from 'react'

function Signup({addNewUser}) {
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

  return (
    <>
      <div className="title">
        My account
      </div>
    <div className='form'>
    <form className="text-center" onSubmit={(e)=>{addNewUser(e,newUser)}}>
    <div>
      <div className="my-1">
        <label className=" text-ternary">First name</label>
      </div>
        <input  className="input"
      type="text"
      name="firstName"
      onChange={handleChange}
    />
    </div>
    <div>
    <div className="my-1">
    <label className=" text-ternary">Last name</label>
      </div>
        <input className="input"
      type="text"
      name="lastName"
      onChange={handleChange}
    />
    </div>
    <div>
    <div className="my-1">
    <label className=" text-ternary">Address</label>
      </div>
        <input className="input"
      type="text"
      name="address"
      onChange={handleChange}
    />
    </div>
    <div>
    <div className="my-1">
    <label className=" text-ternary">Town</label>
      </div>
        <input className="input"
      type="text"
      name="town"
      onChange={handleChange}
    />
    </div>
    <div>
    <div className="my-1">
    <label className=" text-ternary">Email</label>
      </div>
        <input className="input"
      type="text"
      name="email"
      onChange={handleChange}
    />
    </div>
    <div>
    <div className="my-1">
    <label className=" text-ternary">Password</label>
      </div>
        <input className="input"
      type="password"
      name="password"
      onChange={handleChange}
    />
    </div>
    <button className="my-3 form-button" type="submit">Create Account</button>
    </form>
</div>
</>
  )
}

export default Signup;