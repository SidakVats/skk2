import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const EditUserForm = ({ user, onClose, onUpdateUser }) => {
  const [userData, setUserData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${user.id}`, userData);
      onUpdateUser(userData);
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', background: 'white', borderRadius: '8px' }}>
      <TextField
        name="name"
        label="Name"
        value={userData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
       <TextField
        name="email"
        label="Email"
        value={userData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="phone"
        label="Phone"
        value={userData.phone}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="address"
        label="Address"
        value={userData.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="dob"
        label="DOB"
        type="date"
        value={userData.dob}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="description"
        label="Description"
        value={userData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
      <Button onClick={onClose} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
        Cancel
      </Button>
    </form>
  );
};

export default EditUserForm;
