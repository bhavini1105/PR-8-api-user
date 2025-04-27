const { Router } = require("express");
const { register, login } = require("../controllers/authController");

const authorRouter = Router();

// Register new user
authorRouter.post('/register', register);

// Login user and get token
authorRouter.post('/login', login);

module.exports = authorRouter;
