import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FiSettings } from "react-icons/fi";
import { Header, Navbar, Footer, ThemeSettings } from "../components";
import UserSideBar from "../components/UserSideBar";
import { useStateContext } from "../contexts/ContextProvider";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

const HrOrders = () => {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [orderData, setOrderData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    description: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [userData, setUserData] = useState(null); // State to store user details
  const { currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders`);
        console.log("API Response:", response.data);
  
        if (Array.isArray(response.data)) {
          setOrders(response.data.reverse()); // Display recent orders at the top
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Optionally, set state to handle error condition
      }
    };
  
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/orders/${editData.id}`, orderData);
      setOrders(orders.map((order) => (order.id === editData.id ? orderData : order)));
      setShowModal(false);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleEdit = (order) => {
    setEditData(order);
    setShowModal(true);
    setOrderData(order);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleFilterYearChange = (e) => {
    setFilterYear(e.target.value);
  };

  const applyFiltersAndSort = (orders) => {
    let filteredOrders = orders;

    if (filterYear) {
      filteredOrders = filteredOrders.filter((order) =>
        new Date(order.dob).getFullYear().toString() === filterYear
      );
    }

    if (sortOption) {
      filteredOrders = filteredOrders.sort((a, b) => {
        const dateA = new Date(a.dob);
        const dateB = new Date(b.dob);

        if (sortOption === "asc") {
          return dateA - dateB;
        } else if (sortOption === "desc") {
          return dateB - dateA;
        }

        return 0;
      });
    }

    return filteredOrders;
  };

  const filteredOrders = applyFiltersAndSort(
    orders.filter((order) =>
      Object.values(order).some((value) =>
        value ? value.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false
      )
    )
  );

  // Function to fetch user details based on phone number
  const fetchUserDetails = async (phone) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/phone/${phone}`);
      console.log("User Details API Response:", response.data);
      setUserData(response.data);
      setShowModal(true); // Open modal to show user details
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-10 bottom-28" style={{ zIndex: "10" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <UserSideBar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <UserSideBar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full"
                : "bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2"
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
              <Header category="Page" title="Customers" />
              <div className="flex items-center justify-between mb-4">
                <FormControl variant="outlined" style={{ minWidth: 120, marginRight: 10 }}>
                  <InputLabel>Sort By Date</InputLabel>
                  <Select value={sortOption} onChange={handleSortChange} label="Sort By Date">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" style={{ minWidth: 120, marginRight: 10 }}>
                  <InputLabel>Filter By Year</InputLabel>
                  <Select value={filterYear} onChange={handleFilterYearChange} label="Filter By Year">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {[...new Set(orders.map(order => new Date(order.dob).getFullYear()))].sort().map(year => (
                      <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Search Customers"
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearch}
                  fullWidth
                  margin="normal"
                />
              </div>
              <div className="m-2 md:m-10 mt-10 p-2 md:p-10 bg-white rounded-3xl">
                <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Serial</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>DOB</TableCell>
                        <TableCell>Extra Remarks</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredOrders.map((order, index) => (
                        <TableRow key={order.id}>
                          <TableCell>{index + 1 + (page - 1) * 10}</TableCell>
                          <TableCell>{order.name}</TableCell>
                          <TableCell>{order.email}</TableCell>
                          <TableCell>
                            <button
                              type="button"
                              onClick={() => fetchUserDetails(order.phone)}
                              style={{ textDecoration: "underline", cursor: "pointer" }}
                            >
                              {order.phone}
                            </button>
                          </TableCell>
                          <TableCell>{order.dob}</TableCell>
                          <TableCell>{order.form_data_description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
            {themeSettings && <ThemeSettings />}
          </div>
        </div>
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white",
            padding: "16px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
        >
          {userData ? (
            <div>
              <h2>User Details</h2>
              <p>Name: {userData.name}</p>
              <p>Email: {userData.email}</p>
              <p>Phone: {userData.phone}</p>
              <p>Address: {userData.address}</p>
              <p>DOB: {userData.dob}</p>
              <p>Description: {userData.form_data_description}</p>
            </div>
          ) : (
            <div>
              <h2>Edit Order</h2>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  value={orderData.name}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  name="email"
                  value={orderData.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Phone"
                  name="phone"
                  value={orderData.phone}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Address"
                  name="address"
                  value={orderData.address}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="DOB"
                  name="dob"
                  value={orderData.dob}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Extra Remarks"
                  name="form_data_description"
                  value={orderData.form_data_description}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: "16px" }}>
                  Save
                </Button>
              </form>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default HrOrders;
