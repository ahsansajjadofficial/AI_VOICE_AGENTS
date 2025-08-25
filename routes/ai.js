const express = require("express");
const { respond, transcribe, tts } = require("../controllers/aiController");

const router = express.Router();

router.post("/respond", respond);     // POST /api/ai/respond
router.post("/transcribe", transcribe); // POST /api/ai/transcribe
router.post("/speak", tts);             // POST /api/ai/speak

module.exports = router;
