// src/screens/user/UserDashboard.tsx
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sideBar";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType, RootState } from "../../redux/Store/store";
import { ReduxResponseType } from "../../redux/Types/todoTypes";
import { UserProfiletype } from "../../redux/Types/user/userTypes";
import { GetUserProfileByIdAction } from "../../redux/Actions/users/profile/UserProfileAction";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

const UserDashboard: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

  const getProfileDetailsRedux = useSelector(
    (state: ReducersType) => state?.getUserProfile
  ) as ReduxResponseType<UserProfiletype>;

  console.log("get profile redux", getProfileDetailsRedux);

  const userData = useMemo(() => {
    return getProfileDetailsRedux?.serverResponse?.data;
  }, [getProfileDetailsRedux]);

  console.log("user data", userData);

  useEffect(() => {
    dispatch(GetUserProfileByIdAction() as any);
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow bg-gray-200 p-8">
        <header className="bg-purple-600 p-4 text-white text-center text-xl">
          User Dashboard
        </header>
        <main className="mt-4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
          <p className="text-gray-700 mb-4">
            Here you can manage your profile and settings.
          </p>
        </main>
        <footer className="bg-gray-800 p-4 text-white text-center mt-8">
          © 2024 YourAppName
        </footer>
      </div>
    </div>
  );
};

export default UserDashboard;
