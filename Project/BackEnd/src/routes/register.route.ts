import Router from "express-promise-router";
import {register, confirmEmail} from "../controllers/register.controller";

const router = Router();

router.post("/", register);
router.get("/confirm-email/:emailToken", confirmEmail);

export  default  router;
