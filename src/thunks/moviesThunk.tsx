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
import { fetchFromAzure, fetchMovieDetails } from "../HelperFunctions/fetchApi";
import {
  getFromWatchlist,
  fetchMovieDetails_ForWatchlist,
} from "../Service/WatchList";

//##########################################################################################
//                                       RATE
//##########################################################################################

export const filterByRate =
  (rate: string, pageNr: number) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: FETCH_MOVIES_REQ });
      const endpoint = `/movies/rating/${rate}?pageNumber=${pageNr}`;
      const filteredData = await fetchFromAzure(endpoint);

      // Map over filteredData to create new structure
      const updatedMovies = await Promise.all(
        filteredData.map(async (movie) => {
          // DOING DESTRUCTURING HERE BECAUSE APPARENTLY TIER2 DECIDED TO SEND
          //  US OBJECTS WITH DIFFERENT STRUCTURES ON EVERY FILTER/SEARCH REQUEST
          //SO this is workaround
          const details = await fetchMovieDetails(movie.movie_id);
          return {
            ...details,
            ratingValue: movie.ratingValue,
            votes: movie.votes,
          };
        })
      );

      dispatch({ type: FILTER_BY_RATE, payload: updatedMovies });
    } catch (error) {
      dispatchError(dispatch, error);
    }
  };
//##########################################################################################
//                                       DIRECTOR
//##########################################################################################

export const filterByDirector =
  (name: string, pageNr: number) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: FETCH_MOVIES_REQ });
      const endpoint = `/directors/search/${name}?pageNumber=${pageNr}`;
      const filteredData = await fetchFromAzure(endpoint);

      // Update each movie with details
      const updatedMovies = await Promise.all(
        filteredData.map(async (movie) => {
          // DOING DESTRUCTURING HERE BECAUSE APPARENTLY TIER2 DECIDED TO SEND
          //  US OBJECTS WITH DIFFERENT STRUCTURES ON EVERY FILTER/SEARCH REQUEST
          //SO this is workaround
          const details = await fetchMovieDetails(movie.movie_id);
          return {
            ...details,
            ratingValue: movie.ratingValue,
            votes: movie.votes,
          };
        })
      );

      dispatch({ type: FILTER_BY_DIRECTOR, payload: updatedMovies });
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

      // Map over filteredData, update each movie with details
      const updatedMovies = await Promise.all(
        filteredData.map(async (movie) => await fetchMovieDetails(movie))
      );

      dispatch({ type: FILTER_BY_YEAR, payload: updatedMovies });
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

    // Fetch and update each movie with additional details
    const enrichedQueryData = await Promise.all(
      queryData.map(async (movie) => await fetchMovieDetails(movie))
    );

    // Dispatch the response with the enriched movie data
    dispatch({
      type: SEARCH_MOVIES_RESPONSE,
      payload: { queryData: enrichedQueryData, title },
    });
  } catch (error) {
    dispatchError(dispatch, error);
  }
};
//##########################################################################################
//          Some abstract functions // I want to keep them here for now - Marty
//##########################################################################################

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
