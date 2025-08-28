import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout(); 
    toast.success("Logged out successfully ✅");
  };

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-xl font-bold mb-4">MERN Chatbot</h2>
      <p className="mb-2">Logged in as: {user?.name}</p>
      <button
        className="mt-auto px-4 py-2 bg-red-500 rounded cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
