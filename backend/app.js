const path = require("node:path");
const express = require("express");
const passport = require("passport");
const prisma = require('./config/db');
const cors = require('cors')

const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const commentRouter = require('./routes/commentRouter');
const errorHandler = require('./utils/errorHandler');

const PORT = process.env.PORT || 3000

const app = express();
require('dotenv/config');
require('./config/passport');

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1)

app.use(passport.initialize());

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/{*splat}', (req, res, next) => {
  const error = new Error('Invalid URL');
  error.status = 404;
  next(error);
});
app.use(errorHandler);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  };

  console.log(`Social Media app - listening on port ${PORT}`);
});