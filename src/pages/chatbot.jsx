import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { IoSend } from "react-icons/io5";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post(`${BASE_URL}/chatbot/message`, {
        question: input,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: response.data.response },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Error connecting to chatbot." },
      ]);
    }
    setInput("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-96 h-[500px] flex flex-col">
        <div className="p-4 border-b bg-blue-500 text-white font-bold text-center">
          Chatbot
        </div>

        {/* Chat Messages */}
        <div className="p-3 flex-1 overflow-y-auto space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg max-w-xs ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white text-right ml-auto"
                  : "bg-gray-200 text-black text-left mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-2 border-t flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full border p-2 rounded outline-none"
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-500 text-white p-2 rounded"
          >
            <IoSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
