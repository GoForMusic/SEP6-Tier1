import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';

import {
        FILTER_BY_DIRECTOR_REQ,
        FILTER_BY_DIRECTOR_SUCCESS,
        FILTER_BY_DIRECTOR_FAILED,
} from '../constants/filter'


export const filterByDirector = (name: any) =>
    async (dispatch : Dispatch) => {

        dispatch({
            type: FILTER_BY_DIRECTOR_REQ,
        });

        try {

            const apiURL = `https://tier2.azurewebsites.net/directors/search/${name}`;

            console.log("thats before the api call");
            console.log('API URL: ', apiURL);

            const response = await fetch(apiURL, {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'}
            });

            if (response.ok) {
                const filteredData = await response.json();

                dispatch({
                    type: FILTER_BY_DIRECTOR_SUCCESS,
                    payload: filteredData,
                });
                
                console.log("filtered directors from thunk: ", filteredData);
                
            }

            else {
            console.log("API Error", response.statusText);
            
            // If the response is not successful, dispatch the failure action with an error message
            dispatch({
              type: FILTER_BY_DIRECTOR_FAILED,
              payload: `Error: ${response.statusText}`,
            });
          }
      
          }  catch (error) {
            console.log("error in the final dispatch in the director thunk", error.message);
            
            // Dispatch failure action if an error occurs
            dispatch({
                type: FILTER_BY_DIRECTOR_FAILED,
                payload: `Error occurred in director: ${error.message}`,
            });
          }
        } 

    