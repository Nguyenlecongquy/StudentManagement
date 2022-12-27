const express = require('express');
const router = express.Router();
const classC = require('../controllers/api/class.c');

router.get('/search',classC.search);
router.get('/reset',classC.reset);
router.post('/add',classC.add);
router.put('/modify',classC.modify);
router.delete('/remove',classC.remove);



module.exports = router;