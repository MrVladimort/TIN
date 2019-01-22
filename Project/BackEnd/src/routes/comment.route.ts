import Router from "express-promise-router";
import {createComment, deleteComment, getAllComments, getComment} from "../controllers/comment.controller";

const router = Router();

router.get("/:id", getComment);
router.get("/", getAllComments);
router.post("/", createComment);
router.delete("/:id", deleteComment);

export default router;
