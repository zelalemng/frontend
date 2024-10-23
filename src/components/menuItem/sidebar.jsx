import React, { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import menu from "../table/sidebar1";
import { FaBars } from "react-icons/fa";
import logo from "../images/logo.PNG";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true); // Default state is open
  const navigate = useNavigate();

  // Toggle sidebar manually
  const toggle = () => setIsOpen(!isOpen);

  // Automatically toggle sidebar based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false); // Collapse sidebar for small screens
      } else {
        setIsOpen(true); // Expand sidebar for large screens
      }
    };

    // Check the screen size on initial load
    handleResize();

    // Attach event listener to resize event
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`flex flex-col text-white bg-gradient-to-br
        from-gray-900 via-green-900 to-emerald-900 shadow-lg transition-all duration-300 
        ${isOpen ? "w-44" : "w-15"} 
        h-screen`}
      >
        <div className="flex items-center justify-between p-4 bg-gray-800">
          {/* Home Icon - Left Side */}
          <div
            className={`text-white text-2xl cursor-pointer ${isOpen ? 'block' : 'hidden'}`}
            
          >
           <img 
              src={logo}
              alt="Wanco" 
              className="h-14 w-14  scale-125 object-cover rounded-full flex items-center justify-center mb-2"
            />
          </div>

          {/* Toggle Icon - Right Side */}
          <div
            className={`text-white text-2xl py-8 cursor-pointer ml-4 transition-transform ${isOpen ? 'ml-34' : 'ml-4'}`}
          >
            <FaBars size={20} onClick={toggle} />
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 mt-8 overflow-y-auto">
          {menu.map((item, index) => (
            <div key={index} className="p-2">
              <SidebarItem item={item} isOpen={isOpen} />
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 p-4 bg-gray-100 text-gray-500 overflow-y-auto h-screen transition-all duration-300 ${
          isOpen ? "ml-34" : "ml-1"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
