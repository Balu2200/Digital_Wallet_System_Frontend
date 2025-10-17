import { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/chatbot/message`,
        { question: input },
        { withCredentials: true }
      );

      const botMessage = { text: response.data.response, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 mt-28">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Chat Header - Professional Bot */}
          <div className="bg-gradient-to-r from-indigo-700 to-emerald-600 px-8 py-6 flex items-center gap-4 border-b border-secondary-100">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
              <img
                src="https://api.dicebear.com/7.x/bottts/svg?seed=PayVaultBot"
                alt="Bot Avatar"
                className="w-10 h-10"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                PayVault Assistant
              </h2>
              <p className="text-white/80 text-base">
                Your secure AI support for payments & finance.
              </p>
            </div>
          </div>

          {/* Chat Messages - Professional bubbles */}
          <div className="h-[600px] overflow-y-auto p-8 space-y-6 bg-secondary-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "bot" && (
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow mr-2">
                    <img
                      src="https://api.dicebear.com/7.x/bottts/svg?seed=PayVaultBot"
                      alt="Bot"
                      className="w-7 h-7"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[70%] px-5 py-3 rounded-2xl shadow ${
                    message.sender === "user"
                      ? "bg-primary-600 text-white"
                      : "bg-white text-secondary-900 border border-secondary-100"
                  }`}
                >
                  <p className="text-base leading-relaxed">{message.text}</p>
                </div>
                {message.sender === "user" && (
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center shadow ml-2">
                    <svg
                      className="w-7 h-7 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-secondary-100 rounded-2xl px-5 py-3 shadow">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input - Professional style */}
          <div className="border-t border-secondary-100 bg-white p-6">
            <form
              className="flex gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 rounded-full border border-secondary-200 px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow"
                autoFocus
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-indigo-700 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:from-indigo-800 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
