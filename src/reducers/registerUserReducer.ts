import { HTTP_REQ_SUCCESS, HTTP_REQ_FAILED } from "../constants/helloWorld";

const initialState = {
  user: null,
  error: null,
};

const registerUserReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case HTTP_REQ_SUCCESS:
      return { ...state, user: action.payload };
    case HTTP_REQ_FAILED:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default registerUserReducer;
