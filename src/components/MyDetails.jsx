import React from 'react'
import { useEffect, useContext } from 'react'
import { AuthContext } from "../context/auth.context";

function MyDetails() {
  const { user } = useContext(AuthContext);

  useEffect(() => {

  },)

  return (
    <>
    <div className="inside inside-container">
      {user !==null && 
      <div>
        <div className="sub-title">
          Your details
        </div>
        <div className="flex space-x-10">
          <div className="text-primary">
            <div>Name</div>
            <div>Address</div>
            <div>Town</div>
            <div>Email</div>
          </div>
          <div>
            <div>{user.firstName} {user.lastName}</div>
            <div>{user.address}</div>
            <div>{user.town}</div>
            <div>{user.email}</div>
          </div>
        </div>
      </div>}
      <button className="form-button my-10">Edit</button>
    </div>
      </>
  )
}

export default MyDetails