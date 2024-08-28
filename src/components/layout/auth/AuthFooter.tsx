import React from "react";
import { MdEmail } from "react-icons/md";

const AuthFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center w-full">
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-sm mb-2">
          &copy; {new Date().getFullYear()} Greg App. All rights reserved.
        </p>
        <div className="flex items-center space-x-2">
          <MdEmail className="text-lg" />
          <a
            href="chideranwokoye555@gmail.com" // Replace with your email address
            className="text-teal-400 hover:text-teal-300"
          >
            Contact Us
          </a>
        </div>
        <p className="text-sm mt-2">Phone: +123 456 7890</p>{" "}
        {/* Add your phone number here */}
      </div>
    </footer>
  );
};

export default AuthFooter;
