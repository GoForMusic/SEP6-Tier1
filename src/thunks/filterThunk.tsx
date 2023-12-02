// yourThunkFile.js
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import {
         FILTER_BY_YEAR_REQ,
         FILTER_BY_YEAR_FAILED,
         FILTER_BY_YEAR_SUCCESS,
         } from '../constants/filter'; 




export const filterByYear = (year: any) => 
  async(dispatch : Dispatch) => {

    dispatch({
      type: FILTER_BY_YEAR_REQ, 
      
   });

    try {

      const apiUrl = `https://tier2.azurewebsites.net/movies/year/${year}`;

      console.log("thats before the api call");
      console.log('API URL: ', apiUrl);
      
      const response = await fetch(`https://tier2.azurewebsites.net/movies/year/${year}`, {
        mode: 'cors',
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'}
    });

    if (response.ok) {
      // Parse the response JSON
      const filteredData = await response.json()
      // const moviesList = filteredData.data;
      dispatch({
        type: FILTER_BY_YEAR_SUCCESS,
        payload: filteredData,
      });
      console.log("filtered data from the THUNK: ", filteredData);
      
     

    } else {
      console.log("API Error", response.statusText);
      
      // If the response is not successful, dispatch the failure action with an error message
      dispatch({
        type: FILTER_BY_YEAR_FAILED,
        payload: `Error: ${response.statusText}`,
      });
    }

    }  catch (error) {
      console.log("error in the final dispatch in the thunk", error.message);
      
      // Dispatch failure action if an error occurs
      dispatch({
          type: FILTER_BY_YEAR_FAILED,
          payload: `Error occurred: ${error.message}`,
      });
    }
  }




    


    
