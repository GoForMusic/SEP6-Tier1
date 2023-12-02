import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { helloWorldReducer, loginUserReducer,
         registerUserReducer, filterReducer, 
         filterByDirector} from "./reducers";

const reducers = combineReducers({
  helloWorldReducer, registerUserReducer, loginUserReducer, filterReducer, filterByDirector,
});


const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
