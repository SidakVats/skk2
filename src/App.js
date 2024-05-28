import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Ecommerce, Orders, Employees, Customers } from "./pages";
import "./App.css";


import Userdash from "../src/pages/HRDashboard"


import Login from "./pages/Auth/Login";
// import SignUp from "./pages/Auth/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* dashboard  */}
        <Route path="/dashboard" element={<Ecommerce />} />
        <Route path="/dashboard" element={<Ecommerce />} />

        {/* pages  */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/customers" element={<Customers />} />

        <Route path="/hr-dashboard" element={<Userdash/>} />


        {/* Auth Pages */}
        <Route path="/" element={<Login />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
