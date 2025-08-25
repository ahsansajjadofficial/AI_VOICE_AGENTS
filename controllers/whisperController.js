import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Speech → Text (Whisper)
export const transcribeAudio = async (req, res) => {
  try {
    const filePath = req.file.path; // multer uploaded file
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1",
    });

    res.json({ text: transcription.text });
  } catch (error) {
    console.error("Error in Whisper:", error);
    res.status(500).json({ error: "Whisper failed" });
  }
};
