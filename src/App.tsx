import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminViewUserScreen from "./components/AdminViewUserScreen";
import AdminCreateUsersScreen from "./screens/admin/AdminCreateUsersScreen";
import AdminDashboard from "./screens/admin/AdminDashboard";
import AdminTodos from "./screens/admin/AdminTodos";
import AdminUpdateTodo from "./screens/admin/AdminUpdateTodo";
import AdminUpdateUserScreen from "./screens/admin/AdminUpdateUserScreen";
import AdminUsers from "./screens/admin/AdminUsers";
import AdminViewTodos from "./screens/admin/AdminViewTodos";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import CreateUserTodoScreen from "./screens/users/CreateUserTodoScreen";
import GetAllUserTodoScreen from "./screens/users/GetAllUserTodoScreen";
import UpdateProfileScreen from "./screens/users/UpdateProfileScreen";
import UserDashboard from "./screens/users/UserDashboard";
import UserProfileScreen from "./screens/users/UserProfileScreen";
import UserUpdateTodoScreen from "./screens/users/UserUpdateTodoScreen";
import UserViewTodoScreen from "./screens/users/UserViewTodoScreen";

const App: React.FC = () => {
  // const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterScreen />} />
        <Route
          path="/"
          element={<LoginScreen />}
          loader={() => null}
          action={() => null}
        />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />

        {/* admin todo management route */}
        {/* <Route path="/getalltodos" element={<AdminTodos />} /> */}
        <Route path="/admin-dashboard/getAlltodos" element={<AdminTodos />} />
        <Route path="/admin-dashboard/view/:id" element={<AdminViewTodos />} />
        <Route path="/admin-dashboard/edit/:id" element={<AdminUpdateTodo />} />

        {/* admin users managment */}

        <Route path="/admin-dashboard/manage-users" element={<AdminUsers />} />
        <Route
          path="/admin-dashboard/manage-users/create"
          element={<AdminCreateUsersScreen />}
        />
        <Route
          path="/admin-dashboard/manage-users/view/:id"
          element={<AdminViewUserScreen />}
        />

        <Route
          path="/admin-dashboard/manage-users/edit/:id"
          element={<AdminUpdateUserScreen />}
        />

        {/* user profile */}
        <Route path="/profile" element={<UserProfileScreen />} />
        <Route path="/update-profile/:id" element={<UpdateProfileScreen />} />

        {/* user Todo */}
        <Route
          path="/user-dashboard/getall"
          element={<GetAllUserTodoScreen />}
        />

        <Route
          path="/user-dashboard/getall/create"
          element={<CreateUserTodoScreen />}
        />

        <Route
          path="/user-dashboard/getall/view/:id"
          element={<UserViewTodoScreen />}
        />

        <Route
          path="/user-dashboard/getall/edit/:id"
          element={<UserUpdateTodoScreen />}
        />
      </Routes>
    </Router>
  );
};

export default App;
