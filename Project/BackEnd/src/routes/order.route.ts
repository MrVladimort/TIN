import Router from "express-promise-router";
import {geOrder} from "../controllers/order.controller";

const router = Router();

router.get("/", geOrder);

export default router;
