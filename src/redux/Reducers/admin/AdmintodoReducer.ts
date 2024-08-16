import {
  ADMIN_GETALL_TODO_REQUEST,
  ADMIN_GETALL_TODO_SUCCESS,
  ADMIN_GETALL_TODO_FAIL,
  ADMIN_GETALL_TODO_RESET,
  ADMIN_DELETE_TODO_REQUEST,
  ADMIN_DELETE_TODO_SUCCESS,
  ADMIN_DELETE_TODO_FAIL,
  ADMIN_DELETE_TODO_RESET,
  ADMIN_GETBYID_TODO_REQUEST,
  ADMIN_GETBYID_TODO_SUCCESS,
  ADMIN_GETBYID_TODO_FAIL,
  ADMIN_GETBYID_TODO_RESET,
} from "../../Constants/admin/AdmintodoConstants";
import { LOGIN_RESET } from "../../Constants/authConstants";
import { initialState } from "../../Initial-State/initialState";
import { ActionType, ReduxResponseType } from "../../Types/todoTypes";

export const AdminGetAllTodoReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_GETALL_TODO_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_GETALL_TODO_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload.data,
      };
    case ADMIN_GETALL_TODO_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_GETALL_TODO_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const AdminDeleteTodoReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_DELETE_TODO_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_DELETE_TODO_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload.data,
      };
    case ADMIN_DELETE_TODO_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_DELETE_TODO_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const AdminGetTodoByIdReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_GETBYID_TODO_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_GETBYID_TODO_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload.data,
      };
    case ADMIN_GETBYID_TODO_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload.data,
      };
    case ADMIN_GETBYID_TODO_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
