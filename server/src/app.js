require("dotenv").config();
require("./config/passport.js");

const express = require("express");
const routes = require("./routes/mainRoutes.js");
const morgan = require("morgan");
var cors = require("cors");

const server = express();

server.use(cors({ credentials: true, origin: `${process.env.FRONTEND_URL}` }));
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", routes);


server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });
  
  module.exports = server;
  