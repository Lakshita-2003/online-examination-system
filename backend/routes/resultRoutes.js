const express = require("express");
const router = express.Router();

const { submitExam } = require("../controllers/resultController");
const { protect } = require("../middleware/authMiddleware");

router.post("/submit", protect, submitExam);

module.exports = router;
