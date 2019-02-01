import Router from "express-promise-router";
import {createEvent, deleteEvent, editEvent, editEventArtists, getAllEvents, getEvent} from "../controllers/event.controller";

const router = Router();

router.get("/:id", getEvent);
router.get("/", getAllEvents);
router.post("/", createEvent);
router.put("/:id", editEvent);
router.put("/artist/:id", editEventArtists);
router.delete("/:id", deleteEvent);

export default router;
