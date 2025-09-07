import usePostStore from "../store/usePostStore";
import { useEffect, useMemo, useState } from "react";
import {
  Edit as EditIcon,
  X,
  Upload,
  Calendar,
  Clock,
  Image as ImageIcon,
} from "lucide-react";

export default function EditComponent({ post }) {
  const { editPost } = usePostStore();
  const [isOpen, setIsOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState(post?.title ?? "");
  const [description, setDescription] = useState(post?.description ?? "");
  const [eventDate, setEventDate] = useState(post?.eventDate ?? "");
  const [eventTime, setEventTime] = useState(post?.eventTime ?? "");

  // Image handling
  const [files, setFiles] = useState([]);
  const [replaceImages, setReplaceImages] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen && post) {
      setTitle(post.title ?? "");
      setDescription(post.description ?? "");
      setEventDate(post.eventDate ?? "");
      setEventTime(post.eventTime ?? "");
      setFiles([]);
      setReplaceImages(false);
    }
  }, [isOpen, post]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Check if this is an event post
  const isEventPost = post?.postType === "events";

  const buildJsonPayload = () => {
    const payload = { title, description };
    if (isEventPost) {
      if (eventDate) payload.eventDate = eventDate;
      if (eventTime) payload.eventTime = eventTime;
    }
    return payload;
  };

  const buildFormDataPayload = () => {
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    if (isEventPost) {
      if (eventDate) fd.append("eventDate", eventDate);
      if (eventTime) fd.append("eventTime", eventTime);
    }
    files.forEach((f) => fd.append("images", f));
    return fd;
  };

  const handleSave = async () => {
    try {
      let result;

      if (replaceImages && files.length > 0) {
        const formData = buildFormDataPayload();
        result = await editPost(post._id, formData, true);
      } else {
        const payload = buildJsonPayload();
        result = await editPost(post._id, payload, false);
      }

      if (result.success) {
        console.log("Post updated successfully:", result.post);
        handleClose();
      } else {
        console.error("Failed to update post:", result.error);
        // TODO: show toast/snackbar
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // Drag and drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (droppedFiles.length > 0) {
      if (isEventPost) {
        // For events, only take the first file
        setFiles([droppedFiles[0]]);
      } else {
        // For other posts, allow multiple files
        setFiles((prev) => [...prev, ...droppedFiles]);
      }
      setReplaceImages(true);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (isEventPost) {
      // For events, only take the first file
      setFiles(selectedFiles.slice(0, 1));
    } else {
      // For other posts, allow multiple files
      setFiles((prev) => [...prev, ...selectedFiles]);
    }

    if (selectedFiles.length > 0) {
      setReplaceImages(true);
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const currentImages = useMemo(
    () => (Array.isArray(post?.images) ? post.images : []),
    [post]
  );

  const canSave = title.trim() && description.trim();

  return (
    <>
      <button
        onClick={handleOpen}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-red-primary rounded-lg hover:bg-red-700 transition-colors duration-200 cursor-pointer"
      >
        <EditIcon className="w-4 h-4" />
        <span className="hidden sm:inline">Edit</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl  text-red-950 font-bold">Edit Post</h2>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-red-primary" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-red-950">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title"
                    className="block w-full py-2 p-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-red-950">
                    Description *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write your post description here..."
                    rows={4}
                    className="block w-full py-2 p-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                  />
                </div>

                {/* Event Fields (only show for event posts) */}
                {isEventPost && (
                  <div className="p-4 bg-red-50 rounded-lg border border-blue-200">
                    <h3 className="text-sm font-semibold text-red-900 mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Event Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Event Date
                        </label>
                        <input
                          type="date"
                          value={
                            eventDate
                              ? new Date(eventDate).toISOString().slice(0, 10)
                              : ""
                          }
                          onChange={(e) => {
                            const iso = e.target.value
                              ? new Date(
                                  e.target.value + "T00:00:00"
                                ).toISOString() // Add default time
                              : "";
                            setEventDate(iso);
                          }}
                          className="block w-full py-2 pl-10 pr-10 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className=" text-sm font-medium text-red-950 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Event Time
                        </label>
                        <input
                          type="text"
                          value={eventTime}
                          onChange={(e) => setEventTime(e.target.value)}
                          placeholder="e.g. 6:00 PM"
                          className="block w-full py-2 pl-10 pr-10 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Current Images */}
                {currentImages.length > 0 && (
                  <div className="space-y-3">
                    <label className=" text-sm font-medium text-red-950 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Current Images
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {currentImages.map((src, i) => (
                        <div key={i} className="relative group">
                          <img
                            src={`http://127.0.0.1:5000${src}`}
                            alt={`Current image ${i + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-gray-200 group-hover:opacity-75 transition-opacity"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Replace Images Toggle */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="replace-images"
                    checked={replaceImages}
                    onChange={(e) => setReplaceImages(e.target.checked)}
                    className=" hover:cursor-pointer w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="replace-images"
                    className="text-sm text-red-950 cursor-pointer"
                  >
                    Replace all images with new uploads
                  </label>
                </div>

                {/* File Upload Area */}
                {replaceImages && (
                  <div className="space-y-4">
                    <div
                      onDragEnter={handleDragEnter}
                      onDragOver={(e) => e.preventDefault()}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        isDragOver
                          ? "border-blue-400 bg-blue-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600 mb-2">
                        Drag and drop {isEventPost ? "an image" : "images"}{" "}
                        here, or{" "}
                        <label className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                          browse files
                          <input
                            type="file"
                            accept="image/*"
                            multiple={!isEventPost}
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                        </label>
                      </p>
                      <p className="text-xs text-gray-500">
                        {isEventPost
                          ? "Event posts support 1 image only. Supports: JPG, PNG, GIF (max 5MB)"
                          : "Supports: JPG, PNG (max 5MB each)"}
                      </p>
                    </div>

                    {/* Selected Files Preview */}
                    {files.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-red-950">
                          New images ({files.length})
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                          {files.map((file, i) => (
                            <div key={i} className="relative group">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="w-full h-24 object-cover rounded-lg border border-gray-200"
                              />
                              <button
                                onClick={() => removeFile(i)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <X className="w-3 h-3 mx-auto" />
                              </button>
                              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 rounded-b-lg truncate">
                                {file.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-3 mb-1 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-red-950">* Required fields</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleClose}
                  className="hover:cursor-pointer px-4 py-2 text-sm font-medium text-red-950 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!canSave}
                  className={`hover:cursor-pointer px-6 py-2 text-sm font-medium text-white rounded-lg focus:ring-4 transition-colors ${
                    canSave
                      ? "bg-red-primary hover:bg-red-700 focus:ring-red-300"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
