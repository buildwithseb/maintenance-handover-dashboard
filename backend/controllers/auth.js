const { getDb } = require('../config/db');

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    req.session.user = {
        email: req.body.email
    };
    res.status(200).json({ message: "Login successfull" });

}

exports.postSignUp = async (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    // const confirmPassword = req.body.confirmPassword;

    const db = getDb();

    const userEmail = await db.collection('user').findOne({ email: req.body.email });
    if (userEmail) {
        return res.json({ message: `Email:${userEmail}is already used` });
    } else {
        await db.collection('user').insertOne({
            email: email,
            password: password
        });
        return res.status(201).json({ message: `New user signed up: ${email}` });
    }
}