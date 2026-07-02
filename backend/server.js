const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const taskRoutes = require("./routes/taskRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const cors = require("cors");
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.json("Data recive in");
});
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
