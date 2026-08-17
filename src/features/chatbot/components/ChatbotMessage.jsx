import { User } from "lucide-react";
import passiIcon from "../assets/pass-icon.png";

export default function ChatbotMessage({ chatMessage, user, isAuthenticated }) {
  const isUserMessage = chatMessage.type === "user";

  return (
    <div className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-3 py-2 rounded-lg ${
          isUserMessage
            ? "bg-red-primary text-white"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        <div className="flex items-start gap-2">
          {!isUserMessage && (
            <img src={passiIcon} alt="PASSI" className="w-7" />
          )}
          {isUserMessage &&
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
            <p className="text-sm">{chatMessage.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
