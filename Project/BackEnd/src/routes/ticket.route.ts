import Router from "express-promise-router";
import {deleteTicket, getAllTickets, getTicket} from "../controllers/ticket.controller";

const router = Router();

router.get("/:id", getTicket);
router.get("/", getAllTickets);
router.delete("/:id", deleteTicket);

export default router;
