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

export default Dashboard;

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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`);
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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
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
**/
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);
  const [serviceCount, setServicesCount] = useState(0);
  const [activeCategories, setActiveCategories] = useState(0);
  const [inactiveCategories, setInactiveCategories] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [startedOrders, setStartedOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [rejectedOrders, setRejectedOrders] = useState(0);
  const [partialOrders, setPartialOrders] = useState(0);
  const [fullOrders, setFullOrders] = useState(0);
  const [services, setServices] = useState([]);
  const [pendingService, setPendingService] = useState([]);
  const [activeService, setActiveService] = useState([]);
  const [partialSum, setPartialSum] = useState(0);
  const [fullSum, setFullSum] = useState(0);
  const [totalSum, setTotalSum] = useState(0)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`);
        const orders = response.data;
        const partialSumCalc = orders
          .filter(order => order.paymentType === 'partial')
          .reduce((sum, order) => sum + order.order_price, 0);

        const fullSumCalc = orders
          .filter(order => order.paymentType === 'full')
          .reduce((sum, order) => sum + order.order_price, 0);

        setPartialSum(partialSumCalc);
        setFullSum(fullSumCalc);
        setTotalSum(partialSumCalc + fullSumCalc);
        setOrderCount(orders.length);
        setPaymentCount(orders.filter(order => order.paymentType).length);
        setPendingOrders(orders.filter(order => order.order_status === 'pending').length);
        setStartedOrders(orders.filter(order => order.order_status === 'started').length);
        setCompletedOrders(orders.filter(order => order.order_status === 'completed').length);
        setRejectedOrders(orders.filter(order => order.order_status === 'rejected').length);
        setPartialOrders(orders.filter(order => order.paymentType === 'partial').length);
        setFullOrders(orders.filter(order => order.paymentType === 'full').length);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
        const categories = response.data;
        setCategoryCount(categories.length);
        setActiveCategories(categories.filter(category => category.category_status === 'active').length);
        setInactiveCategories(categories.filter(category => category.category_status === 'inactive').length);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchServices = async () => {
    
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/services`);
        const services = response.data;
        setServicesCount(services.length)
        setActiveService(services.filter(service => service.status === 'active').length);
        setPendingService(services.filter(service => service.status === 'pending').length);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
        
      
    };

    fetchOrders();
    fetchCategories();
    fetchServices();
  }, []);

  return (
    <div className="p-4  min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {/* Order Card */}
        <div className=" p-2 rounded-lg shadow-lg bg-gray-300 bg-opacity-50 transform transition-transform hover:scale-105">
          <h2 className="text-xl font-bold text-center mb-4 text-gray-100">Total Orders</h2>
          <p className="text-5xl font-bold text-blue-500">{orderCount}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
            <div className="bg-blue-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-blue-700">Pending</h3>
              <p className="text-3xl font-bold">{pendingOrders}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-blue-700">Started</h3>
              <p className="text-3xl font-bold">{startedOrders}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-green-700">Completed</h3>
              <p className="text-3xl font-bold">{completedOrders}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-red-700">Rejected</h3>
              <p className="text-3xl font-bold">{rejectedOrders}</p>
            </div>
          </div>
        </div>

        {/* Category Card */}
        <div className=" p-2 rounded-lg shadow-lg bg-gray-100 bg-opacity-50 transform transition-transform hover:scale-105">
          <h2 className="text-xl font-bold text-center mb-4 text-gray-100">Total Categories</h2>
          <p className="text-5xl font-bold text-green-500">{categoryCount}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
            <div className="bg-green-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-green-700">Active</h3>
              <p className="text-3xl font-bold">{activeCategories}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-red-700">Inactive</h3>
              <p className="text-3xl font-bold">{inactiveCategories}</p>
            </div>
          </div>
        </div>

        {/* Payment Card */}
        <div className=" p-2 rounded-lg shadow-lg bg-gray-300 bg-opacity-50 transform transition-transform hover:scale-105">
          <h2 className="text-xl font-bold text-center mb-4 text-center text-gray-100">Payments</h2>
          <p className="text-5xl font-bold text-purple-500">{paymentCount}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
            <div className="bg-purple-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-purple-700">Partial</h3>
              <p className="text-3xl font-bold">{partialOrders}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-purple-700">Full</h3>
              <p className="text-3xl font-bold">{fullOrders}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-green-700">P.pay birr</h3>
              <p className="text-xl font-bold"> {partialSum.toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-green-700">F.pay birr</h3>
              <p className="text-xl font-bold"> {fullSum.toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-green-700">TOTAL birr {totalSum.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        <div className=" p-2 rounded-lg shadow-lg bg-gray-100 bg-opacity-50 transform transition-transform hover:scale-105">
          <h2 className="text-xl font-bold text-center mb-4 text-gray-100">Service</h2>
          <p className="text-5xl font-bold text-orange-500">{serviceCount}</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 mt-4">
            <div className="bg-purple-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-orange-700">Active</h3>
              <p className="text-3xl font-bold">{activeService}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-orange-700">Pending</h3>
              <p className="text-3xl font-bold">{pendingService}</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


