const express = require('express');
const userRouter = express.Router();
const postsRouter = require('./posts_routes')

userRouter.use('/posts', postsRouter)

module.exports = userRouter;