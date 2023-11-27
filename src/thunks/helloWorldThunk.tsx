import {
    HTTP_REQ_SUCCESS,
    HTTP_REQ_FAILED
} from '../constants/helloWorld'
import { Dispatch } from "redux";


export const helloWorld = () =>
  async (dispatch : Dispatch) => {

    try {
      const response = await fetch("https://tier2.azurewebsites.net/HelloWorld", {
        mode: 'cors', // server address + port and route
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      const data = await response.json();
      const message = data.message ;

      console.log(data);
      

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