const express = require('express');
const router = express.Router();
const roleC = require('../controllers/api/role.c');

router.get('/search/class/numberStudent',roleC.searchRoleNumberStudentOfClass);
router.get('/search/grade/numberClass',roleC.searchRoleNumberClassOfGrade);
router.get('/search/grade/countClass',roleC.countClassesByGrade);
router.put('/modify/class/numberStudent',roleC.modifyRoleNumberStudentOfClass);
router.put('/modify/grade/numberClass',roleC.modifyRoleNumberClassOfGrade);



router.get('/search',roleC.searchAll);
module.exports = router;