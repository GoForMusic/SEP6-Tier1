import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';


import {
    FILTER_BY_RATE_REQ,
    FILTER_BY_RATE_SUCCESS,
    FILTER_BY_RATE_FAILED,
}  from '../constants/filter';



export const filterByRate = (rate: any) => 
    async (dispatch : Dispatch) => {

        dispatch({
            type: FILTER_BY_RATE_REQ
        });

        try {

            const apiUrl = `https://tier2.azurewebsites.net/movies/rating/${rate}`;

            console.log("API URL: ", apiUrl);
            
            const response = await fetch (apiUrl, {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'}
            });

            if (response.ok) {
                
                const filteredData = await response.json()
                
                dispatch({
                    type: FILTER_BY_RATE_SUCCESS,
                    payload: filteredData,
                });

                console.log("filtered data from rate thuunk: ", filteredData);
                
        } else {
            console.log("API Error", response.statusText);
            
            // If the response is not successful, dispatch the failure action with an error message
            dispatch({
              type: FILTER_BY_RATE_FAILED,
              payload: `Error: ${response.statusText}`,
            });
          }
      
          }  catch (error) {
            console.log("error in the final dispatch in the rate thunk", error.message);
            
            // Dispatch failure action if an error occurs
            dispatch({
                type: FILTER_BY_RATE_FAILED,
                payload: `Error occurred: ${error.message}`,
            });
          }

    }