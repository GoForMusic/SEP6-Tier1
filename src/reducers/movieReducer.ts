import {
    FILTER_BY_YEAR,
    FILTER_BY_DIRECTOR,
    FILTER_BY_RATE,
    FILTER_FAILED,
    FILTER_REQ,
    FILTER_BY_GENRE,
  
  } from "../constants/filter";
  
  const initialState = {
    movies: [],
    loading: false, // for spinner, when fetching movies
    page: 0 // for pagination to track what is the current page.
  };
  
  const movieReducer = (state = initialState, action: any) => {
    switch (action.type) {

      // case PAGINATION:
      //   return {
      //     ...state,
      //     page: action.payload
      //   };

      case FILTER_REQ:
        return {
          ...state,
          loading: true,
        };
    
      case FILTER_BY_YEAR:
        return {
          ...state,
          movies: action.payload,
          loading: false,
          error: null,
        };
  
        case FILTER_BY_DIRECTOR:
        return {
          ...state,
          movies: action.payload,
          loading: false,
          error: null,
        };
  
          case FILTER_BY_RATE:
        return {
          ...state,
          movies: action.payload,
          loading: false,
          error: null,
        };
  
      case FILTER_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default movieReducer;
  