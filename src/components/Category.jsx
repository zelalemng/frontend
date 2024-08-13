
import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formValues, setFormValues] = useState({
    category_Name: '',
    category_description: '',
    category_status: '',
  });
  
  const fetchCategories = async () => {
    
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
    setCategories(response.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  
  const handleFinish = async (e) => {
    e.preventDefault();
    if (editingCategory) {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/categories/${editingCategory._id}`, formValues);
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/categories`, formValues);
    }
    fetchCategories();
    setPopupModal(false);
    setEditingCategory(null);
    setFormValues({
      category_Name: '',
      category_description: '',
      category_status: '',
    });
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setFormValues(category);
    setPopupModal(true);
  };

  const handleDeleteCategory = async (category) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/categories/${category._id}`);
    fetchCategories();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const columns = [
    { title: 'Category Name', dataIndex: 'category_Name', key: 'category_Name' },
    { title: 'Description', dataIndex: 'category_description', key: 'category_description' },
    { title: 'Status', dataIndex: 'category_status', key: 'category_status' },
    {
      title: 'Action', key: 'action', render: (text, record) => (
        <div className="flex space-x-2">
          <button className="btn btn-primary" onClick={() => handleEditCategory(record)}>Edit</button>
          <button className="btn btn-danger" onClick={() => handleDeleteCategory(record)}>Delete</button>
        </div>
      )
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-6">Category Management</h1>
        <button
          className="btn btn-primary flex items-center"
          onClick={() => setPopupModal(true)}
        >
          <AiOutlinePlus className="mr-2" />
          Add Category
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((col) => (
                <th key={col.key} className="border border-gray-300 px-4 py-2">{col.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td className="border border-gray-300 px-4 py-2">{category.category_Name}</td>
                <td className="border border-gray-300 px-4 py-2">{category.category_description}</td>
                <td className="border border-gray-300 px-4 py-2">{category.category_status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="btn btn-primary mr-2" onClick={() => handleEditCategory(category)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDeleteCategory(category)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {popupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h2 className="text-lg mb-4">{editingCategory ? "Edit Category" : "Add Category"}</h2>
            <form onSubmit={handleFinish}>
              <div className="mb-4">
                <label className="block text-gray-700">Category Name</label>
                <input
                  type="text"
                  name="category_Name"
                  value={formValues.category_Name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Category Description</label>
                <input
                  type="text"
                  name="category_description"
                  value={formValues.category_description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Category Status</label>
                <select
                  name="category_status"
                  value={formValues.category_status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select a Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button type="button" className="btn btn-secondary mr-2" onClick={() => setPopupModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingCategory ? 'Update Category' : 'Add Category'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;

