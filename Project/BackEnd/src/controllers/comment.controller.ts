import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator/check";
import HttpError from "../errors/http.error";
import CommentModel from "../models/comment.model";
import EventModel from "../models/event.model";

export async function getComment(req: Request, res: Response, next: NextFunction) {
    const commentId = req.params.id;
    const comment = await CommentModel.findOne({commentId});
    res.json({comment, success: true, status: 200});
}

export async function getAllComments(req: Request, res: Response, next: NextFunction) {
    const comments = await CommentModel.find();
    res.json({comments, success: true, status: 200});
}

export async function createComment(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(422, "Not valid data");
    }

    const {commentData, eventId} = req.body;

    const event = await EventModel.findOne({eventId});
    const comment = new CommentModel({eventId: event.id, userId: req.user.id, ...commentData});
    await comment.save();

    res.json({comment, success: true, status: 200});
}

export async function deleteComment(req: Request, res: Response, next: NextFunction) {
    const commentId = req.params.id;
    await CommentModel.deleteOne({commentId});
    res.json({success: true, status: 200});
}
