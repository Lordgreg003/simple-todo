export type AdminGetTodoType = {
  _id: string;
  username: string;
  email: string;
  title: string;
  status: boolean;
  createdAt: string;
};

export type adminCreateUserType = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type CreateUserType = {
  username: string;
  email: string;
  title: string;
  text: string;
};

export type CreateUserTodoType = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type adminUpdateTodoType = {
  name: string;
  username: string;
  email: string;
  password: string;
  id?: string;
};

export type adminUpdateUserType = {
  name: string;
  username: string;
  email: string;
  password: string;
  id?: string;
};

export type adminCreateTodoType = {
  name: string;
  username: string;
  email: string;
  password: string;
};
