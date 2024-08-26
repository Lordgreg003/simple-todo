import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../../redux/Actions/authActions";
import Swal from "sweetalert2";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../redux/Store/store";
import { AnyAction } from "redux";

import { GetUserProfileByIdAction } from "../../../redux/Actions/users/profile/UserProfileAction";

import UserNav from "../../layout/User-nav";
import Foot from "../../layout/Foot";

const Sidebar: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
  const navigate = useNavigate();

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
    <div className="w-64 bg-gray-800 text-white min-h-auto flex flex-col">
      <UserNav />

      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 mt-4"
        aria-label="Logout"
      >
        Logout
      </button>

      <Foot />
    </div>
  );
};

export default Sidebar;
