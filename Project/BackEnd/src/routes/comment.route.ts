import Router from "express-promise-router";
import {createComment, deleteComment, getAllComments, getComment} from "../controllers/comment.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.get("/:id", getComment);
router.get("/", getAllComments);
router.post("/", authMiddleware, createComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
