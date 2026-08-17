import { Plus, Search } from "lucide-react";

export default function KnowledgeToolbar({
  searchTerm,
  onSearchChange,
  onAddKnowledge,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6 w-full">
      <div className="relative flex-1 w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search knowledge..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
        />
      </div>
      <button
        onClick={onAddKnowledge}
        className="bg-red-primary text-white px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-red-800 transition-colors flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto"
      >
        <Plus className="h-5 w-5" />
        Add Knowledge
      </button>
    </div>
  );
}
