import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { Ecommerce, Orders, Employees, Customers } from "./pages";
import "./App.css";


import Userdash from "../src/pages/HRDashboard"



import Login from "./pages/Auth/Login";
import AddProducts from "./pages/AddProducts";
import HrOrders from "./pages/HrCustomers";
import HrCustomers from "./pages/HrOrders";
import DataTable from "./pages/Datatable";
import ProductValut from "./pages/ProductVault";
import AdminDashboard from "./pages/AdminDashboard";




// import SignUp from "./pages/Auth/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* dashboard  */}
        {/* <Route path="/dashboard" element={<Ecommerce />} /> */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* pages  */}
        {/* <Route path="/orders" element={<Orders />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/customers" element={<Customers />} /> */}

        <Route path="/hr-dashboard" element={<Userdash/>} />
        <Route path="/add-product" element={<AddProducts/>} />
        <Route path="/hr-orders" element={<HrOrders/>} />
        <Route path="/hr-customers" element={<HrCustomers/>} />
        <Route path="/Leads" element={<DataTable/>} />
        <Route path="/product-vault" element={<ProductValut/>} />


        {/* Auth Pages */}
        <Route path="/" element={<Login />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
