import { useForm } from "react-hook-form";
import DocumentRequestForm from "../components/DocumentRequestForm";
import { FileText } from "lucide-react";
import PendingRequestsSection from "../components/RequestStatus";

const ReqDocs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmitForm(formData) {
    console.log(formData);
    reset();
  }

  return (
    <main>
      <PendingRequestsSection />

      <div className=" text-center space-y-4 flex  justify-center items-center my-6">
        <div className="shadow-lg p-2">
          <div className="flex justify-center items-center mt-1 mb-3">
            <p className="p-4 rounded-full bg-red-primary">
              <FileText color="white" size={40} />
            </p>
          </div>
          <h2 className="text-3xl font-bold text-red-950">
            School Document Request
          </h2>

          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="space-y-4 p-5 sm:w-full md:w-[500px]"
          >
            <div className=" flex flex-col items-start w-full space-y-1">
              <label className="font-bold text-red-950">Full Name</label>
              <input
                {...register("name", { required: true })}
                className="w-full border p-2 border-red-950"
                type="name"
                name="name"
                placeholder="Enter your full name"
              />
            </div>

            <div className="flex items-start space-x-3  w-full">
              <div className=" flex flex-col items-start  w-full space-y-1">
                <label className="font-bold text-red-950">Student ID</label>
                <input
                  {...register("id", { required: true })}
                  className="w-full border p-2 border-red-950"
                  type="id"
                  name="id"
                  placeholder="Enter your ID"
                />
              </div>{" "}
              <div className=" flex flex-col items-start w-full space-y-1">
                <label className="font-bold text-red-950">Email</label>
                <input
                  {...register("email", { required: true })}
                  className="w-full border p-2 border-red-950"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className=" flex flex-col items-start  w-full space-y-1">
              <label className="font-bold text-red-950">Document Type</label>
              <select
                {...register("documentType", {
                  required: true,
                })}
                className="border p-2 w-full border-red-950"
              >
                <option value="">Select Document Type</option>
                <option value="transcript">Transcript</option>
                <option value="recommendation-letter">
                  Recommendation Letter
                </option>
                <option value="certificate-of-enrollment">
                  Certificate of Enrollment
                </option>
                <option value="diploma-copy">Diploma Copy</option>
                <option value="graduation-certificate">
                  Graduation Certificate
                </option>
                <option value="transfer-credit-evaluation">
                  Transfer Credit Evaluation
                </option>
                <option value="fee-structure">Fee Structure</option>
                <option value="assessment-report">Assessment Report</option>
                <option value="attendance-record">Attendance Record</option>
                <option value="true-copy-of-grades">True Copy of Grades</option>
                <option value="memorandom-of-agreement">
                  Memorandum of Agreement (MOA)
                </option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex flex-col items-start w-full space-y-1">
              <label className="font-bold text-red-950">
                Additional Information (Optional)
              </label>
              <textarea
                {...register("message", { minLength: 10 })}
                placeholder="Any additional details about your request..."
                className="w-full border p-2  h-32 border-red-950"
              ></textarea>
            </div>

            <div className="mt-7">
              <button
                className="bg-red-primary text-red-50 font-bold py-2 w-full"
                type="submit"
              >
                SUBMIT REQUEST
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* <input
        type="text"
        name=""
        id=""
        className="border w-full"
        placeholder="practice"
      />

      <div>
        <DocumentRequestForm />
      </div> */}
    </main>
  );
};

export default ReqDocs;
