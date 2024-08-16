import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AdminGetTodoByIdAction } from "../../../redux/Actions/admin/AdmintodoActions";
import { ReducersType } from "../../../redux/Store/store";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../redux/Store/store";

interface Task {
  username: string;
  email: string;
  title: string;
  status: boolean;
  createdAt: string;
}

const AdminViewTodo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  const { loading, error, serverResponse } = useSelector(
    (state: ReducersType) => state.adminGetByIdTodo
  );

  useEffect(() => {
    if (id) {
      dispatch(AdminGetTodoByIdAction(id));
    }
  }, [dispatch, id]);

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!serverResponse || !serverResponse.data) return <div>No data found</div>;

  const task: Task = serverResponse.data;

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Task Detail</h1>
      <p className="mb-2">
        <strong>Name:</strong> {task.username}
      </p>
      <p className="mb-2">
        <strong>Email:</strong> {task.email}
      </p>
      <p className="mb-2">
        <strong>Title:</strong> {task.title}
      </p>
      <p className="mb-2">
        <strong>Status:</strong> {task.status ? "Completed" : "Pending"}
      </p>
      <p className="mb-4">
        <strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}
      </p>
      <Link to="/" className="text-blue-500 hover:underline">
        Back to List
      </Link>
    </div>
  );
};

export default AdminViewTodo;
