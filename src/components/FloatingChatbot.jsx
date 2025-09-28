import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import useKnowledgeStore from "../store/useKnowledgeStore";
import passiIcon from "../assets/images/chatbot/pass-icon.png";
import passiIconFull from "../assets/images/chatbot/passi-full.png";

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  const { chat, chatResponse, loading, error } = useKnowledgeStore();
  const { user, isAuthenticated } = useAuthStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setChatHistory([]);
    setMessage("");
    setIsOpen(false);
  }, [user?.id, isAuthenticated]);

  useEffect(() => {
    useKnowledgeStore.setState({ chatResponse: null, error: null });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    if (chatResponse) {
      setChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          message:
            chatResponse.answer ||
            chatResponse.message ||
            "I couldn't find an answer to your question.",
          matchedQuestion: chatResponse.matchedQuestion,
          confidence: chatResponse.confidence,
          timestamp: new Date(),
        },
      ]);
    }
  }, [chatResponse]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // add user message to chat history
    const userMessage = {
      type: "user",
      message: message.trim(),
      timestamp: new Date(),
    };

    setChatHistory((prev) => [...prev, userMessage]);

    await chat(message.trim());

    // clear input
    setMessage("");
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="bg-red-primary text-white p-4 rounded-full shadow-lg hover:bg-red-700 hover:cursor-pointer transition-all duration-300 transform hover:scale-110"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-7/10 bg-white rounded-lg shadow-2xl border border-gray-200 z-40 flex flex-col">
          <div className="bg-red-primary text-white p-4 py-1 rounded-t-lg flex items-center gap-2">
            <img src={passiIcon} alt="passi-icon" className="w-12" />
            <h3 className="font-semibold">PASS College Assistant</h3>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
            {chatHistory.length === 0 && (
              <div className="text-center text-gray-500 mt-4">
                <div className="flex justify-center">
                  <img src={passiIconFull} alt="" className="w-50" />
                </div>
                {/* <h4 className="font-semibold text-gray-700 mb-2">
                  Im your Guide PASSI{" "}
                </h4> */}
                <p className="text-sm mb-2 text-red-950">
                  Hello! I'm here to help you with FAQs about PASS College.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-800">
                  <p className="font-medium mb-1">ℹ️ How I work:</p>
                  <p>• I answer each question independently</p>
                  <p>• I don't remember previous questions in our chat</p>
                  <p>• Ask specific questions for best results</p>
                </div>
              </div>
            )}

            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${
                  chat.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    chat.type === "user"
                      ? "bg-red-primary text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {chat.type === "bot" && (
                      <img src={passiIcon} className="w-7" />
                    )}
                    {chat.type === "user" &&
                      (user && isAuthenticated ? (
                        <img
                          src={user.photo}
                          alt={user.firstName}
                          className="w-6 rounded-full"
                        />
                      ) : (
                        <User size={16} className="mt-0.5 flex-shrink-0" />
                      ))}
                    <div className="flex-1">
                      <p className="text-sm">{chat.message}</p>
                      {/* {chat.type === "bot" && chat.matchedQuestion && (
                        <div className="mt-2 pt-2 border-t border-gray-300">
                          <p className="text-xs text-gray-600">
                            <span className="font-medium">Related to:</span>{" "}
                            {chat.matchedQuestion}
                          </p>
                          {chat.confidence && (
                            <p className="text-xs text-gray-500 mt-1">
                              Confidence: {Math.round(chat.confidence * 100)}%
                            </p>
                          )}
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 max-w-xs px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot size={16} />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-start">
                <div className="bg-red-100 text-red-800 max-w-xs px-3 py-2 rounded-lg border border-red-200">
                  <div className="flex items-start gap-2">
                    <Bot size={16} className="mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                      Sorry, I encountered an error: {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask a specific question about PASS College..."
                className="block w-full py-2 px-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                disabled={loading}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage(e);
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !message.trim()}
                className="bg-red-primary text-white p-2 rounded-md hover:bg-red-700 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-xs  mt-2 text-center text-red-500">
              💡 Each question is answered independently
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
