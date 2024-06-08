// ProductForm.jsx
import React from 'react';

const ProductForm = ({ formData, handleChange, handleSubmit, error }) => {
  const handleFileChange = (e) => {
    const files = e.target.files;
    handleChange({ target: { name: 'image', value: files[0] } }); // Assuming only one image is selected
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(formData); }}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
      <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="Color" required />
      <input type="text" name="designNumber" value={formData.designNumber} onChange={handleChange} placeholder="Design Number" required />
      <input type="file" name="image" onChange={handleFileChange} /> {/* Allow single file upload */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
