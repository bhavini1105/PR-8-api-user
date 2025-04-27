const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid Token" });
        }
    } else {
        return res.status(401).json({ message: "Unauthorized User" });
    }
};

module.exports = userAuth;
