const express = require('express');
const router = express.Router();
const subjectC = require('../controllers/api/subject.c');

router.get('/search', subjectC.search);
router.get('/reset', subjectC.reset);
router.post('/add', subjectC.add);
router.put('/modify', subjectC.modify);
router.delete('/remove', subjectC.remove);



module.exports = router;