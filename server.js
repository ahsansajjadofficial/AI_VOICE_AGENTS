const express = require("express");
const app = express();
const PORT = 5000;

// Home route
app.get("/", (req, res) => {
  res.send("🚀 AI Voice Agent Backend is Running!");
});

// inside server.js
app.get("/api/ping", (req, res) => {
  res.json({ message: "pong 🏓" });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is live at http://localhost:${PORT}`);
});
