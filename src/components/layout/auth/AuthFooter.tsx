import React from "react";

const AuthFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Greg App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default AuthFooter;
