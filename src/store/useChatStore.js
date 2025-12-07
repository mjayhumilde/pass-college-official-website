import { create } from "zustand";
import io from "socket.io-client";
import api from "./api";

const useChatStore = create((set, get) => ({
  // UI State
  isChatOpen: false,
  unreadCount: 0,

  // Chat Data
  conversations: [],
  messages: [],
  selectedChat: null,
  searchResults: [],

  // Loading States
  loading: false,
  searching: false,

  // Socket
  socket: null,

  // UI Actions
  openChat: () => set({ isChatOpen: true }),
  closeChat: () => set({ isChatOpen: false }),
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),

  // Unread Count
  setUnreadCount: (count) => set({ unreadCount: count }),
  incrementUnread: () =>
    set((state) => ({ unreadCount: state.unreadCount + 1 })),
  resetUnread: () => set({ unreadCount: 0 }),

  // Select Chat
  selectChat: (userData) => {
    set({ selectedChat: userData, searchResults: [] });
    get().fetchMessages(userData._id);
  },

  clearSelectedChat: () => {
    set({ selectedChat: null, messages: [] });
  },

  // Initialize Socket
  initializeSocket: (user, token) => {
    const apiUrl =
      import.meta.env.VITE_APP_ENV === "production"
        ? import.meta.env.VITE_API_URL_PROD
        : import.meta.env.VITE_API_URL_DEV;

    const newSocket = io(apiUrl, {
      transports: ["websocket"],
      reconnection: true,
      auth: { token },
    });

    newSocket.on("connect", () => {
      console.log("Socket connected");
      newSocket.emit("join", user._id);
    });

    newSocket.on("new_message", (message) => {
      const { selectedChat, messages } = get();

      // Add message if chat is open with this user
      if (
        selectedChat &&
        (message.sender === selectedChat._id ||
          message.receiver === selectedChat._id)
      ) {
        set({ messages: [...messages, message] });
      }

      // Increment unread if not from current chat
      if (!selectedChat || message.sender !== selectedChat._id) {
        get().incrementUnread();
      }

      // Refresh conversations
      get().fetchConversations();
    });

    newSocket.on("message_sent", (message) => {
      const { selectedChat, messages } = get();
      if (selectedChat && message.receiver === selectedChat._id) {
        set({ messages: [...messages, message] });
      }
    });

    set({ socket: newSocket });
  },

  // Disconnect Socket
  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },

  // Fetch Conversations
  fetchConversations: async () => {
    try {
      set({ loading: true });
      const response = await api.get("/api/v1/messages/conversations");
      set({ conversations: response.data.data || [] });

      // Calculate unread count ||  For now just keep the existing unread count
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      set({ loading: false });
    }
  },

  // Fetch Messages
  fetchMessages: async (userId) => {
    try {
      set({ loading: true });
      const response = await api.get(`/api/v1/messages/${userId}`);
      const messagesData = response.data.data || [];
      set({ messages: messagesData });

      // Mark unread messages as read
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const unreadMessages = messagesData.filter(
        (msg) => msg.receiver === user._id && !msg.read
      );

      // Mark each as read
      unreadMessages.forEach((msg) => {
        api.patch(`/api/v1/messages/read/${msg._id}`).catch(console.error);
      });

      // Decrement unread count
      if (unreadMessages.length > 0) {
        set((state) => ({
          unreadCount: Math.max(0, state.unreadCount - unreadMessages.length),
        }));
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      set({ loading: false });
    }
  },

  // Search Users
  searchUsers: async (query) => {
    if (!query.trim()) {
      set({ searchResults: [] });
      return;
    }

    try {
      set({ searching: true });
      const response = await api.get(`/api/v1/user/search?q=${query}`);
      set({ searchResults: response.data.data || [] });
    } catch (error) {
      console.error("Error searching users:", error);
      set({ searchResults: [] });
    } finally {
      set({ searching: false });
    }
  },

  // Send Message
  sendMessage: async (receiverId, message, user) => {
    if (!message.trim() || !receiverId) return;

    try {
      const response = await api.post("/api/v1/messages/send", {
        receiverId,
        message: message.trim(),
      });

      // Emit via socket for real-time delivery
      const { socket } = get();
      if (socket) {
        socket.emit("private_message", {
          senderId: user._id,
          receiverId,
          message: message.trim(),
        });
      }

      // Add message to local state
      const { messages } = get();
      set({ messages: [...messages, response.data.data] });

      // Refresh conversations
      get().fetchConversations();

      return true;
    } catch (error) {
      console.error("Error sending message:", error);
      return false;
    }
  },

  // Reset Store
  reset: () => {
    get().disconnectSocket();
    set({
      isChatOpen: false,
      unreadCount: 0,
      conversations: [],
      messages: [],
      selectedChat: null,
      searchResults: [],
      loading: false,
      searching: false,
      socket: null,
    });
  },
}));

export default useChatStore;
