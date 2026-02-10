import api from "../../api/axios";

const TaskItem = ({ task, refresh, setEditTask }) => {
  const toggleStatus = async () => {
    try {
      await api.put(`/tasks/${task._id}`, { completed: !task.completed });
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = () => {
    setEditTask(task); // ✅ Pass task to parent for editing
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${task._id}`);
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded shadow mb-2">
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <span
          className={`text-sm ${
            task.completed ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={toggleStatus}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Toggle
        </button>

        <button
          onClick={handleEdit}
          className="px-3 py-1 bg-yellow-500 text-white rounded"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
