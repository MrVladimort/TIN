import Router from "express-promise-router";
import {register} from "../controllers/register.controller";

const router = Router();

router.post("/", register);

export  default  router;
