// import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import HomePage from "./components/HomePage";
import MyOrders from "./components/MyOrders";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./components/Logout";
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
import logo from "./img/logo-main.png";

const API_URL = "http://localhost:5005";

function App() {
  const navigate = useNavigate();
  const { beverage, setBeverage, showBasket } = useContext(AuthContext);

  const addNewUser = (e, newUser) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/auth/signup`, newUser)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/signup");
  };

  const addNewBeverage = (e, newBeverage) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/admin/new`, newBeverage)
      .then(() => {
        setBeverage([...beverage, newBeverage]);
        navigate("/admin");
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/admin");
  };

  return (
    <div className="m-0 app">
      <Navbar />
      {showBasket && (
        <div>
          <Basket />
        </div>
      )}
      <div className="bar"></div>
      <Routes>
        <Route path="/account/myorders" element={<MyOrders />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup addNewUser={addNewUser} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/drinks" element={<BeverageList />} />
        <Route path="/order" element={<Order />} />
        <Route path="/account" element={<Account />} />
        <Route path="/user/order/success" element={<SuccessPayment />} />
        <Route path="/logout" element={<Logout />} />

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
      <Footer />
    </div>
  );
}

export default App;
