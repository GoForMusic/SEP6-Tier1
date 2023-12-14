import { Dispatch } from "redux";
import {
  FETCH_MOVIES_REQ,
  FILTER_BY_DIRECTOR,
  FILTER_BY_RATE,
  FILTER_BY_YEAR,
  REQ_FAILED,
  GET_WATCHLIST,
  SEARCH_MOVIES_RESPONSE,
} from "../constants/movies";
import { fetchFromAzure, fetchFromTMDB_api } from "../HelperFunctions/fetchApi";
import {
  getFromWatchlist,
  fetchMovieDetails_ForWatchlist,
} from "../Service/WatchList";

//##########################################################################################
//                         GENRE - RIP, WAS A GOOD INTENTION ANYWAYS
//##########################################################################################

// export const filterByGenre = (genre: string) => async (dispatch: Dispatch) => {
//   try {
//     const filteredData = await fetchFromAzure(`/filterByGenre`, "POST"); // Assuming POST request doesn't need body here
//     dispatch({ type: FILTER_BY_GENRE, payload: filteredData });
//   } catch (error) {
//     dispatch({
//       type: REQ_FAILED,
//       payload: `Error occurred: ${error.message}`,
//     });
//   }
// };

//##########################################################################################
//                                       RATE
//##########################################################################################

export const filterByRate =
  (rate: string, pageNr: number) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: FETCH_MOVIES_REQ });
      const endpoint = `/movies/rating/${rate}?pageNumber=${pageNr}`;
      const filteredData = await fetchFromAzure(endpoint);
      await Promise.all(filteredData.map(fetchMovieDetails));
      dispatch({ type: FILTER_BY_RATE, payload: filteredData });
    } catch (error) {
      dispatchError(dispatch, error);
    }
  };

//##########################################################################################
//                                       DIRECTOR
//##########################################################################################

export const filterByDirector = //// SEARH BY DIRECTOR NOT FILTER
  (name: string, pageNr: number) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: FETCH_MOVIES_REQ });
      const endpoint = `/directors/search/${name}?pageNumber=${pageNr}`;
      const filteredData = await fetchFromAzure(endpoint);
      await Promise.all(filteredData.map(fetchMovieDetails));
      dispatch({ type: FILTER_BY_DIRECTOR, payload: filteredData });
    } catch (error) {
      dispatchError(dispatch, error);
    }
  };

//##########################################################################################
//                                       YEAR
//##########################################################################################

export const filterByYear =
  (year: string, pageNr: number) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: FETCH_MOVIES_REQ });
      const endpoint = `/movies/year/${year}?pageNumber=${pageNr}`;
      const filteredData = await fetchFromAzure(endpoint);
      await Promise.all(filteredData.map(fetchMovieDetails));
      dispatch({ type: FILTER_BY_YEAR, payload: filteredData });
    } catch (error) {
      dispatchError(dispatch, error);
    }
  };

//##########################################################################################
//                                       SEARCH
//##########################################################################################

export const searchByTitle = (title: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FETCH_MOVIES_REQ });
    const queryData = await fetchFromAzure(`/movies/search/${title}`);

    // Promise.all - handle multiple asynchronous calls efficiently
    await Promise.all(queryData.map(fetchMovieDetails));

    dispatch({ type: SEARCH_MOVIES_RESPONSE, payload: { queryData, title } });
  } catch (error) {
    dispatchError(dispatch, error);
  }
};

//##########################################################################################
//          Some abstract functions // I want to keep them here for now - Marty
//##########################################################################################

const fetchMovieDetails = async (movie) => {
  let goodString = movie.id.toString().padStart(7, "0");
  try {
    const movieData = await fetchFromTMDB_api(`tt${goodString}`);
    movie.poster = movieData.poster_path
      ? `https://image.tmdb.org/t/p/original/${movieData.poster_path}`
      : "https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg";
    movie.genres = movieData.genres.map((genre) => genre.name);
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movie.id}:`, error);
    movie.poster =
      "https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg";
  }
};

// Abstrct error dispatch func
const dispatchError = (dispatch, error) => {
  dispatch({
    type: REQ_FAILED,
    payload: `Error occurred: ${error.message}`,
  });
};

//##########################################################################################
//                                  WatchList
//##########################################################################################

export const fetchWatchlist = (userId) => async (dispatch) => {
  try {
    const watchlistData = await getFromWatchlist(userId);
    const moviesWithDetails = await Promise.all(
      watchlistData.map(async (entry) => {
        const details = await fetchMovieDetails_ForWatchlist(entry.movie_id.id);
        return {
          ...entry.movie_id,
          watchlistId: entry.id,
          ...details,
        };
      })
    );
    dispatch({ type: GET_WATCHLIST, payload: moviesWithDetails });
  } catch (error) {
    dispatchError(dispatch, error);
  }
};
