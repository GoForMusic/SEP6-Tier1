
import { USER_REGISTER_REQ, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS } from '../constants/userRegister'
import { Dispatch } from "redux";



export const registerAccount = (username: String, password: string) => 
    async (dispatch : Dispatch) => {

        try {

          dispatch({
            type: USER_REGISTER_REQ
          });

            const response = await fetch("https://tier2.azurewebsites.net/account", {
                mode: 'cors',
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username, password})
              
            });

            if (!response.ok) {
              throw new Error("Error message");
            }

            const data = await response.json();
            console.log(response.json);
            

            dispatch({
              type: USER_REGISTER_SUCCESS,
              payload: data
            })
           // const message = data.message;

            } catch (error: any) {
              

              dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                  error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
              })
              
              

        }

};

export const setError = (error : String) => 
async (dispatch : Dispatch) => {
  dispatch({
    type: USER_REGISTER_FAIL,
    payload: error
  });
};

