import React, {useState, useContext} from 'react';
import axios from "axios";
import { AuthContext } from '../context/auth.context';
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  // console.log(email,password)
  const loginUser = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    console.log(requestBody)
    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  useEffect(() => {
    setErrorMessage(null)
  },[email, password])

  return (
    <>
      <div className="title">
        Login
      </div>
    <div className="form">
      <form className="text-center" onSubmit={loginUser}>
        <div> 
          <div className="">
            <label className=" text-fourthy">Email</label>
          </div>
            <input className="input" type="text" name="email" onChange={handleEmail}/>
        </div>
        <div>
            <div className="">
              <label className=" text-fourthy">Password</label>
            </div>
              <input className="input" type="password" name="password" onChange={handlePassword} />
        </div>
        <button className="my-5 form-button" type="submit">Login</button>
        <div className= "text-ternary">No account yet? <Link to="/signup" className="hover:underline">Register</Link> here</div>
        { errorMessage && <p className="error-message">{errorMessage}</p> }
      </form>
    </div>
    </>
  )
}

export default Login;