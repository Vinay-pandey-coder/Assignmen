import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/common/Navbar";

import TaskForm from "../../components/tasks/TaskForm";
import TaskList from "../../components/tasks/TaskList";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTask) {
        await api.put(`/tasks/${editTask._id}`, { title });
        setEditTask(null);
      } else {
        await api.post("/tasks", { title });
      }
      setTitle("");
      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (id, completed) => {
    try {
      await api.put(`/tasks/${id}`, { completed: !completed });
      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Filter tasks based on search
  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 sm:p-10 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Tasks</h1>

        {/* ADD / EDIT FORM */}
        <TaskForm
          title={title}
          setTitle={setTitle}
          onSubmit={handleSubmit}
          editTask={editTask}
        />

        {/* SEARCH INPUT */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* TASK LIST */}
        <TaskList
          tasks={filtered}
          loading={loading}
          refresh={loadTasks}
          setEditTask={setEditTask}
          toggleStatus={toggleStatus}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default Tasks;
