import React, { useEffect } from "react"; 
import { useState } from "react";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { addComment, fetchComments } from "../thunks/commentsThunk";


const CommentForm = () => {

      const [newComment, setNewComment] = useState<string>("");

     // maybe wont need it due to the useEffect hook
     //  const [existingComments, setExistingComments] = useState<string[]>();

      const dispatch: AppDispatch = useDispatch();

      const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
      const user = useSelector((state : RootState) => state.auth.user);
      const userId = useSelector((state : RootState) => state.auth.userId);

      const movieId = "will add later"

   

    useEffect(() => {

    dispatch(fetchComments(movieId))

}, [dispatch])

      // Function to handle adding a new comment
      const handleAddComment = () => {
        if (newComment.trim() !== "") {
         // dispatch(addComment(comment + movieId + userId))
          setNewComment("");
        }
      };
    
      return (
        <div>
          <div style={{ marginTop: "20px" }}>
            <h2>Existing Comments</h2>
            {/* {existingComments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              <ul>
                {existingComments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            )} */}
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