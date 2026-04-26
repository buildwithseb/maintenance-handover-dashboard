const { getDb } = require('../config/db');
const bcrypt = require('bcrypt');

exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const db = getDb();
    const user = await db.collection('user').findOne({ email: email });
    if (!user) {
        return res.json({ message: "Email does not exist" })
    }

    const result = await bcrypt.compare(password, user.password);

    if (result) {
        req.session.isLoggedIn = true;
        req.session.user = {
            id: user._id.toString(),
            email: email
        };

        return req.session.save(err => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "session save failed" });
            }
            res.status(200).json({ message: "User id logged in" });

        });
    }

    res.json({ message: "Wrong password" });
}












exports.postSignUp = async (req, res, next) => {

    const email = req.body.email;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // const confirmPassword = req.body.confirmPassword;

    const db = getDb();

    const userEmail = await db.collection('user').findOne({ email: req.body.email });
    if (userEmail) {
        return res.json({ message: `Email:${userEmail}is already used` });
    } else {
        await db.collection('user').insertOne({
            email: email,
            password: hashedPassword
        });
        return res.status(201).json({ message: `New user signed up: ${email}` });
    }
}