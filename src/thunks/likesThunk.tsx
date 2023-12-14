import { Dispatch } from "redux";
import { FETCH_LIKES_REQUEST,
         FETCH_LIKES_SUCCESS,
         POST_LIKES_SUCCESS,
         POST_LIKES_REQUEST,
        } from '../constants/likes'
import { log } from "console";

    

    export const addLike = (commentId: string ) => async (dispatch: Dispatch) => {
        

        try{
            dispatch({ type : POST_LIKES_REQUEST})

            const requestBody = {
                
                commentId: commentId,
                
            }


         const likeRequest = await fetch (`https://tier2.azurewebsites.net/Comment/${commentId}/likes`, {
            mode: 'cors',
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
         });

         if(!likeRequest.ok) {
            console.log("Error liking the comment", likeRequest.statusText);
            
         } else {
            dispatch({type: POST_LIKES_SUCCESS});
            console.log("Like added successfully");
            
         }

        } catch (error) {

            console.error("Error", error);

        }
    }

    export const fetchLikes = (commentId: string, movieId: string) => async (dispatch: Dispatch) => {

        try {
            dispatch({type: FETCH_LIKES_REQUEST})

            const response = await fetch (`https://tier2.azurewebsites.net/Comment/${commentId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json", 
                }
            })
            if (!response.ok) {
                console.error("Error fetching likes", response.statusText);
                return ; 
            } 

            const likes = await response.json();
            dispatch({type: FETCH_LIKES_SUCCESS, payload: likes});
            console.log("likes:  ", likes )

            return likes;
        } catch (error) {
            console.error("Error: ", error );
            return; 
            
        };
        

    }
 
