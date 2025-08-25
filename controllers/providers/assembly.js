// controllers/providers/assembly.js
const axios = require("axios");
const fs = require("fs");

const AAI_BASE = "https://api.assemblyai.com/v2";

function authHeaders(extra = {}) {
  return {
    authorization: process.env.ASSEMBLYAI_API_KEY,
    ...extra,
  };
}

// Upload the audio file (streamed, chunked)
async function uploadFile(filePath) {
  const stream = fs.createReadStream(filePath);
  const res = await axios.post(`${AAI_BASE}/upload`, stream, {
    headers: authHeaders({ "transfer-encoding": "chunked" }),
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
  return res.data.upload_url; // URL AssemblyAI hosts for us
}

// Create transcription job
async function createTranscript(audioUrl) {
  const res = await axios.post(
    `${AAI_BASE}/transcript`,
    { audio_url: audioUrl },
    { headers: authHeaders({ "content-type": "application/json" }) }
  );
  return res.data.id;
}

// Poll until completed/error
async function waitForTranscript(id, { timeoutMs = 120000, intervalMs = 2000 } = {}) {
  const start = Date.now();
  while (true) {
    const res = await axios.get(`${AAI_BASE}/transcript/${id}`, {
      headers: authHeaders(),
    });
    const data = res.data;
    if (data.status === "completed") return data.text;
    if (data.status === "error") throw new Error(data.error || "Transcription error");
    if (Date.now() - start > timeoutMs) throw new Error("Transcription timeout");
    await new Promise((r) => setTimeout(r, intervalMs));
  }
}

async function transcribeFile(filePath) {
  const audioUrl = await uploadFile(filePath);
  const id = await createTranscript(audioUrl);
  const text = await waitForTranscript(id);
  return text;
}

module.exports = { transcribeFile };
