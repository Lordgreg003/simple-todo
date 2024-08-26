// src/components/AdminNav.tsx
import React from "react";
import { Link } from "react-router-dom";

const AdminNav: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-md  h-[40rem] w-64">
      <div className="p-4 text-2xl font-bold bg-gray-900">Admin Dashboard</div>
      <ul className="flex flex-col space-y-4 p-4">
        <li>
          <Link
            to="/admin-dashboard/manage-users"
            className="block px-4 py-2 text-lg hover:bg-gray-700 rounded transition duration-300"
          >
            Admin Users Management
          </Link>
        </li>
        <li>
          <Link
            to="/admin-dashboard/getAlltodos"
            className="block px-4 py-2 text-lg hover:bg-gray-700 rounded transition duration-300"
          >
            Admin Todo Management
          </Link>
        </li>
        <li>
          <Link
            to="/admin-dashboard/system-settings"
            className="block px-4 py-2 text-lg hover:bg-gray-700 rounded transition duration-300"
          >
            System Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
