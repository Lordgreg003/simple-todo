import { ThunkResult } from "../../Store/store";
import { Dispatch } from "redux";
import axios from "axios";
import { API_ROUTES } from "../../../redux/Routes/routes";
import {
  ADMIN_GETALL_TODO_REQUEST,
  ADMIN_GETALL_TODO_SUCCESS,
  ADMIN_GETALL_TODO_FAIL,
  ADMIN_DELETE_TODO_REQUEST,
  ADMIN_DELETE_TODO_SUCCESS,
  ADMIN_DELETE_TODO_FAIL,
} from "../../Constants/admin/AdmintodoConstants";
import { ReduxResponseType } from "../../Types/todoTypes";
import { LoginResponseType } from "../../Types/authTypes";

export const AdminGetAllTodosAction =
  (): ThunkResult<void> => async (dispatch: Dispatch, getState: any) => {
    try {
      // Dispatch the request action
      console.log("Dispatching ADMIN_GETBYALL_TODO_REQUEST");
      dispatch({
        type: ADMIN_GETALL_TODO_REQUEST,
      });

      // Access the login state to retrieve the token
      const state = getState();
      console.log("Current state:", state);

      const loginUser: ReduxResponseType<LoginResponseType> = state?.loginUser;
      console.log("Login user data:", loginUser);

      // Retrieve the token from the loginUser state
      const token = loginUser?.serverResponse?.data?.token;
      console.log("Retrieved token:", token);

      if (!token) {
        console.error("No token found. Please log in again.");
        throw new Error("No token found. Please log in again.");
      }

      // Configure the request headers with the token
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("Request config:", config);

      // Make the API request
      console.log("Sending request to:", API_ROUTES.adminTodos.getAll);
      const { data } = await axios.get(API_ROUTES?.adminTodos?.getAll, config);
      console.log("Received data:", data);

      // Dispatch the success action with the retrieved data
      dispatch({
        type: ADMIN_GETALL_TODO_SUCCESS,
        payload: data,
      });
      console.log(
        "Dispatching ADMIN_GETBYALL_TODO_SUCCESS with payload:",
        data
      );
    } catch (error: any) {
      console.error("Error occurred:", error);

      // Dispatch the failure action with the error message
      dispatch({
        type: ADMIN_GETALL_TODO_FAIL,
        payload:
          error?.response?.data?.message ||
          error.message ||
          "An error occurred",
      });
      console.log(
        "Dispatching ADMIN_GETBYALL_TODO_FAIL with payload:",
        error.message
      );
    }
  };

export const AdminDeleteTodo =
  (id: string): ThunkResult<void> =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: ADMIN_DELETE_TODO_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.delete(
        `${API_ROUTES.adminTodos.delete}${id}`,
        config
      );
      dispatch({
        type: ADMIN_DELETE_TODO_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_DELETE_TODO_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
