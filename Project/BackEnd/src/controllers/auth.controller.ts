import {Request, Response, NextFunction} from "express";
import UserModel from "../models/user.model";
import HttpError from "../errors/http.error";

const refreshTokens: Set<string> = new Set();

export async function withEmailAndPass(req: Request, res: Response, next: NextFunction) {
    const {email, pass} = req.body;
    const user = await UserModel.findOneByEmail(email);

    if (user) {
        if (user.verifyPassword(pass)) {
            const tokens = user.generateJWT();
            refreshTokens.add(tokens.refreshToken);
            res.json({user, tokens});
        } else throw new HttpError(401, "Bad email or password")
    } else throw new HttpError(404, "User not found");
}

export async function withEmailAndToken(req: Request, res: Response, next: NextFunction) {
    const {email, refreshToken} = req.body;

    if (!refreshTokens.delete(refreshToken)) throw new HttpError(401, "Bad email or token");

    const user = await UserModel.findOneByEmail(email);
    if (user) {
        if (user.verifyRefreshToken(refreshToken)) {
            const tokens = user.generateJWT();
            refreshTokens.add(tokens.refreshToken);
            res.json({user, tokens});
        } else throw new HttpError(401, "Bad email or token")
    } else throw new HttpError(404, "User not found");
}
