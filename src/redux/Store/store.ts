import { applyMiddleware, combineReducers, createStore, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkAction } from "redux-thunk";
import { initialState as initialStateReducer } from "../Initial-State/initialState";
import {
  AdminGetAllTodoReducer,
  AdminDeleteTodoReducer,
  AdminGetTodoByIdReducer,
  AdminUpdateTodoReducer,
} from "../Reducers/admin/AdmintodoReducer";
import { adminGetUsersReducer } from "../Reducers/admin/AdminuserReducer";
import { registerUserReducer, loginReducer } from "../Reducers/AuthReducers";
import { ReduxResponseType } from "../Types/todoTypes";
import { LOGIN_SESSION } from "../../extrastorage/storageStore";

// Define Redux state types
export interface RootState {
  // auth state
  registerUser: ReduxResponseType;
  loginuser: ReduxResponseType;

  // Admin todo state
  adminGetAllTodo: ReduxResponseType;
  adminDeleteTodo: ReduxResponseType;
  adminGetByIdTodo: ReduxResponseType;
  adminUpdateTodo: ReduxResponseType;

  // admin users state
  adminGetAllusers: ReduxResponseType;
  adminDeleteuser: ReduxResponseType;
  adminGetByIduser: ReduxResponseType;
  adminUpdateuser: ReduxResponseType;
}

export type ReducersType = {
  // auth
  registerUser: ReduxResponseType;
  loginUser: ReduxResponseType;

  // Admin
  adminGetAllTodo: ReduxResponseType;
  adminDeleteTodo: ReduxResponseType;
  adminGetByIdTodo: ReduxResponseType;
  adminUpdateTodo: ReduxResponseType;

  // admin users state
  adminGetAllusers: ReduxResponseType;
  adminDeleteuser: ReduxResponseType;
  adminGetByIduser: ReduxResponseType;
  adminUpdateuser: ReduxResponseType;
};

// Combine the reducers
const reducer = combineReducers<ReducersType>({
  // auth
  registerUser: registerUserReducer,
  loginUser: loginReducer,

  // Admin todo
  adminGetAllTodo: AdminGetAllTodoReducer,
  adminDeleteTodo: AdminDeleteTodoReducer,
  adminGetByIdTodo: AdminGetTodoByIdReducer,
  adminUpdateTodo: AdminUpdateTodoReducer,

  // admin users state
  adminGetAllusers: adminGetUsersReducer,
  adminDeleteuser: adminGetUsersReducer,
  adminGetByIduser: adminGetUsersReducer,
  adminUpdateuser: adminGetUsersReducer,
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
