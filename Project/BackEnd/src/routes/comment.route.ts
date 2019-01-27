import Router from "express-promise-router";
import {createComment, deleteComment, getAllComments, getAllCommentsByEventId} from "../controllers/comment.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.get("/:id", getAllCommentsByEventId);
router.get("/", getAllComments);
router.post("/", authMiddleware, createComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
