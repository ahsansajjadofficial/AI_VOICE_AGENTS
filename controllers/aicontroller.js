// Placeholder AI handlers (we'll wire real AI soon)

exports.respond = async (req, res) => {
  const { message } = req.body || {};
  if (!message) return res.status(400).json({ error: "message is required" });

  // For now, just echo back
  return res.json({
    reply: `You said: ${message}`,
    model: "placeholder",
  });
};

exports.transcribe = async (req, res) => {
  // Soon: accept audio and return text
  return res.json({ text: "[transcription coming soon]" });
};

exports.tts = async (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: "text is required" });

  // Soon: return URL to generated audio
  return res.json({ audioUrl: null, note: "TTS not wired yet" });
};
