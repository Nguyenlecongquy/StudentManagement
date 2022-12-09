const express = require('express');
const loginC = require('../controllers/login.c');
const router = express.Router();

// get màn hình login
router.get("/", loginC.index);

// Gửi dữ liệu login
router.post("/", loginC.handleLogin);

// Đăng xuất
// router.post("/logout", loginC.handleLogout);


module.exports = router;