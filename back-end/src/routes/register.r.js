const express = require('express');
const registerC = require('../controllers/register.c');
const router = express.Router();

router.get("/", registerC.index);
router.post("/", registerC.handleRegister);

module.exports = router;