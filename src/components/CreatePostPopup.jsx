import { useState } from "react";
import { Plus, X, Calendar, Clock, Image, FileText } from "lucide-react";

import usePostStore from "../store/usePostStore";
import useNotificationStore from "../store/useNotificationStore";

export default function CreatePostPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [postType, setPostType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [images, setImages] = useState([]);

  const postTypes = [
    { id: "announcement", label: "Announcement", minImages: 1 },
    { id: "news", label: "News", minImages: 1 },
    { id: "events", label: "Events", maxImages: 1 },
    { id: "uniforms", label: "Uniforms Update", minImages: 1 },
    { id: "careers", label: "Careers", minImages: 1 },
  ];

  const {
    addNewAnnouncement,
    addNewEvents,
    addNewNews,
    addNewUniforms,
    addNewCareers,
  } = usePostStore();

  const announcements = usePostStore((state) => state.announcements);
  const events = usePostStore((state) => state.events);
  const news = usePostStore((state) => state.news);
  const uniforms = usePostStore((state) => state.uniforms);
  const careers = usePostStore((state) => state.careers);

  const { addNewNotification } = useNotificationStore();

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const currentPostType = postTypes.find((p) => p.id === postType);

    const processFile = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            file,
            path: reader.result, // Base64 string
          });
        };
        reader.readAsDataURL(file);
      });
    };

    if (currentPostType && currentPostType.maxImages === 1) {
      // For events, only allow one image
      const filesToProcess = selectedFiles.slice(0, 1);

      Promise.all(filesToProcess.map(processFile)).then((processedImages) => {
        setImages(processedImages);
      });
    } else {
      // For other post types, allow multiple images
      const filesToProcess = selectedFiles;

      Promise.all(filesToProcess.map(processFile)).then((processedImages) => {
        setImages([...images, ...processedImages]);
      });
    }
  };

  const removeImage = (index) => {
    // No need to revoke URL for base64 strings
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Here you would handle the actual submission
    const data = {
      postType,
      title,
      description,
      eventDate: postType === "events" ? eventDate : null,
      date: Date.now(),
      eventTime: postType === "events" ? eventTime : null,
      images: images.map((img) => img.path),
    };

    const dataWithId = {
      ...(postType === "announcement" && { id: announcements.length + 1 }),
      ...(postType === "events" && { id: events.length + 1 }),
      ...(postType === "news" && { id: news.length + 1 }),
      ...(postType === "careers" && { id: careers.length + 1 }),
      ...(postType === "uniforms" && { id: uniforms.length + 1 }),
      ...data,
    };

    console.log(dataWithId);

    switch (postType) {
      case "announcement":
        addNewAnnouncement(dataWithId);

        break;
      case "events":
        addNewEvents(dataWithId);
        break;
      case "news":
        addNewNews(dataWithId);

        break;
      case "careers":
        addNewCareers(dataWithId);
        break;
      case "uniforms":
        addNewUniforms(dataWithId);
        break;
      default:
        break;
    }

    // added a status property for notif
    const dataForNotif = { status: "unread", ...dataWithId };
    addNewNotification(dataForNotif);

    // Reset form and close popup
    resetForm();
    setIsOpen(false);
  };

  const resetForm = () => {
    setPostType("");
    setTitle("");
    setDescription("");
    setEventDate("");
    setEventTime("");
    setImages([]);
  };

  const closePopup = () => {
    resetForm();
    setIsOpen(false);
  };

  const isFormValid = () => {
    if (!title || !description || images.length === 0) return false;
    if (postType === "events" && (!eventDate || !eventTime)) return false;
    return true;
  };

  return (
    <div>
      {/* Create Post Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 bg-red-primary text-white p-3 mr-3 hover-bg-red-primary"
      >
        <Plus size={20} />
        <span>Create Post</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          {/* Popup */}
          <div className="bg-white w-full max-w-2xl h-auto max-h-screen overflow-y-auto p-6 border border-gray-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-red-primary">
                Create New Post
              </h2>
              <button
                onClick={closePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div>
              {/* Post Type Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Select Post Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {postTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setPostType(type.id)}
                      className={`p-3 border ${
                        postType === type.id
                          ? "border-red-primary bg-red-primary text-white"
                          : "border-gray-300 hover:border-red-primary"
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
                    <label className="block text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-2 border border-gray-300"
                      placeholder="Enter post title"
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 h-32"
                      placeholder="Enter post description"
                    ></textarea>
                  </div>

                  {/* Event Date and Time (only for events) */}
                  {postType === "events" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 mb-2 flex items-center">
                          <Calendar size={16} className="mr-1" />
                          Event Date
                        </label>
                        <input
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full p-2 border border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 flex items-center">
                          <Clock size={16} className="mr-1" />
                          Event Time
                        </label>
                        <input
                          type="time"
                          value={eventTime}
                          onChange={(e) => setEventTime(e.target.value)}
                          className="w-full p-2 border border-gray-300"
                        />
                      </div>
                    </div>
                  )}

                  {/* Image Upload */}
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2 items-center">
                      <Image size={16} className="mr-1" />
                      Upload Images
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
                        className="cursor-pointer bg-gray-200 hover:bg-gray-300 p-2 border border-gray-300 mr-2"
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
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                        {images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image.path}
                              alt={`Preview ${index}`}
                              className="w-full h-24 object-cover border border-gray-300"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-0 right-0 bg-red-primary text-white p-1"
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
                      className="py-2 px-4 border border-gray-300 text-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="py-2 px-4 bg-red-primary text-white hover-bg-red-primary"
                      disabled={!isFormValid()}
                    >
                      Create Post
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
