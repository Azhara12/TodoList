const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// 👈 dotenv.config() ko bilkul top par kar diya taake baqi files chalne se pehle keys load ho jayein
dotenv.config();

const connectDB = require("./config/db.js");
const taskRoutes = require("./routes/taskRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

const app = express();

// Middleware
app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

connectDB();

app.get("/", (req, res) => {
  res.json("Data receive in");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});