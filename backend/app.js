const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const prisma = require('./config/db');
const cors = require('cors')

const userRouter = require('./routes/userRouter');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3000

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv/config');
require('./config/passport');
app.use(session({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000
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