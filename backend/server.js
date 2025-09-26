const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); 
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes"); 
const errorHandler = require("./middleware/errorHandler");

const app = express(); 

app.use(cors());
app.use(express.json());  

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Error handler:
app.use(errorHandler); 

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/taskApp")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// Run on port 4000: 
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

