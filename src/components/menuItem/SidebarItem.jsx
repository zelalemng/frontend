import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";

const activeLink = ({ isActive }) => (isActive ? "bg-blue-500 text-white" : "text-gray-400");
const activeSublink = ({ isActive }) => (isActive ? "bg-blue-400 text-white" : "text-gray-400");

const SidebarItem = ({ item, isOpen }) => {
  const [expandMenu, setExpandMenu] = useState(false);

  if (item.childrens) {
    return (
      <div>
        {/* Main Item */}
        <div
          className="flex items-center justify-between p-3 cursor-pointer text-lg hover:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-200 rounded-md"
          onClick={() => setExpandMenu(!expandMenu)}
        >
          <div className="flex items-center gap-3">
            {item.icon && <div className="text-2xl">{item.icon}</div>}
            {isOpen && <span className="text-white">{item.title}</span>}
          </div>
          <MdKeyboardArrowRight
            size={25}
            className={`text-white transition-transform duration-300 ${expandMenu ? "rotate-90" : ""}`}
          />
        </div>

        {/* Submenu */}
        <div className={`pl-4 ${expandMenu ? "max-h-screen" : "max-h-0"} transition-all duration-300 overflow-hidden`}>
          {item.childrens.map((child, index) => (
            <NavLink to={child.path} key={index} className={activeSublink}>
              <div className="flex items-center p-2 text-sm hover:bg-gray-600 transition-colors duration-200 rounded-md shadow-md hover:shadow-lg">
                {child.icon && <div className="text-xl">{child.icon}</div>}
                {isOpen && <span>{child.title}</span>}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <NavLink to={item.path} className={activeLink}>
      <div className="flex items-center p-3 hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg rounded-md">
        {item.icon && <div className="text-2xl">{item.icon}</div>}
        {isOpen && <span className="ml-3 text-lg">{item.title}</span>}
        {!isOpen && <MdKeyboardArrowRight size={20} className="ml-auto text-white" />}
      </div>
    </NavLink>
  );
};

export default SidebarItem;

