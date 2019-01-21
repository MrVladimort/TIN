import Router from "express-promise-router";
import {getEvent} from "../controllers/event.controller";

const router = Router();

router.get("/", getEvent);

export default router;
