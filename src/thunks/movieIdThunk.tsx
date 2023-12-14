import { Dispatch } from "redux";

import { FETCH_MOVIES_REQ,
    FETCH_MOVIES_SUCCESS,
} from '../constants/movies'



export const fetchFromOurDb = (movieId: any) => async (dispatch: Dispatch) => {

    try{

        dispatch({type: FETCH_MOVIES_REQ})

        console.log("fisrtsssssss");

        

        const movieDetails = await fetch(`https://tier2.azurewebsites.net/movie/${movieId}`, {
            
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
            }
          })

          if(!movieDetails.ok) {
            console.error('Error fetching comments:', movieDetails.statusText);
        return [];
          }
          console.log("heeeeeeeeeereeeeeeeee");
      
      const movies = await movieDetails.json();
      console.log("testing the thunk rerefefefe");
      
      dispatch({type: FETCH_MOVIES_SUCCESS, payload: movies});
      console.log("moviesss", movies);
      
      return movies;
    } catch (error) {
      // Handle other errors if needed
      console.error('Error:', error);
      return [];
    }
        
    }
  