export type UserProfiletype = {
  name?: string;
  username: string;
  email: string;
  createdAt: string; // or Date if preferred
  updatedAt: string; // or Date if preferred
};

export type userUpdateTodoType = {
  // name: string;
  username: string;
  email: string;
  title: string;
  id?: string;
};
