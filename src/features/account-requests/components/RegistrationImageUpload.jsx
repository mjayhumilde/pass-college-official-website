import { Upload, XCircle } from "lucide-react";

export default function RegistrationImageUpload({
  inputId,
  label,
  preview,
  onChange,
  onRemove,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        {label}
      </label>
      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-400 transition-colors">
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt={`${label} preview`}
              className="w-full h-32 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10 hover:cursor-pointer"
              aria-label={`Remove ${label.toLowerCase()} image`}
              title="Remove image"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div>
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Upload {label.toLowerCase()}
            </p>
          </div>
        )}
        <input
          id={inputId}
          type="file"
          accept="image/*"
          onChange={onChange}
          className="absolute inset-0 w-full h-full opacity-0 hover:cursor-pointer z-0"
        />
      </div>
    </div>
  );
}
