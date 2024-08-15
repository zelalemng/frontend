/**import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  useEffect(() => {
    // Fetch order data
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`);
        setOrderCount(response.data.length); // Assuming response.data is an array of orders
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    // Fetch category data
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
        setCategoryCount(response.data.length); // Assuming response.data is an array of categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchOrders();
    fetchCategories();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-4xl font-bold">{orderCount}</p>
        </div>

        
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Total Categories</h2>
          <p className="text-4xl font-bold">{categoryCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;**/
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [activeCategories, setActiveCategories] = useState(0);
  const [inactiveCategories, setInactiveCategories] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [startedOrders, setStartedOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [rejectedOrders, setRejectedOrders] = useState(0);

  useEffect(() => {
    // Fetch order data
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        const orders = response.data;
        setOrderCount(orders.length);
        setPendingOrders(orders.filter(order => order.order_status === 'pending').length);
        setStartedOrders(orders.filter(order => order.order_status === 'started').length);
        setCompletedOrders(orders.filter(order => order.order_status === 'completed').length);
        setRejectedOrders(orders.filter(order => order.order_status === 'rejected').length);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    // Fetch category data
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        const categories = response.data;
        setCategoryCount(categories.length);
        setActiveCategories(categories.filter(category => category.category_status === 'active').length);
        setInactiveCategories(categories.filter(category => category.category_status === 'inactive').length);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchOrders();
    fetchCategories();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Order Card */}
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-4xl font-bold">{orderCount}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-1">Pending</h3>
              <p className="text-2xl font-bold">{pendingOrders}</p>
            </div>
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-1">Started</h3>
              <p className="text-2xl font-bold">{startedOrders}</p>
            </div>
            <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-1">Completed</h3>
              <p className="text-2xl font-bold">{completedOrders}</p>
            </div>
            <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-1">Rejected</h3>
              <p className="text-2xl font-bold">{rejectedOrders}</p>
            </div>
          </div>
        </div>

        {/* Category Card */}
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Total Categories</h2>
          <p className="text-4xl font-bold">{categoryCount}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
            <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-1">Active Categories</h3>
              <p className="text-2xl font-bold">{activeCategories}</p>
            </div>
            <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-1">Inactive Categories</h3>
              <p className="text-2xl font-bold">{inactiveCategories}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
