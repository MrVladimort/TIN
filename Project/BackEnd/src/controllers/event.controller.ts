import {NextFunction, Request, Response} from "express";

export async function getEvent(req: Request, res: Response, next: NextFunction) {
    res.json();
}
