import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header2';
import { ToastContainer } from "react-toastify";
import Dashboard from './components/Dashboard';
//import CustomerDashboard from './components/CustomerDashboard';
import OrderManagement from './components/Order';
import CategoryManagement from './components/Category';
import Customer from "./components/Customer";
import Login from './pages/Login'; // Assuming you have a Login page
import Register from './pages/Register'; // Assuming you have a Register page
import 'tailwindcss/tailwind.css';

function App() {
  const isAuthenticated = true; // Replace with your authentication logic

  return (
    <Router>
      {isAuthenticated ? (
        <div className="flex">
          <Sidebar />
          <div className="flex-grow bg-gray-300">
            
            <div className="p-4">
              <Routes>
                <Route path="/OrderManagement" element={<OrderManagement /> } />
                <Route path="/CategoryManagement" element={<CategoryManagement />} />
                <Route path="/details" element={<Customer />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
            
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
        
      )}
    </Router>
  );
}

export default App;


