const express = require('express');
const router = express.Router();
const summaryC = require('../controllers/api/summary.c');

router.get('/search', summaryC.search);
router.get('/reset', summaryC.reset);

module.exports = router;
