// import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import HomePage from "./components/HomePage";
import MyOrders from "./components/MyOrders";
import Signup from "./components/Signup";
import Login from "./components/Login";
import axios from "axios";
import BeverageList from "./components/BeverageList";
import BeverageForm from "./components/BeverageForm";
import Order from "./pages/Order";
import Admin from "./pages/Admin";
import Account from "./pages/Account";
import { AuthContext } from "./context/auth.context";
import SuccessPayment from "./components/SuccessPayment";
import OrderList from "./components/OrderList";
import BeverageListManagement from "./components/BeverageListManagement";
import MyPayments from "./components/MyPayments";
import MyDetails from "./components/MyDetails";
import Basket from "./components/Basket";
import Footer from "./components/Footer";
import SuccessSignup from "./components/SuccessSignup";
import Product from "./components/Product";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function App() {
  const navigate = useNavigate();
  const { beverage, setBeverage, showBasket, setErrorMessage } =
    useContext(AuthContext);

  const addNewUser = (e, newUser) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/auth/signup`, newUser)
      .then((response) => {
        navigate("/signup/success");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
    navigate("/signup");
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

  const addNewBeverage = (e, newBeverage) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/admin/new`, newBeverage)
      .then(() => {
        getAllBeverage();
        navigate("/admin");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <div className="container-full">
      <div className="app">
        <Navbar />
        {showBasket && (
          <div>
            <Basket />
          </div>
        )}

        <Routes>
          <Route path="/account/myorders" element={<MyOrders />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/drinks/:id" element={<Product />} />
          <Route path="/signup" element={<Signup addNewUser={addNewUser} />} />
          <Route path="/signup/success" element={<SuccessSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/drinks" element={<BeverageList />} />
          <Route path="/order" element={<Order />} />
          <Route path="/account" element={<Account />} />
          <Route path="/user/order/success" element={<SuccessPayment />} />
          <Route path="account" element={<Account />}>
            <Route index element={<MyOrders />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="details" element={<MyDetails />} />
            <Route path="payments" element={<MyPayments />} />
            <Route path="logout" />
          </Route>
          <Route path="admin" element={<Admin />}>
            <Route index element={<BeverageListManagement />} />
            <Route path="products" element={<BeverageListManagement />} />
            <Route
              path="new-product"
              element={<BeverageForm addNewBeverage={addNewBeverage} />}
            />
            <Route path="orders" element={<OrderList />} />
          </Route>
        </Routes>
        <div className="bar"></div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
