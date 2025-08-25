// routes/ai.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const { respond, transcribe, tts } = require("../controllers/aicontroller");

const router = express.Router();
const upload = multer({ dest: path.join(__dirname, "..", "uploads") });

router.post("/respond", respond);
router.post("/transcribe", upload.single("audio"), transcribe); // key must be "audio"
router.post("/speak", tts);

module.exports = router;
