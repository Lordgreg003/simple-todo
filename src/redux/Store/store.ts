import { applyMiddleware, combineReducers, createStore, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkAction } from "redux-thunk";
import { initialState as initialStateReducer } from "../Initial-State/initialState";

import { registerUserReducer, loginReducer } from "../Reducers/AuthReducers";
import { ReduxResponseType } from "../Types/todoTypes";
import { LOGIN_SESSION } from "../../extrastorage/storageStore";

// Define Redux state types
export interface RootState {
  registerUser: ReduxResponseType;
  loginuser: ReduxResponseType;
}

export type ReducersType = {
  registerUser: ReduxResponseType;
  loginUser: ReduxResponseType;
};

// Combine the reducers
const reducer = combineReducers<ReducersType>({
  registerUser: registerUserReducer,
  loginUser: loginReducer,
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

const initialState: any = {
  loginUser:
    typeof window !== "undefined" && localStorage.getItem(LOGIN_SESSION)
      ? JSON.parse(localStorage.getItem(LOGIN_SESSION) as any)
      : initialStateReducer,
};
// Create the store with middleware and Redux DevTools
export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
