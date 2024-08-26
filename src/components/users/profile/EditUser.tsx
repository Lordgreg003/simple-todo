// src/screens/user/UpdateProfileScreen.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/Store/store";
import {
  GetUserProfileByIdAction,
  UpdateProfileAction,
} from "../../../redux/Actions/users/profile/UserProfileAction";
import { useParams, useNavigate } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";

const UpdateprofileScreen: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { loading, error, serverResponse } = useSelector(
    (state: RootState) => state.getUserProfile
  );
  const { success: updateSuccess, loading: updateLoading } = useSelector(
    (state: RootState) => state.updateUserprofile
  );

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
  });
  // useEffect(() => {
  //   dispatch(GetUserProfileByIdAction());
  // }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(GetUserProfileByIdAction(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (serverResponse?.data) {
      setFormData({
        username: serverResponse.data.username || "",
        email: serverResponse.data.email || "",
        name: serverResponse.data.name || "",
      });
    }
  }, [serverResponse]);

  useEffect(() => {
    if (updateSuccess) {
      // Redirect or provide feedback after successful update
      navigate(`/profile/${id}`);
    }
  }, [updateSuccess, navigate, id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      UpdateProfileAction({
        id,
        username: formData.username,
        email: formData.email,
        name: formData.name,
      })
    );
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 p-6">
      <div className="container mx-auto max-w-4xl p-4">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Update Profile
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-full text-xl text-white">
            Loading...
          </div>
        ) : error ? (
          <p className="text-red-300 text-center">{error}</p>
        ) : (
          <form
            className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-teal-600 text-sm font-bold mb-2">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-teal-600 text-sm font-bold mb-2">
                Username:
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-teal-600 text-sm font-bold mb-2">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={updateLoading}
              >
                {updateLoading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateprofileScreen;
