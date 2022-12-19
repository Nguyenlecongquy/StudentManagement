const express = require('express');
const router = express.Router();
const facultyC = require('../controllers/faculty.c');

router.get('/search',facultyC.search);
router.get('/reset',facultyC.reset);
router.post('/add',facultyC.add);
router.put('/modify',facultyC.modify);
router.delete('/remove',facultyC.remove);



module.exports = router;