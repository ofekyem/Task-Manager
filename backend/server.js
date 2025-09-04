const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes"); 
const errorHandler = require("./middleware/errorHandler");

const app = express(); 

app.use(cors());
app.use(express.json());  
app.use("/api/tasks", taskRoutes); 

// Check if the server is working correctly 
app.get("/api/health", (req, res) => res.json({ ok: true })); 

// Error handler:
app.use(errorHandler);

// Run on port 4000: 
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

