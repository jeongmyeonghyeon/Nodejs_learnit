const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt'); // 패스워드 암호화
const jwt = require('jsonwebtoken');

const userController = require('../controllers/user');



router.post('/signup', userController.user_signup);

router.post('/login', userController.user_login);



module.exports = router;