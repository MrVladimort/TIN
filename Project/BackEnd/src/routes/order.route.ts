import Router from "express-promise-router";
import {createOrder, deleteOrder, getAllOrders, getOrder} from "../controllers/order.controller";

const router = Router();

router.get("/:id", getOrder);
router.get("/", getAllOrders);
router.post("/", createOrder);
router.delete("/:id", deleteOrder);

export default router;
