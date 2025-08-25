import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

const Chatbot = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
  );
};

export default Chatbot;
