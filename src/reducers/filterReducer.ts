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
  id: null,
  title: null,
  year: null,
  error: null,
};

const filterReducer = (state = initialState, action: any) => {
  switch (action.type) {
   
    case FILTER_BY_YEAR:
      return {
        ...state,
        movies: action.payload,
        id: null,
        title: null,
        year: null,
        error: null,
      };

      case FILTER_BY_DIRECTOR:
      return {
        ...state,
        movies: action.payload,
        names: action.payload,
        error: null,
      };

        case FILTER_BY_RATE:
      return {
        ...state,
        movies: action.payload,
        rate: action.payload,
        error: null,
      };

    case FILTER_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
