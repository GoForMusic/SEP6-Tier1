import {
  FILTER_BY_DIRECTOR_REQ,
  FILTER_BY_DIRECTOR_SUCCESS,
  FILTER_BY_DIRECTOR_FAILED,
} from "../constants/filter";

const initialState = {
  movies: [],
  names: [],
  error: null,
};

const filterByDirectorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FILTER_BY_DIRECTOR_REQ:
      return {
        ...state,
        movies: [
          {
            movie_id: null,
            title: null,
            year: null,
            person_id: null,
            id: null,
            name: null,
            birthYear: null,
          },
        ],
        names: [],
        error: action.payload,
      };

    case FILTER_BY_DIRECTOR_SUCCESS:
      return {
        ...state,
        movies: action.payload,
        names: action.payload,
        error: action.payload,
      };
    case FILTER_BY_DIRECTOR_FAILED:
      return {
        ...state,
        movies: [
          {
            movie_id: null,
            title: null,
            year: null,
            person_id: null,
            id: null,
            name: null,
            birthYear: null,
          },
        ],
        names: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default filterByDirectorReducer;
