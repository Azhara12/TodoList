const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const taskRoutes = require("./Routes/taskRoutes.js");
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
app.use("/api/tasks", taskRoutes);
//post Route banate han data ko insert kerny k lie

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
