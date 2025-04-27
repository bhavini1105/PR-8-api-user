const { Router } = require("express");
const userRouter = require("./userRouter");

const indexRouter = Router();

indexRouter.use('/user', userRouter);

module.exports = indexRouter;
