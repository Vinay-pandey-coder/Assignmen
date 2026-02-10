import TaskItem from "./TaskItem";
import Loader from "../common/Loader";

const TaskList = ({ tasks, loading, refresh, setEditTask }) => {
   if (loading) return <Loader />;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          refresh={refresh}
          setEditTask={setEditTask} // Ye parent ko edit task bataega
        />
      ))}
    </div>
  );
};

export default TaskList;
