// src/screens/user/UserDashboard.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../../redux/Actions/authActions";
import Swal from "sweetalert2";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../redux/Store/store";

const Userdashboard: React.FC = () => {
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

    // Redirect to login page or home
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full bg-purple-600 p-4 text-white text-center text-xl">
        User Dashboard
      </header>
      <main className="flex-grow container mx-auto p-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
          <p className="text-gray-700 mb-4">
            Here you can manage your profile and settings.
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300"
          >
            Logout
          </button>
        </div>
      </main>
      <footer className="w-full bg-gray-800 p-4 text-white text-center">
        © 2024 YourAppName
      </footer>
    </div>
  );
};

export default Userdashboard;
