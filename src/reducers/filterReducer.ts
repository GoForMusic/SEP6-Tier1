import {
  FILTER_BY_GENRE_REQ,
  FILTER_BY_RATE_REQ,
  FILTER_BY_DIRECTOR_REQ,
  FILTER_BY_GENRE_FAILED,
  FILTER_BY_RATE_FAILED,
  FILTER_BY_DIRECTOR_FAILED,
} from "../constants/filter";

const initialState = {
  isFilterApplied: false,
  filterCriteria: null,
  filteredData: null,
  error: null,
};

const filterReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FILTER_BY_GENRE_REQ:
      return {
        ...state,
        isFilterApplied: true,
        filterCriteria: "genre",
        filteredData: action.payload,
        error: action.payload,
      };
    case FILTER_BY_RATE_REQ:
      return {
        ...state,
        isFilterApplied: true,
        filterCriteria: "rate",
        filteredData: action.payload,
        error: action.payload,
      };
    case FILTER_BY_DIRECTOR_REQ:
      return {
        ...state,
        isFilterApplied: true,
        filterCriteria: "director",
        filteredData: action.payload,
        error: action.payload,
      };
    case FILTER_BY_GENRE_FAILED:
      return {
        ...state,
        isFilterApplied: false,
        filterCriteria: "genre",
        filteredData: null,
        error: action.payload,
      };
    case FILTER_BY_RATE_FAILED:
      return {
        ...state,
        isFilterApplied: false,
        filterCriteria: "rate",
        filteredData: null,
        error: action.payload,
      };
    case FILTER_BY_DIRECTOR_FAILED:
      return {
        ...state,
        isFilterApplied: false,
        filterCriteria: "director",
        filteredData: null,
        error: action.payload,
      };
  }
};

export default filterReducer;
