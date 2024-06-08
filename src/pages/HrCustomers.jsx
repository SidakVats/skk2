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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
} from "@mui/material";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import UserSideBar from "../components/UserSideBar";
import { useStateContext } from "../contexts/ContextProvider";
import { Header, Navbar, Footer, ThemeSettings } from "../components";

const HrCustomers = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredOrders = orders.filter((order) =>
    order.name.toLowerCase().includes(searchQuery.toLowerCase())
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
              <Header category="Page" title="Orders" />
              <div className="flex items-center justify-between mb-4">
                <TextField
                  label="Search Orders"
                  variant="outlined"
                  size="small"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="me-5 w-full"
                />
              </div>
              <div>
                <TableContainer component={Paper} className="mt-5">
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Date of Function</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Unit Price</TableCell>
                        <TableCell>Total Price</TableCell>
                        <TableCell>Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.name}</TableCell>
                          <TableCell>
                            {new Date(order.date_of_function).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>{order.unit_price}</TableCell>
                          <TableCell>{order.total_price}</TableCell>
                          <TableCell>{order.order_details_description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  maxWidth="md"
                  fullWidth
                  scroll="paper"
                >
                  <DialogTitle>Order Details</DialogTitle>
                  <DialogContent dividers>
                    {selectedOrder && (
                      <Box
                        component="form"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <TextField label="Name" value={selectedOrder.name} disabled />
                        <TextField
                          label="Date of Function"
                          value={new Date(selectedOrder.date_of_function).toLocaleDateString()}
                          disabled
                        />
                        {/* Add other fields here as needed */}
                      </Box>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {themeSettings && (<ThemeSettings />)}
    </div>
  );
};

export default HrCustomers;
