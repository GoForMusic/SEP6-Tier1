// import { ThunkAction } from "redux-thunk";
import { Dispatch } from "redux";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQ,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOGOUT_FAIL,
} from "../constants/userLogin";

export const login =
  (username: string, password: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQ,
      });

      const response = await fetch(
        "https://tier2.azurewebsites.net/account/login",
        {
          mode: "cors",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // credentials: "include",
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();
      const userData = { userId: data.id, username: data.userName };

      if (response.ok) {
        // username because from backend we dont get any token.
        localStorage.setItem("username", userData.username);
        localStorage.setItem("userId", userData.userId);
        localStorage.setItem("logged", JSON.stringify(true));
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: userData,
        });
      } else {
        // Handle non-successful responses
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error: any) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = (username: string) => async (dispatch: Dispatch) => {
  try {
    if (username === localStorage.getItem("username")) {
      localStorage.clear(); // clear all
      dispatch({ type: USER_LOGOUT });
    } else {
      throw new Error(`User is not logged in!`);
    }
  } catch (error: any) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
