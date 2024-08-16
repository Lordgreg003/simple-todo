import {
  ADMIN_CREATE_USER_RESET,
  ADMIN_CREATE_USER_REQUEST,
  ADMIN_CREATE_USER_SUCCESS,
  ADMIN_CREATE_USER_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_UPDATE_USER_RESET,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
  ADMIN_DELETE_USER_RESET,
  ADMIN_GETBYID_USER_REQUEST,
  ADMIN_GETBYID_USER_SUCCESS,
  ADMIN_GETBYID_USER_FAIL,
  ADMIN_GETBYID_USER_RESET,
  ADMIN_GET_ALL_USERS_REQUEST,
  ADMIN_GET_ALL_USERS_SUCCESS,
  ADMIN_GET_ALL_USERS_FAIL,
  ADMIN_GET_ALL_USERS_RESET,
} from "../../Constants/admin/AdminuserConstants";
import { LOGIN_RESET } from "../../Constants/authConstants";
import { initialState } from "../../Initial-State/initialState";
import { ActionType, ReduxResponseType } from "../../Types/todoTypes";

export const adminGetUsersReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_GET_ALL_USERS_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_GET_ALL_USERS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload.data,
      };
    case ADMIN_GET_ALL_USERS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_GET_ALL_USERS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
