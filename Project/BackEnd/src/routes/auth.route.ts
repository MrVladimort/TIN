import Router from "express-promise-router";
import {withEmailAndPass, withAccessToken, withEmailAndRefreshToken} from "../controllers/auth.controller";

const router = Router();

router.post("/email", withEmailAndPass);
router.post("/refresh-token", withEmailAndRefreshToken);
router.post("/token", withAccessToken);

export default router;
