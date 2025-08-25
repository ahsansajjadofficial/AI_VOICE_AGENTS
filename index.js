require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routers
app.use("/api/health", require("./routes/health"));
app.use("/api/ai", require("./routes/ai"));
app.use("/api/leads", require("./routes/leads"));

// Root
app.get("/", (req, res) => {
  res.send("🚀 AI Voice Agent backend is running!");
});

// 404 handler
app.use((req, res) => res.status(404).json({ error: "Not found" }));

// Error handler (so app doesn't crash on errors)
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
