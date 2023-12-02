import {
  FILTER_BY_GENRE_REQ,
  FILTER_BY_GENRE_SUCCESS,
  FILTER_BY_GENRE_FAILED,
} from "../constants/filter";

const initialState = {
  movies: [],
  loading: false,
  error: null,
};

const filterGenreReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FILTER_BY_GENRE_REQ:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FILTER_BY_GENRE_SUCCESS:
      return {
        ...state,
        movies: action.payload, // Assuming action.payload is an array of movies
        loading: false,
        error: null,
      };
    case FILTER_BY_GENRE_FAILED:
      return {
        ...state,
        movies: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default filterGenreReducer;
