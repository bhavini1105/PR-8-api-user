// userRouter.js

const { Router } = require("express");
const { create, get, userdelete, login, verifyUser, user, admin } = require("../controllers/userController");
const jwtAuth = require("../middleware/jwtAuth");
const userAuth = require("../middleware/userAuth");

const userRouter = Router();

userRouter.post('/', create);
userRouter.get('/', get);
userRouter.delete('/:id', userdelete);
userRouter.post('/login', login);

userRouter.get('/verify_user', jwtAuth, verifyUser);

// Role-specific routes
userRouter.get('/user/dashboard', userAuth, (req, res) => {
    if (req.user.role === 'user') {
        return res.render('userDashboard'); // User dashboard
    } else {
        return res.status(403).json({ message: "Access Denied" });
    }
});

userRouter.get('/admin/dashboard', userAuth, (req, res) => {
    if (req.user.role === 'admin') {
        return res.render('adminDashboard'); // Admin dashboard
    } else {
        return res.status(403).json({ message: "Access Denied" });
    }
});

module.exports = userRouter;
