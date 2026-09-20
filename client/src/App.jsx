import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Customer Pages
import CustomerLayout from './layouts/CustomerLayout';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CustomerServices from './pages/customer/CustomerServices';
import CustomerTechnicians from './pages/customer/CustomerTechnicians';
import CustomerBooking from './pages/customer/CustomerBooking';
import CustomerOrders from './pages/customer/CustomerOrders';
import CustomerProfile from './pages/customer/CustomerProfile';

// Technician Pages
import TechnicianLayout from './layouts/TechnicianLayout';
import TechnicianDashboard from './pages/technician/TechnicianDashboard';
import TechnicianBookings from './pages/technician/TechnicianBookings';
import TechnicianJobs from './pages/technician/TechnicianJobs';
import TechnicianProfile from './pages/technician/TechnicianProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Customer Routes */}
        <Route path="/customer" element={<ProtectedRoute role="customer" />}>
          <Route element={<CustomerLayout />}>
            <Route index element={<CustomerDashboard />} />
            <Route path="services" element={<CustomerServices />} />
            <Route path="technicians" element={<CustomerTechnicians />} />
            <Route path="booking" element={<CustomerBooking />} />
            <Route path="orders" element={<CustomerOrders />} />
            <Route path="profile" element={<CustomerProfile />} />
          </Route>
        </Route>

        {/* Technician Routes */}
        <Route path="/technician" element={<ProtectedRoute role="technician" />}>
          <Route element={<TechnicianLayout />}>
            <Route index element={<TechnicianDashboard />} />
            <Route path="bookings" element={<TechnicianBookings />} />
            <Route path="jobs" element={<TechnicianJobs />} />
            <Route path="profile" element={<TechnicianProfile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
