import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../../redux/Actions/authActions";
import { RootState } from "../../../redux/Store/store";
import { ThunkDispatch } from "redux-thunk";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.registerUser
  );

  useEffect(() => {
    if (success) {
      setSuccessMessage("Registration Successful!");
      setTimeout(() => navigate("/login"), 3000); // Redirect to home page after 3 seconds
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      console.error("Registration error:", error);
    }
  }, [error]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    // Log the data being sent
    console.log("Submitting data:", { name, username, email, password });

    // Dispatch the registration action
    dispatch(registerAction({ name, username, email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        {loading && (
          <p className="text-center text-blue-500 mt-4">Loading...</p>
        )}
        {error && (
          <p className="text-center text-red-500 mt-4">Error: {error}</p>
        )}
        {successMessage && (
          <p className="text-center text-green-500 mt-4">{successMessage}</p>
        )}

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 hover:text-purple-700 font-bold"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterComponent;
