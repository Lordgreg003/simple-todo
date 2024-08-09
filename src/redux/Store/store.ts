import { applyMiddleware, combineReducers, createStore, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkAction } from "redux-thunk";

import {
  registerUserReducer,
  loginUserReducer,
} from "../Reducers/AuthReducers";
import { ReduxResponseType } from "../Types/todoTypes";

// Define Redux state types
export interface RootState {
  registerUser: ReduxResponseType;
  loginUser: ReduxResponseType;
}

export type ReducersType = {
  registerUser: ReduxResponseType;
  loginUser: ReduxResponseType;
};

// Combine the reducers
const reducer = combineReducers<ReducersType>({
  registerUser: registerUserReducer,
  loginUser: loginUserReducer,
});

// Define Thunk result type
export type ThunkResult<R> = ThunkAction<
  R,
  RootState,
  undefined,
  Action<string>
>;

// Apply middleware
const middleware = [thunk];

// Create the store with middleware and Redux DevTools
export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
