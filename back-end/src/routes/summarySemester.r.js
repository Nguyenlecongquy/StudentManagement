const express = require('express');
const router = express.Router();
const summarySemesterC = require('../controllers/api/summarySemester.c');

router.get('/search', summarySemesterC.search);
router.get('/reset', summarySemesterC.reset);

module.exports = router;
