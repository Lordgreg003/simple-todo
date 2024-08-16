import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterScreen from "./screens/auth/RegisterScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import AdminDashboard from "./screens/admin/AdminDashboard";
import UserDashboard from "./screens/users/UserDashboard";
import AdminTodos from "./screens/admin/AdminTodos";
import AdminViewTodos from "./screens/admin/AdminViewTodos";

const App: React.FC = () => {
  // const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />

        {/* admin todo management route */}
        {/* <Route path="/getalltodos" element={<AdminTodos />} /> */}
        <Route path="/admin-dashboard/getAlltodos" element={<AdminTodos />} />
        <Route path="/admin-dashboard/view/:id" element={<AdminViewTodos />} />
      </Routes>
    </Router>
  );
};

export default App;
