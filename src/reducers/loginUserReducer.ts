import {
    USER_LOGIN_REQ,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
  } from '../constants/userLogin';
  
  const initialState = {
    isLoggedIn: false,
    userData: null,
    // token: null,
    userId: null,
    error: null,
  };
  
  const userLoginReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case USER_LOGIN_REQ:
        return { ...state, isLoggedIn: false, error: null };
      case USER_LOGIN_SUCCESS:
        return { ...state, isLoggedIn: true, userData: action.payload, userId: action.payload.userId, error: null };
      case USER_LOGIN_FAIL:
        return { ...state, isLoggedIn: false, error: action.payload };
      case USER_LOGOUT:
        return { ...initialState };
      default:
        return state;
    }
  }
      
  export default userLoginReducer;