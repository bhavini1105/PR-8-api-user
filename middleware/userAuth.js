// userAuth.js

const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
    let authHeaders = req.headers.authorization || req.headers.Authorization;

    if (authHeaders && authHeaders.startsWith('Bearer ')) {
        const token = authHeaders.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.user = decoded;  // Assign decoded user info to req.user
            console.log("User Decoded:", req.user);
            return next();
        } catch (err) {
            return res.status(403).json({ message: "Token is not valid" });
        }
    } else {
        return res.status(401).json({ message: "Unauthorized User" });
    }
};

module.exports = userAuth;
