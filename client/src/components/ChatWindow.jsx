import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import MessageItem from "./MessageItem";
import toast from "react-hot-toast";

const ChatWindow = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null); // store conversation
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const res = await api.get("/chat", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setConversation(res.data.conversation); // save conversation
        setMessages(res.data.messages);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch messages ❌");
      }
    };
    fetchConversation();
  }, [user]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !conversation) return;

    try {
      const res = await api.post(
        "/chat/send",
        {
          conversationId: conversation._id, // use stored conversation
          text: input,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setMessages((prev) => [...prev, ...res.data.messages]);
      setInput("");
      toast.success("Message sent ✅");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to send message ❌");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-2">
        {messages.map((msg, i) => (
          <MessageItem key={i} msg={msg} userId={user._id} />
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex p-2 border-t">
        <input
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
