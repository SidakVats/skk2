import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";


import Userdash from "../src/pages/HRDashboard"



import Login from "./pages/Auth/Login";
import AddProducts from "./pages/AddProducts";
import HrOrders from "./pages/HrCustomers";
import HrCustomers from "./pages/HrOrders";
import DataTable from "./pages/Datatable";
import ProductValut from "./pages/ProductVault";
import AdminDashboard from "./pages/AdminDashboard";


import YourOrders from "./customerPages/YourOrders"
import AboutUs from "./customerPages/AboutUs"



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* admin dashboard  */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* hr dashboard  */}
        <Route path="/hr-dashboard" element={<Userdash/>} />
        <Route path="/add-product" element={<AddProducts/>} />
        <Route path="/hr-orders" element={<HrOrders/>} />
        <Route path="/hr-customers" element={<HrCustomers/>} />
        <Route path="/Leads" element={<DataTable/>} />
        <Route path="/product-vault" element={<ProductValut/>} />

        {/* customer dashboard  */}
        <Route path="/your-orders" element={<YourOrders/>} />
        <Route path="/about-us" element={<AboutUs/>} />

        {/* Auth Pages */}
        <Route path="/" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
