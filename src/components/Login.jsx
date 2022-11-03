import React, {useState, useContext} from 'react';
import axios from "axios";
import { AuthContext } from '../context/auth.context';
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const { storeToken, authenticateUser, isLoading, setIsLoading } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const loginUser = (e) => {
    setIsLoading(true)
    e.preventDefault();
    const requestBody = { email, password };
    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false)
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  useEffect(() => {
    setErrorMessage(null)
  },[email, password])

  return (
    <>
      <div className="title ml-10">
        Login
      </div>
    <div className="bg-secondary w-fit mx-auto p-10 rounded-xl">
    {isLoading && <LoadingSpinner/>}
    {!isLoading && <form className="text-left" onSubmit={loginUser}>
        <div>
          <div className="title-in-container">Login</div>
          <div className="title">
            Time to drink
          </div>
          <div className="">
            <label className="text-fourthy">Email</label>
          </div>
            <input className="input" type="text" name="email" onChange={handleEmail}/>
        </div>
        <div>
            <div className="">
              <label className="text-fourthy">Password</label>
            </div>
              <input className="input" type="password" name="password" onChange={handlePassword} />
        </div>
        <div className="flex items-center space-x-4">
          <button className="my-5 form-button" type="submit">Login</button>
          <div className="text-ternary">Forgot <span className="hover:underline cursor-pointer">password?</span></div>
        </div>
        <div className= "text-ternary">No account yet? <Link to="/signup" className="hover:underline">Register</Link> here</div>
        { errorMessage && <p className="py-5 text-primary">{errorMessage}</p> }
      </form>}
      
    </div>
    </>
  )
}

export default Login;