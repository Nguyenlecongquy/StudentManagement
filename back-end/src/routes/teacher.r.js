const express = require('express');
const router = express.Router();
const teacherC = require('../controllers/api/teacher.c');

router.get('/search',teacherC.search);
router.get('/reset',teacherC.reset);
router.post('/add',teacherC.add);
router.put('/modify',teacherC.modify);
router.delete('/remove',teacherC.remove);



module.exports = router;