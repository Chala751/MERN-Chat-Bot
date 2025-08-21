export const botReply = async (msg) => {
  msg = msg.toLowerCase();

  if (msg.includes("hello")) return "Hello! How can I help you today?";
  if (msg.includes("help")) return "Sure! I can assist you with account info or general queries.";
  if (msg.includes("bye")) return "Goodbye! Have a great day.";
  
  return "I'm not sure about that, but I'm learning every day!";
};
