const express = require('express');
const homeC = require('../controllers/home.c');
const router = express.Router();


// Đăng nhập thành công, home
router.get("/", homeC.index);
// router.get("/homenav", homeC.homenav);
// router.get("/:slug", homeC.show);


module.exports = router;