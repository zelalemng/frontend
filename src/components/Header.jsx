/**
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../helper/user";
import Sidebar from "./Sidebar";

function Header() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const onLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 text-white">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <Link to="/">Restaurant POS</Link>
          </div>
          <div className="flex items-center lg:order-2">
            {user ? (
              <>
                <Link className="mx-5" to="/">
                  Restaurants
                </Link>
                <Link className="mx-5" to="/menu">
                  Menus
                </Link>
                <Link className="mx-5" to="/items">
                  Menu Items
                </Link>
                
                <button className="btn" onClick={onLogout}>
                  <FaSignOutAlt className="inline-block" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link className="mx-5" to="/login">
                  <FaSignInAlt className="inline-block mx-1" /> Login
                </Link>
                <Link className="mx-5" to="/register">
                  <FaUser className="inline-block mx-1" /> Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;**/
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Sidebar from "./Sidebar";
import CustomerPage from "../pages/customerpage";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  

 
  const onLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 rounded-lg shadow-lg lg:px-6 py-2.5 dark:bg-gray-800 text-white">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            Welcome {user && user.name}
          </div>
          <div className="flex items-center lg:order-2">
            
            <button className="btn">
              <Link className="mx-5" to="/customerpage">
               <FaUser className="inline-block" /> Check Status
              </Link>
            </button>
            <button className="w-12 h-12 flex items-center justify-center text-xl font-bold rounded-full bg-green-200 hover:bg-gray-300 focus:outline-none" onClick={onLogout}>
              {user && user.name[0].toUpperCase()} {/* Display the first letter of the user's name */}
            </button>


          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

