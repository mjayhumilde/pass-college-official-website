import { Edit2, Trash2 } from "lucide-react";

export default function KnowledgeItem({ item, onEdit, onDelete }) {
  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
          <p className="text-gray-600 leading-relaxed">{item.answer}</p>
          <div className="mt-3 text-sm text-gray-400">
            Created: {new Date(item.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="p-2 text-red-primary hover:cursor-pointer hover:text-red-700 transition-colors rounded-md hover:bg-gray-100"
            aria-label="Edit knowledge item"
            title="Edit"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="p-2 text-red-primary hover:cursor-pointer hover:text-red-700 transition-colors rounded-md hover:bg-red-50"
            aria-label="Delete knowledge item"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
