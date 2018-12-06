import Router from "express-promise-router";
import {withEmailAndPass, withEmailAndToken} from "../controllers/auth.controller"

const router = Router();

router.post("/email", withEmailAndPass);
router.post("/token", withEmailAndToken);

export default router;