const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
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

const isProduction = process.env.NODE_ENV === 'production';

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1)
app.use(session({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  },  
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: false,
  store: new PrismaSessionStore(
    prisma, 
    {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }
  )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/{*splat}', (req, res, next) => {
  const error = new Error('Invalid URL');
  error.status = 404;
  next(error);
});
app.use(errorHandler);

module.exports = app;