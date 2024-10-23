/**
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
import CustomerPage from './pages/customerpage';
import 'tailwindcss/tailwind.css';

function App() {
  const isAuthenticated = true; // Replace with your authentication logic

  return (
    <Router>
      {isAuthenticated ? (
        <div className="flex">
          <Sidebar />
          <div className="flex-grow bg-gray-100">
            
            <div className="p-4">
              <Routes>
                <Route path="/OrderManagement" element={<OrderManagement /> } />
                <Route path="/CategoryManagement" element={<CategoryManagement />} />
                <Route path="/details" element={<Customer />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='/customerpage' element={<CustomerPage />} />
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
**/
import React,{ lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/menuItem/sidebar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from './components/Dashboard';
import Layout from './components/menu/Layout';
import OrderManagement from './components/Order';
import CategoryManagement from './components/Category';
import Customer from "./components/Customer";
import Login from './pages/Login'; 
import Register from './pages/Register'; 

import 'tailwindcss/tailwind.css';

import CustomerPage from './pages/customerpage';
import Hero from './pages/Hero';
import FloatingShape from "./components/FloatingShape";
import AddServicePage from "./components/service";

import EmailVerificationPage from './pages/EmailVerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { useAuthStore } from "./store/authStore";
import Spinner from "./components/Spinner";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
;
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

//<Route path="/login" element={<Navigate to="/" />} />

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};
function App() {
  const userType = 'Admin';
  const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <Spinner />;
  

  return (
    
      
      
      <div className='min-h-screen bg-gradient-to-br
        from-gray-900 via-green-900 to-emerald-900 relative overflow-hidden'>
        <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			  <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			  <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
        <ToastContainer />
        <Routes>
          <>
          
              <Route path="/" element={<Hero />} />
              
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              
              <Route path="/verify-email" element={<RedirectAuthenticatedUser><EmailVerificationPage /></RedirectAuthenticatedUser>} />
              <Route path="/forgot-password" element={<RedirectAuthenticatedUser><ForgotPasswordPage /></RedirectAuthenticatedUser>} />
              <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser><ResetPasswordPage /></RedirectAuthenticatedUser>} />
              

                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                    <Sidebar>
                      <Layout>
                        <Dashboard />
                      </Layout>
                    </Sidebar>
                  </ProtectedRoute>
                    
                  } 
                />
                <Route 
                  path="/customerpage" 
                  element={
                    <ProtectedRoute>
                    <Sidebar>
                      <Layout>
                      <CustomerPage />
                      </Layout>
                    </Sidebar>
                  </ProtectedRoute>
                    
                  } 
                />

                <Route 
                  path="/service" 
                  element={
                    <Sidebar>
                      <Layout>
                        <AddServicePage />
                      </Layout>
                    </Sidebar>
                  } 
                />
                <Route 
                  path="/CategoryManagement" 
                  element={
                    <ProtectedRoute>
                      <Sidebar>
                        <Layout>
                          <CategoryManagement />
                      </Layout>
                      </Sidebar>
                    </ProtectedRoute>
                    
                  } 
                />

                <Route 
                  path="/OrderManagement" 
                  element={
                    <ProtectedRoute>
                      <Sidebar>
                        <Layout>
                          <OrderManagement />
                        </Layout>
                      </Sidebar>
                    </ProtectedRoute>
                    
                  } 
                />

                

                <Route 
                  path="/details" 
                  element={
                    <ProtectedRoute>
                      <Sidebar>
                        <Layout>
                          <Customer />
                        </Layout>
                      </Sidebar>
                    </ProtectedRoute>
                    
                  } 
                />
                <Route path='*' element={<Navigate to='/' replace />} />
             </>

          </Routes>
          <Toaster />
      </div>
    
  );
}
export default App;







