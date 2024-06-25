import React from "react";

import { FiSettings } from "react-icons/fi";
import { Header, Navbar, Footer, ThemeSettings } from "../components";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CustomerSidebar from "../components/CustomerSidebar";
import { useStateContext } from "../contexts/ContextProvider";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { TextField } from "@mui/material";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const YourOrders = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

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
              <CustomerSidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <CustomerSidebar />
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
              <Header category="Page" title="Your Orders" />

              <div className="flex items-center justify-between mb-4 lg:me-20">
                <TextField
                  label="Search Products"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="flex items-center justify-between mb-4 " onClick={handleOpen}>
                  <div
                    // href="#"
                    className="block rounded-lg p-3 shadow-md cursor-pointer hover:shadow-lg"
                    style={{ border: `1px solid ${currentColor}` }}
                  >
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      className="h-64 w-full rounded-md object-cover"
                    />

                    <div className="mt-2">
                      <dl>
                        <div>
                          <dt className="sr-only">Address</dt>
                          <dd className="text-xl font-medium">Product Name</dd>
                        </div>
                        <div>
                          <dt className="sr-only">Price</dt>
                          <dd className="text-md text-gray-500">Rs.10000/-</dd>
                        </div>
                      </dl>

                      <div className="mt-6 flex items-center gap-8 text-xs">
                        <div className="flex items-center justify-center sm:shrink-0 sm:items-center gap-2">
                          <ShoppingBasketIcon style={{ color: currentColor }} />

                          <div className=" sm:mt-0">
                            <p className="text-gray-500 text-sm">
                              Purchased on 12-feb-2024
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 " onClick={handleOpen}>
                  <div
                    // href="#"
                    className="block rounded-lg p-3 shadow-md cursor-pointer hover:shadow-lg"
                    style={{ border: `1px solid ${currentColor}` }}
                  >
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      className="h-64 w-full rounded-md object-cover"
                    />

                    <div className="mt-2">
                      <dl>
                        <div>
                          <dt className="sr-only">Address</dt>
                          <dd className="text-xl font-medium">Product Name</dd>
                        </div>
                        <div>
                          <dt className="sr-only">Price</dt>
                          <dd className="text-md text-gray-500">Rs.10000/-</dd>
                        </div>
                      </dl>

                      <div className="mt-6 flex items-center gap-8 text-xs">
                        <div className="flex items-center justify-center sm:shrink-0 sm:items-center gap-2">
                          <ShoppingBasketIcon style={{ color: currentColor }} />

                          <div className=" sm:mt-0">
                            <p className="text-gray-500 text-sm">
                              Purchased on 12-feb-2024
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 " onClick={handleOpen}>
                  <div
                    // href="#"
                    className="block rounded-lg p-3 shadow-md cursor-pointer hover:shadow-lg"
                    style={{ border: `1px solid ${currentColor}` }}
                  >
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      className="h-64 w-full rounded-md object-cover"
                    />

                    <div className="mt-2">
                      <dl>
                        <div>
                          <dt className="sr-only">Address</dt>
                          <dd className="text-xl font-medium">Product Name</dd>
                        </div>
                        <div>
                          <dt className="sr-only">Price</dt>
                          <dd className="text-md text-gray-500">Rs.10000/-</dd>
                        </div>
                      </dl>

                      <div className="mt-6 flex items-center gap-8 text-xs">
                        <div className="flex items-center justify-center sm:shrink-0 sm:items-center gap-2">
                          <ShoppingBasketIcon style={{ color: currentColor }} />

                          <div className=" sm:mt-0">
                            <p className="text-gray-500 text-sm">
                              Purchased on 12-feb-2024
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 " onClick={handleOpen}>
                  <div
                    // href="#"
                    className="block rounded-lg p-3 shadow-md cursor-pointer hover:shadow-lg"
                    style={{ border: `1px solid ${currentColor}` }}
                  >
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      className="h-64 w-full rounded-md object-cover"
                    />

                    <div className="mt-2">
                      <dl>
                        <div>
                          <dt className="sr-only">Address</dt>
                          <dd className="text-xl font-medium">Product Name</dd>
                        </div>
                        <div>
                          <dt className="sr-only">Price</dt>
                          <dd className="text-md text-gray-500">Rs.10000/-</dd>
                        </div>
                      </dl>

                      <div className="mt-6 flex items-center gap-8 text-xs">
                        <div className="flex items-center justify-center sm:shrink-0 sm:items-center gap-2">
                          <ShoppingBasketIcon style={{ color: currentColor }} />

                          <div className=" sm:mt-0">
                            <p className="text-gray-500 text-sm">
                              Purchased on 12-feb-2024
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 " onClick={handleOpen}>
                  <div
                    // href="#"
                    className="block rounded-lg p-3 shadow-md cursor-pointer hover:shadow-lg"
                    style={{ border: `1px solid ${currentColor}` }}
                  >
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      className="h-64 w-full rounded-md object-cover"
                    />

                    <div className="mt-2">
                      <dl>
                        <div>
                          <dt className="sr-only">Address</dt>
                          <dd className="text-xl font-medium">Product Name</dd>
                        </div>
                        <div>
                          <dt className="sr-only">Price</dt>
                          <dd className="text-md text-gray-500">Rs.10000/-</dd>
                        </div>
                      </dl>

                      <div className="mt-6 flex items-center gap-8 text-xs">
                        <div className="flex items-center justify-center sm:shrink-0 sm:items-center gap-2">
                          <ShoppingBasketIcon style={{ color: currentColor }} />

                          <div className=" sm:mt-0">
                            <p className="text-gray-500 text-sm">
                              Purchased on 12-feb-2024
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 " onClick={handleOpen}>
                  <div
                    // href="#"
                    className="block rounded-lg p-3 shadow-md cursor-pointer hover:shadow-lg"
                    style={{ border: `1px solid ${currentColor}` }}
                  >
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      className="h-64 w-full rounded-md object-cover"
                    />

                    <div className="mt-2">
                      <dl>
                        <div>
                          <dt className="sr-only">Address</dt>
                          <dd className="text-xl font-medium">Product Name</dd>
                        </div>
                        <div>
                          <dt className="sr-only">Price</dt>
                          <dd className="text-md text-gray-500">Rs.10000/-</dd>
                        </div>
                      </dl>

                      <div className="mt-6 flex items-center gap-8 text-xs">
                        <div className="flex items-center justify-center sm:shrink-0 sm:items-center gap-2">
                          <ShoppingBasketIcon style={{ color: currentColor }} />

                          <div className=" sm:mt-0">
                            <p className="text-gray-500 text-sm">
                              Purchased on 12-feb-2024
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  slots={{ backdrop: Backdrop }}
                  slotProps={{
                    backdrop: {
                      timeout: 500,
                    },
                  }}
                >
                  <Fade in={open}>
                    <Box sx={style}>
                      <Typography
                        id="transition-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Text in a modal
                      </Typography>
                      <Typography
                        id="transition-modal-description"
                        sx={{ mt: 2 }}
                      >
                        Duis mollis, est non commodo luctus, nisi erat porttitor
                        ligula.
                      </Typography>
                    </Box>
                  </Fade>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {themeSettings && <ThemeSettings />}
    </div>
  );
};

export default YourOrders;
