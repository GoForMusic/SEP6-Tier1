import { Dispatch } from "redux";
import {
  FILTER_BY_DIRECTOR,
  FILTER_BY_GENRE,
  FILTER_BY_RATE,
  FILTER_BY_YEAR,
  FILTER_FAILED,
} from "../constants/movies";
import fetchJsonp from "../HelperFunctions/fetchJsonp";
import { MovieData } from "../Interfaces/MovieData";

///api url wrapped within constant - bcs it is the same for all req and used in many places.

const API_BASE_URL = "https://tier2.azurewebsites.net";
const TMDB_BASE_URL = "https://api.themoviedb.org";
const TMDB_apiKey = process.env.REACT_APP_TMDB_API_KEY;

//##########################################################################################
//ABSTRACT LOGIC FOR CODE REUSABILITY: (this piece is always used with each request,
//        since we have many same kind of requests, there was a need to create such function
//          so that the code would be reused. It also makes it more simple to read)

async function fetchFromAPI1(endpoint: string, method: string = "GET") {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    mode: "cors",
    method: method,
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
}

async function fetchFromAPI2_Details(movieId: string): Promise<MovieData> {
  const url = `${TMDB_BASE_URL}/3/movie/${movieId}?api_key=${TMDB_apiKey}`;
  try {
    const response = await fetchJsonp(url, "callbackFunctionName");
    return response as MovieData; // Type assertion to MovieData
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//##########################################################################################
//                                       GENRE
//##########################################################################################

export const filterByGenre = (genre: string) => async (dispatch: Dispatch) => {
  try {
    const filteredData = await fetchFromAPI1(`/filterByGenre`, "POST"); // Assuming POST request doesn't need body here
    dispatch({ type: FILTER_BY_GENRE, payload: filteredData });
  } catch (error) {
    dispatch({
      type: FILTER_FAILED,
      payload: `Error occurred: ${error.message}`,
    });
  }
};

//##########################################################################################
//                                       RATE
//##########################################################################################

export const filterByRate = (rate: string) => async (dispatch: Dispatch) => {
  try {
    const filteredData = await fetchFromAPI1(`/movies/rating/${rate}`);
    dispatch({ type: FILTER_BY_RATE, payload: filteredData });
  } catch (error) {
    dispatch({
      type: FILTER_FAILED,
      payload: `Error occurred: ${error.message}`,
    });
  }
};

//##########################################################################################
//                                       DIRECTOR
//##########################################################################################

export const filterByDirector = //// SEARH BY DIRECTOR NOT FILTER
  (name: string) => async (dispatch: Dispatch) => {
    try {
      const filteredData = await fetchFromAPI1(`/directors/search/${name}`);
      dispatch({ type: FILTER_BY_DIRECTOR, payload: filteredData });
    } catch (error) {
      dispatch({
        type: FILTER_FAILED,
        payload: `Error occurred: ${error.message}`,
      });
    }
  };

//##########################################################################################
//                                       YEAR
//##########################################################################################

export const filterByYear =
  (year: string, pageNr: number) => async (dispatch: Dispatch) => {
    try {
      
      const filteredData = await fetchFromAPI1(
        `/movies/year/${year}?pageNumber=${pageNr}`
      );
      for (const movie of filteredData) {
        try {
          let goodString = movie.id.toString().padStart(7, "0");
          const movieData = await fetchFromAPI2_Details(`tt${goodString}`);
          //unfortunately have to handle poster logic here
          movie.poster = movieData.poster_path
            ? `https://image.tmdb.org/t/p/original/${movieData.poster_path}`
            : "https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg";
        } catch (error) {
          console.error(
            `Error fetching details for movie ID ${movie.id}:`,
            error,
            (movie.poster =
              "https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg")
          );
        }
      }
      dispatch({ type: FILTER_BY_YEAR, payload: filteredData });
    } catch (error) {
      dispatch({
        type: FILTER_FAILED,
        payload: `Error occurred: ${error.message}`,
      });
    }
  };
