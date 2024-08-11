import React from 'react';
import { FiUser } from 'react-icons/fi';

const Header1 = () => {
  return (
    <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      <div className="flex items-center">
        <FiUser className="text-2xl mr-4 text-gray-700" />
        <span className="text-gray-700">Admin</span>
      </div>
    </div>
  );
};

export default Header1;
