import { useState } from "react";
import {
  Plus,
  X,
  Calendar,
  Clock,
  Image as ImageIcon,
  FileText,
} from "lucide-react";

import usePostStore from "../store/usePostStore";
import useNotificationStore from "../store/useNotificationStore";

export default function CreatePostPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [postType, setPostType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState(""); // yyyy-mm-dd from <input type="date">
  const [eventTime, setEventTime] = useState(""); // e.g. "6:00pm"
  const [images, setImages] = useState([]); // [{ file, path (base64) }]
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const createPost = usePostStore((s) => s.createPost);
  const { addNewNotification } = useNotificationStore();

  // Make sure IDs match backend expectations
  const postTypes = [
    { id: "announcement", label: "Announcement", minImages: 1 },
    { id: "news", label: "News", minImages: 1 },
    { id: "events", label: "Events", maxImages: 1, minImages: 1 },
    { id: "uniforms-update", label: "Uniforms Update", minImages: 1 },
    { id: "careers", label: "Careers", minImages: 1 },
  ];

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    const def = postTypes.find((p) => p.id === postType);

    const processFile = (file) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve({ file, path: reader.result }); // base64 preview
        reader.readAsDataURL(file);
      });

    if (!selectedFiles.length) return;

    // Events: only one image
    if (def?.maxImages === 1) {
      Promise.all(selectedFiles.slice(0, 1).map(processFile)).then(setImages);
    } else {
      Promise.all(selectedFiles.map(processFile)).then((processed) =>
        setImages((prev) => [...prev, ...processed])
      );
    }
  };

  const removeImage = (index) => {
    setImages((imgs) => imgs.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setPostType("");
    setTitle("");
    setDescription("");
    setEventDate("");
    setEventTime("");
    setImages([]);
    setErrorMsg("");
  };

  const closePopup = () => {
    resetForm();
    setIsOpen(false);
  };

  const isFormValid = () => {
    if (!postType || !title.trim() || !description.trim()) return false;
    const def = postTypes.find((p) => p.id === postType);
    const min = def?.minImages ?? 0;
    if (images.length < min) return false;
    if (postType === "events" && (!eventDate || !eventTime.trim()))
      return false;
    return true;
  };

  const handleSubmit = async () => {
    if (!isFormValid() || submitting) return;

    setSubmitting(true);
    setErrorMsg("");

    try {
      // Build FormData (your backend expects files under "images")
      const fd = new FormData();
      fd.append("postType", postType);
      fd.append("title", title);
      fd.append("description", description);

      if (postType === "events") {
        // Convert yyyy-mm-dd -> ISO at 00:00:00Z
        const isoDate = `${eventDate}T00:00:00.000Z`;
        fd.append("eventDate", isoDate);
        fd.append("eventTime", eventTime);
      }

      images.forEach(({ file }) => fd.append("images", file));

      const result = await createPost(fd);

      if (result.success) {
        // Optional: push a notification into your local store
        addNewNotification({ notifStatus: "unread", ...result.post });
        closePopup();
      } else {
        setErrorMsg(result.error || "Failed to create post.");
      }
    } catch (err) {
      console.error("Create post error:", err);
      setErrorMsg("An unexpected error occurred while creating the post.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Create Post Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center p-3 mr-3 space-x-2 font-bold rounded-full text-red-50 bg-red-primary hover:bg-red-800 hover:cursor-pointer"
      >
        <Plus size={20} />
        <span>Create Post</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          {/* Popup */}
          <div className="w-full h-auto max-w-2xl max-h-screen p-6 mx-4 overflow-y-auto bg-white rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-red-primary">
                Create New Post
              </h2>
              <button
                onClick={closePopup}
                className="text-red-primary hover:text-red-800"
              >
                <X size={24} />
              </button>
            </div>

            {/* Error banner */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded bg-red-50 text-red-700 border border-red-200 text-sm">
                {errorMsg}
              </div>
            )}

            <div>
              {/* Post Type Selection */}
              <div className="mb-6">
                <label className="block mb-2 text-gray-700">
                  Select Post Type
                </label>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {postTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setPostType(type.id)}
                      className={`p-3 border shadow-md rounded-full ${
                        postType === type.id
                          ? "border-red-primary bg-red-primary text-white"
                          : "border-gray-300 text-red-primary hover:border-red-primary"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {postType && (
                <>
                  {/* Title */}
                  <div className="mb-4">
                    <label className="block mb-2 text-gray-700">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="block w-full py-2 px-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                      placeholder="Enter post title"
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <label className="block mb-2 text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full h-32 p-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                      placeholder="Enter post description"
                    />
                  </div>

                  {/* Event Date and Time (only for events) */}
                  {postType === "events" && (
                    <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                      <div>
                        <label className="flex items-center mb-2 text-gray-700">
                          <Calendar size={16} className="mr-1" />
                          Event Date
                        </label>
                        <input
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="block w-full py-2 px-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="flex items-center mb-2 text-gray-700">
                          <Clock size={16} className="mr-1" />
                          Event Time
                        </label>
                        <input
                          type="text"
                          value={eventTime}
                          onChange={(e) => setEventTime(e.target.value)}
                          placeholder="e.g. 6:00pm"
                          className="block w-full py-2 px-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                        />
                      </div>
                    </div>
                  )}

                  {/* Image Upload */}
                  <div className="mb-6">
                    <label className="block mb-2 text-gray-700">
                      <span className="inline-flex items-center gap-1">
                        <ImageIcon size={16} />
                        Upload Images
                      </span>
                      {postType === "events"
                        ? " (1 image only)"
                        : " (multiple images allowed)"}
                    </label>

                    <div className="flex items-center">
                      <input
                        type="file"
                        id="image-upload"
                        onChange={handleImageChange}
                        accept="image/*"
                        multiple={postType !== "events"}
                        className="hidden"
                      />
                      <label
                        htmlFor="image-upload"
                        className="p-1 px-5 mr-2 border rounded-full cursor-pointer text-red-50 bg-red-primary hover:bg-red-800"
                      >
                        Select Images
                      </label>
                      <span className="text-sm text-gray-500">
                        {images.length}{" "}
                        {images.length === 1 ? "image" : "images"} selected
                      </span>
                    </div>

                    {/* Preview Images */}
                    {images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-4 md:grid-cols-4">
                        {images.map((img, idx) => (
                          <div key={idx} className="relative">
                            <img
                              src={img.path}
                              alt={`Preview ${idx}`}
                              className="object-cover w-full h-24 border border-gray-300"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute top-0 right-0 p-1 text-white bg-red-primary"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Required fields notice */}
                  <div className="mb-4 text-sm text-gray-500">
                    <FileText size={16} className="inline mr-1" />
                    {postType === "events"
                      ? "Required: Title, Description, Event Date, Event Time, and 1 Image"
                      : "Required: Title, Description, and at least 1 Image"}
                  </div>

                  {/* Submit & Cancel Buttons */}
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={closePopup}
                      className="px-4 py-2 border rounded-full text-red-primary hover:bg-red-100 border-red-primary"
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className={`px-4 py-2 text-white rounded-full ${
                        isFormValid() && !submitting
                          ? "bg-red-primary hover:bg-red-800"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!isFormValid() || submitting}
                    >
                      {submitting ? "Creating..." : "Create Post"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
