
import React from 'react';

const PopupModal = ({
  isOpen,
  onClose,
  onSubmit,
  formValues,
  handleInputChange,
  editingOrder,
  users,
  categories,
  services,
  filteredServices,
}) => {
  if (!isOpen) return null;
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white text-black p-6 rounded shadow-md w-full max-w-md mx-auto">
        <h2 className="text-lg font-bold mb-4">{editingOrder ? "Edit Order" : "Add New Order"}</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-black">Customer Name</label>
            <select
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              required
            >
              <option value="">Select a customer</option>
              {users.map((cust) => (
                <option key={cust._id} value={cust._id}>{cust.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
              name="category_id"
              value={formValues.category_id}
              onChange={handleInputChange}
              className="w-full p-2 border text-black border-gray-300 rounded"
              required
            >
              <option value="">Select a Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.category_Name}</option>
              ))}
              
            </select>
          </div>
          
          
          <div className="mb-4">
            <label htmlFor="service">Service:</label>
            <select
              name="serviceName"
              value={formValues.serviceName}
              onChange={handleInputChange}
              className="w-full p-2 border text-black border-gray-300 rounded"
            >
              <option value="">Select a service</option>
              {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.serviceName}
              </option>
              ))}
            </select>
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
          <div className="mb-4">
            <label className="block text-gray-700">Order Price</label>
            <input
              type="number"
              name="order_price"
              value={formValues.order_price}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="flex justify-end">
            <button type="button" className="btn btn-secondary mr-2" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editingOrder ? 'Update Order' : 'Add Order'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupModal;
