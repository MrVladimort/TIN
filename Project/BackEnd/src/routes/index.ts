// module.exports = (app) => {
//     app.use('/api', require('./home.route'));
// };

import {Application} from "express";
import homeRoute from "./home.route";

export default function (app: Application) {
    app.use('/api', homeRoute);
}
