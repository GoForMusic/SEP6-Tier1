import {
  FILTER_BY_RATE_REQ,
  FILTER_BY_RATE_SUCCESS,
  FILTER_BY_RATE_FAILED,
} from "../constants/filter";

const initialState = {
  movies: [],
  names: [],
  error: null,
  loading: null,
};

const filterByRateReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FILTER_BY_RATE_REQ:
      return { ...state, loading: true };
    case FILTER_BY_RATE_SUCCESS:
      return {
        ...state,
        movies: action.payload,
        rate: action.payload,
        error: action.payload,
      };
    case FILTER_BY_RATE_FAILED:
      return { ...state, movies: null };
    default:
      return state;
  }
};

export default filterByRateReducer;
