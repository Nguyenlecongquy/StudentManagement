const express = require('express');
const router = express.Router();
const roleC = require('../controllers/api/role.c');

router.get('/search/class/maxNumberClass',roleC.searchMaxNumberClass);
router.get('/search',roleC.searchAll);
router.put('/modify/class/maxNumberClass',roleC.modifyMaxNumberClass);



module.exports = router;