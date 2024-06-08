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
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
  const { currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders`);
        console.log("API Response:", response.data);
        setOrders(response.data.reverse());
      } catch (error) {
        console.error("Error fetching orders:", error);
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

  const filteredOrders = orders.filter((order) =>
    Object.values(order).some((value) => 
      value ? value.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false
    )
  );

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
                      {/* <TableCell>Form Date</TableCell> */}
                      <TableCell>DOB</TableCell>
                      <TableCell>Extra Remarks</TableCell>
                      {/* <TableCell>Quantity</TableCell>
                      <TableCell>Unit Price</TableCell>
                      <TableCell>Total Price</TableCell>
                      <TableCell>Order Description</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredOrders.map((order, index) => (
                      <TableRow key={order.id}>
                        <TableCell>{index + 1 + (page - 1) * 10}</TableCell>
                        <TableCell>{order.name}</TableCell>
                        <TableCell>{order.email}</TableCell>
                        <TableCell>{order.phone}</TableCell>
                        {/* <TableCell>{order.form_date}</TableCell> */}
                        <TableCell>{order.dob}</TableCell>
                        <TableCell>{order.form_data_description}</TableCell>
                        {/* <TableCell>{order.quantity}</TableCell>
                        <TableCell>{order.unit_price}</TableCell>
                        <TableCell>{order.total_price}</TableCell>
                        <TableCell>{order.order_details_description}</TableCell> */}
                        <TableCell>
                          {/* <IconButton aria-label="edit" onClick={() => handleEdit(order)}>
                            <EditIcon />
                          </IconButton> */}
                          {/* <IconButton aria-label="delete" onClick={() => handleDelete(order.id)}>
                            <DeleteIcon />
                          </IconButton> */}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="mt-3 flex justify-center">
                {[...Array(totalPages).keys()].map((index) => (
                  <Button
                    key={index + 1}
                    variant="contained"
                    color={page === index + 1 ? "primary" : "default"}
                    onClick={() => handlePageChange(index + 1)}
                    className="mx-1"
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </div>
            <Modal
              open={showModal}
              onClose={() => setShowModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div>
                <form onSubmit={handleSubmit}>
                  <TextField
                    name="name"
                    label="Name"
                    value={orderData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="email"
                    label="Email"
                    value={orderData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="phone"
                    label="Phone"
                    value={orderData.phone}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="address"
                    label="Address"
                    value={orderData.address}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="dob"
                    label="DOB"
                    type="date"
                    value={orderData.dob}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    name="description"
                    label="Description"
                    value={orderData.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </form>
              </div>
            </Modal>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {themeSettings && (<ThemeSettings />)}
    </div>
  );
};

export default HrOrders;
