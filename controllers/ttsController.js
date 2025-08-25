import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Text → Speech (TTS)
export const generateSpeech = async (req, res) => {
  try {
    const { text } = req.body;

    const mp3 = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy", // You can choose: "verse", "alloy", etc.
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    // Save file
    const filePath = "output.mp3";
    fs.writeFileSync(filePath, buffer);

    res.download(filePath); // Sends MP3 back to frontend
  } catch (error) {
    console.error("Error in TTS:", error);
    res.status(500).json({ error: "TTS failed" });
  }
};
