import { useState } from "react";
import { Heart, MessageCircle, Reply } from "lucide-react";
import DeleteIcon from "./DeleteIcon";

// Comment component (handles both main comments + replies)
const Comment = ({ comment, depth = 0, onReply }) => {
  const [likes, setLikes] = useState(comment.likes || 0);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  // Cap indentation at 2 levels
  const maxDepth = 2;
  const indent = Math.min(depth * 20, maxDepth * 20); // 20px per level

  const handleReply = () => {
    if (!replyText.trim()) return;
    onReply(comment.id, {
      id: Date.now(),
      author: "You", // Replace with actual logged-in user
      role: "Student",
      text: replyText,
      replies: [],
    });
    setReplyText("");
    setShowReply(false);
  };

  return (
    <div className="flex gap-1 m-2" style={{ paddingLeft: indent }}>
      <img
        src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg"
        className="w-6 h-6 rounded-full"
        alt="profile"
      />
      <div className="bg-white p-1 rounded text-red-950 w-full">
        <p>
          <b>{comment.author}</b> <span>{comment.role}</span>
        </p>
        <p className="text-sm">{comment.text}</p>

        {/* Comment Actions (Like + Reply) */}
        <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-red-500"
            onClick={() => setLikes(likes + 1)}
          >
            <Heart
              size={14}
              fill={likes > 0 ? "#FF5252" : "transparent"}
              strokeWidth={2}
            />
            <span>{likes}</span>
          </div>

          {/*  Hide Reply button if depth === maxDepth */}
          {depth < maxDepth && (
            <div
              className="flex items-center gap-1 cursor-pointer hover:text-blue-500"
              onClick={() => setShowReply(!showReply)}
            >
              <Reply size={14} />
              <span>Reply</span>
            </div>
          )}
        </div>

        {/* Reply Input */}
        {showReply && (
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Write a reply..."
              className="flex-1 p-1 text-sm border border-gray-300 rounded"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button
              className="bg-red-primary text-white px-2 text-sm rounded hover:bg-red-800"
              onClick={handleReply}
            >
              Post
            </button>
          </div>
        )}

        {/* Render replies recursively */}
        {comment.replies?.length > 0 && (
          <div>
            {comment.replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                depth={depth + 1}
                onReply={onReply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PostItem = ({ post, label, openCarousel, userRole, isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);

  // Example comments (replace later with API data)
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Shien Meng Goh",
      role: "BSCS-4",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      replies: [],
    },
    {
      id: 3,
      author: "Shane Kyla Cosme",
      role: "BSCS-4",
      text: "Another main comment here, very insightful!",
      replies: [],
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newCommentObj = {
      id: Date.now(),
      author: "You",
      role: "Student",
      text: newComment,
      replies: [],
    };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const handleReply = (commentId, reply) => {
    const addReply = (items) =>
      items.map((item) =>
        item.id === commentId
          ? { ...item, replies: [...(item.replies || []), reply] }
          : { ...item, replies: addReply(item.replies || []) }
      );
    setComments(addReply(comments));
  };

  return (
    <div
      key={post.id}
      className="overflow-hidden rounded-lg shadow-lg bg-red-primary"
    >
      <div id={`news-${post.id}`} className="bg-gray">
        {isAuthenticated &&
          (userRole === "admin" || userRole === "teacher") && (
            <div className="flex items-center justify-end p-1">
              <div className="flex items-center justify-center p-2 rounded-full bg-red-primary hover:bg-red-800 text-red-50">
                <DeleteIcon id={post.id} itemType={label} />
              </div>
            </div>
          )}
        <div className="flex justify-between p-2 py-2 md:px-10">
          <h3 className="text-xl font-bold text-red-primary">{label}!!</h3>
          <p className="font-semibold text-red-primary">
            {Number.isFinite(post.date)
              ? new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : post.date}
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
          {/* Left column with 2 images */}
          {post.images.length === 1 &&
            post.images.map((src, index) => (
              <div
                key={index}
                className="overflow-hidden h-[320px] sm:h-[600px] cursor-pointer"
                onClick={() => openCarousel(post.images, index)}
              >
                {/* Left top image */}
                <img
                  className="object-cover w-full h-full"
                  src={`http://127.0.0.1:5000${src}`}
                  alt="Left top image"
                />
              </div>
            ))}

          {/* Two Images Layout - Side by side */}
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
                    src={`http://127.0.0.1:5000${src}`}
                    alt={`Post image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Three Images Layout*/}
          {post.images.length === 3 && (
            <div className="grid gap-1">
              <div
                className="overflow-hidden h-[210px] sm:h-[300px] cursor-pointer"
                onClick={() => openCarousel(post.images, 0)}
              >
                <img
                  className="object-cover w-full h-full"
                  src={`http://127.0.0.1:5000${post.images[0]}`}
                  alt="Post image 1"
                />
              </div>
              {/* Second and third images side by side */}
              <div className="grid grid-cols-2 gap-1">
                {post.images.slice(1, 3).map((src, index) => (
                  <div
                    key={index + 1}
                    className="overflow-hidden h-[210px] sm:h-[300px] cursor-pointer"
                    onClick={() => openCarousel(post.images, index + 1)}
                  >
                    <img
                      className="object-cover w-full h-full"
                      src={`http://127.0.0.1:5000${src}`}
                      alt={`Post image ${index + 2}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {post.images.length > 3 &&
            post.images.slice(0, 2).map((src, index) => (
              <div
                key={index}
                className="overflow-hidden h-[210px] sm:h-[300px] cursor-pointer"
                onClick={() => openCarousel(post.images, index)}
              >
                {/* Left top image */}
                <img
                  className="object-cover w-full h-full"
                  src={`http://127.0.0.1:5000${src}`}
                  alt="Left top image"
                />
              </div>
            ))}
        </div>

        <div
          className={`
          
          ${post.images.length === 2 ? "hidden" : ""}
          ${post.images.length === 3 ? "hidden" : ""}
          ${post.images.length === 4 ? "grid  gap-1  grid-rows-2" : ""} 
          ${post.images.length >= 5 ? "grid  gap-1  grid-rows-3" : ""}`}
        >
          {/* Right column with 3 images */}
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
                  src={`http://127.0.0.1:5000${src}`}
                  alt={`Announcement image ${index + 3}`}
                />
                <div
                  className={`
                          ${
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

      {/* Likes + Comments */}
      <div>
        <div className="flex justify-between items-center p-2 sm:px-20">
          <div className="flex items-center px-2">
            <div className="relative w-8 h-8">
              <Heart
                className="w-full h-full text-white cursor-pointer"
                fill={likes > 0 ? "#FF5252" : "transparent"}
                strokeWidth={2}
                onClick={() => setLikes(likes + 1)}
              />
            </div>
            <p className="text-white ml-2">{likes}</p>
          </div>
          <p
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:cursor-pointer hover:underline"
          >
            <span className="text-white">{comments.length}</span> comments
          </p>
        </div>
        <hr className="text-white" />
        <div className="flex justify-around items-center px-10 py-2">
          <Heart
            color="white"
            className="hover:cursor-pointer hover:scale-125 transition-all"
            onClick={() => setLikes(likes + 1)}
          />
          <MessageCircle
            color="white"
            className="hover:cursor-pointer hover:scale-125 transition-all"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        {isOpen && (
          <div className="modal-overlay p-1">
            <div className="modal-content">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onReply={handleReply}
                />
              ))}

              {/* Add new comment */}
              <div className="flex gap-2 mt-3 p-2 border-t border-gray-300">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="flex-1 p-2 rounded border border-gray-300"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  className="bg-red-primary text-white px-3 rounded hover:bg-red-800"
                  onClick={handleAddComment}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;
