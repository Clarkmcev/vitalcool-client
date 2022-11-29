import { AuthContext } from "../context/auth.context";
import React, {useContext} from 'react'
import { MdCheckCircle } from 'react-icons/md';
import { Navigate, useNavigate } from "react-router-dom";

function SuccessPayment() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

  return (
    <>
    <div className="form p-5 text-fourthy text-center">
      <div className="title text-center">So cool !</div>
        <div className="relative m-auto w-16 my-5 text-fourthy"><MdCheckCircle size='4rem'/></div>
      <div>Your booking has been confirmed {user.firstName}! Your order is already on the way ...</div>
      <div>Thanks for using Vitalcool.</div>
      <button onClick={()=>navigate("/")} className="form-button">Ok</button>
      </div>
    </>
  )
}

export default SuccessPayment