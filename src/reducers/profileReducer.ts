import {
  CHANGE_PASSWORD_REQ,
  CHANGE_PASSWORD_SUCCESS,
} from "../constants/profile";

const initialState = {
  password: null,
  error: null,
};

const changeProfileData = (state = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQ:
      return {
        ...state,
        password: action.payload,
        error: action.payload,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        password: action.payload,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default changeProfileData;
