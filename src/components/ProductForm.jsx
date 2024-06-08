// ProductForm.jsx
import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import Button from "@mui/material/Button";

const ProductForm = ({ formData, handleChange, handleSubmit, error }) => {
  const handleFileChange = (e) => {
    const files = e.target.files;
    handleChange({ target: { name: "image", value: files[0] } }); // Assuming only one image is selected
  };

  const { currentColor } = useStateContext();

  

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formData);
      }}
    >
      <div className="mt-8 grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-2 justify-between items-center">
        <div>
          <label htmlFor="name" className="text-lg font-medium">
            Full Name
          </label>
          <input
            type="text"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="text-lg font-medium">
            Category
          </label>
          <input
            type="text"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            id="email"
            name="category"
            placeholder="Category Name"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-2 justify-between items-center">
        <div>
          <label htmlFor="name" className="text-lg font-medium">
            Color
          </label>
          <input
            type="text"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            id="color"
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="text-lg font-medium">
            Design Number
          </label>
          <input
            type="text"
            name="designNumber"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            id="email"
            placeholder="Enter Design Number"
            value={formData.designNumber}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="mt-5 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-300"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clipRule="evenodd"
            />
          </svg>
          <div className="mt-4 flex text-sm leading-6 text-gray-600 ">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span style={{ color: currentColor }}>Upload a file</span>
              <input
                id="file-upload"
                name="image"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
            <p className="pl-1 mx-3">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600 mt-1">
            PNG, JPG up to 2MB
          </p>
        </div>
      </div>

      
      {/* <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required /> */}
      {/* <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="Color" required /> */}
      {/* <input type="text" name="designNumber" value={formData.designNumber} onChange={handleChange} placeholder="Design Number" required /> */}
      {/* <input type="file" name="image" onChange={handleFileChange} />{" "} */}
      {/* Allow single file upload */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* <button type="submit">Add Product</button> */}
      <div className="flex items-center justify-center mt-5">
      <Button type="submit" variant="contained" size="large" style={{ backgroundColor: currentColor, color: "white" }}>
        Add Product
      </Button>
      </div>
    </form>
  );
};

export default ProductForm;
