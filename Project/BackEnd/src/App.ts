// const serverConfig = require('./src/configs/server.config');
// const accessConfig = require('./src/configs/access.config');
// const express = require('express');
// const HttpError = require('./src/errors/http.error');
//
// const bodyParser = require('body-parser');
// const _ = require('lodash');
// const logger = require('./src/services/logger.service');
//
// logger.info(`Process: ${process.cwd()}`);
// const app = express();
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
//
// app.use(require('morgan')('combined', {stream: logger.stream}));
//
// require('./routes/index')(app);
//
// const initApp = async () => {
//     try {
//         await app.listen(serverConfig.port);
//         logger.info("Server running on " + serverConfig.port)
//     } catch (err) {
//         logger.error(err);
//     }
// };
// initApp();
//
//
// module.exports = app;

// "use strict";
// const mongoose = require('mongoose');
// const serverConfig = require('./config/server.config');
// mongoose.Promise = global.Promise;
//
// // mongoose.set('debug', true);
//
// mongoose.connect('mongodb://' + serverConfig.dbURL, serverConfig.dbOptions);
//
// module.exports = mongoose;


import express from "express";
import serverConfig from "./configs/server.config";
import routes from "./routes";
import mongoose from "mongoose";

const app = express();
routes(app);

async function connectToDb () {
    mongoose.set('debug', true);
    await mongoose.connect(serverConfig.dbURI, serverConfig.dbOptions)
}

async function main() {
    try {
        await app.listen(serverConfig.port);
        await connectToDb();
        console.log("Server ready");
    } catch (err) {
        console.log(err);
    }
}

main();

export default app;
