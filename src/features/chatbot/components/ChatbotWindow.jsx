import passiIcon from "../assets/pass-icon.png";
import ChatbotInput from "./ChatbotInput";
import ChatbotMessageList from "./ChatbotMessageList";

export default function ChatbotWindow({
  chatHistory,
  message,
  isLoading,
  error,
  user,
  isAuthenticated,
  messagesEndRef,
  onMessageChange,
  onSubmit,
}) {
  return (
    <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] max-w-80 h-7/10 bg-white rounded-lg shadow-2xl border border-gray-200 z-40 flex flex-col">
      <div className="bg-red-primary text-white p-4 py-1 rounded-t-lg flex items-center gap-2">
        <img src={passiIcon} alt="PASSI" className="w-12" />
        <h3 className="font-semibold">PASS College Assistant</h3>
      </div>

      <ChatbotMessageList
        chatHistory={chatHistory}
        isLoading={isLoading}
        error={error}
        user={user}
        isAuthenticated={isAuthenticated}
        messagesEndRef={messagesEndRef}
      />
      <ChatbotInput
        message={message}
        isLoading={isLoading}
        onMessageChange={onMessageChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
