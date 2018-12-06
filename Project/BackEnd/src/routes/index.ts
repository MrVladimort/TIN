import {Application} from  "express";
import homeRoute from "./home.route";
import registerRoute from "./register.route";
import authRoute from "./auth.route";

export default function (app: Application) {
    app.use('/api', homeRoute);
    app.use('/api/register', registerRoute);
    app.use('/api/auth', authRoute);
}