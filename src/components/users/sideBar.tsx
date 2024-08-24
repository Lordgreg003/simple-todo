import React, { useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/Actions/authActions";
import Swal from "sweetalert2";
import { ThunkDispatch } from "redux-thunk";
import { ReducersType, RootState } from "../../redux/Store/store";
import { AnyAction } from "redux";
import { ReduxResponseType } from "../../redux/Types/todoTypes";
// import { UserProfiletype } from "../../redux/Types/user/userTypes";
import { GetUserProfileByIdAction } from "../../redux/Actions/users/profile/UserProfileAction";
import { AdminGetTodoType } from "../../redux/Types/admin/adminTypes";

const Sidebar: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
  const navigate = useNavigate();

  const getProfileDetailsRedux = useSelector(
    (state: ReducersType) => state?.getUserProfile
  ) as ReduxResponseType<AdminGetTodoType>;

  console.log("getProfileDetailsRedux data:", getProfileDetailsRedux);

  // Extract loading and error from the Redux state
  const mode = getProfileDetailsRedux?.loading;
  const error = getProfileDetailsRedux?.error;

  // Log the loading and error states
  // console.log("Loading state:", loading);
  console.log("Error state:", error);

  const userData = useMemo(() => {
    console.log(
      "Memoized user data:",
      getProfileDetailsRedux?.serverResponse?.data
    );
    return getProfileDetailsRedux?.serverResponse?.data;
  }, [getProfileDetailsRedux]);

  // Log the user data after it has been memoized
  console.log("User data:", userData);

  useEffect(() => {
    if (id) {
      dispatch(GetUserProfileByIdAction(id));
    }
  }, [dispatch, id]);

  console.log("get profile action", GetUserProfileByIdAction);
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
    <div className="w-64 bg-gray-800 text-white min-h-screen flex flex-col">
      <div className="p-4 text-2xl font-bold bg-gray-900">Dashboard</div>

      <nav className="flex-grow mt-4">
        <ul className="space-y-2">
          {mode ? (
            <li className="text-center text-lg">Loading...</li>
          ) : error ? (
            <li className="text-center text-lg text-red-500">
              Failed to load profile
            </li>
          ) : (
            userData && (
              <li>
                <Link
                  to={`/profile/${userData._id}`}
                  className="block px-4 py-2 text-lg hover:bg-gray-700"
                  aria-label="User Profile"
                >
                  User Profile
                </Link>
                <Link
                  to={`/update-profile/${userData._id}`}
                  className="block px-4 py-2 text-lg hover:bg-gray-700"
                  aria-label="User Profile"
                >
                  Update Profile
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

      <footer className="p-4 bg-gray-900 text-center mt-auto">
        © 2024 YourAppName
      </footer>
    </div>
  );
};

export default Sidebar;
