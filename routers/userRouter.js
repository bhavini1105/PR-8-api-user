const { Router } = require("express");
const { create, get, userdelete, login, verifyUser, user, admin } = require("../controllers/userController");
const userAuth = require("../middleware/userAuth");

const userRouter = Router();

userRouter.post('/', create);
userRouter.get('/', get);
userRouter.delete('/:id', userdelete);

userRouter.post('/login', login);

// Protected routes
userRouter.get('/verify_user', userAuth, verifyUser);
userRouter.get('/user', userAuth, user);
userRouter.get('/admin', userAuth, admin);

module.exports = userRouter;
