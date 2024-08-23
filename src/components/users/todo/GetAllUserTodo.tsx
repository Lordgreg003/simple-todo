import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../redux/Store/store";
import { AdminGetTodoType } from "../../../redux/Types/admin/adminTypes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        {message && (
          <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded">
            {message}
          </div>
        )}

        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={() => navigate("/user-dashboard")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </button>
        </div>

        <div className="flex justify-end mb-4">
          <Link
            to="/user-dashboard/getall/create"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create New Task
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Number
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <tr key={task._id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm break-words">
                      {index + 1} {/* Display the number instead of the ID */}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm break-words">
                      {task.username}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm break-words">
                      {task.email}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm break-words">
                      {task.title}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {task.status ? "Completed" : "Pending"}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {new Date(task.createdAt).toLocaleString()}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm space-y-2 sm:space-y-0 sm:space-x-2">
                      <Link
                        to={`/user-dashboard/getall/view/${task._id}`}
                        className="text-blue-500 hover:text-blue-700 block sm:inline-block"
                      >
                        View
                      </Link>
                      <Link
                        to={`/user-dashboard/getall/edit/${task._id}`}
                        className="text-blue-500 hover:text-blue-700 block sm:inline-block"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="text-red-500 hover:text-red-700 block sm:inline-block"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"
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
