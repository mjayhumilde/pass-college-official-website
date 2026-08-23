import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DocumentRequestPagination({
  currentPage,
  firstItemIndex,
  lastItemIndex,
  totalItems,
  totalPages,
  onPageChange,
}) {
  const visiblePages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  ).filter(
    (page) =>
      page === 1 ||
      page === totalPages ||
      (page >= currentPage - 1 && page <= currentPage + 1),
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600 font-medium">
          Showing{" "}
          <span className="font-bold text-gray-900">{firstItemIndex + 1}</span>{" "}
          to{" "}
          <span className="font-bold text-gray-900">
            {Math.min(lastItemIndex, totalItems)}
          </span>{" "}
          of <span className="font-bold text-gray-900">{totalItems}</span>{" "}
          requests
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-3 rounded-full transition-all ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg"
            }`}
          >
            <ChevronLeft size={18} />
          </button>

          {visiblePages.map((page, index) => (
            <div key={page} className="contents">
              {index > 0 && page > visiblePages[index - 1] + 1 && (
                <span className="px-3 py-2 text-gray-400">...</span>
              )}
              <button
                onClick={() => onPageChange(page)}
                className={`px-4 py-2 rounded-full font-bold transition-all ${
                  currentPage === page
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            </div>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`p-3 rounded-full transition-all ${
              currentPage === totalPages || totalPages === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg"
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
