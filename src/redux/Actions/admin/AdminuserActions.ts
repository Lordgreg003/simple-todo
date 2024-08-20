import { Dispatch } from "redux";
import {
  ADMIN_CREATE_USER_REQUEST,
  ADMIN_CREATE_USER_SUCCESS,
  ADMIN_CREATE_USER_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
  ADMIN_GETBYID_USER_REQUEST,
  ADMIN_GETBYID_USER_SUCCESS,
  ADMIN_GETBYID_USER_FAIL,
  ADMIN_GET_ALL_USERS_REQUEST,
  ADMIN_GET_ALL_USERS_SUCCESS,
  ADMIN_GET_ALL_USERS_FAIL,
} from "../../Constants/admin/AdminuserConstants";
import { ReduxResponseType } from "../../Types/todoTypes";
import { LoginResponseType } from "../../Types/authTypes";
import axios from "axios";
import { API_ROUTES } from "../../Routes/routes";
import { RootState, ThunkResult } from "../../Store/store";
import {
  adminCreateTodoType,
  adminUpdateUserType,
} from "../../Types/admin/adminTypes";
import { ThunkAction } from "redux-thunk";
// import { ADMIN_CREATE_TODO_REQUEST } from "../../Constants/admin/AdmintodoConstants";

export const adminGetUsersAction =
  (): ThunkResult<void> => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_GET_ALL_USERS_REQUEST,
      });

      const state = getState();
      const loginUser: ReduxResponseType<LoginResponseType> = state?.loginUser;
      const token = loginUser?.serverResponse?.data?.token;
      console.log("Get all Token:", token);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(API_ROUTES?.adminUsers?.getAll, config);

      dispatch({
        type: ADMIN_GET_ALL_USERS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_GET_ALL_USERS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const AdmindeleteUser =
  (id: string): ThunkResult<void> =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_DELETE_USER_REQUEST,
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

      const { data } = await axios.delete(
        `${API_ROUTES.adminUsers.delete}${id}`,
        config
      );
      dispatch({
        type: ADMIN_DELETE_USER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_DELETE_USER_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminCreateUserAction =
  ({
    name,
    username,
    email,
    password,
  }: adminCreateTodoType): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({ type: ADMIN_CREATE_USER_REQUEST });

      const state = getState();
      console.log("State:", state); // Check the full state

      const loginUser: ReduxResponseType<LoginResponseType> = state?.loginUser;
      const token = loginUser?.serverResponse?.data?.token;
      console.log("Token:", token); // Check if token is retrieved correctly

      if (!token) {
        throw new Error("Token is undefined. User might not be logged in.");
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      console.log("Request Config:", config); // Check the request config

      const { data } = await axios.post(
        API_ROUTES?.adminUsers.create,
        { email, username, name, password },
        config
      );

      console.log("Response Data:", data); // Log the response data

      dispatch({
        type: ADMIN_CREATE_USER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      console.error("Error:", error.response || error.message); // Log the error
      dispatch({
        type: ADMIN_CREATE_USER_FAIL,
        payload: error?.response?.data?.message || error.message,
      });
    }
  };

export const adminGetUserByIdAction =
  (id: string): ThunkResult<void> =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_GETBYID_USER_REQUEST,
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
        `${API_ROUTES.adminUsers.getById}${id}`,
        config
      );

      dispatch({
        type: ADMIN_GETBYID_USER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_GETBYID_USER_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminUpdateUserAction =
  ({
    username,
    email,
    name,
    password,
    id,
  }: adminUpdateUserType): ThunkResult<void> =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_UPDATE_USER_REQUEST,
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
        `${API_ROUTES.adminUsers.update}${id}`,
        { name, password, username, email },
        config
      );

      dispatch({
        type: ADMIN_UPDATE_USER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_UPDATE_USER_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
