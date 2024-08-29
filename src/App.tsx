import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminViewUserScreen from "./screens/admin/AdminViewUserScreen";
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
import { authCheck, homeCheck } from "./utils/checkAuth.utils";

const App: React.FC = () => {
  // const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={<RegisterScreen />}
          loader={authCheck}
        />
        <Route
          path="/"
          element={<LoginScreen />}
          loader={authCheck}
          // action={() => null}
        />
        <Route path="/login" element={<LoginScreen />} loader={authCheck} />
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
          loader={homeCheck}
        />
        <Route
          path="/user-dashboard"
          element={<UserDashboard />}
          loader={homeCheck}
        />

        {/* admin todo management route */}
        {/* <Route path="/getalltodos" element={<AdminTodos />} /> */}
        <Route
          path="/admin-dashboard/getAlltodos"
          element={<AdminTodos />}
          loader={homeCheck}
        />
        <Route
          path="/admin-dashboard/view/:id"
          element={<AdminViewTodos />}
          loader={homeCheck}
        />
        <Route
          path="/admin-dashboard/edit/:id"
          element={<AdminUpdateTodo />}
          loader={homeCheck}
        />

        {/* admin users managment */}

        <Route
          path="/admin-dashboard/manage-users"
          element={<AdminUsers />}
          loader={homeCheck}
        />
        <Route
          path="/admin-dashboard/manage-users/create"
          element={<AdminCreateUsersScreen />}
          loader={homeCheck}
        />
        <Route
          path="/admin-dashboard/manage-users/view/:id"
          element={<AdminViewUserScreen />}
          loader={homeCheck}
        />

        <Route
          path="/admin-dashboard/manage-users/edit/:id"
          element={<AdminUpdateUserScreen />}
          loader={homeCheck}
        />

        {/* user profile */}
        <Route path="/profile" element={<UserProfileScreen />} />
        <Route
          path="/update-profile"
          element={<UpdateProfileScreen />}
          loader={homeCheck}
        />

        {/* user Todo */}
        <Route
          path="/user-dashboard/getall"
          element={<GetAllUserTodoScreen />}
          loader={homeCheck}
        />

        <Route
          path="/user-dashboard/getall/create"
          element={<CreateUserTodoScreen />}
          loader={homeCheck}
        />

        <Route
          path="/user-dashboard/getall/view/:id"
          element={<UserViewTodoScreen />}
          loader={homeCheck}
        />

        <Route
          path="/user-dashboard/getall/edit/:id"
          element={<UserUpdateTodoScreen />}
          loader={homeCheck}
        />
      </Routes>
    </Router>
  );
};

export default App;
