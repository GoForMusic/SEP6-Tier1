import {
  FILTER_BY_YEAR_SUCCESS,
  FILTER_BY_YEAR_FAILED,
  FILTER_BY_YEAR_REQ,
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
    case FILTER_BY_YEAR_REQ:
      return {
        ...state,
        movies: [
          {
            id: null,
            title: null,
            year: null,
          },
        ],

        error: action.payload,
      };
    case FILTER_BY_YEAR_SUCCESS:
      return {
        ...state,
        movies: action.payload,
        id: null,
        title: null,
        year: null,
        error: action.payload,
      };
    case FILTER_BY_YEAR_FAILED:
      return {
        ...state,
        movies: null,
        id: null,
        title: null,
        year: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
