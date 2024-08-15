// src/screens/admin/AdminDashboard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar"; // Use AdminSidebar

const Admindashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-grow bg-gray-200 p-8">
        <header className="bg-purple-600 p-4 text-white text-center text-xl">
          Admin Dashboard
        </header>
        <main className="mt-4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            Welcome to Admin Dashboard
          </h2>
          <p className="text-gray-700 mb-4">
            Here you can manage users, tasks, and system settings.
          </p>
        </main>
        <footer className="bg-gray-800 p-4 text-white text-center mt-8">
          © 2024 YourAppName - Admin Panel
        </footer>
      </div>
    </div>
  );
};

export default Admindashboard;
