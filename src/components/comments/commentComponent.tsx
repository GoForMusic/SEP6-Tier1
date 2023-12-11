import React, { useEffect } from "react"; 
import { useState } from "react";
import { RootState } from "../../store";
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { addComment, fetchComments } from "../../thunks/commentsThunk";
import './comments.css';


const CommentForm = ({ movieId }) => {
  const [newComment, setNewComment] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const existingComments = useSelector(
    (state: RootState) => state.commentReducer.comments
  );
  useEffect(() => {

  
    dispatch(fetchComments(movieId));
  }, [dispatch, movieId]);

  const handleAddComment = () => {
    if (isLoggedIn && newComment.trim() !== "") {
      dispatch(addComment(newComment, movieId, userId));
      setNewComment("");
    }
  };

  return (
    <div>
      <div className="comment-frame">
        <h2>Comments</h2>
        {existingComments === undefined ? (
          <p>Loading comments...</p>
        ) : Array.isArray(existingComments) && existingComments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul className="comment-list">
            {Array.isArray(existingComments) &&
            [...existingComments]
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            .map((comment, index) => (
                <li className="comment-list-item" key={index}>
                 Comment:  {comment.body}
                 <br/>
                 date posted: {comment.date_posted} 
                 <br/>
                 author: {comment.writtenBy.userName}
                </li>
              ))}
          </ul>
        )}
      </div>

      {isLoggedIn && (
        <div>
          <h2>Leave a Comment</h2>
          {/* Input field for new comment */}
          <textarea
            rows={4}
            cols={50}
            placeholder="Type your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          {/* Button to add a new comment */}
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      )}
    </div>
  );
};


export default CommentForm;