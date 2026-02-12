const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/auth.routes");
const taskRoutes = require("./src/routes/task.routes");
const userRoutes = require("./src/routes/user.routes");
const errorHandler = require("./src/middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
