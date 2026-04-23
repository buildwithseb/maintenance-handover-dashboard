const express = require("express");

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/login', authController.postLogin);

router.post('/sign-up', authController.postSignUp)


module.exports = router;