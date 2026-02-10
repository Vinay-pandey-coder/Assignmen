import { useEffect, useState } from "react";

const TaskForm = ({ title, setTitle, onSubmit, editTask }) => {
  const [buttonText, setButtonText] = useState("Add");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setButtonText("Update");
    } else {
      setTitle("");
      setButtonText("Add");
    }
  }, [editTask]);

  return (
    <form onSubmit={onSubmit} className="flex gap-3 mb-6">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task title"
        className="flex-1 border p-3 rounded-lg"
        required
      />
      <button className="bg-blue-600 text-white px-6 rounded-lg">
        {buttonText}
      </button>
    </form>
  );
};

export default TaskForm;
