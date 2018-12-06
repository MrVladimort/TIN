import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan  from "morgan";

import serverConfig from "./configs/server.config";
import routes from "./routes";
import {notFound, errorHandler} from "./middlewares/basicMiddlewares.util";
import {User} from "./models/user.model";
import logger, {stream} from  "./services/logger.service";

logger.info(`Process: ${process.cwd()}`);;

declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}

const app = express();

app.use(morgan("combined", {stream}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

routes(app);

app.use(notFound);
app.use(errorHandler);

const test = {
    kek: '123', lol: {
        l: "",
        k: {
            m: 231
        }
    }
};

logger.info(test);

async function connectToDb() {
    mongoose.set('debug', true);
    await mongoose.connect(serverConfig.dbURI, serverConfig.dbOptions)
}

async function main() {
    try {
        await app.listen(serverConfig.port);
        await connectToDb();
        logger.info("Server ready");
    } catch (err) {
        console.log(err);
    }
}

main();

export default app;
