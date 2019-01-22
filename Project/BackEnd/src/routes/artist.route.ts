import Router from "express-promise-router";
import {createArtist, deleteArtist, getAllArtists, getArtist} from "../controllers/artist.controller";

const router = Router();

router.get("/:id", getArtist);
router.get("/", getAllArtists);
router.post("/", createArtist);
router.delete("/:id", deleteArtist);

export default router;
