import {Application} from "express";
import authRoute from "./auth.route";
import homeRoute from "./home.route";
import registerRoute from "./register.route";

export default function(app: Application) {
    app.use("/api", homeRoute);
    app.use("/api/register", registerRoute);
    app.use("/api/auth", authRoute);
}
