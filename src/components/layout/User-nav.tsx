// src/components/UserNav.tsx
import React from "react";
import { Link } from "react-router-dom";

const UserNav: React.FC = () => {
  return (
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
  );
};

export default UserNav;
