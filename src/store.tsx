import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  helloWorldReducer,
  loginUserReducer,
  registerUserReducer,
  authReducer,
  movieReducer,
  commentReducer,
} from "./reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  helloWorldReducer,
  registerUserReducer,
  loginUserReducer,
  movieReducer,
  commentReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
