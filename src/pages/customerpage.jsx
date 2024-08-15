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
      const response = await axios.get(`/api/orders/${orderId}`);
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

