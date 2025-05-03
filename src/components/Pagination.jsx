const Pagination = () => {
  return (
    <div className="max-w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto bg-white p-4 shadow-sm mb-2">
      <div className="flex justify-center">
        <nav className="flex space-x-2" aria-label="Pagination">
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 text-sm bg-[rgb(128,0,0)] hover:bg-red-800 text-white border border-red-700 hover:border-red-500 hover:text-white font-semibold cursor-pointer leading-5  transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-red focus:border-red-500 focus:z-10"
          >
            Previous
          </a>
          {[1, 2, 3].map((page) => (
            <a
              key={page}
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-white border border-red-700 hover:bg-red-700 cursor-pointer leading-5  transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-red focus:border-red-500 focus:z-10"
            >
              {page}
            </a>
          ))}
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 text-sm bg-[rgb(128,0,0)] hover:bg-red-800 text-white border border-red-700 hover:border-red-500 hover:text-white font-semibold cursor-pointer leading-5  transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-red focus:border-red-500 focus:z-10"
          >
            Next
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
