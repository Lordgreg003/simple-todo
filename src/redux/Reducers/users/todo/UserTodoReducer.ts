import { LOGIN_RESET } from "../../../Constants/authConstants";
import {
  UPDATE_USER_TODO_REQUEST,
  UPDATE_USER_TODO_SUCCESS,
  UPDATE_USER_TODO_FAIL,
  UPDATE_USER_TODO_RESET,
} from "../../../Constants/users/UserConstants";

import {
  GETALL_USERS_TODO_REQUEST,
  GETALL_USERS_TODO_SUCCESS,
  GETALL_USERS_TODO_FAIL,
  GETALL_USERS_TODO_RESET,
  DELETE_USER_TODO_REQUEST,
  DELETE_USER_TODO_SUCCESS,
  DELETE_USER_TODO_FAIL,
  DELETE_USER_TODO_RESET,
  CREATE_USER_TODO_REQUEST,
  CREATE_USER_TODO_SUCCESS,
  CREATE_USER_TODO_FAIL,
  CREATE_USER_TODO_RESET,
  GET_USER_TODOBYID_REQUEST,
  GET_USER_TODOBYID_SUCCESS,
  GET_USER_TODOBYID_FAIL,
  GET_USER_TODOBYID_RESET,
} from "../../../Constants/users/UserConstants";
import { initialState } from "../../../Initial-State/initialState";
import { ActionType, ReduxResponseType } from "../../../Types/todoTypes";

export const GetAllUserTodoReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GETALL_USERS_TODO_REQUEST:
      return { ...initialState, loading: true };
    case GETALL_USERS_TODO_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload.data,
      };
    case GETALL_USERS_TODO_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GETALL_USERS_TODO_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const CreateUserTodoReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case CREATE_USER_TODO_REQUEST:
      return { ...initialState, loading: true };
    case CREATE_USER_TODO_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case CREATE_USER_TODO_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case CREATE_USER_TODO_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const UpdateUserTodoReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case UPDATE_USER_TODO_REQUEST:
      return { ...initialState, loading: true };
    case UPDATE_USER_TODO_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case UPDATE_USER_TODO_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case UPDATE_USER_TODO_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const DeleteUserTodoReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case DELETE_USER_TODO_REQUEST:
      return { ...initialState, loading: true };
    case DELETE_USER_TODO_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload.data,
      };
    case DELETE_USER_TODO_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case DELETE_USER_TODO_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const UserGetTodoByIdReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_USER_TODOBYID_REQUEST:
      return { ...initialState, loading: true };
    case GET_USER_TODOBYID_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case GET_USER_TODOBYID_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_USER_TODOBYID_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
