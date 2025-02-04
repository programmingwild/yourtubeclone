import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from './actions';

const CommentSection = () => {
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const isCommentSectionOpen = useSelector((state) => state.isCommentSectionOpen);

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(addComment(newComment));
      setNewComment('');
    }
  };

  if (!isCommentSectionOpen) return null;

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={handleAddComment}>Post Comment</button>
    </div>
  );
};

export default CommentSection;