// indexRouter.js

const { Router } = require("express");
const userRouter = require("./userRouter");
const authorRouter = require("./authorRouter");

const indexRouter = Router();

indexRouter.use('/user', userRouter);
indexRouter.use('/author', authorRouter);  // Assuming admin routes go here

module.exports = indexRouter;
