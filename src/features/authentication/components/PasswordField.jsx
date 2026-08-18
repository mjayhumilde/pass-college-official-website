import { Eye, EyeOff, Lock } from "lucide-react";

export default function PasswordField({
  id,
  label,
  value,
  isVisible,
  onChange,
  onToggleVisibility,
  autoComplete,
  disabled = false,
  helpText,
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Lock className="w-5 h-5 text-gray-400" />
        </div>
        <input
          id={id}
          name={id}
          type={isVisible ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="block w-full py-2 pl-10 pr-10 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
          placeholder="********"
          disabled={disabled}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button
            type="button"
            onClick={onToggleVisibility}
            className="text-gray-400 hover:text-gray-500 focus:outline-none hover:cursor-pointer"
            aria-label={isVisible ? `Hide ${label}` : `Show ${label}`}
            title={isVisible ? `Hide ${label}` : `Show ${label}`}
          >
            {isVisible ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      {helpText && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
    </div>
  );
}
