import { Bot } from "lucide-react";
import ChatbotMessage from "./ChatbotMessage";
import ChatbotWelcome from "./ChatbotWelcome";

export default function ChatbotMessageList({
  chatHistory,
  isLoading,
  error,
  user,
  isAuthenticated,
  messagesEndRef,
}) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
      {chatHistory.length === 0 && <ChatbotWelcome />}

      {chatHistory.map((chatMessage, index) => (
        <ChatbotMessage
          key={index}
          chatMessage={chatMessage}
          user={user}
          isAuthenticated={isAuthenticated}
        />
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 text-gray-800 max-w-xs px-3 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <Bot size={16} />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
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
              <p className="text-sm">Sorry, I encountered an error: {error}</p>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
