import { FaSignOutAlt, FaTachometerAlt,  FaComments } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully ✅");
  };

  // Active link styling
  const activeClass = "bg-gray-700 rounded px-2 py-2 flex items-center gap-3 transition";
  const inactiveClass = "px-2 py-2 flex items-center gap-3 hover:bg-gray-700 rounded transition";

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-screen p-6 shadow-lg">
      {/* Logo / Title */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-400">MERN Chatbot</h2>
      </div>

      {/* User Info */}
      <div className="mb-6">
        <p className="text-gray-400 text-sm">Logged in as:</p>
        <p className="font-semibold text-lg">{user?.name}</p>
        <p className="text-gray-400 text-sm">{user?.email}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/userdashboard"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              <FaTachometerAlt className="text-blue-400" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/chat"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              <FaComments className="text-yellow-400" />
              <span>Conversations</span>
            </NavLink>
          </li>
          
        </ul>
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded transition font-semibold cursor-pointer"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
