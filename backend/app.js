const express = require("express");
const cors = require("cors");

// Corrected paths
const authRoutes = require("./src/routes/auth.routes");
const taskRoutes = require("./src/routes/task.routes");
const userRoutes = require("./src/routes/user.routes");

const errorHandler = require("./src/middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
