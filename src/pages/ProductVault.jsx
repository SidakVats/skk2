import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header, Navbar, Footer, ThemeSettings } from "../components";
import UserSideBar from "../components/UserSideBar";
import { useStateContext } from "../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";


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
const ProductVault = ({ addImageToNewUserForm }) => {
  const {
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        // Sort products by a relevant attribute (e.g., id, timestamp)
        const sortedProducts = response.data.sort((a, b) => {
          // Assuming 'id' is the attribute to sort by
          return b.id - a.id; // Sort in descending order
        });
        setProducts(sortedProducts);
        setFilteredProducts(sortedProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.category.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.color.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.designNumber.toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
  }, [searchTerm, products]);

  const handleAddImageToNewUserForm = (imageData) => {
    // Pass the image data to the function passed as prop
    addImageToNewUserForm(imageData);
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
              <Header category="Page" title="All Products" />
              <div className="m-2 md:m-10 mt-10">
                <TextField
                  label="Search Products"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl dark:bg-secondary-dark-bg"
                  >
                    <img
                      src={`data:image/jpeg;base64,${btoa(
                        new Uint8Array(product.image.data).reduce(
                          (data, byte) => data + String.fromCharCode(byte),
                          ""
                        )
                      )}`}
                      alt={product.name}
                      className="w-full h-40 object-cover mb-4 rounded-lg"
                    />
                    <h2 className="text-xl font-semibold mb-2">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 mb-2">
                      Category: {product.category}
                    </p>
                    <p className="text-gray-600 mb-2">Color: {product.color}</p>
                    <p className="text-gray-600 mb-2">
                      Design Number: {product.designNumber}
                    </p>
                    <Button
                      variant="outlined"
                      style={{ color: currentColor, borderColor: currentColor }}
                      onClick={() => handleAddImageToNewUserForm(product.image)}
                    >
                      Add to Form
                    </Button>
                  </div>
                ))}
              </div>

              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <Box sx={style}>
                    {selectedProduct && (
                      <>
                        <Typography
                          id="transition-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          {selectedProduct.name}
                        </Typography>
                        <Typography
                          id="transition-modal-description"
                          sx={{ mt: 2 }}
                        >
                          Category: {selectedProduct.category}
                        </Typography>
                        <Typography
                          id="transition-modal-description"
                          sx={{ mt: 2 }}
                        >
                          Color: {selectedProduct.color}
                        </Typography>
                        <Typography
                          id="transition-modal-description"
                          sx={{ mt: 2 }}
                        >
                          Design Number: {selectedProduct.designNumber}
                        </Typography>
                        <img
                          src={`data:image/jpeg;base64,${Buffer.from(
                            selectedProduct.image
                          ).toString("base64")}`}
                          alt={selectedProduct.name}
                          className="w-full h-40 object-cover mb-4 rounded-lg"
                        />
                      </>
                    )}
                  </Box>
                </Fade>
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

export default ProductVault;
