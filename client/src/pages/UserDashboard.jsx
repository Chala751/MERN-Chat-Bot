import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resConvos = await api.get("/user/conversations", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const resMessages = await api.get("/user/messages", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
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

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6 gap-2">
        <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/chat")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
          >
            <FaHome /> Back to Home
          </button>
          <button
            onClick={() => {
              logout();
              toast.success("Logged out successfully ✅");
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* User Info */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Profile</h2>
        <p>
          <span className="font-medium">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium">Role:</span> {user.role}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
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
        <div className="bg-white p-4 rounded shadow">
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
    </div>
  );
};

export default UserDashboard;
