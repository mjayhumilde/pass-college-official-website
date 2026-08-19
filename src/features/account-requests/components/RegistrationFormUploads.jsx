import RegistrationImageUpload from "./RegistrationImageUpload";

export default function RegistrationFormUploads({
  frontPreview,
  backPreview,
  onFrontChange,
  onBackChange,
  onFrontRemove,
  onBackRemove,
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Registration Form Images
        </label>
        <p className="text-xs text-gray-500 mb-4">
          Please upload clear photos of both sides of your registration form
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RegistrationImageUpload
            inputId="frontInput"
            label="Front Side"
            preview={frontPreview}
            onChange={onFrontChange}
            onRemove={onFrontRemove}
          />
          <RegistrationImageUpload
            inputId="backInput"
            label="Back Side"
            preview={backPreview}
            onChange={onBackChange}
            onRemove={onBackRemove}
          />
        </div>
      </div>
    </div>
  );
}
