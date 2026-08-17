import { Info } from "lucide-react";
import passiIconFull from "../assets/passi-full.png";

export default function ChatbotWelcome() {
  return (
    <div className="text-center text-gray-500 mt-4">
      <div className="flex justify-center">
        <img
          src={passiIconFull}
          alt="PASSI, the PASS College assistant"
          className="w-50"
        />
      </div>
      <p className="text-sm mb-2 text-red-950">
        Hello! I&apos;m here to help you with FAQs about PASS College.
      </p>
      <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-left text-red-800">
        <p className="font-medium mb-1 flex items-center gap-1">
          <Info size={14} />
          How I work:
        </p>
        <ul className="list-disc pl-4 space-y-1">
          <li>I answer each question independently</li>
          <li>I don&apos;t remember previous questions in our chat</li>
          <li>Ask specific questions for best results</li>
        </ul>
      </div>
    </div>
  );
}
