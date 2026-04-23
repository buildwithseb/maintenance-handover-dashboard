const { getDb } = require('../config/db');

exports.postLogin = (req, res, next) => {
    console.log(req.body)
    req.isLoggedIn = true;
}

exports.postSignUp = (req, res, next) => {
    console.log(req.body)
 }