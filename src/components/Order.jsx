/**
import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formValues, setFormValues] = useState({
    order_id: '',
    category_id: '',
    category_type: '',
    order_description: '',
    order_status: '',
  });

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`);
      setOrders(response.data);  
  
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchCategories();
  }, []);

  const generateOrderId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomId = 'CK-';
    for (let i = 0; i < 5; i++) {
      randomId += characters.charAt(Math.random(i) * characters.length);
    }
    return randomId;
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    //const orderData = { ...formValues };
    if (!formValues.order_id) {
      formValues.order_id = generateOrderId();
    }
    if (editingOrder) {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/orders/${editingOrder._id}`, formValues);
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, formValues);
    }
    fetchOrders();
    setPopupModal(false);
    setEditingOrder(null);
    setFormValues({
      order_id: '',
      category_id: '',
      category_type: '',
      order_description: '',
      order_status: '',
    });
  };

  const handleEditOrder = (record) => {
    setEditingOrder(record);
    setFormValues(record);
    setPopupModal(true);
  };

  const handleDeleteOrder = async (record) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/orders/${record._id}`);
    fetchOrders();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const columns = [
    { title: 'Order ID', dataIndex: 'order_id', key: 'order_id' },
    { title: 'Category', dataIndex: 'category_id', key: 'category_id', render: (text, record) => record.category_id.category_Name },
    { title: 'Category Type', dataIndex: 'category_type', key: 'category_type' },
    { title: 'Order Description', dataIndex: 'order_description', key: 'order_description' },
    { title: 'Order Status', dataIndex: 'order_status', key: 'order_status' },
    {
      title: 'Action', key: 'action', render: (text, record) => (
        <div className="flex space-x-1">
          <button className="btn btn-primary" onClick={() => handleEditOrder(record)}>Edit</button>
          <button className="btn btn-danger" onClick={() => handleDeleteOrder(record)}>Delete</button>
        </div>
      )
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-6 text-black">Order Management</h1>
        <button
          className="btn btn-primary flex items-center text-black"
          onClick={() => setPopupModal(true)}
        >
          <AiOutlinePlus className="mr-2" />
          <span className="hidden sm:block">Create New Order</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((col) => (
                <th key={col.key} className="border border-gray-300 px-2 sm:px-4 py-1">{col.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-black bg-white">
                <td className="border border-gray-300 px-2 sm:px-4 py-1">{order.order_id}</td>
                <td className="border border-gray-300 px-2 sm:px-4 py-1">{order.category_id.category_Name}</td>
                <td className="border border-gray-300 px-2 sm:px-4 py-1">{order.category_type}</td>
                <td className="border border-gray-300 px-2 sm:px-4 py-1">{order.order_description}</td>
                <td className="border border-gray-300 px-2 sm:px-4 py-1">{order.order_status}</td>
                <td className="border border-gray-300 px-2 sm:px-4 py-1">
                  <button className="btn btn-primary mr-2" onClick={() => handleEditOrder(order)}>Edit</button>
                  <button className="btn btn-danger mr-2" onClick={() => handleDeleteOrder(order)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {popupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
            <h2 className="text-lg font-bold mb-4">{editingOrder ? "Edit Order" : "Add New Order"}</h2>
            <form onSubmit={handleOrderSubmit}>
              

              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <select
                  name="category_id"
                  value={formValues.category_id}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select a Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.category_Name}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Category Type</label>
                <input
                  type="text"
                  name="category_type"
                  value={formValues.category_type}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Order Description</label>
                <textarea
                  name="order_description"
                  value={formValues.order_description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Order Status</label>
                <select
                  name="order_status"
                  value={formValues.order_status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select a Status</option>
                  <option value="pending">Pending</option>
                  <option value="started">Started</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button type="button" className="btn btn-secondary mr-2" onClick={() => setPopupModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingOrder ? 'Update Order' : 'Add Order'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
**/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PopupModal from './PopupModal';
import ViewModal from './ViewModal';
import { AiOutlinePlus, AiFillEdit, AiOutlineMinus, AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import Spinner from "../components/Spinner";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formValues, setFormValues] = useState({
    order_id: '',
    category_id: '',
    
    order_description: '',
    order_status: '',
    name: '',
    serviceName: '',
    order_price: 0,
  });
  const [viewingOrder, setViewingOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(false);
  
  const itemsPerPage = 10;
  
  // Fetch data on initial render
  useEffect(() => {
    fetchOrders();
    fetchUsers();
    fetchCategories();
    
    fetchServices();
    
  }, []);
  

 
  

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  
  };
  const fetchServices = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/services`);  // Your API to fetch services
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);

    // Filter services by selected category
    const filtered = services.filter(service => service.categoryId === selectedCategoryId);
    setFilteredServices(filtered);
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
    
  };
  
  const generateOrderId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomId = 'CK-';
    for (let i = 0; i < 5; i++) {
      randomId += characters.charAt(Math.random(i) * characters.length);
    }
    return randomId;
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    if (!formValues.order_id) {
      formValues.order_id = generateOrderId();
    }
    if (editingOrder) {
      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/orders${formValues.order_id}`, formValues);
        setEditingOrder(false);
      } catch (error) {
        console.error('Error updating order:', error);
      }
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, formValues);
      } catch (error) {
        console.error('Error creating order:', error);
      }
    }
    setPopupModal(false);
    fetchOrders();
  };

  const handleEditOrder = (order) => {
    setFormValues(order);
    setEditingOrder(true);
    setPopupModal(true);
  };
  if (loading) {
    return <Spinner />;
  }

  const handleViewOrder = (order) => {
    setViewingOrder(order);
    setViewModal(true);
  };

  const paginatedOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/orders${orderId}`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="container mx-auto md:px-2 lg:px-6 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-4">Order Management</h1>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {
            setFormValues({
              order_id: '',
              category_id: '',
              category_type: '',
              order_description: '',
              order_status: '',
              name: '',
              serviceName: '',
              order_price: 0,
            });
            setEditingOrder(false);
            setPopupModal(true);
          }}
        >
          <AiOutlinePlus />
        </button>
      </div>

      <table className="table-auto w-full p-2 md:px-12 lg:px-6 text-black text-left border-collapse border border-gray-200 bg-white rounded-md shadow">
        <thead>
          <tr>
            
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Category Type</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map(order => (
            <tr key={order.order_id}>
              
              <td className="py-2 px-3 border">{order.name?.name || 'Unknown'}</td>
              <td className="py-2 px-3 border">{order.category_type}</td>
              <td className="py-2 px-3 text-sm border">{order.order_description}</td>
              <td className="py-2 px-3 border">{order.order_status}</td>
              <td className="py-2 px-3 border">{order.order_price} birr</td>
              <td className="py-2 px-3 border">
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => handleEditOrder(order)}>
                    <AiFillEdit />
                  </button>
                  <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleDeleteOrder(order.order_id)}>
                    <AiFillDelete />
                  </button>
                  <button className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700" onClick={() => handleViewOrder(order)}>
                    <AiOutlineEye />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4 items-center">
        <span className="text-sm text-gray-300">Page {currentPage} of {Math.ceil(orders.length / itemsPerPage)}</span>
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(orders.length / itemsPerPage)))}
            disabled={currentPage === Math.ceil(orders.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>

      <PopupModal
        isOpen={popupModal}
        onClose={() => setPopupModal(false)}
        onSubmit={handleOrderSubmit}
        formValues={formValues}
        handleInputChange={handleInputChange}
        editingOrder={editingOrder}
        users={users}
        services={services}
        categories={categories}
        filteredServices={filteredServices}
        
      />

      <ViewModal
        isOpen={viewModal}
        onClose={() => setViewModal(false)}
        viewingOrder={viewingOrder}
      />
    </div>
  );
};

export default OrderManagement;

