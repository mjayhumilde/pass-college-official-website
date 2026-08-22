import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AccountsPagination({
  currentPage,
  totalPages,
  startIndex,
  itemsPerPage,
  totalAccounts,
  onPageChange,
}) {
  if (totalAccounts === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-between gap-3 mt-4 sm:flex-row sm:mt-6">
      <div className="w-full text-xs text-center text-gray-700 sm:text-sm sm:w-auto sm:text-left">
        Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
        <span className="font-medium">
          {Math.min(startIndex + itemsPerPage, totalAccounts)}
        </span>{" "}
        of <span className="font-medium">{totalAccounts}</span> results
      </div>

      <div className="flex gap-1 sm:gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`p-1 sm:p-2 rounded-full hover:cursor-pointer transition ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-red-primary text-white hover:bg-red-800"
          }`}
          aria-label="Previous page"
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4 sm:h-5 sm:w-5" />
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          const showOnMobile =
            currentPage === page ||
            page === 1 ||
            page === totalPages ||
            Math.abs(currentPage - page) <= 1;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`${
                showOnMobile ? "flex" : "hidden sm:flex"
              } px-3 py-2 rounded-full hover:cursor-pointer transition ${
                currentPage === page
                  ? "bg-red-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`p-1 sm:p-2 rounded-full hover:cursor-pointer transition ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-red-primary text-white hover:bg-red-800"
          }`}
          aria-label="Next page"
          title="Next page"
        >
          <ChevronRight className="w-4 h-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
}
