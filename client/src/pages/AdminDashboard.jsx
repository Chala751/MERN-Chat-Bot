import { useEffect, useState } from "react";
import { FaSignOutAlt, FaUsers, FaUserShield, FaRobot } from "react-icons/fa";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

// Custom confirmation modal
const ConfirmModal = ({ open, onClose, onConfirm, message }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-80">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for confirmation modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resUsers, resConvos, resMessages] = await Promise.all([
          api.get("/admin/users", { headers: { Authorization: `Bearer ${user.token}` } }),
          api.get("/admin/conversations", { headers: { Authorization: `Bearer ${user.token}` } }),
          api.get("/admin/messages", { headers: { Authorization: `Bearer ${user.token}` } }),
        ]);
        setUsers(resUsers.data);
        setConversations(resConvos.data);
        setMessages(resMessages.data);
        toast.success("Data loaded successfully ✅");
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to fetch data ❌");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  // Delete user function
  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      toast.success("User deleted ✅");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete user ❌");
    }
  };

  const confirmDelete = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  // Summary counts
  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === "admin").length;
  const totalRegular = users.filter((u) => u.role === "user").length;
  const totalBotMessages = messages.filter((m) => !m.sender).length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={() => {
            logout();
            toast.success("Logged out successfully ✅");
          }}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <FaUsers className="text-3xl text-blue-500" />
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <p className="text-xl font-bold">{totalUsers}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <FaUserShield className="text-3xl text-green-500" />
          <div>
            <p className="text-gray-500 text-sm">Admins</p>
            <p className="text-xl font-bold">{totalAdmins}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <FaUsers className="text-3xl text-purple-500" />
          <div>
            <p className="text-gray-500 text-sm">Regular Users</p>
            <p className="text-xl font-bold">{totalRegular}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <FaRobot className="text-3xl text-yellow-500" />
          <div>
            <p className="text-gray-500 text-sm">Bot Messages</p>
            <p className="text-xl font-bold">{totalBotMessages}</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Users Section */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Users</h2>
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {users.map((u) => (
              <li
                key={u._id}
                className="p-2 border rounded hover:bg-gray-50 transition flex justify-between items-center"
              >
                <div>
                  {u.name} - {u.email}{" "}
                  <span className="font-medium text-sm text-gray-500">{u.role}</span>
                </div>
                <button
                  onClick={() => confirmDelete(u)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm cursor-pointer"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Conversations Section */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Conversations</h2>
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {conversations.map((c) => (
              <li
                key={c._id}
                className="p-2 border rounded hover:bg-gray-50 transition"
              >
                {c.participants.map((p) => p.name).join(", ")}
              </li>
            ))}
          </ul>
        </div>

        {/* Messages Section */}
        <div className="bg-white p-4 rounded shadow mt-6 md:mt-0">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Messages</h2>
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {messages.map((msg) => (
              <li
                key={msg._id}
                className="p-2 border rounded hover:bg-gray-50 transition"
              >
                <span className="font-medium">{msg.sender ? msg.sender.name : "Bot"}:</span>{" "}
                {msg.text}
                <div className="text-xs text-gray-400">
                  Conversation ID: {msg.conversation._id}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          handleDeleteUser(selectedUser._id);
          setModalOpen(false);
        }}
        message={`Are you sure you want to delete ${selectedUser?.name}?`}
      />
    </div>
  );
};

export default AdminDashboard;
