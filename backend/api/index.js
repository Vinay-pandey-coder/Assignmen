require("dotenv").config();

const app = require("../app");
const connectDB = require("../src/config/db");

(async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error("DB startup failed:", err);
  }
})();

module.exports = app;
