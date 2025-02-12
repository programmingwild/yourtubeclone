import React, { useState } from "react";
import styles from "../styles/Comment.module.css";
import { format } from "date-fns"; // Import date formatting library

const CommentSection = ({ onClose }) => {
  const [comments, setComments] = useState([]); // Stores comments
  const [commentText, setCommentText] = useState(""); // Stores input

  // Handle posting a comment
  const handlePostComment = () => {
    if (commentText.trim() === "") return; // Prevent empty comments

    const newComment = {
      id: Date.now(),
      text: commentText,
      timestamp: format(new Date(), "MMM d, yyyy - h:mm a"), // Format the date
    };

    setComments([...comments, newComment]); // Update state
    setCommentText(""); // Clear input field
  };

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentHeader}>
        Comments
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
      </div>

      <div className={styles.commentList}>
        {comments.length === 0 ? (
          <p className={styles.noComments}>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <p className={styles.commentText}>{comment.text}</p>
              <span className={styles.commentTimestamp}>{comment.timestamp}</span>
            </div>
          ))
        )}
      </div>

      <div className={styles.commentInputContainer}>
        <input
          type="text"
          className={styles.commentInput}
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handlePostComment()} // Post on Enter key
        />
        <button className={styles.commentButton} onClick={handlePostComment}>
          Post
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
