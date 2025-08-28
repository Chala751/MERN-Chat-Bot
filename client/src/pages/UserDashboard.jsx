import { FaHome, FaUser, FaComments, FaCogs } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully ✅");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name}!</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/chat")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
          >
            <FaHome /> Home
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow flex items-center gap-4">
          <FaUser className="text-blue-400 text-3xl" />
          <div>
            <p className="text-gray-500">Role</p>
            <p className="text-xl font-bold">{user.role}</p>
          </div>
        </div>
        
        
      </div>

      {/* Quick Links / Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <div
          onClick={() => navigate("/profile")}
          className="bg-white p-6 rounded shadow flex flex-col items-center justify-center hover:shadow-lg cursor-pointer transition"
        >
          <FaUser className="text-4xl text-blue-400 mb-2" />
          <p className="font-semibold text-gray-700">Profile</p>
        </div>
        <div
          onClick={() => navigate("/chat")}
          className="bg-white p-6 rounded shadow flex flex-col items-center justify-center hover:shadow-lg cursor-pointer transition"
        >
          <FaComments className="text-4xl text-yellow-400 mb-2" />
          <p className="font-semibold text-gray-700">Chat</p>
        </div>
        <div
          onClick={() => navigate("/settings")}
          className="bg-white p-6 rounded shadow flex flex-col items-center justify-center hover:shadow-lg cursor-pointer transition"
        >
          <FaCogs className="text-4xl text-purple-400 mb-2" />
          <p className="font-semibold text-gray-700">Settings</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
