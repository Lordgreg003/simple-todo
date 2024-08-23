import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterScreen from "./screens/auth/RegisterScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import AdminDashboard from "./screens/admin/AdminDashboard";
import UserDashboard from "./screens/users/UserDashboard";
import AdminTodos from "./screens/admin/AdminTodos";
import AdminViewTodos from "./screens/admin/AdminViewTodos";
import AdminUpdateTodo from "./screens/admin/AdminUpdateTodo";
import AdminUsers from "./screens/admin/AdminUsers";
import UserProfileScreen from "./screens/users/UserProfileScreen";
import AdminCreateUsersScreen from "./screens/admin/AdminCreateUsersScreen";
import AdminViewUserScreen from "./components/AdminViewUserScreen";
import AdminUpdateUserScreen from "./screens/admin/AdminUpdateUserScreen";
import GetAllUserTodoScreen from "./screens/users/GetAllUserTodoScreen";
import CreateUserTodoScreen from "./screens/users/CreateUserTodoScreen";
import UserViewTodoScreen from "./screens/users/UserViewTodoScreen";
import UserUpdateTodoScreen from "./screens/users/UserUpdateTodoScreen";

const App: React.FC = () => {
  // const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/" element={<LoginScreen />} />
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
        <Route path="/profile/:id" element={<UserProfileScreen />} />

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
