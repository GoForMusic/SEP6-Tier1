import { Dispatch } from "redux";
import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_REQUEST,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS
  
} from '../constants/comments'


export const addComment = ( comment: string, movieId: string ,userId: string) => async (dispatch: Dispatch) => {

    try {
      dispatch({type: POST_COMMENT_REQUEST})

        const requestBody = {
                
            body: comment,
            account_id: userId,
            movie_id: movieId,
          };

          console.log("movieId" , movieId );
          console.log("userID", userId);
          console.log("comment", comment);

          console.log("RequestedBody:", requestBody);
          
          

        const filteredData = await fetch(`https://tier2.azurewebsites.net/Comment`, {
            mode: 'cors',
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });

        if (!filteredData.ok) {


           
            console.error('Error adding comment:', filteredData.statusText);
          } else {
         
            dispatch({type: POST_COMMENT_SUCCESS})
            console.log('Comment added successfully!');
          }
        } catch (error) {
     
          console.error('Error:', error);

    } 

}

export const deleteComments = (commentId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: DELETE_COMMENT_REQUEST})
    const response = await fetch(`https://tier2.azurewebsites.net/Comment${commentId}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
    });
    if(!response.ok) {
      console.log("error deleting comment: ", response.statusText);
      
    } else {
      dispatch({type: DELETE_COMMENT_SUCCESS})
      console.log("comment deleted successfully");
      
    }
  } catch (error){
    console.error("Error", error)
  }
}

export const fetchComments = (movieId: string) =>  async (dispatch: Dispatch) => {
    try {
      dispatch({type: FETCH_COMMENTS_REQUEST})
      const response = await fetch(`https://tier2.azurewebsites.net/Comment/movie/${movieId}/comments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      

      if (!response.ok) {
        // Handle error if needed
        console.error('Error fetching comments:', response.statusText);
        return [];
      }
      console.log("heeeeeeeeeereeeeeeeee");
      
      const comments = await response.json();
      dispatch({type: FETCH_COMMENTS_SUCCESS, payload: comments});
      console.log("comments:", comments);
      
      return comments;
    } catch (error) {
      // Handle other errors if needed
      console.error('Error:', error);
      return [];
    }
  };
  