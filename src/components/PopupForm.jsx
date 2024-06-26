import React, { useState, useEffect, useRef } from "react";
import FileUploader from "./FileUploader";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import TableComponent from "./TableComponent"; // Import the TableComponent

const PopupForm = ({ onClose, formType, onFormSubmit, editData }) => {
  const { currentColor } = useStateContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    description: "",
    lastLogin: "",
  });
  const [rows, setRows] = useState([{ desc: "", qty: 0, unit: 0, price: 0 }]);
  const [files, setFiles] = useState([]);
  const tableRef = useRef();

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
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
      onFormSubmit(formData);
      onClose();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Phone number already exists");
      } else {
        console.error("There was an error submitting the form!", error);
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
              type="text"
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              id="phone"
              placeholder="Enter Your Phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
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
        <div className="mt-8 grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-2 justify-between items-center">
          <div>
            <label htmlFor="dob" className="text-lg font-medium">
              D.O.B
            </label>
            <input
              type="date"
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
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
              onChange={handleChange}
            />
          </div>
        </div>
      
          
        
        <div className="mt-8">
          <label htmlFor="description" className="text-lg font-medium">
            Measurements
          </label>
          <textarea
            id="description"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Type Your text Here.."
            value={formData.description}
            rows={5}
            onChange={handleChange}
          />
        </div>
        <div className="mt-8">
          <FileUploader />
          <div ref={tableRef} className="mt-5">
            <TableComponent
              rows={rows}
              addRow={addRow}
              deleteRow={deleteRow}
              handleRowChange={handleRowChange}
            />
          </div>

          <div className="mt-5 flex justify-end">
            <Button
              onClick={handlePrint}
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
            >
              Print Table
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginRight: "10px" }}
            >
              Close
            </Button>
            <Button type="submit" variant="contained" color="primary" onSubmit={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  </div>
);
};


export default PopupForm;
