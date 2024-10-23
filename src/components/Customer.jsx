/**
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Customer() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch orders data from API
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://agentpro-api.onrender.com/api/orders`); // Replace with your actual API endpoint
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    // Filter and sort orders based on search term and status
    let filtered = orders.filter(order => 
      order.order_id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    filtered.sort((a, b) => a.order_status.localeCompare(b.order_status));
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-6">Customer Details</h1>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search orders ID..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full md:w-80"
          />
          <span className="absolute right-2 top-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.415 1.415l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-2">
        <div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-4xl font-bold">{orders.length}</p>
        </div>
        
      </div>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-b px-4 py-2 text-left">Order ID</th>
            <th className="border-b px-4 py-2 text-left">Description</th>
            <th className="border-b px-4 py-2 text-left">Status</th>
            <th className="border-b px-4 py-2 text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-100">
                <td className="border-b px-4 py-2">{order.order_id}</td>
                <td className="border-b px-4 py-2">{order.order_description}</td>
                <td className={`border-b px-4 py-2 text-${getStatusColor(order.order_status)}-600`}>
                  {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                </td>
                <td className="border-b px-4 py-2">{new Date(order.order_createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
            <div className="text-gray-600">Page {currentPage} of {totalPages}</div>
            <div className="flex space-x-2">
            {[...Array(totalPages).keys()].map((pageNumber) => (
                <button
                key={pageNumber + 1}
                onClick={() => handlePageChange(pageNumber + 1)}
                className={`px-4 py-2 border rounded-lg ${currentPage === pageNumber + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                >
                {pageNumber + 1}
                </button>
            ))}
            </div>
      </div>
    </div>
  );
}



export default Customer;
**/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from "../components/Spinner";

function Customer() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', phone: '', userType: '' });
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://agentpro-api.onrender.com/api/users`);
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(results);
    } else {
      setFilteredUsers(users);
    }
    // Reset the current page when search term changes
    setCurrentPage(1);
  }, [searchTerm, users]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSave = async () => {
    try {
      await axios.put(`https://agentpro-api.onrender.com/api/users/${currentUser._id}`, editFormData);
      setUsers(users.map(user => user._id === currentUser._id ? { ...user, ...editFormData } : user));
      setIsEditMode(false);
      setCurrentUser(null);
    } catch (error) {
      console.error("Failed to save user:", error);
      setError('Failed to save changes');
    }
  };
  const handleEdit = (user) => {
    setIsEditMode(true);
    setCurrentUser(user);
    setEditFormData({ name: user.name, email: user.email, phone: user.phone, userType: user.userType });
  };

  if (loading) {
    return <Spinner />;
  }
  
  if (error) {
    return <div>{error}</div>;
  }

  // Use `filteredUsers` for pagination
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mx-auto  md:px-2 lg:px-6 p-4 ">
      <div className="flex md:px-1 lg:px-6 justify-between items-center mb-1">
        <h1 className="text-2xl font-bold mb-6">Customer Info</h1>
        <div className="relative">
          <input 
            type="name" 
            placeholder="Search user Name..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 text-gray-900 rounded-lg w-full md:w-80"
          />
          
          <span className="absolute right-2 top-3 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.415 1.415l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
      
      <div className=" text-white p-1 bg-gray-200 rounded-lg shadow-lg">
        
        <p className="text-xl text-bue-500 font-bold">Total: {filteredUsers.length}</p>
      </div>
      

      <table className="table-auto text-black w-full p-1 md:px-4 lg:px-6 text-left border-collapse border border-gray-200 bg-white rounded-md shadow">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
            <th className="border-b px-2 md:px-2 py-1 text-left">Full Name</th>
            <th className="border-b px-2 md:px-2 py-1 text-left">Email</th>
            <th className="border-b px-2 md:px-2 py-1 text-left">User Type</th>
            <th className="border-b px-2 md:px-2 py-1 text-left">Phone No.</th>
            <th className="border-b px-2 md:px-2 py-1 text-left">Created At</th>
            <th className="border-b px-2 md:px-2 py-1 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="border-b px-2 md:px-2 py-1">{user.name}</td>
                <td className="border-b px-2 md:px-2 py-1">{user.email}</td>
                <td className="border-b px-2 md:px-2 py-1">{user.userType}</td>
                <td className="border-b px-2 md:px-2 py-1">{user.phone}</td>
                <td className="border-b px-2 md:px-2 py-1">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="border-b px-2 md:px-2 py-1">
                  <button 
                    onClick={() => handleEdit(user)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
      
      <div className="flex justify-between mt-4 items-center">
        <span className="text-sm text-gray-100">Page {currentPage} of {Math.ceil(filteredUsers.length / itemsPerPage)}</span>
        <div className="flex space-x-2">
          <button 
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button 
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded" 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredUsers.length / itemsPerPage)))} 
            disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
      {isEditMode && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-200 text-black p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <input
              type="text"
              value={editFormData.name}
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              placeholder="Name"
              className="p-2 border border-gray-300 rounded w-full mb-2"
            />
            <input
              type="email"
              value={editFormData.email}
              onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
              placeholder="Email"
              className="p-2 border border-gray-300 rounded w-full mb-2"
            />
            <input
              type="text"
              value={editFormData.phone}
              onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
              placeholder="Phone"
              className="p-2 border border-gray-300 rounded w-full mb-2"
            />
            <input
              type="text"
              value={editFormData.userType}
              onChange={(e) => setEditFormData({ ...editFormData, userType: e.target.value })}
              placeholder="user"
              className="p-2 border border-gray-300 rounded w-full mb-2"
            />
            <div className="flex justify-end">
              <button onClick={() => setIsEditMode(false)} className="bg-gray-300 text-black px-3 py-1 rounded mr-2">Cancel</button>
              <button onClick={handleSave} className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customer;
