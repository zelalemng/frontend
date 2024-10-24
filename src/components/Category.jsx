/**
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

export default CategoryManagement;**/
import Spinner from "../components/Spinner";
import React, { useState, useEffect } from 'react';
import { AiOutlinePlus, AiFillEdit, AiOutlineMinus, AiFillDelete, AiOutlineEye} from 'react-icons/ai';

import axios from 'axios';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    category_Name: '',
    category_description: '',
    category_status: '',
  });
  const itemsPerPage = 8;

  
  const handleFinish = async (e) => {
    e.preventDefault();
    if (editingCategory) {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/categories/${editingCategory._id}`, formValues);
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/categories/`, formValues);
    }
    fetchCategories();
    closePopup();
  };
  const fetchCategories = async () => {
    try{

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    
    fetchCategories();
  }, []);
  const handleDeleteCategory = async (category) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/categories/${category._id}`);
    fetchCategories();
  };
  const openPopup = (category = null) => {
    setEditingCategory(category);
    setFormValues(category || {
      category_Name: '',
      category_description: '',
      category_status: '',
    });
    setPopupModal(true);
  };

  const closePopup = () => {
    setPopupModal(false);
    setEditingCategory(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  if (loading) {
    return <Spinner />;
  }
  const paginatedCategories = categories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">Category Management</h1>
        <button onClick={() => setPopupModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md flex items-center space-x-2 hover:bg-blue-600 transition">
          <AiOutlinePlus className="text-xl" />
          <span>Add</span>
        </button>
      </div>
      
      <table className="table-auto w-full text-left border-collapse border border-gray-200 bg-white rounded-md shadow">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
            <th className="py-3 px-4 border border-gray-200">Category Name</th>
            <th className="py-3 px-4 border border-gray-200">Description</th>
            <th className="py-3 px-4 border border-gray-200">Status</th>
            <th className="py-3 px-4 border border-gray-200 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCategories.map(category => (
            <tr key={category._id} className="text-black hover:bg-gray-100">
              <td className="py-3 px-4 border border-gray-200">{category.category_Name}</td>
              <td className="py-3 px-4 border border-gray-200">{category.category_description}</td>
              <td className={`py-3 px-4 border border-gray-200 ${category.category_status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                {category.category_status}
              </td>
              <td className="py-3 px-4 border border-gray-200 text-center">
                <button className="bg-blue-400 text-white py-1 px-3 rounded mr-2" onClick={() => openPopup(category)}><AiFillEdit /></button>
                <button className="bg-red-500 text-white py-1 px-3 rounded" onClick={() => handleDeleteCategory(category)}><AiFillDelete /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination Controls */}
      <div className="flex justify-between mt-4 items-center">
        <span className="text-sm text-gray-600">Page {currentPage} of {Math.ceil(categories.length / itemsPerPage)}</span>
        <div className="flex space-x-2">
          <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</button>
          <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded" onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(categories.length / itemsPerPage)))} disabled={currentPage === Math.ceil(categories.length / itemsPerPage)}>Next</button>
        </div>
      </div>
      {popupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-200 text-black p-6 rounded-lg shadow-lg max-w-lg w-full transform transition-all duration-300">
            <h2 className="text-xl text-center font-semibold mb-4">{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
            <form onSubmit={handleFinish}>
              <div className="mb-4">
                <label className="block text-gray-700 uppercase">Category Name</label>
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

              <div className="flex justify-end space-x-2">
                <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition" onClick={closePopup}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                  {editingCategory ? 'Update Category' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;

