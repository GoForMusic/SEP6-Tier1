import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
} from "../constants/movies";

const initialState = {
  id: null,
  title: null,
  year: null,
};

const movieIdReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        id: action.payload,
        title: action.payload,
        year: action.payload,
      };

    case FETCH_MOVIES_REQUEST:
      return {
        ...state,
        id: null,
        title: null,
        year: null,
      };
    default:
      return state;
  }
};

export default movieIdReducer;
