import React from "react";
import { Link } from "react-router-dom";
import { image } from "../../images";

const AuthNav = () => {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo or Brand Name */}
        <div className="flex items-center">
          <img src={image} alt="" />

          <div className="text-2xl font-bold">Greg App</div>
        </div>
        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="hover:text-gray-300 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="hover:text-gray-300 transition duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AuthNav;
