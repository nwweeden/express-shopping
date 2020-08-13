const express = require("express");
const app = express();
const { NotFoundError } = require("./expressError");


const itemRoutes = require("./itemRoutes");

// appp.use(express.json())
app.use(express.json());

app.use('/items', itemRoutes)

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    const notFoundError = new NotFoundError();
    return next(notFoundError);
  });
  
  /** Generic error handler; anything unhandled goes here. */
  app.use(function (err, req, res, next) {
    // the default status is 500 Internal Server Error
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
  });
  
module.exports = app;