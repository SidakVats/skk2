import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfFunction: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError('');
      await axios.post('http://localhost:5000/api/submit-lead', formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        dateOfFunction: '',
      });
    } catch (error) {
      console.error('Error submitting lead form:', error);
      setError('Error submitting lead form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white mt-10 px-10 py-10 w-[93%] md:ms-10 rounded-3xl border-2 border-gray-200 mx-2">
      <p className="font-medium text-xl text-gray-500">
        Welcome. Please enter lead generation details.
      </p>
      <div className="mt-5">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Lead form submitted successfully!</p>}
        <form onSubmit={handleSubmit}>
          <div className="mt-8 grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-2 justify-between items-center">
            <div>
              <label htmlFor="name" className="text-lg font-medium">
                Full Name
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="text-lg font-medium">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                id="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-2 justify-between items-center">
            <div>
              <label htmlFor="phone" className="text-lg font-medium">
                Phone Number
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                id="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="dateOfFunction" className="text-lg font-medium">
                Date of Function
              </label>
              <input
                type="date" // Use type="date" for the date input field
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                id="dateOfFunction"
                value={formData.dateOfFunction}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-5">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
