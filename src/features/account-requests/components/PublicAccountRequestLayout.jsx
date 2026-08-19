import passLogo from "../../../assets/images/logo/pass_logo.png";

export default function PublicAccountRequestLayout({ children, showLogo }) {
  return (
    <div className="flex flex-col justify-center px-4 py-3 bg-gray sm:px-6 lg:px-8 min-h-screen">
      {showLogo && (
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex items-center justify-center mx-auto mb-1 rounded-full">
            <img src={passLogo} alt="PASS College logo" className="w-2/5" />
          </div>
        </div>
      )}

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow rounded-lg sm:px-10">
          {children}
        </div>
      </div>

      <div className="mt-8 text-sm text-center text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} Pass College. All rights reserved.
        </p>
      </div>
    </div>
  );
}
