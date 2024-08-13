// src/screens/auth/LoginScreen.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../../redux/Actions/authActions";
import { ReducersType, RootState } from "../../../redux/Store/store";
import { ThunkDispatch } from "redux-thunk";
import { useNavigate } from "react-router-dom";
import { ReduxResponseType } from "../../../redux/Types/todoTypes";

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const navigate = useNavigate();

  // Extract state from Redux store
  const { loading, error, success, serverResponse } = useSelector(
    (state: ReducersType) => state?.loginUser
  ) as ReduxResponseType;

  useEffect(() => {
    console.log("LoginScreen useEffect triggered");
    console.log("Success:", success);
    console.log("Server Response:", serverResponse);

    if (success) {
      console.log("Login successful:", serverResponse);
      const user = serverResponse?.data;

      setTimeout(() => {
        if (user?.role === "admin") {
          console.log("Redirecting to admin dashboard");
          navigate("/admin-dashboard");
        } else if (user?.role === "user") {
          console.log("Redirecting to user dashboard:", user?.id);
          navigate(`/user-dashboard/${user?.id}`);
        } else {
          console.log("No role or redirect path found");
        }

        // Reset form data
        setUsername("");
        setPassword("");

        // Optionally dispatch a reset action for login state
        // dispatch({ type: LOGIN_RESET });
      }, 4000);
    } else if (error) {
      console.log("Login error:", error);
    }
  }, [success, navigate, serverResponse, error]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", { username, password });
    dispatch(loginAction({ username, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {loading && (
          <p className="text-center text-blue-500 mt-4">Loading...</p>
        )}
        {error && (
          <p className="text-center text-red-500 mt-4">Error: {error}</p>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
