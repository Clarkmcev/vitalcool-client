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
  const [searchField, setSearchField] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");
    setIsLoading(true);
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
    setIsLoading(true);
    axios
      .get(`${API_URL}/auth/drinks`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setBeverage(response.data);
        setIsLoading(false);
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
        setIsLoading,
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
        searchField,
        setSearchField,
        errorMessage,
        setErrorMessage,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
