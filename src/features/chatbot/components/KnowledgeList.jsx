import KnowledgeItem from "./KnowledgeItem";

export default function KnowledgeList({
  items,
  isLoading,
  searchTerm,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {isLoading ? (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-red mx-auto mb-4" />
          <p className="text-gray-600">Loading knowledge...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          {searchTerm
            ? "No knowledge found matching your search."
            : "No knowledge items yet. Add your first one!"}
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <KnowledgeItem
              key={item._id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
