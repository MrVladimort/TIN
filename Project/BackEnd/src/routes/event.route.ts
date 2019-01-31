import Router from "express-promise-router";
import {createEvent, deleteEvent, editEvent, getAllEvents, getEvent} from "../controllers/event.controller";

const router = Router();

router.get("/:id", getEvent);
router.get("/", getAllEvents);
router.post("/", createEvent);
router.put("/:id", editEvent);
router.delete("/:id", deleteEvent);

export default router;
