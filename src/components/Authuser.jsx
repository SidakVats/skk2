import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Userdash from '../pages/HRDashboard';
import HrOrders from '../pages/HrOrders';
import HrCustomers from '../pages/HrCustomers';
import AddProducts from '../pages/AddProducts';
import LeadForm from './LeadForm';
import ProductVault from '../pages/ProductVault';


const AuthUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>AuthUser</h1>
      {user.role === 'super_admin' ? (
        <div>
          <p>Welcome, Super Admin!</p>
           <Userdash />
           <HrOrders/>
           <HrCustomers/>
           <AddProducts/>
           <LeadForm/>
           <ProductVault/>
        </div>
      ) : (
        <div>
          <p>Welcome, {user.name}!</p>
          {/* Render components based on user permissions */}
          {/* {user.permissions.includes('view_leads') && <LeadComponent />} */}
          {/* {user.permissions.includes('view_reports') && <ReportComponent />} */}
          {/* Add more components based on permissions */}
        </div>
      )}
    </div>
  );
};

export default AuthUser;
