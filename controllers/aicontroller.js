const fs = require("fs");
const path = require("path");
const nodegtts = require("node-gtts");
const axios = require("axios");

// ------------------- RESPOND -------------------
const respond = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  // Simple echo response
  res.json({ response: `You said: "${message}"` });
};

// ------------------- TRANSCRIBE -------------------
const transcribe = async (req, res) => {
  // For demo, just echo text; you can integrate Whisper or AssemblyAI later
  res.json({ text: "Demo transcription: Hello this is Ahsan testing AI agent." });
};

// ------------------- TTS -------------------
const tts = async (req, res) => {
  const { text, lang = "en", voiceType = "computerized" } = req.body || {};
  if (!text) return res.status(400).json({ error: "Text is required" });

  const outPath = path.join(__dirname, "..", "tmp", "output.mp3");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  if (voiceType === "computerized") {
    // Node-gtts computerized voice
    const gtts = nodegtts(lang);
    gtts.save(outPath, text, (err) => {
      if (err) return res.status(500).json({ error: "Computerized TTS failed" });
      res.download(outPath, "output.mp3", () => fs.unlinkSync(outPath));
    });
  } else if (voiceType === "human") {
    // ElevenLabs human-like voice
    try {
      const apiKey = process.env.ELEVENLABS_API_KEY;
      const voiceId = "21m00Tcm4TlvDq8ikWAM"; // Default female voice, change if needed
      const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

      const response = await axios.post(
        url,
        { text, voice_settings: { stability: 0.7, similarity_boost: 0.75 } },
        {
          responseType: "arraybuffer",
          headers: {
            "xi-api-key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      fs.writeFileSync(outPath, Buffer.from(response.data, "binary"));
      res.download(outPath, "output.mp3", () => fs.unlinkSync(outPath));
    } catch (err) {
      console.error("❌ ElevenLabs TTS failed:", err.response?.data || err.message);
      res.status(500).json({ error: "ElevenLabs TTS failed", detail: err.message });
    }
  } else {
    res.status(400).json({ error: "Invalid voiceType. Use 'computerized' or 'human'." });
  }
};

// ------------------- EXPORT -------------------
module.exports = { respond, transcribe, tts };
