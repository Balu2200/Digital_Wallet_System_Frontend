import { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
                <img
                  src="https://api.dicebear.com/7.x/bottts/svg?seed=PayVaultBot"
                  alt="Bot"
                  className="w-7 h-7"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-base">
                  PayVault Assistant
                </h3>
                <p className="text-white/80 text-xs">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary-50">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <img
                    src="https://api.dicebear.com/7.x/bottts/svg?seed=PayVaultBot"
                    alt="Bot"
                    className="w-10 h-10"
                  />
                </div>
                <p className="text-secondary-600 text-sm">
                  Hi! How can I help you today?
                </p>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow mr-2 flex-shrink-0">
                    <img
                      src="https://api.dicebear.com/7.x/bottts/svg?seed=PayVaultBot"
                      alt="Bot"
                      className="w-5 h-5"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl shadow-sm ${
                    message.sender === "user"
                      ? "bg-primary-600 text-white"
                      : "bg-white text-secondary-900 border border-secondary-100"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-secondary-100 rounded-2xl px-4 py-2.5 shadow-sm">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="border-t border-secondary-100 bg-white p-4 rounded-b-2xl">
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full border border-secondary-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary-600 text-white p-2.5 rounded-full hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white rounded-full shadow-strong w-16 h-16 flex items-center justify-center transition-all duration-200 hover:scale-110"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>
    </>
  );
};

export default FloatingChatbot;
