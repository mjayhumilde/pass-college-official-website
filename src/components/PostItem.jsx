import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import DeleteIcon from "./DeleteIcon";
import EditComponent from "./EditIcon";
import useCommentStore from "../store/useCommentStore";
import useAuthStore from "../store/useAuthStore";
import useLikeStore from "../store/useLikeStore";
import Comment from "./Comment";

const PostItem = ({ post, label, openCarousel, userRole, isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  const { user } = useAuthStore();
  const { fetchCommentsByPost, commentsByPost, loading, createComment } =
    useCommentStore();

  const {
    likesByPost,
    fetchLikes,
    addLike,
    removeLike,
    currentUserId,
    setCurrentUser,
  } = useLikeStore();

  const likes = likesByPost[post._id] || [];

  useEffect(() => {
    if (user?._id) setCurrentUser(user._id);
  }, [user, setCurrentUser]);

  useEffect(() => {
    fetchLikes(post._id);
  }, [post._id, fetchLikes]);

  const userLike = likes.find(
    (like) => like.user === currentUserId || like.user?._id === currentUserId
  );
  const isLiked = !!userLike;

  const handleLikeToggle = async () => {
    if (!user) return alert("You must be logged in to like posts.");
    if (isLiked) {
      await removeLike(userLike._id, post._id);
    } else {
      await addLike(post._id);
    }
  };

  const handleOpenComments = async () => {
    await fetchCommentsByPost(post._id);
    setIsOpen(!isOpen);
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
      key={post.id}
      className="overflow-hidden rounded-lg shadow-lg bg-red-primary my-5"
    >
      <div id={`news-${post.id}`} className="bg-gray">
        {isAuthenticated &&
          (userRole === "admin" || userRole === "teacher") && (
            <div className="flex items-center justify-end p-1 gap-1">
              <EditComponent post={post} itemType={label} />
              <DeleteIcon id={post._id} itemType={label} />
            </div>
          )}
        <div className="flex justify-between p-2 py-2 md:px-10">
          <h3 className="text-xl font-bold text-red-primary">{label}!!</h3>
          <p className="font-semibold text-red-primary">
            {formatDate(post.date)}
          </p>
        </div>
        <div className="text-3xl font-bold text-center text-red-primary">
          {post.title}
        </div>
        <div className="container p-2 px-5 pt-0 pb-2 mx-auto text-red-950 md:px-13">
          {post.description}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1">
        <div
          className={`grid gap-1 
          ${
            post.images.length === 3 ||
            post.images.length === 2 ||
            post.images.length === 1
              ? "col-span-2"
              : ""
          }
          ${post.images.length > 3 ? "grid-rows-2 " : ""}
          `}
        >
          {/* One Image */}
          {post.images.length === 1 &&
            post.images.map((src, index) => (
              <div
                key={index}
                className="overflow-hidden h-[320px] sm:h-[600px] cursor-pointer"
                onClick={() => openCarousel(post.images, index)}
              >
                <img
                  className="object-cover w-full h-full"
                  src={`${src}`}
                  alt="Left top image"
                />
              </div>
            ))}

          {/* Two Images */}
          {post.images.length === 2 && (
            <div className="grid grid-cols-2 gap-1">
              {post.images.map((src, index) => (
                <div
                  key={index}
                  className="overflow-hidden h-[210px] sm:h-[300px] cursor-pointer"
                  onClick={() => openCarousel(post.images, index)}
                >
                  <img
                    className="object-cover w-full h-full"
                    src={`${src}`}
                    alt={`Post image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Three Images */}
          {post.images.length === 3 && (
            <div className="grid gap-1">
              <div
                className="overflow-hidden h-[210px] sm:h-[300px] cursor-pointer"
                onClick={() => openCarousel(post.images, 0)}
              >
                <img
                  className="object-cover w-full h-full"
                  src={`${post.images[0]}`}
                  alt="Post image 1"
                />
              </div>
              <div className="grid grid-cols-2 gap-1">
                {post.images.slice(1, 3).map((src, index) => (
                  <div
                    key={index + 1}
                    className="overflow-hidden h-[210px] sm:h-[300px] cursor-pointer"
                    onClick={() => openCarousel(post.images, index + 1)}
                  >
                    <img
                      className="object-cover w-full h-full"
                      src={`${src}`}
                      alt={`Post image ${index + 2}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* More than 3 Images */}
          {post.images.length > 3 &&
            post.images.slice(0, 2).map((src, index) => (
              <div
                key={index}
                className="overflow-hidden h-[210px] sm:h-[300px] cursor-pointer"
                onClick={() => openCarousel(post.images, index)}
              >
                <img
                  className="object-cover w-full h-full"
                  src={`${src}`}
                  alt="Left top image"
                />
              </div>
            ))}
        </div>

        <div
          className={`
          ${post.images.length === 2 ? "hidden" : ""}
          ${post.images.length === 3 ? "hidden" : ""}
          ${post.images.length === 4 ? "grid gap-1 grid-rows-2" : ""} 
          ${post.images.length >= 5 ? "grid gap-1 grid-rows-3" : ""}
        `}
        >
          {post.images.length >= 4 &&
            post.images.slice(2, 5).map((src, index) => (
              <div
                key={index}
                className={`overflow-hidden cursor-pointer
              ${post.images.length >= 5 ? " h-[139px] sm:h-[199px]" : ""}
              ${post.images.length === 4 ? " h-[210px] sm:h-[300px]" : ""}
              ${index === 2 && post.images.length > 5 ? "relative" : ""}`}
                onClick={() => openCarousel(post.images, index + 2)}
              >
                <img
                  className="object-cover w-full h-full"
                  src={`${src}`}
                  alt={`Announcement image ${index + 3}`}
                />
                <div
                  className={`${
                    index === 2 && post.images.length > 5
                      ? "text-red-50 text-4xl absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-[rgb(128,0,0)]/50"
                      : ""
                  }`}
                >
                  {index === 2 && post.images.length > 5
                    ? `+ ${post.images.length - 5}`
                    : ""}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Likes / Comments */}
      <div>
        <div className="flex justify-between items-center p-2 sm:px-20">
          <div className="flex items-center px-2">
            <div className="relative w-8 h-8">
              <Heart
                className="w-full h-full text-white cursor-pointer"
                fill={isLiked ? "white" : "transparent"}
                strokeWidth={2}
                onClick={handleLikeToggle}
              />
            </div>
            <p className="text-white ml-2">{likes.length}</p>
          </div>
          <p
            onClick={handleOpenComments}
            className="text-white hover:cursor-pointer hover:underline"
          >
            <span className="text-white">
              {post.latestComments?.length || 0}
            </span>{" "}
            comments
          </p>
        </div>
        <hr className="text-white" />

        {isOpen && (
          <div className="modal-overlay p-1">
            <div className="modal-content">
              {loading ? (
                <p className="text-center text-gray-500">Loading comments...</p>
              ) : (
                (commentsByPost[post._id] || []).map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={{
                      id: comment._id,
                      postId: post._id,
                      userId: comment.user._id,
                      photo: comment.user.photo,
                      author: `${comment.user?.firstName} ${comment.user?.lastName}`,
                      role: comment.user?.course || "",
                      text: comment.text,
                      replies: comment.replies || [],
                      date: comment.updatedAt,
                    }}
                  />
                ))
              )}
            </div>
            {/* Add new comment */}
            {user && (
              <div className="flex gap-2 mt-3 p-2 border-t border-gray-300">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="flex-1 p-2 rounded border border-gray-300 text-red-50"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  className="bg-white text-red-primary px-3 rounded hover:cursor-pointer "
                  onClick={async () => {
                    if (!newComment.trim()) return;
                    await createComment(post._id, newComment);
                    setNewComment("");
                  }}
                >
                  Post
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;
