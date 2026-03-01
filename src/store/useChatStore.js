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
    const { socket } = get();
    if (socket?.connected) return;

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
      console.log("Socket connected:", newSocket.id);
      newSocket.emit("join", user._id);
    });

    // adds incoming message
    newSocket.on("new_message", (message) => {
      const { selectedChat, messages } = get();

      if (selectedChat && message.sender === selectedChat._id) {
        const alreadyExists = messages.some((m) => m._id === message._id);
        if (!alreadyExists) {
          set({ messages: [...messages, message] });
        }
      }

      if (!selectedChat || message.sender !== selectedChat._id) {
        get().incrementUnread();
      }

      get().fetchConversations();
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },

  fetchConversations: async () => {
    try {
      const response = await api.get("/api/v1/messages/conversations");
      const convos = response.data.data || [];
      set({ conversations: convos });

      // Calculate unread count ||  For now just keep the existing unread count
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  },

  // Counts conversations
  fetchUnreadCount: async (currentUserId) => {
    try {
      const response = await api.get("/api/v1/messages/conversations");
      const convos = response.data.data || [];
      const count = convos.filter(
        (c) =>
          c.lastSenderId &&
          c.lastSenderId.toString() !== currentUserId &&
          c.lastMessage,
      ).length;
      set({ conversations: convos, unreadCount: count });
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  },

  fetchMessages: async (userId) => {
    try {
      set({ loading: true });
      const response = await api.get(`/api/v1/messages/${userId}`);
      const messagesData = response.data.data || [];
      set({ messages: messagesData });

      // Mark unread messages as read
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const unreadMessages = messagesData.filter(
        (msg) => msg.receiver === user._id && !msg.read,
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

      // Clear the bold/unread | updating lastSenderId locally
      set((state) => ({
        conversations: state.conversations.map((c) => {
          const isThisConvo = c.participants.some(
            (p) => (p._id || p).toString() === userId,
          );
          if (isThisConvo) {
            return { ...c, lastSenderId: user._id }; // pretend current user sent last
          }
          return c;
        }),
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      set({ loading: false });
    }
  },

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

  sendMessage: async (receiverId, message, user) => {
    if (!message.trim() || !receiverId) return false;

    try {
      // 1. Save message via REST API
      const response = await api.post("/api/v1/messages/send", {
        receiverId,
        message: message.trim(),
      });

      const newMsg = response.data.data;

      // 2. Add to local state immediately from REST response
      const { messages } = get();
      const alreadyExists = messages.some((m) => m._id === newMsg._id);
      if (!alreadyExists) {
        set({ messages: [...messages, newMsg] });
      }

      // 3. Notify the RECEIVER via socket (for real-time delivery)
      const { socket } = get();
      if (socket) {
        socket.emit("notify_receiver", {
          receiverId,
          message: newMsg, // pass full saved object
        });
      }

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
