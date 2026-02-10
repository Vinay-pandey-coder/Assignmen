import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/common/Navbar";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchTasks();
  }, []);

  const fetchProfile = async () => {
    const res = await api.get("/users/me");
    setProfile(res.data);
  };

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-10">
        <h1 className="text-2xl font-bold mb-1">
          Welcome{profile && `, ${profile.name}`}
        </h1>

        <p className="text-gray-600 mb-8">
          Here’s your account overview.
        </p>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Tasks" value={tasks.length} />
          <StatCard title="Completed" value={completed} />
          <StatCard title="Pending" value={pending} />
        </div>

        {/* TASK PREVIEW */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Recent Tasks
          </h2>

          {tasks.slice(0, 5).map((task) => (
            <div
              key={task._id}
              className="border-b py-3 flex justify-between"
            >
              <span>{task.title}</span>

              <span
                className={`text-sm ${
                  task.completed
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {task.completed ? "Completed" : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <p className="text-gray-500 text-sm">{title}</p>
    <h2 className="text-3xl font-bold">{value}</h2>
  </div>
);

export default Dashboard;
