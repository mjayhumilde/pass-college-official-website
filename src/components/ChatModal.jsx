import React, { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  Send,
  X,
  Search,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import useChatStore from "../store/useChatStore";

const ChatModal = ({ isOpen, onClose }) => {
  const { user, token } = useAuthStore();
  const {
    conversations,
    messages,
    selectedChat,
    searchResults,
    loading,
    searching,
    initializeSocket,
    disconnectSocket,
    fetchConversations,
    selectChat,
    clearSelectedChat,
    searchUsers,
    sendMessage,
  } = useChatStore();

  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);

  // Initialize socket when modal opens
  useEffect(() => {
    if (isOpen && user && token) {
      initializeSocket(user, token);
      fetchConversations();
    }

    return () => {
      if (!isOpen) {
        disconnectSocket();
      }
    };
  }, [isOpen, user, token]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        searchUsers(searchQuery);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message handler
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    const success = await sendMessage(selectedChat._id, newMessage, user);
    if (success) {
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectChat = (userData) => {
    selectChat(userData);
    setSearchQuery("");
  };

  const handleBackToList = () => {
    clearSelectedChat();
  };

  if (!isOpen || !user) return null;

  const getOtherUser = (participants) => {
    return participants.find((p) => p._id !== user._id);
  };

  const getUserDisplayName = (userData) => {
    if (userData?.firstName && userData?.lastName) {
      return `${userData.firstName} ${userData.lastName}`;
    }
    return userData?.name || userData?.email || "Unknown User";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[600px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-red-primary text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {selectedChat && (
              <button
                onClick={handleBackToList}
                className="hover:bg-red-600 p-1 rounded transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <MessageCircle size={24} />
            <h2 className="text-xl font-semibold">
              {selectedChat ? getUserDisplayName(selectedChat) : "Messages"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-red-600 p-2 rounded transition-colors"
          >
            <X className="hover:cursor-pointer" size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar - Conversations List */}
          {!selectedChat && (
            <div className="w-full md:w-80 border-r flex flex-col">
              {/* Search */}
              <div className="p-3 border-b">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary"
                  />
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto">
                {searchQuery && searchResults.length > 0 ? (
                  <div>
                    <div className="px-4 py-2 bg-gray-50 text-sm text-gray-600 font-medium">
                      Search Results
                    </div>
                    {searchResults.map((userData) => (
                      <div
                        key={userData._id}
                        onClick={() => handleSelectChat(userData)}
                        className="p-4 hover:bg-gray-50 cursor-pointer border-b flex items-center gap-3 transition-colors"
                      >
                        <div className="w-12 h-12 bg-red-primary rounded-full flex items-center justify-center text-white font-semibold text-lg overflow-hidden">
                          {userData.photo ? (
                            <img
                              src={userData.photo}
                              alt={getUserDisplayName(userData)}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            getUserDisplayName(userData).charAt(0).toUpperCase()
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">
                            {getUserDisplayName(userData)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {userData.email}
                          </div>
                          {userData.role && (
                            <span className="text-xs text-red-primary font-medium uppercase">
                              {userData.role}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchQuery && searching ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2
                      className="animate-spin text-red-primary"
                      size={24}
                    />
                  </div>
                ) : (
                  <div>
                    <div className="px-4 py-2 bg-gray-50 text-sm text-gray-600 font-medium">
                      Recent Conversations
                    </div>
                    {loading ? (
                      <div className="flex justify-center items-center py-8">
                        <Loader2
                          className="animate-spin text-red-primary"
                          size={24}
                        />
                      </div>
                    ) : conversations.length === 0 ? (
                      <div className="text-center py-12 text-gray-500 px-4">
                        <MessageCircle
                          size={48}
                          className="mx-auto mb-3 opacity-50"
                        />
                        <p className="font-medium">No conversations yet</p>
                        <p className="text-sm mt-1">
                          Search for users above to start chatting
                        </p>
                      </div>
                    ) : (
                      conversations.map((conv) => {
                        const otherUser = getOtherUser(conv.participants);
                        return (
                          <div
                            key={conv._id}
                            onClick={() => handleSelectChat(otherUser)}
                            className="p-4 hover:bg-gray-50 cursor-pointer border-b flex items-center gap-3 transition-colors"
                          >
                            <div className="w-12 h-12 bg-red-primary rounded-full flex items-center justify-center text-white font-semibold text-lg overflow-hidden">
                              {otherUser?.photo ? (
                                <img
                                  src={otherUser.photo}
                                  alt={getUserDisplayName(otherUser)}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                getUserDisplayName(otherUser)
                                  .charAt(0)
                                  .toUpperCase()
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                <div className="font-medium truncate">
                                  {getUserDisplayName(otherUser)}
                                </div>
                                <div className="text-xs text-gray-500 ml-2">
                                  {new Date(
                                    conv.lastMessageAt
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                              <div className="text-sm text-gray-500 truncate">
                                {conv.lastMessage || "No messages yet"}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Chat Area */}
          {selectedChat && (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <Loader2
                      className="animate-spin text-red-primary"
                      size={32}
                    />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-gray-500 py-12">
                    <MessageCircle
                      size={64}
                      className="mx-auto mb-3 opacity-30"
                    />
                    <p className="font-medium text-lg">No messages yet</p>
                    <p className="text-sm mt-1">Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((msg, idx) => {
                    const isSender = msg.sender === user._id;
                    return (
                      <div
                        key={msg._id || idx}
                        className={`flex ${
                          isSender ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 shadow-sm ${
                            isSender
                              ? "bg-red-primary text-white"
                              : "bg-white text-gray-800"
                          }`}
                        >
                          <div className="break-words">{msg.message}</div>
                          <div
                            className={`text-xs mt-1 ${
                              isSender ? "text-red-100" : "text-gray-500"
                            }`}
                          >
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            {isSender && msg.read && " ✓✓"}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-red-primary hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
