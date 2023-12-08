import {
    FILTER_BY_YEAR,
    FILTER_BY_DIRECTOR,
    FILTER_BY_RATE,
    FILTER_FAILED,
    FETCH_MOVIES_REQ,
    FILTER_BY_GENRE,
    PREV_PAGE, 
    NEXT_PAGE
  
  } from "../constants/movies";
  
  const initialState = {
    movies: [],
    loading: false, // for spinner, when fetching movies
    page: 1 // for pagination to track what is the current page.
  };
  
  const movieReducer = (state = initialState, action: any) => {
    switch (action.type) {

      // case PAGINATION:
      //   return {
      //     ...state,
      //     page: action.payload
      //   };

      case FETCH_MOVIES_REQ: // LOADER AND ETC
        return {
          ...state,
          movies: [],
          loading: true,
        };
      case PREV_PAGE:
      return {
        ...state,
        page: Math.max(1, state.page - 1),
      };
      case NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
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
  