// src/types/reduxResponseTypes.ts
export type ReduxResponseType<T = any> = {
  loading: boolean;
  success: boolean;
  serverResponse: {
    data: T;
    message: string;
    success: boolean;
    // user: User | null; // Ensure User type is defined
  };
  error: any;
};

export type ActionType = {
  type: string;
  payload: any;
};

// export type UserProfileResponse = {
//   _id: string;
//   name: string;
//   username: string;
//   email: string;
//   password: string;
//   type: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// };

// export type ProfileResponseType = {
//   data: UserProfileResponse; // Should be UserProfileResponse
//   message: string;
//   success: boolean;
// };
