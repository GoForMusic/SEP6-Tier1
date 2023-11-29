// import { ThunkAction } from "redux-thunk";
import { Dispatch } from "redux";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQ,
//   USER_LOGOUT,
  USER_LOGIN_FAIL,

} from "../constants/userLogin";
// import { RootState } from "../store";

export const login = ( username: String, password: String) =>
  async (dispatch : Dispatch) => {
    try {
      
      dispatch({
        type: USER_LOGIN_REQ,
      });

      const response = await fetch("https://tier2.azurewebsites.net/login", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // credentials: "include",
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      const userData = { userId: data.userId, username: data.username };

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: userData,
      });

      // localStorage.setItem("userInfo", JSON.stringify(userData));
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

//   export const setError = (error : String)  =>
//   async (dispatch : Dispatch) => {
//       dispatch({
//         type: USER_LOGIN_FAIL,
//         payload: error
//       });
//   };

// For later : need to see how we implement logout from the tier2

//   export const logout =
//     (): ThunkAction<void, RootState, unknown, Action<string>> =>
//     async (dispatch, getState) => {
//       const token: any = getState().loginUserReducer?.token;
//       localStorage.removeItem("userInfo");
//       dispatch({ type: USER_LOGOUT });

//       await fetch(
//         `http://localhost:9090/logout?token=${encodeURIComponent(token)}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     };