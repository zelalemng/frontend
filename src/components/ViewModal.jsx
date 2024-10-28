/**
import React from 'react';

const ViewModal = ({ isOpen, onClose, viewingOrder }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 p-4 z-50">
      <div className="bg-white text-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-lg max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Order Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="font-medium">Order ID:</p>
            <p>{viewingOrder?.order_id}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Service Name:</p>
            <p>{viewingOrder?.serviceName}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Description:</p>
            <p className="text-justify">{viewingOrder?.order_description}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Status:</p>
            <p className={`px-2 py-1 rounded-full ${
              viewingOrder?.order_status === 'completed' ? 'bg-green-100 text-green-700' :
              viewingOrder?.order_status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
              viewingOrder?.order_status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {viewingOrder?.order_status}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Username:</p>
            <p>{viewingOrder?.name?.name}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Price:</p>
            <p>${viewingOrder?.order_price}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
**/
import React from 'react';

const ViewModal = ({ isOpen, onClose, viewingOrder }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 p-4 z-50">
      <div className="bg-white text-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-lg max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center">Order Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 ">
        
          <div className="flex justify-between">
            <p className="font-medium">Order ID:</p>
            <p>{viewingOrder?.order_id}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Category:</p>
            <p>{viewingOrder?.category_id.category_Name}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Service Name:</p>
            <p>{viewingOrder?.serviceName?.serviceName || 'N/A'}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Description:</p>
            <p className="text-justify">{viewingOrder?.order_description}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Status:</p>
            <p className={`px-2 py-1 rounded-full ${
              viewingOrder?.order_status === 'completed' ? 'bg-green-100 text-green-700' :
              viewingOrder?.order_status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
              viewingOrder?.order_status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {viewingOrder?.order_status}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Username:</p>
            <p>{viewingOrder?.name?.name || 'N/A'}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium bg-green-200 px-2 py-1 rounded-full">Price:</p>
            <p className="text-green-800 font-semibold">birr {viewingOrder?.order_price}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;

