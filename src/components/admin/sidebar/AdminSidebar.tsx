// src/components/AdminSidebar.tsx
import React from "react";
// import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../../redux/Actions/authActions";
import Swal from "sweetalert2";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../redux/Store/store";
import AdminNav from "../../layout/Admin-nav";
import Foot from "../../layout/Foot";

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
      <AdminNav />
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 mt-4"
      >
        Logout
      </button>
      <Foot />
    </div>
  );
};

export default AdminSidebar;
