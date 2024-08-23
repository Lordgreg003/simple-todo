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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error.message || error}
      </div>
    );
  if (!serverResponse || !serverResponse.data)
    return <div className="text-center py-10">No data found</div>;

  const task = serverResponse.data;
  console.log("serverResponse", serverResponse);

  console.log("task", task);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Task Details
        </h1>
        <div className="space-y-4">
          <div>
            <span className="font-medium text-gray-600">Name:</span>
            <p className="text-lg text-gray-800">{task.username}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Email:</span>
            <p className="text-lg text-gray-800">{task.email}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Title:</span>
            <p className="text-lg text-gray-800">{task.title}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Status:</span>
            <p
              className={`text-lg ${
                task.status ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {task.status ? "Completed" : "Pending"}
            </p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Created At:</span>
            <p className="text-lg text-gray-800">
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
