const express = require('express');

const server = express();

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const {method, originalUrl} = req;
  console.log( ` ${method} to ${originalUrl} at [${new Date().toISOString()}]`);
  next();
}

module.exports = server;
