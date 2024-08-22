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

// import { ReduxResponseType } from "../Types/todoTypes";

// export const profileInitialState: ReduxResponseType<ProfileResponseType> = {
//   loading: false,
//   success: false,
//   serverResponse: {
//     data: {
//       _id: "",
//       name: "",
//       username: "",
//       email: "",
//       password: "",
//       type: "",
//       createdAt: "",
//       updatedAt: "",
//       __v: 0,
//     },
//     message: "",
//     success: false,
//   },
//   error: "",
// };

interface UserProfileState<T = any> {
  serverResponse: {
    data: {
      _id?: string;
      name?: string;
      username?: string;
      email?: string;
      // Add other fields as necessary
    };
    message: string;
    success: boolean;
  };
  loading: boolean;
  error?: string;
}

export const UserinitialState: UserProfileState<any> = {
  serverResponse: {
    data: {},
    message: "",
    success: false,
  },

  loading: false,
  error: "",
};
