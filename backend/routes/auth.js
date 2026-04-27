const express = require("express");

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/auth/status', authController.getStatus)

router.post('/auth/login', authController.postLogin);

router.post('/auth/sign-up', authController.postSignUp);

router.post('/auth/logout', authController.postLogout);




module.exports = router;