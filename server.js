const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("🚀 AI Voice Agent server is running on localhost!");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
