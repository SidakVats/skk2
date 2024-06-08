// AddProducts.jsx
import React, { useEffect, useState } from "react";
import { Header, Navbar, Footer, ThemeSettings } from "../components";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import UserSideBar from "../components/UserSideBar";
import ProductForm from "../components/ProductForm";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";

const AddProducts = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    color: "",
    designNumber: "",
    image: null, // Added image field to form data
  });

  // State for storing submitted products
  const [submittedProducts, setSubmittedProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  // Function to handle form submission
  const handleSubmit = async (formData) => {
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('color', formData.color);
      data.append('designNumber', formData.designNumber);
      data.append('image', formData.image);
  
      console.log('Submitting form data:', formData); // Log the form data
      console.log('Form data keys:', [...data.keys()]); // Log the keys of the FormData
  
      const response = await axios.post("http://localhost:5000/api/add-product", data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure correct content type for file upload
        },
      });
  
      if (response.status === 200) {
        const product = response.data;
        setSubmittedProducts([...submittedProducts, product]);
        // Clear form fields after successful submission
        setFormData({
          name: "",
          category: "",
          color: "",
          designNumber: "",
          image: null,
        });
        setError(null); // Reset error state
      } else {
        console.error("Failed to add product");
        setError("Failed to add product"); // Set error state
      }
    } catch (error) {
      console.error("Error adding product:", error.response ? error.response.data : error.message);
      setError("Error adding product: " + (error.response ? error.response.data : error.message)); // Set error state
    }
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
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
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
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
            <Header category="Page" title="Add Products" />
            <ProductForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              error={error} // Pass error state to ProductForm component
            />
          </div>

          <div>{themeSettings && <ThemeSettings />}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
