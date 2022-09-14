import { AuthContext } from "../context/auth.context";
import React, {useContext} from 'react'


function SuccessPayment() {
    const { user } = useContext(AuthContext);

  return (
    <div>Thank you for your order {user.firstName}!</div>
  )
}

export default SuccessPayment