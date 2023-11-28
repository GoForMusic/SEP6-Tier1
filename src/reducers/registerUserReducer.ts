import {
  USER_REGISTER_REQ,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userRegister";

const initialState = {
  isRegistered: false,
  userData: null,
  error: null,
};

const registerUserRecuder = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_REGISTER_REQ:
      return { ...state, isRegistered: false, error: action.payload };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        isRegistered: true,
        userData: action.payload,
        error: null,
      };
    case USER_REGISTER_FAIL:
      return { ...state, isRegistered: false, error: action.payload };
    default:
      return state;
  }
};

export default registerUserRecuder;
