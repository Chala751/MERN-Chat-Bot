import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resUsers = await api.get("/admin/users", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const resConvos = await api.get("/admin/conversations", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUsers(resUsers.data);
      setConversations(resConvos.data);
    };
    fetchData();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <h2 className="text-xl font-semibold">Users</h2>
      <ul className="mb-4">
        {users.map((u) => (
          <li key={u._id}>
            {u.name} - {u.email} ({u.role})
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold">Conversations</h2>
      <ul>
        {conversations.map((c) => (
          <li key={c._id}>{c.participants.map((p) => p.name).join(", ")}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
