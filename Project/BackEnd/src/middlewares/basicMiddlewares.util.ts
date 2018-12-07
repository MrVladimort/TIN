import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import HttpError from "../errors/http.error";
import { FontsEffects, FourBitColors, winstonLogger } from "../services/logger.service";

export async function notFound( req: Request, res: Response, next: NextFunction ) {
    next(new HttpError(404, "Page not found"));
}

export async function errorHandler( err: HttpError, req: Request, res: Response, next: NextFunction ) {
    let errorMsg = [
        `${FourBitColors.MAGENTA}${req.method}`,
        `${FourBitColors.BLUE}${req.originalUrl}`,
        `${FourBitColors.RED}${err.status || 500}${FontsEffects.DEFAULT} -`,
        `${FourBitColors.RED}${FontsEffects.BOLD}HttpError: ${err.message}${FontsEffects.DEFAULT}`,
    ].join(" ");

    if (req.query && _.keys(req.query).length > 0) {
        errorMsg += ` | query: ${JSON.stringify(req.query)}`;
    }
    if (req.body && _.keys(req.body).length > 0) {
        errorMsg += ` | body: ${JSON.stringify(req.body)}`;
    }

    winstonLogger.error(errorMsg);
    res.status(err.status || 500)
        .json({ error: err.message || err });
}
