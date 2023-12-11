import {
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_REQUEST,
} from "../constants/comments";

const initialState = {
  comments: [],
  loading: false,
};

const commentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_COMMENTS_REQUEST:
      return {
        ...state,
        comments: [],
        loading: true,
      };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default commentReducer;
