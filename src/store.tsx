import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import helloWorldReducer from "./reducers/helloWorldReducer";
import registerUserReducer from "./reducers/registerUserReducer";

const reducers = combineReducers({
  helloWorldReducer, registerUserReducer
});


const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
