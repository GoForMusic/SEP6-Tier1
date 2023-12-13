import React, { useEffect } from "react"; 
import { useState } from "react";
import { RootState } from "../../store";
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { addComment, fetchComments } from "../../thunks/commentsThunk";
import { addLike, fetchLikes } from "../../thunks/likesThunk";
import './comments.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"



const CommentForm = ({ movieId }) => {
  const [newComment, setNewComment] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginUserReducer.isLoggedIn
  );
  const userId = useSelector((state: RootState) => state.loginUserReducer.userId);
  const existingComments = useSelector(
    (state: RootState) => state.commentReducer.comments
  );
  useEffect(() => {

  
    dispatch(fetchComments(movieId));
  }, [dispatch, movieId]);

  const handleAddComment = async () => {
    if (isLoggedIn && newComment.trim() !== "") {
      await dispatch(addComment(newComment, movieId, userId));
      dispatch(fetchComments(movieId))
      setNewComment("");
      
    }
  };

  const handleLikeComment = async (commentId) => {
    await dispatch(addLike( commentId, movieId));
    dispatch(fetchLikes(commentId, movieId));


  } 



  return (
    <div>
      <div className="comment-frame">
        <h2 className="comments-header">Comments</h2>
        {existingComments === undefined ? (
          <p>Loading comments...</p>
        ) : Array.isArray(existingComments) &&
          existingComments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul className="comment-list">
            {Array.isArray(existingComments) &&
              existingComments.map((comment, index) => (
                <li className="comment-list-item" key={index}>
                  <div className="comment-body">{comment.body}</div>
                  <div className="comment-meta">
                    <span className="comment-date">
                      Date posted: {comment.date_posted}
                    </span>
                    <span className="comment-author">
                      Author: {comment.writtenBy.userName}
                    </span>
                    <button
      className="like-comment-button"
   onClick={() => handleLikeComment(comment.id)}
>
  <i className="fas fa-heart"></i> 
</button>
                    
                    <span className="like-count">Likes: {comment.likes}</span>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>

      {isLoggedIn && (
        <div className="add-comment-section">
          <h2 className="leave-comment-header">Leave a Comment</h2>
          <textarea
            className="comment-textarea"
            rows={4}
            cols={50}
            placeholder="Type your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="add-comment-button" onClick={handleAddComment}>
            Add Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentForm;