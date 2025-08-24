const MessageItem = ({ msg, userId }) => {
  const isMine = msg.sender === userId;

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`px-3 py-2 rounded-xl ${
          isMine ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
};

export default MessageItem;
