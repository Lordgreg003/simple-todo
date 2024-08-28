import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { UserGetTodoByIdAction } from "../../../redux/Actions/users/user todo/UserTodoAction";
import { ReducersType } from "../../../redux/Store/store";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../redux/Store/store";

const UserViewTodo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  const { loading, error, serverResponse } = useSelector(
    (state: ReducersType) => state.getUserTodoById
  );

  useEffect(() => {
    if (id) {
      dispatch(UserGetTodoByIdAction(id));
    }
  }, [dispatch, id]);

  if (loading)
    return <div className="text-center py-10 text-gray-300">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-400">
        Error: {error.message || error}
      </div>
    );
  if (!serverResponse || !serverResponse.data)
    return <div className="text-center py-10 text-gray-300">No data found</div>;

  const task = serverResponse?.data;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-gray-100 mb-4">
          Task Details
        </h1>
        <div className="space-y-4">
          <div>
            <span className="font-medium text-gray-400">Name:</span>
            <p className="text-lg text-gray-100">{task.username}</p>
          </div>
          <div>
            <span className="font-medium text-gray-400">Email:</span>
            <p className="text-lg text-gray-100">{task.email}</p>
          </div>
          <div>
            <span className="font-medium text-gray-400">Title:</span>
            <p className="text-lg text-gray-100">{task.title}</p>
          </div>
          <div>
            <span className="font-medium text-gray-400">Status:</span>
            <p
              className={`text-lg ${
                task.status ? "text-green-400" : "text-yellow-400"
              }`}
            >
              {task.status ? "Completed" : "Pending"}
            </p>
          </div>
          <div>
            <span className="font-medium text-gray-400">Created At:</span>
            <p className="text-lg text-gray-100">
              {new Date(task.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <Link
          to="/user-dashboard/getall"
          className="mt-6 inline-block text-center w-full py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
        >
          Back to List
        </Link>
      </div>
    </div>
  );
};

export default UserViewTodo;
