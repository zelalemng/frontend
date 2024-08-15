/**import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FiBox, FiLogOut } from 'react-icons/fi';
import { logout } from "../helper/user";
const Sidebar = () => {
    const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const onLogout = () => {
    logout();

    navigate("/login");
  };
  return (
    <div className="bg-gray-800 flex flex-col text-white w-64 h-screen p-4 shadow-lg">
        {user ? (
            <>
            <h1 className="text-2xl font-bold flex flex-col hidden md:block mt-6 py-3 italic">Admin Dashboard</h1>
            <hr className="border-gray-600" />
            <ul className='flex flex-col p-4 space-y-2 text-xl'>
                <li className=" flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
                <Link to="/dashboard" className="flex items-center">
                    <AiOutlineHome className="mr-2" />
                    <span className='hidden md:inline ml-3'>Dashboard</span>
                </Link>
                </li>
                <li className=" flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
                <Link to="/details" className="flex items-center">
                    <AiOutlineUser className="mr-4" />
                    <span className='hidden md:inline ml-3'>Customers</span>
                </Link>
                </li>
                <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
                <Link to="/OrderManagement" className="flex items-center">
                    <AiOutlineShoppingCart className="mr-4" />
                    <span className='hidden md:inline ml-3'>Orders</span>
                </Link>
                </li>
                <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
                <Link to="/CategoryManagement" className="flex items-center">
                    <FiBox className="mr-2" />
                    <span className='hidden md:inline ml-3'>Categories</span>
                </Link>
                </li>
                <li className="mt-auto flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
                <button className="flex items-center text-red-500 w-full" onClick={onLogout}>
                    <FiLogOut className="mr-2" />
                    <span className='hidden md:inline ml-3'>Logout</span>
                </button>
                </li>
            </ul>
            </>
        ) : (
            <>
                <div className="space-y-4 md:space-y-6">
                    <button className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                        <Link className="mb-8" to="/login">
                            <FaSignInAlt className=" flex items-center mx-1" /> Login
                        </Link>
                    </button>
                    <button className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                        <Link className="mb-8" to="/register">
                            <FaUser className="flex items-center mx-1" /> Register
                        </Link>
                    </button>
                </div>
                
            
            </> 
        )}
      
    </div>
  );
};

export default Sidebar;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FiBox, FiLogOut } from 'react-icons/fi';
import { logout } from "../helper/user";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-gray-800 flex flex-col text-white w-64 h-screen p-4 shadow-lg md:w-64 sm:w-20">
      {user ? (
        <>
          <h1 className="text-2xl font-bold hidden md:block mt-6 py-3 italic text-center">Admin Dashboard</h1>
          <hr className="border-gray-600 hidden md:block" />
          <ul className='flex flex-col p-4 space-y-2 text-xl'>
            <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
              <Link to="/dashboard" className="flex items-center w-full">
                <AiOutlineHome className="mr-2 md:mr-0" />
                <span className='hidden md:inline ml-3'>Dashboard</span>
              </Link>
            </li>
            <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
              <Link to="/details" className="flex items-center w-full">
                <AiOutlineUser className="mr-4 md:mr-0" />
                <span className='hidden md:inline ml-3'>Customers</span>
              </Link>
            </li>
            <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
              <Link to="/OrderManagement" className="flex items-center w-full">
                <AiOutlineShoppingCart className="mr-4 md:mr-0" />
                <span className='hidden md:inline ml-3'>Orders</span>
              </Link>
            </li>
            <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
              <Link to="/CategoryManagement" className="flex items-center w-full">
                <FiBox className="mr-2 md:mr-0" />
                <span className='hidden md:inline ml-3'>Categories</span>
              </Link>
            </li>
            <li className="mt-auto flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
              <button className="flex items-center text-red-500 w-full" onClick={onLogout}>
                <FiLogOut className="mr-2 md:mr-0" />
                <span className='hidden md:inline ml-3'>Logout</span>
              </button>
            </li>
          </ul>
        </>
      ) : (
        <div className="space-y-4 md:space-y-6">
          <button className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
            <Link className="flex items-center justify-center" to="/login">
              <FaSignInAlt className="mr-2" /> Login
            </Link>
          </button>
          <button className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
            <Link className="flex items-center justify-center" to="/register">
              <FaUser className="mr-2" /> Register
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;**/
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FiBox, FiLogOut } from 'react-icons/fi';
import { logout } from "../helper/user";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-gray-800 mix-auto flex flex-col text-white w-64 h-screen p-4 shadow-lg md:w-64 sm:w-20">
      {user ? (
        <>
          <h1 className="text-2xl font-bold hidden md:block mt-6 py-3 italic text-center">Admin Dashboard</h1>
          <hr className="border-gray-600 hidden md:block" />
          <ul className='flex flex-col p-4 space-y-2 text-xl'>
            <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
              <Link to="/dashboard" className="flex items-center w-full">
                <AiOutlineHome className="mr-2 md:mr-0" />
                <span className='hidden md:inline ml-3'>Dashboard</span>
              </Link>
            </li>
            <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
              <Link to="/details" className="flex items-center w-full">
                <AiOutlineUser className="mr-4 md:mr-0" />
                <span className='hidden md:inline ml-3'>Customers</span>
              </Link>
            </li>
            <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
              <Link to="/OrderManagement" className="flex items-center w-full">
                <AiOutlineShoppingCart className="mr-4 md:mr-0" />
                <span className='hidden md:inline ml-3'>Orders</span>
              </Link>
            </li>
            <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
              <Link to="/CategoryManagement" className="flex items-center w-full">
                <FiBox className="mr-2 md:mr-0" />
                <span className='hidden md:inline ml-3'>Categories</span>
              </Link>
            </li>
            <li className="mt-auto flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
              <button className="flex items-center text-red-500 w-full" onClick={onLogout}>
                <FiLogOut className="mr-2 md:mr-0" />
                <span className='hidden md:inline ml-3'>Logout</span>
              </button>
            </li>
          </ul>
        </>
      ) : (
        <div className="space-y-4  md:inline py-8 sm:space-y-4">
          <button className='w-full text-white px-1 py-6 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
            <Link className="flex items-center justify-center" to="/login">
              <FaSignInAlt className="mr-2" /> Login
            </Link>
          </button>
          <button className='w-full text-white py-6  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
            <Link className="flex items-center justify-center" to="/register">
              <FaUser className="mr-2" /> Register
            </Link>
          </button>
            <Link className="flex items-center py-6 hover:bg-green-500 justify-center rounded-lg " to="/customerpage">
              <FaSignOutAlt /><span className='font-bold'>Click here! <br />Check Order Status</span>
          </Link>
          <div className='text-white py-8 px-1'>
            <span className='font-bold py-3 '>Phone : +2519******</span>
            <br />
            <span className='font-bold py-3'>Email : xxx@gmail.com</span>
            <br />
            <span className='font-bold py-3'>Address : *** </span>
          </div>

        </div>
        
      )}
    </div>
  );
};

export default Sidebar;

