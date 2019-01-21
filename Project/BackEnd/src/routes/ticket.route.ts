import Router from "express-promise-router";
import {getTicket} from "../controllers/ticket.controller";

const router = Router();

router.get("/", getTicket);

export default router;
