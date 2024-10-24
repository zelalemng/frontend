/**
import React, { useState } from 'react';
import axios from 'axios';

const CustomerPage = () => {
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setOrderDetails(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`);
      setOrderDetails(response.data);
    } catch (err) {
      setError('Order not found or invalid order ID.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-black">Check Order Status</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="orderId">
          Enter your Order ID
        </label>
        <input
          type="text"
          id="orderId"
          name="orderId"
          value={orderId}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <button
          type="submit"
          className="btn btn-primary text-black"
        >
          Check Status
        </button>
      </form>
      
      {error && <p className="text-red-500">{error}</p>}

      {orderDetails && (
        <div className="bg-white p-6  rounded shadow-md">
          <h2 className="text-lg font-bold mb-4">Order Details</h2>
          <p><strong>Order ID:</strong> {orderDetails.order_id}</p>
          <p><strong>Category:</strong> {orderDetails.category_id.category_Name}</p>
          <p><strong>Category Type:</strong> {orderDetails.category_type}</p>
          <p><strong>Description:</strong> {orderDetails.order_description}</p>
          <p className=''><strong>Status:</strong> {orderDetails.order_status}</p>
          <p><strong>Created At:</strong> {new Date(orderDetails.order_createdAt).toLocaleString()}</p>
          {orderDetails.order_completedAt && (
            <p><strong>Completed At:</strong> {new Date(orderDetails.order_completedAt).toLocaleString()}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerPage;
**/
/**
import React, { useState } from 'react';
import axios from 'axios';
import { logout } from '../helper/user';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
const CustomerPage = () => {
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const handleInputChange = (e) => {
    setOrderId(e.target.value);
  };
  const onLogout = () => {
    logout();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setOrderDetails(null);
    try {
      const response = await axios.get(`/api/orders/${orderId}`);
      setOrderDetails(response.data);
    } catch (err) {
      setError('Order not found or invalid order ID.');
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 absolute inset-0 px-40 justify-center items-center text-black text-center">
      <h1 className="text-2xl font-bold mb-6 text-white">Check Order Status</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <label className="block text-gray-200 mb-2" htmlFor="orderId">
          Enter your Order ID
        </label>
        
        <input
          type="text"
          id="orderId"
          name="orderId"
          value={orderId}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <button
          type="submit"
          className="btn btn-primary text-black"
        >
          Check Status
        </button>
      </form>
      
      {error && <p className="text-red-500">{error}</p>}

      {orderDetails && (
        <div className="bg-white p-6  rounded shadow-md">
          <h2 className="text-lg font-bold mb-4">Order Details</h2>
          <h2 className="text-lg font-bold mb-4"><strong>Welcome {orderDetails.name?.name}</strong></h2>
          <p><strong>Name:</strong> {orderDetails.name}</p>
          <p><strong>Order ID:</strong> {orderDetails.order_id}</p>
          <p><strong>Category:</strong> {orderDetails.category_id.category_Name}</p>
          <p><strong>Category Type:</strong> {orderDetails.category_type}</p>
          <p><strong>Description:</strong> {orderDetails.order_description}</p>
          <p><strong>price:</strong> {orderDetails.order_price}</p>
          <p className="text-red-500 text-2xl"><strong>Status:</strong> {orderDetails.order_status}</p>
          <p><strong>Created At:</strong> {new Date(orderDetails.order_createdAt).toLocaleString()}</p>
          {orderDetails.order_completedAt && (
            <p><strong>Completed At:</strong> {new Date(orderDetails.order_completedAt).toLocaleString()}</p>
          )}
        </div>
        
      )}
      <div>
        <button className="flex items-center justify-center py-5 text-red-500 w-full" onClick={onLogout}>
        <FiLogOut className="mr-2 md:mr-0" />
        <span className='hidden md:inline ml-3'>Logout</span>
      </button>
      </div>
    </div>
  );
};

export default CustomerPage;

**/
import React, { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.PNG';

const CustomerPage = () => {
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleInputChange = (e) => {
    setOrderId(e.target.value);
  };

  const onLogout = () => {
    logout();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setOrderDetails(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`);
      setOrderDetails(response.data);
      setIsModalOpen(true); // Open modal on successful fetch
    } catch (err) {
      setError('Order not found or invalid order ID.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOrderDetails(null);
  };

  return (
    <div className="container mx-auto p-4 absolute inset-0 flex flex-col items-center justify-center text-center text-black bg-gray-900 bg-opacity-50 min-h-screen">
      <div className="mb-1">
        <div className="w-32 h-32  flex items-center justify-center mb-2 ">
        {/* Add an icon or text inside the circle */}
          <img src={logo} alt="Wanco Agent" className="w-full h-full scale-125 object-cover rounded-full flex items-center justify-center mb-2" />
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-6 text-white">Check Order Status</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-md mb-6">
        <label className="block text-gray-200 mb-2" htmlFor="orderId">
          Enter your Order ID
        </label>
        <input
          type="text"
          id="orderId"
          name="orderId"
          value={orderId}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
        >
          Check Status
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {isModalOpen && orderDetails && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 shadow-lg relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg">&times;</button>
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p><strong>Welcome:</strong> {orderDetails.name ? (typeof orderDetails.name === 'string' ? orderDetails.name : orderDetails.name.name) : 'N/A'}</p>
            <p><strong>Order ID:</strong> {orderDetails.order_id}</p>
            <p><strong>Category:</strong> {orderDetails.category_id.category_Name}</p>
            <p><strong>Category Type:</strong> {orderDetails.category_type}</p>
            <p><strong>Description:</strong> {orderDetails.order_description}</p>
            <p><strong>Price:</strong> ${orderDetails.order_price}</p>
            <p className="text-2xl text-red-500"><strong>Status:</strong> {orderDetails.order_status}</p>
            <p><strong>Created At:</strong> {new Date(orderDetails.order_createdAt).toLocaleString()}</p>
            {orderDetails.order_completedAt && (
              <p><strong>Completed At:</strong> {new Date(orderDetails.order_completedAt).toLocaleString()}</p>
            )}
          </div>
        </div>
      )}

      <button className="mt-4 flex items-center justify-center text-red-500 w-full" onClick={onLogout}>
        <FiLogOut className="mr-2" />
        Logout
      </button>
    </div>
  );
};

export default CustomerPage;


