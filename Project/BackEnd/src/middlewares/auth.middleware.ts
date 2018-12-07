import {NextFunction, Request, Response} from "express";
import HttpError from "../errors/http.error";
import UserModel from "../models/user.model";

export default async function(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization; // jwt = req.header.Authorization
    if (!token) { return next(new HttpError(401, "Bad auth data")); }

    const user = await UserModel.findOneWithAccessToken(token);
    if (!user) { return next(new HttpError(404, "User not found")); }
    req.user = user;
    next();
}
