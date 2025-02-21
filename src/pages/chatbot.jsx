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
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-200 to-purple-600">
      <div className="bg-white shadow-2xl rounded-2xl w-96 h-[550px] flex flex-col">
        <div className="p-4 border-b bg-blue-600 text-white font-bold text-center rounded-t-2xl">
          Chatbot
        </div>

        {/* Chat Messages */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl max-w-xs text-sm shadow-md ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white text-right ml-auto"
                  : "bg-gray-200 text-black text-left mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-3 border-t flex items-center bg-gray-100 rounded-b-2xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            <IoSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
