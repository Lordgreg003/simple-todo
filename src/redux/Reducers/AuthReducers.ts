import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_RESET,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_RESET,
} from "../Constants/authConstants"; // Adjust the import path as needed
import { ReduxResponseType, ActionType } from "../Types/todoTypes"; // Adjust the import path as needed
import { initialState } from "../Initial-State/initialState"; // Adjust the import path as needed
import { LoginResponseType } from "../Types/authTypes";
import { jwtDecode as jwtDecode2 } from "jwt-decode";
import { LOGIN_SESSION } from "../../extrastorage/storageStore";

export const registerUserReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...initialState, loading: true };
    case REGISTER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case REGISTER_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case REGISTER_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export const loginReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
): ReduxResponseType => {
  // console.log("loginReducer action received:", action);

  switch (action.type) {
    case LOGIN_REQUEST:
      // console.log("Handling LOGIN_REQUEST");
      return { ...initialState, loading: true };

    case LOGIN_SUCCESS:
      // console.log("Handling LOGIN_SUCCESS with payload:", action.payload);

      let login: ReduxResponseType<LoginResponseType> = { ...initialState };

      if (action.payload?.data?.token !== "") {
        try {
          // Decode the token
          const decodedToken = jwtDecode2<LoginResponseType>(
            action.payload?.data?.token
          );
          decodedToken.token = action.payload?.data?.token;

          // Add data to the login response
          login = {
            loading: false,
            success: true,
            serverResponse: {
              data: decodedToken,
              message: "",
              success: true,
            },
            error: "",
          };

          // console.log("Decoded token:", decodedToken);

          // Store login session in localStorage
          if (typeof window !== "undefined") {
            localStorage.setItem(LOGIN_SESSION, JSON.stringify(login));
          }
        } catch (error) {
          // console.error("Error decoding token:", error);
          return {
            ...initialState,
            loading: false,
            success: false,
            error: "Token decoding failed.",
          };
        }
      } else {
        // console.warn("Empty token in LOGIN_SUCCESS payload");
        return {
          ...initialState,
          loading: false,
          success: false,
          error: "Received empty token.",
        };
      }

      return login;

    case LOGIN_FAIL:
      // console.log("Handling LOGIN_FAIL with error:", action.payload);
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };

    case LOGIN_RESET:
      // console.log("Handling LOGIN_RESET");
      return {
        ...state,
        success: false,
        error: "",
        // serverResponse: {}
      };

    default:
      // console.warn("Unhandled action type:", action.type);
      return state;
  }
};
