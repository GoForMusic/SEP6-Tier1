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

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        // Handle non-JSON responses
        throw new Error("Response is not in JSON format");
      }

      // const data = await response.json();
      // const userData = { userId: data.userId, username: data.username };

      if (response.ok) {
        // username because from backend we dont get any token.
        localStorage.setItem("username", username);
        localStorage.setItem("logged", JSON.stringify(true));
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: username,
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
    localStorage.removeItem("username");
    localStorage.removeItem("logged");
    dispatch({ type: USER_LOGOUT });
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
