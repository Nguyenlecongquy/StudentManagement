const express = require('express');
const router = express.Router();
const studentC = require('../controllers/api/student.c');

router.get('/search', studentC.search);
router.get('/reset', studentC.reset);
router.post('/add', studentC.add);
router.put('/modify', studentC.modify);
router.delete('/remove', studentC.remove);



module.exports = router;