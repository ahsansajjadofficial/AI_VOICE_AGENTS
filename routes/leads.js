const express = require("express");
const { listLeads, createLead, getLead } = require("../controllers/leadsController");

const router = express.Router();

router.get("/", listLeads);     // GET /api/leads
router.post("/", createLead);   // POST /api/leads
router.get("/:id", getLead);    // GET /api/leads/:id

module.exports = router;
