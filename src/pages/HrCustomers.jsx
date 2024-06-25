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
  IconButton,
  Button,
  Snackbar,
  FormControl,
} from "@mui/material";
import { FiSettings, FiCheck } from "react-icons/fi";
import UserSideBar from "../components/UserSideBar";
import { useStateContext } from "../contexts/ContextProvider";
import { Header, Navbar, Footer } from "../components";

const HrCustomers = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    setThemeSettings,
  } = useStateContext();

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    return () => {
      // Clean up function if needed
    };
  }, [currentPage, pageSize]);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  useEffect(() => {
    // Check persisted completed orders on component mount
    const persistedOrders = JSON.parse(localStorage.getItem("persistedOrders")) || [];
    const updatedOrders = orders.map(order => ({
      ...order,
      order_status: persistedOrders.find(pOrder => pOrder.form_id === order.form_id)?.order_status || order.order_status
    }));
    setOrders(updatedOrders);
    setLoading(false);
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders", {
        params: {
          page: currentPage,
          limit: pageSize,
        },
      });

      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else if (typeof response.data === "object" && response.data !== null) {
        // Handle case where API returns a single object instead of an array
        setOrders([response.data]);
      } else {
        console.error("Invalid data format received:", response.data);
        setOrders([]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
      setLoading(false);
    }
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCompleteOrder = (order) => {
    console.log("Selected Order in handleCompleteOrder:", order);
    if (order.order_status === "Completed") {
      setSnackbarMessage("This order is already completed.");
      setSnackbarOpen(true);
    } else {
      setSelectedOrder(order); // Make sure this is properly setting selectedOrder
      setSnackbarMessage(`Mark order "${order.name}" as completed?`);
      setSnackbarOpen(true);
      setOpenDialog(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleConfirmCompletion = async () => {
    console.log("Selected Order in handleConfirmCompletion:", selectedOrder);
    if (!selectedOrder || !selectedOrder.form_id) {
      console.error("Selected Order or form_id is undefined");
      return;
    }
  
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/orders/${selectedOrder.form_id}/status`,
        { status: "Completed" }
      );
  
      console.log("Response from backend:", response.data);
  
      // Update local state and persisted state
      const updatedOrders = orders.map((order) =>
        order.form_id === selectedOrder.form_id
          ? { ...order, order_status: "Completed" }
          : order
      );
      setOrders(updatedOrders);

      // Update localStorage for persisted completed orders
      const persistedOrders = JSON.parse(localStorage.getItem("persistedOrders")) || [];
      const existingOrderIndex = persistedOrders.findIndex(pOrder => pOrder.form_id === selectedOrder.form_id);
      if (existingOrderIndex !== -1) {
        persistedOrders[existingOrderIndex] = { ...selectedOrder, order_status: "Completed" };
      } else {
        persistedOrders.push({ ...selectedOrder, order_status: "Completed" });
      }
      localStorage.setItem("persistedOrders", JSON.stringify(persistedOrders));
  
      handleCloseDialog();
  
      setSnackbarMessage(`Order "${selectedOrder.name}" marked as completed.`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error confirming completion:", error);
  
      setSnackbarMessage(
        "Failed to mark order as completed. Please try again."
      );
      setSnackbarOpen(true);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#FF6347"; // red
      case "Completed":
        return "#4CAF50"; // green
      default:
        return "inherit";
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery)
  );

  return (
    <div>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-10 bottom-28" style={{ zIndex: "10" }}>
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{
                background: currentColor,
                borderRadius: "50%",
              }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
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
                        <TableCell>Phone</TableCell>
                        <TableCell>Date of Function</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Unit Price</TableCell>
                        <TableCell>Total Price</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Complete Order</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow
                          key={order.form_id}
                          onClick={() => handleView(order)} // Pass order object
                          style={{
                            cursor: "pointer",
                            backgroundColor:
                              order.order_status === "Completed"
                                ? "#add8e6" // Light blue for completed
                                : "#FFFCE0", // Lemon yellow for pending
                          }}
                        >
                          <TableCell>{order.name}</TableCell>
                          <TableCell>{order.phone}</TableCell>
                          <TableCell>{order.date_of_function}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>{order.unit_price}</TableCell>
                          <TableCell>{order.total_price}</TableCell>
                          <TableCell>
                            {order.order_details_description}
                          </TableCell>
                          <TableCell
                            style={{
                              color: getStatusColor(order.order_status),
                            }}
                          >
                            {order.order_status}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCompleteOrder(order);
                              }}
                              style={{
                                color:
                                  order.order_status === "Completed"
                                    ? "#4CAF50" // Green if completed
                                    : "#B0B0B0", // Grey if not completed
                              }}
                            >
                              <FiCheck />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Order Details</DialogTitle>
              <DialogContent>
                <Box>
                  <p>
                    <span className="text-lg font-semibold">
                      Date of Function:
                    </span>{" "}
                    {selectedOrder?.date_of_function}
                  </p>
                  <p>
                    <span className="text-lg font-semibold">Quantity:</span>{" "}
                    {selectedOrder?.quantity}
                  </p>
                  <p>
                    <span className="text-lg font-semibold">Unit Price:</span>{" "}
                    {selectedOrder?.unit_price}
                  </p>
                  <p>
                    <span className="text-lg font-semibold">Total Price:</span>{" "}
                    {selectedOrder?.total_price}
                  </p>
                  <p>
                    <span className="text-lg font-semibold">Product:</span>{" "}
                    {selectedOrder?.order_details_description}
                  </p>
                  <FormControl fullWidth variant="outlined" className="mt-3">
                    <Button
                      onClick={handleConfirmCompletion}
                      variant="contained"
                      className="w-full"
                      color="primary"
                    >
                      Confirm Completion
                    </Button>
                  </FormControl>
                </Box>
              </DialogContent>
            </Dialog>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              message={snackbarMessage}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HrCustomers;
