import { GOOGLE_REGISTER_SUCCESS, GOOGLE_REGISTER_FAIL, GOOGLE_REGISTER_REQ } from '../constants/userRegister'
import { Dispatch } from "redux";
import type { RootState, AppDispatch } from '../store'
import { response } from 'express';



export const registerWithGoogle = (email: any, password: any) => 


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
                // body: JSON.stringify("")
              
                

            });


            console.log(response.body);
          
            

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
