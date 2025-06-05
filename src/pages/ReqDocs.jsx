import useRequestDocsStore from "../store/useRequestDocsStore";
import useNotificationStore from "../store/useNotificationStore";
import useAuthStore from "../store/useAuthStore";

import PendingRequestsSection from "../components/RequestStatus";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FileText } from "lucide-react";

const ReqDocs = () => {
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { errors },
    reset,
  } = useForm();

  const requestData = useRequestDocsStore((state) => state.requestsDocs);
  const { addNewRequestDocs, addNewAllUserRequest } = useRequestDocsStore();

  const { addNewNotification } = useNotificationStore();

  const user = useAuthStore((state) => state.user);

  function onSubmitForm(formData) {
    //     {
    //   id: "REQ-2025-003",
    //   documentType: "Recommendation Letter",
    //   requestDate: "2025-03-25",
    //   status: "Ready for Pickup",
    //   estimatedCompletion: "2025-04-01",
    // },
    const { documentType } = formData;
    const requestValidData = {
      ...formData,
      id: `REQ-2025-003${requestData.length + 1}`,
      requestDate: Date.now(),
      status: "processing",
      estimatedCompletion: Date.now() + 6 * 24 * 60 * 60 * 1000, // 6 days in ms
      // for notif
      postType: "document",
      title: `${documentType} Request is Processing`,
      description: `Your request for ${documentType} is being processed`,
      date: Date.now(),
      notifStatus: "unread",
      ...user,
    };
    //     {
    //   id: 2,
    //   postType: "career",
    //   title: "Teaching Position Available",
    //   description: "We're hiring Math teachers. Apply before May 15.",
    //   date: "2025-05-02",
    //   status: "read",
    // },

    addNewRequestDocs(requestValidData);
    addNewAllUserRequest(requestValidData);
    addNewNotification(requestValidData);

    console.log(requestValidData);
    reset();
  }

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on mount
  }, []);

  return (
    <main>
      <div className="flex items-center justify-center my-6 space-y-4 text-center ">
        <div className="p-2 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mt-1 mb-3">
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
            {/* <div className="flex flex-col items-start w-full space-y-1 ">
              <label className="font-bold text-red-950">Full Name</label>
              <input
                {...register("name", { required: true })}
                className="w-full p-2 border border-red-950"
                type="name"
                name="name"
                placeholder="Enter your full name"
              />
            </div>

            <div className="flex items-start w-full space-x-3">
              <div className="flex flex-col items-start w-full space-y-1 ">
                <label className="font-bold text-red-950">Student ID</label>
                <input
                  {...register("id", { required: true })}
                  className="w-full p-2 border border-red-950"
                  type="id"
                  name="id"
                  placeholder="Enter your ID"
                />
              </div>{" "}
              <div className="flex flex-col items-start w-full space-y-1 ">
                <label className="font-bold text-red-950">Email</label>
                <input
                  {...register("email", { required: true })}
                  className="w-full p-2 border border-red-950"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </div>
            </div> */}

            <div className="flex flex-col items-start w-full space-y-1 ">
              <label className="font-bold text-red-950">Document Type</label>
              <select
                {...register("documentType", {
                  required: true,
                })}
                className="hover:cursor-pointer block w-full py-2 pl-10 pr-10 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
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
            {/* 
            <div className="flex flex-col items-start w-full space-y-1">
              <label className="font-bold text-red-950">
                Additional Information (Optional)
              </label>
              <textarea
                {...register("message", { minLength: 10 })}
                placeholder="Any additional details about your request..."
                className="w-full h-32 p-2 border border-red-950"
              ></textarea>
            </div> */}

            <div className="mt-7">
              <button
                className="hover:cursor-pointer w-full py-2 text-sm font-bold rounded-full bg-red-primary text-red-50"
                type="submit"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* <input
        type="text"
        name=""
        id=""
        className="w-full border"
        placeholder="practice"
      />

      <div>
        <DocumentRequestForm />
      </div> */}

      <PendingRequestsSection request={requestData} />
    </main>
  );
};

export default ReqDocs;
