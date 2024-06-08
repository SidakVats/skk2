import React, { useState, useEffect, useRef } from "react";
import FileUploader from "../components/FileUploader";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TableComponent from "../components/TableComponent";

const NewUserForm = ({ onClose, onFormSubmit, editData }) => {
  const { currentColor } = useStateContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    orderid: "",
    description: "",
    dateOfFunction: "",
  });
  const [rows, setRows] = useState([{ desc: "", qty: 0, unit: 0, price: 0 }]);
  const [files, setFiles] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const tableRef = useRef();

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  useEffect(() => {
    if (formData.name && formData.dob) {
      generateOrderId();
    }
  }, [formData.name, formData.dob]);

  const generateOrderId = () => {
    const initials = formData.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
    const dob = new Date(formData.dob).toISOString().slice(0, 10).replace(/-/g, "");
    const time = new Date().toTimeString().slice(0, 8).replace(/:/g, "");
    setFormData((prevData) => ({ ...prevData, orderid: `${initials}${dob}${time}` }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (newFiles) => {
    setFiles(newFiles);
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        const updatedRow = { ...row, [field]: value };
        updatedRow.price = updatedRow.qty * updatedRow.unit;
        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { desc: "", qty: 0, unit: 0, price: 0 }]);
  };

  const deleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append('rows', JSON.stringify(rows));
    files.forEach((fileObj) => {
      data.append("files", fileObj.file);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/submit-form",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data);
      if (typeof onFormSubmit === "function") {
        onFormSubmit(formData); // Call the passed onFormSubmit function
      }
      onClose();
      window.location.reload(); // Refresh the page
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Phone number already exists");
      } else if (error.isAxiosError) {
        console.error("Axios error:", error.response);
        alert("There was an error submitting the form! Please check the console for details.");
      } else {
        console.error("There was an error submitting the form!", error);
        alert("There was an error submitting the form! Please check the console for details.");
      }
    }
  };

  const handlePrint = () => {
    const printContent = tableRef.current.innerHTML;
    const printWindow = window.open("", "", "width=900,height=650");
    printWindow.document.write("<html><head><title>Print Table</title>");
    printWindow.document.write("</head><body >");
    printWindow.document.write(printContent);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="bg-white mt-10 px-10 py-10 w-[93%] md:ms-10 rounded-3xl border-2 border-gray-200 mx-2">
      <p className="font-medium text-xl text-gray-500">
        Welcome. Please enter details of new user.
      </p>
      <div className="mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mt-8 grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-2 justify-between items-center">
          <div>
              <label htmlFor="orderid" className="text-lg font-medium">
                Order ID
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                id="orderid"
                placeholder="Order Id"
                value={formData.orderid}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="name" className="text-lg font-medium">
                Name
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                id="name"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-2 justify-between items-center">
          <div>
              <label htmlFor="dateOfFunction" className="text-lg font-medium">
                Date of Function
              </label>
              <input
                type="date"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                id="dateOfFunction"
                value={formData.dateOfFunction}
                onChange={handleChange}
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
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
           
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-2 justify-between items-center">
          <div>
              <label htmlFor="phone" className="text-lg font-medium">
                Phone
              </label>
              <input
                type="tel"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                id="phone"
                placeholder="Enter Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="dob" className="text-lg font-medium">
                Date of Birth
              </label>
              <input
                type="date"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>

            
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5">
          <div>
              <label htmlFor="address" className="text-lg font-medium">
                Address
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                id="address"
                placeholder="Enter Your Address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5">
            <div>
              <label htmlFor="description" className="text-lg font-medium">
                Description
              </label>
              <textarea
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                id="description"
                placeholder="Enter Description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5">
            <TableComponent
              rows={rows}
              handleRowChange={handleRowChange}
              addRow={addRow}
              deleteRow={deleteRow}
            />
          </div>
          <div className="mt-8">
            <FileUploader files={files} setFiles={handleFileChange} />
          </div>
          <div className="mt-8 flex justify-end gap-5">
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: currentColor, color: "white" }}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity={severity} sx={{ width: "100%" }}>
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default NewUserForm;
