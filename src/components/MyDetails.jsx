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
      <>
      <div>{user.firstName} {user.lastName}</div>
      <div>{user.address}</div>
      <div>{user.town}</div>
      </>}
      <button className="form-button my-10">Edit</button>
    </div>
      </>
  )
}

export default MyDetails