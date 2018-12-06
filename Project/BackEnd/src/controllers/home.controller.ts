// const HttpError = require('../errors/http.error');
// const jwt = require('jsonwebtoken');
// const serverConfig = require('../configs/server.config');
// const logger = require('../services/logger.service');
// const {validationResult} = require('express-validator/check');
//
// module.exports.getHome = async (req, res, next) => {
//     res.json('Home page');
// };

import {Request, Response, NextFunction} from "express";
import UserModel from "../models/user.model";

export async function getHome(req: Request, res: Response, next: NextFunction) {
    const user = new UserModel({email: "petr", pass: "example"});
    await user.save();
    res.json(user);
}
