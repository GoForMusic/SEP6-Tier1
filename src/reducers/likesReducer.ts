import {
  FETCH_LIKES_REQUEST,
  FETCH_LIKES_SUCCESS,
  POST_LIKES_SUCCESS,
  POST_LIKES_REQUEST,
} from "../constants/likes";

const initailState = {
  likes: null,
  loading: false,
};

const likesReducer = (state = initailState, action: any) => {
  switch (action.type) {
    case FETCH_LIKES_REQUEST:
      return {
        ...state,
        likes: null,
        loading: true,
      };
    case FETCH_LIKES_SUCCESS:
      return {
        ...state,
        likes: action.payload,
        loading: false,
      };
    case POST_LIKES_REQUEST:
      return {
        ...state,
        likes: action.payload,
        loading: false,
      };
    case POST_LIKES_SUCCESS:
      return {
        ...state,
        likes: null,
        loading: true,
      };
    default:
      return state;
  }
};

export default likesReducer;
