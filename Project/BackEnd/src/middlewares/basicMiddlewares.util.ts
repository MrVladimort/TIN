import {Request, Response, NextFunction} from "express";
import _ from "lodash"
import HttpError from "../errors/http.error";
import logger from "../services/logger.service";

export async function notFound(req: Request, res: Response, next: NextFunction) {
    next(new HttpError(404, 'Page not found'));
}

export async function errorHandler(err: HttpError, req: Request, res: Response, next: NextFunction) {
    let errorMsg = `"${req.method} ${req.originalUrl}": ${err.message}`;
    if (req.query && _.keys(req.query).length > 0) {
        errorMsg += ` | query: ${JSON.stringify(req.query)}`;
    }
    if (req.body && _.keys(req.body).length > 0) {
        errorMsg += ` | body: ${JSON.stringify(req.body)}`;
    }

    logger.error(errorMsg);
    res.status(err.status || 500)
        .json({error: err.message || err});
}