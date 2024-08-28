import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../redux/Store/store";
import { AdminGetTodoType } from "../../../redux/Types/admin/adminTypes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icons

import {
  GetAllUsersTodosAction,
  DeleteUserTodo,
} from "../../../redux/Actions/users/user todo/UserTodoAction";

const GetAllUserTodoscom: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<AdminGetTodoType[]>([]);
  const [message, setMessage] = useState<string>("");

  const {
    loading,
    serverResponse = [],
    error,
  } = useSelector((state: RootState) => state.getAllUserTodo);

  useEffect(() => {
    dispatch(GetAllUsersTodosAction());
  }, [dispatch]);

  useEffect(() => {
    if (serverResponse && Array.isArray(serverResponse)) {
      setTasks(serverResponse);
      setMessage("");
    } else {
      setTasks([]);
      setMessage("Invalid response format");
    }
  }, [serverResponse]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(DeleteUserTodo(id));
      dispatch(GetAllUsersTodosAction());
      toast.success("Task deleted successfully!", { position: "top-center" });
    } catch (error) {
      // console.error("Error deleting task:", error);
    }
  };

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 sm:px-8 py-8">
        {message && (
          <div className="mb-4 p-4 bg-gray-700 text-gray-300 rounded">
            {message}
          </div>
        )}

        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={() => navigate("/user-dashboard")}
            className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </button>
        </div>

        <div className="flex justify-end mb-4">
          <Link
            to="/user-dashboard/getall/create"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create New Task
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Number
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <tr key={task._id} className="bg-gray-800 hover:bg-gray-700">
                    <td className="px-5 py-5 border-b border-gray-700 text-sm break-words">
                      {index + 1} {/* Display the number instead of the ID */}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-700 text-sm break-words">
                      {task.username}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-700 text-sm break-words">
                      {task.email}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-700 text-sm break-words">
                      {task.title}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-700 text-sm">
                      {task.status ? "Completed" : "Pending"}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-700 text-sm">
                      {new Date(task.createdAt).toLocaleString()}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-700 text-sm flex space-x-2">
                      <Link
                        to={`/user-dashboard/getall/view/${task._id}`}
                        className="text-blue-400 hover:text-blue-500"
                        title="View"
                      >
                        <FaEye size={20} />
                      </Link>
                      <Link
                        to={`/user-dashboard/getall/edit/${task._id}`}
                        className="text-blue-400 hover:text-blue-500"
                        title="Edit"
                      >
                        <FaEdit size={20} />
                      </Link>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="text-red-400 hover:text-red-500"
                        title="Delete"
                      >
                        <FaTrash size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-5 border-b border-gray-700 text-sm text-center"
                  >
                    No tasks available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default GetAllUserTodoscom;
