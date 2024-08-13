/**import React, { useState, useEffect } from 'react';
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

  const handleOrderSubmit = async () => {
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
                <label className="block text-gray-700">Order ID</label>
                <input
                  type="text"
                  name="order_id"
                  value={formValues.order_id}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

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

export default OrderManagement;**/
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
      const token = localStorage.getItem('authToken');
      const response = await axios.get('/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchCategories();
  }, []);

  const handleOrderSubmit = async () => {
    if (editingOrder) {
      await axios.put(`/api/orders/${editingOrder._id}`, formValues);
    } else {
      await axios.post('/api/orders', formValues);
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
    await axios.delete(`/api/orders/${record._id}`);
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
          <button className="btn btn-danger" onClick={() => handleDeleteOrder()}>Delete</button>
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
            <tr className="bg-gray-400">
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
                <label className="block text-gray-700">Order ID</label>
                <input
                  type="text"
                  name="order_id"
                  value={formValues.order_id}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

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
