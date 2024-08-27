import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { ThunkDispatch } from "redux-thunk";

import { AnyAction } from "redux";
import { RootState } from "../../redux/Store/store";
import { logoutAction } from "../../redux/Actions/authActions";

const Sidebar: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
  const navigate = useNavigate();

  // console.log("get profile action", GetUserProfileByIdAction);
  const handleLogout = () => {
    console.log("Logout initiated");

    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "No, stay logged in",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("User confirmed logout");
        dispatch(logoutAction());
        Swal.fire("Logged out!", "You have been logged out.", "success");
        navigate("/login");
      }
    });
  };

  return (
    <div className="w-64 bg-gray-800 text-white min-h-auto flex flex-col">
      <nav className="flex-grow mt-4">
        <div className="p-4 text-2xl font-bold bg-gray-900">Dashboard</div>
        <ul className="space-y-2">
          <li>
            <Link
              to="/profile"
              className="block px-4 py-2 text-lg hover:bg-gray-700"
              aria-label="User Profile"
            >
              User Profile
            </Link>
          </li>
          <li>
            <Link
              to="/update-profile"
              className="block px-4 py-2 text-lg hover:bg-gray-700"
              aria-label="Update Profile"
            >
              Update Profile
            </Link>
          </li>
          <li>
            <Link
              to="/user-dashboard/getall"
              className="block px-4 py-2 text-lg hover:bg-gray-700"
              aria-label="User Todos"
            >
              User Todos
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
      <footer className="p-4 bg-gray-900 text-center">© 2024 Greg App</footer>
    </div>
  );
};

export default Sidebar;
