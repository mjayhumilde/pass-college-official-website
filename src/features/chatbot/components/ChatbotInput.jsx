import { Lightbulb, Send } from "lucide-react";

export default function ChatbotInput({
  message,
  isLoading,
  onMessageChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t border-gray-200">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(event) => onMessageChange(event.target.value)}
          placeholder="Ask a specific question about PASS College..."
          className="block w-full py-2 px-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className="bg-red-primary text-white p-2 rounded-md hover:bg-red-700 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Send message"
          title="Send message"
        >
          <Send size={16} />
        </button>
      </div>
      <p className="text-xs mt-2 text-center text-red-500 flex items-center justify-center gap-1">
        <Lightbulb size={13} />
        Each question is answered independently
      </p>
    </form>
  );
}
