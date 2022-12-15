const express = require('express');
const loginC = require('../controllers/login.c');
const registerC = require('../controllers/register.c');
const router = express.Router();

// get màn hình login
router.get("/login", loginC.index);

// Gửi dữ liệu login
router.post("/login", loginC.handleLogin);

// Đăng xuất
// router.post("/logout", loginC.handleLogout);

router.get("/register", registerC.index);
router.post("/register", registerC.handleRegister);

module.exports = router;