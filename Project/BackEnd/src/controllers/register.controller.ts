import {Request, Response, NextFunction} from "express";
import UserModel, {User} from "../models/user.model";

export async function register(req : Request, res : Response, next : NextFunction) {
    const userData: User = req.body;
    console.log(userData);
    const user = new UserModel(userData);
    await user.save();
    res.json(user);
}