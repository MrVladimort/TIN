import Router from "express-promise-router";
import {getArtist} from "../controllers/artist.controller";

const router = Router();

router.get("/", getArtist);

export default router;
