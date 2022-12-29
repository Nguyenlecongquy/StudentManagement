const express = require('express');
const router = express.Router();
const scoreC = require('../controllers/api/score.c');

router.get('/search', scoreC.search);
router.get('/reset', scoreC.reset);
router.post('/add', scoreC.add);
router.put('/modify', scoreC.modify);
router.delete('/remove', scoreC.remove);



module.exports = router;