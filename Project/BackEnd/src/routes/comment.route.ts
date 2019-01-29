import Router from "express-promise-router";
import {createComment, deleteComment, getAllComments, getAllCommentsByEventId} from "../controllers/comment.controller";
import {authMiddleware} from "../middlewares/auth.middleware";
import {commentValidator} from "../validators/comment.validator";

const router = Router();

router.get("/:id", getAllCommentsByEventId);
router.get("/", getAllComments);
router.post("/", authMiddleware, commentValidator, createComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
