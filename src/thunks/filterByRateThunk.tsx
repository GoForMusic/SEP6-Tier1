// yourThunkFile.js
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { FILTER_BY_RATE_REQ,
         FILTER_BY_RATE_FAILED,
         FILTER_BY_GENRE_REQ,
         FILTER_BY_GENRE_FAILED,
         FILTER_BY_DIRECTOR_REQ,
         FILTER_BY_DIRECTOR_FAILED} from '../constants/filter'; 



export const filterByRate = (rate: String) => 
    async (dispatch : Dispatch) => {

  try {

    // dispatch({
    //     type: FILTER_BY_RATE_REQ
    // });
    
    const response = await fetch('https://tier2.azurewebsites.net/filterByRate', {
        mode: 'cors',
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'}
    });

      const filteredData = await response.json();
      const message = filteredData.message;

      dispatch({
        type: FILTER_BY_RATE_REQ, 
        payload: message, 
     });
   
  } catch (error) {
    // Dispatch failure action if an error occurs
    dispatch({
        type: FILTER_BY_RATE_FAILED,
        payload: "Error occured "
    });
  }
};


export const filterByGenre = (genre: String) => 
    async (dispatch : Dispatch) => {

        try {
            const response = await fetch('https://tier2.azurewebsites.net/filterByGenre', {
                mode: 'cors',
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'}
            });
        
              const filteredData = await response.json();
              const message = filteredData.message;
        
              dispatch({
                type: FILTER_BY_GENRE_REQ, 
                payload: message, 
             });
           
          } catch (error) {
            // Dispatch failure action if an error occurs
            dispatch({
                type: FILTER_BY_GENRE_FAILED,
                payload: "Error occured "
            });
          }
        };
        




export const filterByDirector = (director: String) => 
    async (dispatch : Dispatch) => {

        try {
            const response = await fetch('https://tier2.azurewebsites.net/filterByDirector', {
                mode: 'cors',
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'}
            });
        
              const filteredData = await response.json();
              const message = filteredData.message;
        
              dispatch({
                type: FILTER_BY_DIRECTOR_REQ, 
                payload: message, 
             });
           
          } catch (error) {
            // Dispatch failure action if an error occurs
            dispatch({
                type: FILTER_BY_DIRECTOR_FAILED,
                payload: "Error occured "
            });
          }
        };
        





    


    
