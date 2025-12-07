import React from "react";
import { MessageCircle } from "lucide-react";
import useChatStore from "../store/useChatStore";
import useAuthStore from "../store/useAuthStore";

const ChatFloatingButton = () => {
  const { isChatOpen, toggleChat, unreadCount } = useChatStore();
  const { isAuthenticated } = useAuthStore();

  // Don't show button if user is not logged in
  if (!isAuthenticated) return null;

  return (
    <button
      onClick={toggleChat}
      className="fixed bottom-6 right-6 w-14 h-14 bg-red-primary hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-40 group"
      aria-label="Open chat"
    >
      <MessageCircle
        size={24}
        className="group-hover:scale-110 transition-transform"
      />

      {/* Unread badge */}
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md animate-pulse">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </button>
  );
};

export default ChatFloatingButton;
