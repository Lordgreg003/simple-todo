import { ReduxResponseType } from "../Types/todoTypes";

export const initialState: ReduxResponseType<any> = {
  loading: false,
  success: false,
  serverResponse: {
    data: [],
    message: "",
    success: false,
    // user: null,
  },
  error: "",
};
