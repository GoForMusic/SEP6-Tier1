import { GOOGLE_REGISTER_SUCCESS, GOOGLE_REGISTER_FAIL, GOOGLE_REGISTER_REQ } from '../constants/userRegister'
import { Dispatch } from "redux";

export const registerWithGoogle = (email: String, password: string) => 
  async (dispatch : Dispatch) => {

    try {
        dispatch({
            type: GOOGLE_REGISTER_REQ
        });

        const response = await fetch("https://tier2.azurewebsites.net/account", {
                mode: 'cors',
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username: email.split('@')[0], password})
              
            });

            const data = await response.json();

            dispatch({
                type: GOOGLE_REGISTER_SUCCESS,
                payload: data
            })

    } catch (error:any) {
        dispatch({
            type: GOOGLE_REGISTER_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });

    }
  }

  export const setErrorGoogle = (error : String) => 
async (dispatch : Dispatch) => {
  dispatch({
    type: GOOGLE_REGISTER_FAIL,
    payload: error
  });
};
