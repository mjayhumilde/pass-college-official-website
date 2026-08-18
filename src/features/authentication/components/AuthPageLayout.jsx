export default function AuthPageLayout({
  children,
  logoSrc,
  logoAlt,
  backgroundClassName = "",
}) {
  return (
    <div
      className={`flex min-h-screen flex-col justify-center px-4 sm:px-6 lg:px-8 ${backgroundClassName}`}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center mx-auto mb-1 rounded-full">
          <img src={logoSrc} alt={logoAlt} className="w-2/5" />
        </div>
      </div>

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
