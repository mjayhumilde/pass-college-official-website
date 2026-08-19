import { useState } from "react";
import useRequestAccountStore from "../store/useRequestAccountStore";
import AccountRequestFeedback from "./AccountRequestFeedback";
import AccountRequestFormFields from "./AccountRequestFormFields";
import RegistrationFormUploads from "./RegistrationFormUploads";

const createEmptyFormData = () => ({
  firstName: "",
  lastName: "",
  email: "",
  course: "",
  role: "student",
  studentNumber: "",
});

export default function AccountRequestSubmission({
  onCheckStatus,
  onBackToLogin,
}) {
  const [formData, setFormData] = useState(createEmptyFormData);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const { loading, error, success, createRequest } = useRequestAccountStore();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
      ...(name === "role" && value !== "student" ? { studentNumber: "" } : {}),
    }));
  };

  const handleImageChange = (event, side) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (side === "front") {
      setFrontImage(file);
      setFrontPreview(URL.createObjectURL(file));
    } else {
      setBackImage(file);
      setBackPreview(URL.createObjectURL(file));
    }
  };

  const clearImage = (side) => {
    const isFront = side === "front";
    const inputId = isFront ? "frontInput" : "backInput";

    if (isFront) {
      setFrontImage(null);
      setFrontPreview(null);
    } else {
      setBackImage(null);
      setBackPreview(null);
    }

    const input = document.getElementById(inputId);
    if (input) {
      input.value = "";
    }
  };

  const resetForm = () => {
    setFormData(createEmptyFormData());
    clearImage("front");
    clearImage("back");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!frontImage || !backImage) {
      window.alert(
        "Please upload both front and back images of your registration form",
      );
      return;
    }

    if (formData.role === "student" && !formData.studentNumber.trim()) {
      window.alert("Student number is required for student accounts");
      return;
    }

    const submitData = new FormData();
    submitData.append("firstName", formData.firstName);
    submitData.append("lastName", formData.lastName);
    submitData.append("email", formData.email);
    submitData.append("course", formData.course);
    submitData.append("role", formData.role);

    if (formData.role === "student") {
      submitData.append("studentNumber", formData.studentNumber);
    }

    submitData.append("front", frontImage);
    submitData.append("back", backImage);

    try {
      await createRequest(submitData);
    } catch (submitError) {
      console.error("Error creating request:", submitError);
    } finally {
      resetForm();
    }
  };

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-red-900">
          Request Account Creation
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Fill out the form below to request a new account
        </p>
      </div>

      {error && <AccountRequestFeedback type="error" message={error} />}
      {success && <AccountRequestFeedback type="success" message={success} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <AccountRequestFormFields
          formData={formData}
          onChange={handleInputChange}
        />
        <RegistrationFormUploads
          frontPreview={frontPreview}
          backPreview={backPreview}
          onFrontChange={(event) => handleImageChange(event, "front")}
          onBackChange={(event) => handleImageChange(event, "back")}
          onFrontRemove={() => clearImage("front")}
          onBackRemove={() => clearImage("back")}
        />
        <button
          type="submit"
          disabled={loading}
          className={`font-bold hover:cursor-pointer rounded-full w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">
              Already have a request?
            </span>
          </div>
        </div>
        <div className="mt-6 text-center space-y-2">
          <button
            type="button"
            onClick={onCheckStatus}
            className="block mx-auto text-sm font-medium text-red-950 hover:underline hover:cursor-pointer"
          >
            Check request status
          </button>
          <button
            type="button"
            onClick={onBackToLogin}
            className="block mx-auto text-sm font-medium text-gray-600 hover:underline hover:cursor-pointer"
          >
            Back to login
          </button>
        </div>
      </div>
    </>
  );
}
