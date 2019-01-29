import Router from "express-promise-router";
import {createOrder, deleteOrder, getAllOrders, getOrder} from "../controllers/order.controller";
import {orderValidator} from "../validators/order.validator";

const router = Router();

router.get("/:id", getOrder);
router.get("/", getAllOrders);
router.post("/", orderValidator, createOrder);
router.delete("/:id", deleteOrder);

export default router;
