const express = require('express');
const router = express.Router();
const inforC = require('../controllers/api/infor.c');

router.get('/search',inforC.search);
router.put('/modify',inforC.modify);



module.exports = router;