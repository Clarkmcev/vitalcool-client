import React, {useContext} from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { MdCheckCircle } from 'react-icons/md';


function SuccessSignup() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

  return (
    <>
      <div className="form p-5 text-fourthy text-center">
        <div className="title text-center">Welcome !</div>
        <div className="relative m-auto w-16 my-5 text-fourthy"><MdCheckCircle size='4rem'/></div>
        <div>Welcome in Vitalcool, your account has been successfully created.</div>
        <button onClick={()=>navigate("/login")} className="form-button">Ok</button>
      </div>
    </>
  )
}

export default SuccessSignup