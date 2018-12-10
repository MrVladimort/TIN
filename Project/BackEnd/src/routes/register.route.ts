import Router from "express-promise-router";
import {confirmEmail, register} from "../controllers/register.controller";

const router = Router();

router.post("/", register);
router.get("/confirm-email/:emailToken", confirmEmail);

export  default  router;
