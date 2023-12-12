import {
    USER_LOGIN_REQ,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_LOGOUT_FAIL,
  } from '../constants/userLogin';
  
  const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem("logged")) || false, // DONT CHANGE!
    userId: localStorage.getItem('username') || null, // DONT CHANGE!
    error: null,
  };
  
  const userLoginReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case USER_LOGIN_REQ:
        return { ...state };
      case USER_LOGIN_SUCCESS:
        return { ...state, isLoggedIn: true, userId: action.payload}; // DONT CHANGE! because the above variables is just for persistance upon refresh
      case USER_LOGIN_FAIL:
        return { ...state, error: action.payload };
      case USER_LOGOUT_FAIL:
        return { ...state, error: action.payload };
      case USER_LOGOUT:
        return { ...initialState, isLoggedIn: false,  userId: null}; // DONT CHANGE! leave these because the above variables is just for persistance upon refresh
      default:
        return state;
    }
  }
      
  export default userLoginReducer;