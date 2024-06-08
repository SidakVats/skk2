import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const RepeatedUserForm = () => {
  const [phone, setPhone] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedPhone = phone.replace(/\s/g, ''); // Remove spaces from phone number
    try {
      const response = await axios.get(`http://localhost:5000/api/users/phone/${formattedPhone}`);
      if (response.data) {
        setUserDetails(response.data);
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
            <Button type="submit" variant="contained" color="primary" size="large">
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
                  value={userDetails.name}
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
                  value={userDetails.email}
                  readOnly
                />
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-2 justify-between items-center">
              <div>
                <label htmlFor="address" className="text-lg font-medium">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  id="address"
                  placeholder="Enter Your Address"
                  value={userDetails.address}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="dob" className="text-lg font-medium">
                  D.O.B
                </label>
                <input
                  type="date"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  id="dob"
                  value={userDetails.dob}
                  readOnly
                />
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
                value={userDetails.description}
                readOnly
              />
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
