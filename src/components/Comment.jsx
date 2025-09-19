import { useState } from "react";
import { Reply, Edit3, Trash2, Check, X } from "lucide-react";
import useCommentStore from "../store/useCommentStore";
import useAuthStore from "../store/useAuthStore";

const Comment = ({ comment, depth = 0, onReply }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const { user } = useAuthStore();
  const { deleteComment, updateComment, fetchCommentsByPost, createComment } =
    useCommentStore();

  console.log(comment);

  // Cap indentation at 2 levels
  const maxDepth = 2;
  const indent = Math.min(depth * 5, maxDepth * 5);

  const handleReply = async () => {
    if (!replyText.trim()) return;

    await createComment(comment.postId, replyText, comment.id || comment._id);
    await fetchCommentsByPost(comment.postId);

    setReplyText("");
    setShowReply(false);
  };

  const handleDeleteComment = async () => {
    await deleteComment(comment.id);
    await fetchCommentsByPost(comment.postId);
  };

  const handleEditComment = async () => {
    if (!editText.trim()) return;

    try {
      await updateComment(comment.id, editText);
      await fetchCommentsByPost(comment.postId);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update comment:", error);
      setEditText(comment.text);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date
      .toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", "")
      .toLowerCase();
  };

  return (
    <div
      className="group mb-4 transition-all duration-200"
      style={{ paddingLeft: indent }}
    >
      <div className="flex gap-3  px-2 py-1 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200">
        <div className="flex-shrink-0">
          <img
            src={
              comment?.photo ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-50 hover:ring-gray-200 transition-all"
            alt="profile"
          />
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <span className="font-semibold text-gray-900 text-sm mr-1">
              {comment.author}
            </span>
            {comment.userRole === "teacher" ||
            comment.userRole === "admin" ||
            comment.userRole === "registrar" ? (
              <span className="px-2 py-0.5 bg-gradient-to-r from-red-50 to-pink-50 text-red-700 text-[12px] font-medium rounded-full border border-red-100">
                {comment.userRole && comment.userRole.toUpperCase()}
              </span>
            ) : (
              <span className="px-2 py-0.5 bg-gradient-to-r from-red-50 to-pink-50 text-red-700 text-[12px] font-medium rounded-full border border-red-100">
                {comment.department}
              </span>
            )}
          </div>
          <span className="text-gray-500 text-[10px] font-medium">
            <i> {formatDate(comment.date)}</i>
          </span>

          {isEditing ? (
            <div className="mb-3">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="text-red-950 w-full p-3 text-sm border border-gray-200 rounded-lg resize-none focus:ring-1 focus:ring-red-primary focus:border-transparent transition-all"
                rows="3"
                placeholder="Edit your comment..."
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleEditComment}
                  className="flex items-center gap-1.5 bg-red-primary text-white px-4 py-2 text-sm font-medium rounded-lg hover:cursor-pointer hover:bg-red-700 transition-colors"
                >
                  <Check size={14} />
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-3">
              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                {comment.text}
              </p>
            </div>
          )}

          {/* Comment Actions */}
          <div className="flex items-center gap-4  transition-opacity duration-200">
            {user && depth < maxDepth && (
              <button
                onClick={() => setShowReply(!showReply)}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all hover:cursor-pointer ${
                  showReply
                    ? "text-red-700 bg-red-50 border border-red-200"
                    : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                }`}
              >
                <Reply size={12} />
                Reply
              </button>
            )}

            {user && user._id == comment.userId && (
              <>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all hover:cursor-pointer ${
                    isEditing
                      ? "text-orange-700 bg-orange-50 border border-orange-200"
                      : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                  }`}
                >
                  <Edit3 size={12} />
                  {isEditing ? "Cancel" : "Edit"}
                </button>

                <button
                  onClick={handleDeleteComment}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 hover:cursor-pointer py-1.5 rounded-full text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </>
            )}
          </div>

          {/* Reply Input */}
          {showReply && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Write a reply..."
                  className="flex-1 p-2 text-sm border text-red-950 border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent bg-white transition-all"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button
                  className="bg-red-primary text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-red-800 transition-colors"
                  onClick={handleReply}
                >
                  Post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Render replies recursively */}
      {comment.replies?.length > 0 && (
        <div className="mt-3 border-l-2 border-gray-100 ml-6 pl-4">
          {comment.replies.map((reply) => (
            <Comment
              key={reply._id}
              comment={{
                id: reply._id,
                postId: comment.postId,
                userId: reply.user?._id || reply.userId,
                photo: reply.user?.photo || reply.photo,
                author: reply.user
                  ? `${reply.user.firstName || ""} ${reply.user.lastName || ""}`
                  : reply.author || "Unknown",
                department: reply.user?.course || reply.role || "",
                userRole: reply.user?.role || "",
                text: reply.text,
                replies: reply.replies || [],
                date: reply.updatedAt,
              }}
              depth={depth + 1}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
