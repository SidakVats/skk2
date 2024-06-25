import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useStateContext } from "../contexts/ContextProvider";

// Function to format date to "yyyy-MM-dd"
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const RepeatedUserForm = () => {
  const [phone, setPhone] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [formData, setFormData] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const { currentColor } = useStateContext();

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedPhone = phone.replace(/\s/g, ''); // Remove spaces from phone number

    try {
      const response = await axios.get(`http://localhost:5000/api/users/phone/${formattedPhone}`);
      console.log("API response:", response.data); // Debugging: Log API response

      if (response.data) {
        const userData = response.data.user || {};
        const formData = response.data.formData || [];
        const orders = response.data.orders || [];

        // Format date fields
        if (userData.dob) userData.dob = formatDate(userData.dob);
        formData.forEach(item => {
          if (item.dob) item.dob = formatDate(item.dob);
          if (item.date_of_function) item.date_of_function = formatDate(item.date_of_function);
        });
        orders.forEach(order => {
          if (order.date_of_function) order.date_of_function = formatDate(order.date_of_function);
        });

        setUserDetails(userData);
        setFormData(formData);
        setOrderDetails(orders);
        setShowForm(true);
        setSeverity("success");
        setAlertMessage("User details fetched successfully!");
      } else {
        setShowForm(false);
        setSeverity("warning");
        setAlertMessage("User not found!");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setShowForm(false);
      setSeverity("error");
      setAlertMessage("Error fetching user details!");
    }
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="bg-white mt-10 px-10 py-10 w-[93%] md:ms-10 rounded-3xl border-2 border-gray-200 mx-2">
      <p className="font-medium text-xl text-gray-500">
        Welcome. Please enter details for repeated user.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <label htmlFor="phone" className="text-lg font-medium">
            Phone
          </label>
          <input
            type="text"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            id="phone"
            placeholder="Contact Number"
            value={phone}
            onChange={handlePhoneChange}
          />
          <div className="mt-5">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              style={{ backgroundColor: currentColor, color: "white" }}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
      {showForm && userDetails && (
        <div className="mt-5">
          <form>
            <div className="mt-8 grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-2 justify-between items-center">
              <div>
                <label htmlFor="name" className="text-lg font-medium">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  id="name"
                  placeholder="Name"
                  value={userDetails.name || ""}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="email" className="text-lg font-medium">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  id="email"
                  placeholder="Your Email"
                  value={userDetails.email || ""}
                  readOnly
                />
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-2 justify-between items-center">
              <div>
                <label htmlFor="dob" className="text-lg font-medium">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  id="dob"
                  value={formatDate(userDetails.dob)}
                  readOnly
                />
              </div>
              <div>
                {/* <label htmlFor="dateOfFunction" className="text-lg font-medium">
                  Date of Function
                </label>
                <input
                  type="date"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  id="dateOfFunction"
                  value={userDetails.date_of_function || ""}
                  readOnly
                /> */}
              </div>
            </div>
            <div className="mt-8">
              <label htmlFor="description" className="text-lg font-medium">
                Description
              </label>
              <textarea
                id="description"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Type Your text Here.."
                rows={5}
                value={userDetails.description || ""}
                readOnly
              />
            </div>
            <div className="mt-8">
              <label className="text-lg font-medium">Form Data</label>
              <div className="mt-2">
                {formData.map((form, index) => (
                  <div key={index} className="border-2 border-gray-100 rounded-xl p-4 mb-4">
                    <p><strong>Form ID:</strong> {form.id}</p>
                    <p><strong>Name:</strong> {form.name}</p>
                    <p><strong>Phone:</strong> {form.phone}</p>
                    <p><strong>Email:</strong> {form.email}</p>
                    {/* <p><strong>Form Date:</strong> {form.form_date}</p> */}
                    <p><strong>DOB:</strong> {form.dob}</p>
                    <p><strong>Date of Function:</strong> {form.date_of_function}</p>
                    {/* <p><strong>Description:</strong> {form.form_data_description}</p> */}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <label className="text-lg font-medium">Order Details</label>
              <div className="mt-2">
                {orderDetails.map((order, index) => (
                  <div key={index} className="border-2 border-gray-100 rounded-xl p-4 mb-4">
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Quantity:</strong> {order.quantity}</p>
                    <p><strong>Unit Price:</strong> {order.unit_price}</p>
                    <p><strong>Total Price:</strong> {order.total_price}</p>
                    <p><strong>Description:</strong> {order.order_details_description}</p>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={severity}
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default RepeatedUserForm;
