import Router from "express-promise-router";
import {getComment} from "../controllers/comment.controller";

const router = Router();

router.get("/", getComment);

export default router;
