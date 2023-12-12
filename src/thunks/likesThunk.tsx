import { Dispatch } from "redux";
import { FETCH_LIKES_REQUEST,
         FETCH_LIKES_SUCCESS,
         POST_LIKES_SUCCESS,
         POST_LIKES_REQUEST,
        } from '../constants/likes'

    

    export const addLike = (commentId: string, userId: string ) => async (dispatch: Dispatch) => {
        

        try{
            dispatch({ type : POST_LIKES_REQUEST})

            const requestBody = {
                
                commentId: commentId,
                userId: userId,
            }


           // const likeRequest = await fetch ()

        } catch {

        }
    }
 
