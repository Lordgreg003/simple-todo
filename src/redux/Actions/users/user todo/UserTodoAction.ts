import { Dispatch } from "redux";
import {
  GETALL_USERS_TODO_REQUEST,
  GETALL_USERS_TODO_SUCCESS,
  GETALL_USERS_TODO_FAIL,
  GET_USER_TODOBYID_REQUEST,
  GET_USER_TODOBYID_SUCCESS,
  GET_USER_TODOBYID_FAIL,
  // GET_USER_TODOBYID_RESET,
  DELETE_USER_TODO_REQUEST,
  DELETE_USER_TODO_SUCCESS,
  DELETE_USER_TODO_FAIL,
  CREATE_USER_TODO_REQUEST,
  CREATE_USER_TODO_SUCCESS,
  CREATE_USER_TODO_FAIL,
  UPDATE_USER_TODO_REQUEST,
  UPDATE_USER_TODO_SUCCESS,
  UPDATE_USER_TODO_FAIL,
  // UPDATE_USER_TODO_RESET,
} from "../../../Constants/users/UserConstants";
import { ThunkResult } from "../../../Store/store";
import { ReduxResponseType } from "../../../Types/todoTypes";
import { LoginResponseType } from "../../../Types/authTypes";
import axios from "axios";
import { API_ROUTES } from "../../../Routes/routes";
import { CreateUserType } from "../../../Types/admin/adminTypes";
import { userUpdateTodoType } from "../../../Types/user/userTypes";

export const GetAllUsersTodosAction =
  (): ThunkResult<void> => async (dispatch: Dispatch, getState: any) => {
    try {
      // Dispatch the request action
      // console.log("Dispatching ADMIN_GETBYALL_TODO_REQUEST");
      dispatch({
        type: GETALL_USERS_TODO_REQUEST,
      });

      // Access the login state to retrieve the token
      const state = getState();
      // console.log("Current state:", state);

      const loginUser: ReduxResponseType<LoginResponseType> = state?.loginUser;
      // console.log("Login user data:", loginUser);

      // Retrieve the token from the loginUser state
      const token = loginUser?.serverResponse?.data?.token;
      // console.log("Retrieved token:", token);

      if (!token) {
        // console.error("No token found. Please log in again.");
        throw new Error("No token found. Please log in again.");
      }

      // Configure the request headers with the token
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      // console.log("Request config:", config);

      // Make the API request
      // console.log("Sending request to:", API_ROUTES.adminTodos.getAll);
      const { data } = await axios.get(API_ROUTES?.userTodos.getAll, config);
      // console.log("Received data:", data);

      // Dispatch the success action with the retrieved data
      dispatch({
        type: GETALL_USERS_TODO_SUCCESS,
        payload: data,
      });
      // console.log(
      //   "Dispatching ADMIN_GETBYALL_TODO_SUCCESS with payload:",
      //   data
      // );
    } catch (error: any) {
      // console.error("Error occurred:", error);

      // Dispatch the failure action with the error message
      dispatch({
        type: GETALL_USERS_TODO_FAIL,
        payload:
          error?.response?.data?.message ||
          error.message ||
          "An error occurred",
      });
      // console.log(
      //   "Dispatching ADMIN_GETBYALL_TODO_FAIL with payload:",
      //   error.message
      // );
    }
  };

export const DeleteUserTodo =
  (id: string): ThunkResult<void> =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      console.log("Dispatching ADMIN_DELETE_TODO_REQUEST for id:", id);
      dispatch({
        type: DELETE_USER_TODO_REQUEST,
      });

      const state = getState();
      const loginUser: ReduxResponseType<LoginResponseType> = state?.loginUser;
      // console.log("Current login user state:", loginUser);

      const token = loginUser?.serverResponse?.data?.token;
      // console.log("Retrieved token:", token);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(
        `${API_ROUTES.userTodos.delete}${id}`,
        config
      );
      // console.log("Delete request successful. Response data:", data);

      dispatch({
        type: DELETE_USER_TODO_SUCCESS,
        payload: data,
      });
      // console.log("Dispatching ADMIN_DELETE_TODO_SUCCESS with payload:", data);
    } catch (error: any) {
      // console.error("Error occurred while deleting todo:", error);

      dispatch({
        type: DELETE_USER_TODO_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
      // console.log(
      //   "Dispatching ADMIN_DELETE_TODO_FAIL with error message:",
      //   error?.message
      // );
    }
  };

export const CreateUserTodoAction =
  ({ title, email, text, username }: CreateUserType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: CREATE_USER_TODO_REQUEST,
      });

      const state = getState();
      const loginUser: ReduxResponseType<LoginResponseType> = state?.loginUser;
      const token = loginUser?.serverResponse?.data?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        API_ROUTES?.userTodos.create,
        { title, email, username, text },
        config
      );
      dispatch({
        type: CREATE_USER_TODO_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: CREATE_USER_TODO_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const UserGetTodoByIdAction =
  (id: string): ThunkResult<void> =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: GET_USER_TODOBYID_REQUEST,
      });

      const state = getState();
      const loginUser: ReduxResponseType<LoginResponseType> = state?.loginUser;
      const token = loginUser?.serverResponse?.data?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${API_ROUTES.userTodos.getById}${id}`,
        config
      );

      console.log("user data", data);

      dispatch({
        type: GET_USER_TODOBYID_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_USER_TODOBYID_FAIL,

        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const UserUpdateTodoAction =
  ({ email, title, username, id }: userUpdateTodoType): ThunkResult<void> =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: UPDATE_USER_TODO_REQUEST,
      });

      const state = getState();
      const loginUser: ReduxResponseType<LoginResponseType> = state?.loginUser;
      const token = loginUser?.serverResponse?.data?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${API_ROUTES.adminTodos.update}${id}`,
        { title, username, email },
        config
      );

      dispatch({
        type: UPDATE_USER_TODO_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: UPDATE_USER_TODO_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
