import {
    HTTP_REQ_SUCCESS,
    HTTP_REQ_FAILED
} from '../constants/helloWorld'
import { Dispatch } from "redux";


export const helloWorld = () =>
  async (dispatch : Dispatch) => {

    try {
      const response = await fetch("http://", { // server address + port and route
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });

      const data = await response.json();
      const message = { message: data };

      dispatch({
        type: HTTP_REQ_SUCCESS,
        payload: message,
      });

    } catch (error: any) {
      dispatch({
        type: HTTP_REQ_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };