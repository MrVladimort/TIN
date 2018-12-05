// const Router = require('express-promise-router');
// const homeController = require('../controllers/home.controller');
// const router = Router();
//
// router.get('/', homeController.getHome);
//
// module.exports = router;

import Router from "express-promise-router";
import {getHome} from "../controllers/home.controller";

const router = Router();

router.get("/", getHome);

export default router;
