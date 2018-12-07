import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";

import serverConfig from "./configs/server.config";
import { errorHandler, notFound } from "./middlewares/basicMiddlewares.util";
import { User } from "./models/user.model";
import routes from "./routes";
import { morganLogger, winstonLogger } from "./services/logger.service";

winstonLogger.info(`Process: ${process.cwd()}`);

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

const app = express();

app.use(morganLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

app.use(notFound);
app.use(errorHandler);

const test = {
    kek: "123", lol: {
        l: "",
    },
};

winstonLogger.info(test);

async function connectToDb() {
    mongoose.set("debug", true);
    await mongoose.connect(serverConfig.dbURI, serverConfig.dbOptions);
}

async function main() {
    await app.listen(serverConfig.port);
    await connectToDb();
    winstonLogger.info("Server ready");
}

main().catch(winstonLogger.error);

export default app;
