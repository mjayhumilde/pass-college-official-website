import { useEffect, useRef, useState } from "react";
import useAuthStore from "../../../store/useAuthStore";
import useKnowledgeStore from "../store/useKnowledgeStore";
import ChatbotToggleButton from "./ChatbotToggleButton";
import ChatbotWindow from "./ChatbotWindow";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);
  const { chat, chatResponse, loading, error } = useKnowledgeStore();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    setChatHistory([]);
    setMessage("");
    setIsOpen(false);
  }, [user?.id, isAuthenticated]);

  useEffect(() => {
    useKnowledgeStore.setState({ chatResponse: null, error: null });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  useEffect(() => {
    if (chatResponse) {
      setChatHistory((currentHistory) => [
        ...currentHistory,
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

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    const question = message.trim();
    setChatHistory((currentHistory) => [
      ...currentHistory,
      {
        type: "user",
        message: question,
        timestamp: new Date(),
      },
    ]);

    await chat(question);
    setMessage("");
  };

  return (
    <>
      <ChatbotToggleButton
        isOpen={isOpen}
        onToggle={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
      />
      {isOpen && (
        <ChatbotWindow
          chatHistory={chatHistory}
          message={message}
          isLoading={loading}
          error={error}
          user={user}
          isAuthenticated={isAuthenticated}
          messagesEndRef={messagesEndRef}
          onMessageChange={setMessage}
          onSubmit={handleSendMessage}
        />
      )}
    </>
  );
}
