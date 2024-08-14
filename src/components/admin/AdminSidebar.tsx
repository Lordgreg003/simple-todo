// src/components/AdminSidebar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/Actions/authActions";
import Swal from "sweetalert2";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/Store/store";

const AdminSidebar: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch logout action
    dispatch(logoutAction());

    // Show success message
    Swal.fire({
      icon: "success",
      title: "Logged out successfully",
      timer: 3000,
    });

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen flex flex-col">
      <div className="p-4 text-2xl font-bold bg-gray-900">Admin Dashboard</div>
      <nav className="flex-grow mt-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin-dashboard/manage-users"
              className="block px-4 py-2 text-lg hover:bg-gray-700"
            >
              Admin Users Management{" "}
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/getAlltodos"
              className="block px-4 py-2 text-lg hover:bg-gray-700"
            >
              Admin Todo Management
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/system-settings"
              className="block px-4 py-2 text-lg hover:bg-gray-700"
            >
              System Settings
            </Link>
          </li>
        </ul>
      </nav>
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 mt-4"
      >
        Logout
      </button>
      <footer className="p-4 bg-gray-900 text-center">
        © 2024 YourAppName - Admin Panel
      </footer>
    </div>
  );
};

export default AdminSidebar;
