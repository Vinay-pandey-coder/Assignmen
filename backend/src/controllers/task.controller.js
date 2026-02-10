const Task = require("../models/Task");

// GET all user tasks
exports.getTasks = async (req, res, next) => {
  try {
    const { search, status } = req.query;

    const query = {
      user: req.user._id,
    };

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // Filter by status
    if (status === "completed") {
      query.completed = true;
    }

    if (status === "pending") {
      query.completed = false;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// CREATE
exports.createTask = async (req, res) => {
  const { title } = req.body;

  const task = await Task.create({
    title,
    user: req.user.id,
  });

  res.status(201).json(task);
};

// UPDATE
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    next(err);
  }
};


// DELETE
exports.deleteTask = async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });

  res.json({ message: "Task deleted" });
};

module.exports = {
  getTasks: exports.getTasks,
  createTask: exports.createTask,
  updateTask: exports.updateTask,
  deleteTask: exports.deleteTask,
};