module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.json({ isLoggedIn: "User not logged in" })
    }
    next()
}