import { MessageCircle, X } from "lucide-react";

export default function ChatbotToggleButton({ isOpen, onToggle }) {
  const label = isOpen
    ? "Close PASS College Assistant"
    : "Open PASS College Assistant";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={onToggle}
        className="bg-red-primary text-white p-4 rounded-full shadow-lg hover:bg-red-700 hover:cursor-pointer transition-all duration-300 transform hover:scale-110"
        aria-label={label}
        title={label}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
