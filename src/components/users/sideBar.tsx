import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/Actions/authActions";
import Swal from "sweetalert2";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/Store/store";
import { AnyAction } from "redux";

const Sidebar: React.FC = () => {
  // Properly typed dispatch for handling thunk actions
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
  const navigate = useNavigate();

  const {
    serverResponse: userProfile,
    loading,
    error,
  } = useSelector((state: RootState) => state.getUserProfile);

  console.log("Sidebar UserProfile:", userProfile);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "No, stay logged in",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutAction());
        Swal.fire("Logged out!", "You have been logged out.", "success");
        navigate("/login");
      }
    });
  };

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen flex flex-col">
      <div className="p-4 text-2xl font-bold bg-gray-900">Dashboard</div>

      <nav className="flex-grow mt-4">
        <ul className="space-y-2">
          {loading ? (
            <li className="text-center text-lg">Loading...</li>
          ) : error ? (
            <li className="text-center text-lg text-red-500">
              Failed to load profile
            </li>
          ) : (
            userProfile && (
              <li>
                <Link
                  to={`/user-dashboard/profile/${userProfile.data._id}`}
                  className="block px-4 py-2 text-lg hover:bg-gray-700"
                  aria-label="User Profile"
                >
                  User Profile
                </Link>
              </li>
            )
          )}
          <li>
            <Link
              to="/user-dashboard/getall"
              className="block px-4 py-2 text-lg hover:bg-gray-700"
              aria-label="User Todo"
            >
              User Todo
            </Link>
          </li>
        </ul>
      </nav>

      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 mt-4"
        aria-label="Logout"
      >
        Logout
      </button>

      <footer className="p-4 bg-gray-900 text-center mt-auto">
        © 2024 YourAppName
      </footer>
    </div>
  );
};

export default Sidebar;
