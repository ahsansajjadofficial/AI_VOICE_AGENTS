import express from "express";
import multer from "multer";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// 🎤 STT (Speech → Text)
router.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    // Just return dummy text for now
    res.json({ text: "Hello this is Ahsan testing AI agent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Transcription failed" });
  }
});

// 🔊 TTS (Text → Speech)
router.post("/tts", async (req, res) => {
  try {
    const { text } = req.body;

    // Example: fake audio file
    fs.writeFileSync("output.mp3", "FAKE AUDIO DATA");

    res.json({ message: "TTS success, file created: output.mp3" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "TTS failed" });
  }
});

export default router;
