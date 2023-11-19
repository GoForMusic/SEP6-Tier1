//import {useState} from "react"
import { useSelector, useDispatch } from "react-redux";
import { helloWorld } from "../thunks/helloWorldThunk";
import { AppDispatch } from "../store";

const HelloWorldScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: any) => state.helloWorldReducer);
  const message = state.message;

  dispatch(helloWorld());

  return message ? (
    <h1>Welcome, your message is: {message}</h1>
  ) : (
    <h1>You have no message, check backEnd!</h1>
  );
};

export default HelloWorldScreen;
