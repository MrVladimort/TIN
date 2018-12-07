// const logger = require('../services/logger.service');
// const {validationResult} = require('express-validator/check');

import {NextFunction, Request, Response} from "express";
import UserModel from "../models/user.model";

export async function getHome(req: Request, res: Response, next: NextFunction) {
    const user = new UserModel({email: "petr", pass: "example"});
    await user.save();
    res.json(user);
}
