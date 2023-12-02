import { ThunkAction } from "redux-thunk";
import { Dispatch } from "redux";
import {
  FILTER_BY_GENRE_REQ,
  FILTER_BY_GENRE_SUCCESS,
  FILTER_BY_GENRE_FAILED,
} from "../constants/filter";


export const filterByGenre = (genre: any) =>
    async (dispatch : Dispatch) => {

        try {
            const response = await fetch('https://tier2.azurewebsites.net/filterByGenre', {
                mode: 'cors',
                method: 'POST',
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
