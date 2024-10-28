/**
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceFormPopup from './ServiceFormPopup';

const AddServicePage = () => {
  const [services, setServices] = useState([]);

  

  // Function to fetch services from backend
  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  // Function to add a new service
  const addService = async (newService) => {
    try {
      const response = await axios.post('/api/services', newService);
      setServices((prevServices) => [...prevServices, response.data]);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  // Fetch services when component mounts
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <ServiceFormPopup addService={addService} />
        <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">Existing Services</h3>
        <div className="bg-gray-200 shadow-lg rounded-lg p-4">
          {services.length > 0 ? (
            <ul className="divide-y divide-black">
              {services.map(service => (
                <li key={service._id} className="py-2 flex justify-between text-black items-center">
                  <div className='mt-2 '>
                    <span className="text-xlg font-bold">Category: {service.category?.category_Name}</span>
                   
                    <span className="text-xlg font-bold">ServiceN: {service.serviceName}</span>
                    <span className="text-xlg font-bold">Description: {service.description}</span>
                    <span className={`text-xlg font-bold ${service.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                      Status: {service.status}
                    </span>
                  </div>
                  
                  <span className="text-sm text-gray-500">{service.category_Name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No services available.</p>
          )}
        </div>
      </div>
    
  );
};

export default AddServicePage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceFormPopup from './ServiceFormPopup';

const AddServicePage = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [orders, setOrders] = useState([]);
  const paginatedOrders = services.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const fetchServices = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  // Function to fetch services from backend
  const addService = async (newService) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/services`, newService);
      setServices((prevServices) => [...prevServices, response.data]);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  // Fetch services when component mounts
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="container mx-auto p-2 bg-gray-50 rounded-lg shadow-lg">
      <ServiceFormPopup addService={addService} />
      
      
      <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">Existing Services</h3>
      
      <div className="bg-gray-100 shadow-lg rounded-lg p-2">
        {services.length > 0 ? (
          <ul className="space-y-2">
            {paginatedOrders.map((service, index) => (
              <li 
                key={service._id} 
                className="bg-green-100 hover:bg-green-200 transition duration-200 rounded-lg p-2 shadow-md flex justify-between items-center"
              >
               
                <div className="text-lg font-bold text-gray-700 mr-2">{index + 1}.</div>
                
             
                <div className="flex-grow">
                  <p className="text-sm font-semibold text-gray-900">Category: {service.category?.category_Name}</p>
                  <p className="text-sm font-semibold text-gray-900">Service Name: {service.serviceName}</p>
                  <p className="text-sm text-gray-600 mt-1">Description: {service.description}</p>
                  <p className={`text-md font-semibold mt-2 ${service.status === 'active' ? 'text-green-600' : 'text-red-500'}`}>
                    Status: {service.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No services available.</p>
        )}
      </div>
      <div className="flex justify-between mt-4 text-black items-center">
        <span className="text-sm  text-gray-300">Page {currentPage} of {Math.ceil(orders.length / itemsPerPage)}</span>
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
    </div>
  );
};

export default AddServicePage;**/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceFormPopup from './ServiceFormPopup';

const AddServicePage = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [orders, setOrders] = useState([]);
  const paginatedOrders = services.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const fetchServices = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  // Function to fetch services from backend
  const addService = async (newService) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/services`, newService);
      setServices((prevServices) => [...prevServices, response.data]);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  // Fetch services when component mounts
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="container mx-auto p-2 bg-gray-50 rounded-lg shadow-lg">
      <ServiceFormPopup addService={addService} />
      
      
      <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">Existing Services</h3>
      
      <div className="bg-gray-100 shadow-lg rounded-lg p-2">
        {services.length > 0 ? (
          <ul className="space-y-2">
            {paginatedOrders.map((service, index) => (
              <li 
                key={service._id} 
                className="bg-green-100 hover:bg-green-200 transition duration-200 rounded-lg p-2 shadow-md flex justify-between items-center"
              >
                {/* Service number */}
                <div className="text-lg font-bold text-gray-700 mr-2">{index + 1}.</div>
                
                {/* Service details */}
                <div className="flex-grow">
                  <p className="text-sm font-semibold text-gray-900">Category: {service.category?.category_Name}</p>
                  <p className="text-sm font-semibold text-gray-900">Service Name: {service.serviceName}</p>
                  <p className="text-sm text-gray-600 mt-1">Description: {service.description}</p>
                  <p className={`text-md font-semibold mt-2 ${service.status === 'active' ? 'text-green-600' : 'text-red-500'}`}>
                    Status: {service.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No services available.</p>
        )}
      </div>
      <div className="flex justify-between mt-4 text-black items-center">
        <span className="text-sm  text-gray-300">Page {currentPage} of {Math.ceil(orders.length / itemsPerPage)}</span>
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
    </div>
  );
};

export default AddServicePage;
