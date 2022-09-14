import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [beverage, setBeverage] = useState([]);
  const [user, setUser] = useState(null);
  const [basket, setBasket] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [showBasket, setShowBasket] = useState(false);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const user = response.data;
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      console.log(user);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  const getAllBeverage = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/auth/drinks`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setBeverage(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getAllOrders = () => {
    axios
      .get(`${API_URL}/admin/orders`)
      .then((response) => {
        setAllOrders(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    authenticateUser();
    getAllBeverage();
    getAllOrders();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        setUser,
        basket,
        setBasket,
        beverage,
        setBeverage,
        myOrders,
        setMyOrders,
        allOrders,
        setAllOrders,
        imageUrl,
        setImageUrl,
        showBasket,
        setShowBasket,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
