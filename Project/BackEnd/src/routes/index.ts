import {Application} from "express";
import {authMiddleware} from "../middlewares/auth.middleware";
import artistRoute from "./artist.route";
import authRoute from "./auth.route";
import commentRoute from "./comment.route";
import eventRoute from "./event.route";
import homeRoute from "./home.route";
import orderRoute from "./order.route";
import registerRoute from "./register.route";
import ticketRoute from "./ticket.route";
import userRoute from "./user.route";

export default function(app: Application) {
    app.use("/api", homeRoute);
    app.use("/api/register", registerRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/user", authMiddleware, userRoute);
    app.use("/api/comment", authMiddleware, commentRoute);
    app.use("/api/order", authMiddleware, orderRoute);
    app.use("/api/event", eventRoute);
    app.use("/api/artist", artistRoute);
    app.use("/api/ticket", authMiddleware, ticketRoute);
}
