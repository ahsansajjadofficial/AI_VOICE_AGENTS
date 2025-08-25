import express from "express";
import dotenv from "dotenv";
import audioRoutes from "./routes/audioRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/audio", audioRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
