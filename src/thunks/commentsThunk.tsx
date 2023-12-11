import { Dispatch } from "redux";
import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS
} from '../constants/comments'


export const addComment = (movieId: string, comment: string, userId: string) => async () => {

    try {

        const requestBody = {
            movieId: movieId,
            comment: comment,
            userId: userId,
          };

        const filteredData = await fetch(`https://tier2.azurewebsites.net/comments${movieId}/${userId}`, {
            mode: 'cors',
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });

        if (!filteredData.ok) {
            // Handle error if needed
            console.error('Error adding comment:', filteredData.statusText);
          } else {
            // Handle success if needed
            console.log('Comment added successfully!');
          }
        } catch (error) {
          // Handle other errors if needed
          console.error('Error:', error);

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
  