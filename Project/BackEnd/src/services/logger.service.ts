import { Request, Response } from "express";
import figures from "figures";
import moment from "moment";
import morgan, { TokenIndexer } from "morgan";
import { createLogger, format, transports } from "winston";

const { colorize, combine, printf, timestamp, label } = format;
const { Console, File } = transports;

export enum FourBitColors {
    RED = "\u001B[31m",
    GREEN = "\u001B[32m",
    YELLOW = "\u001B[33m",
    BLUE = "\u001B[34m",
    MAGENTA = "\u001B[35m",
    CYAN = "\u001B[36m",
    WHITE = "\u001B[37m",
    DEFAULT = "\u001B[39m",
}

export enum FontsEffects {
    DEFAULT = "\u001B[0m",
    BOLD = "\u001B[1m",
}

const winstonLogger = createLogger({
    exitOnError: false,
    format: combine(
        colorize({ level: true }),
        label({ label: "Tin_Pro" }),
        timestamp({ format: moment().format() }),
        printf(( info ) => {
            let levelSign = "";

            switch (info.level) {
                case "info":
                    for (let i = 0; i < 3; i++) {
                        levelSign += figures.tick;
                    }
                    break;
                case "error":
                    for (let i = 0; i < 3; i++) {
                        levelSign += figures.warning;
                    }
                    break;
            }
            return [
                `${FourBitColors.CYAN}[${info.label}]${FontsEffects.DEFAULT}`,
                `${FourBitColors.YELLOW}[${info.timestamp}]${FontsEffects.DEFAULT}`,
                `${FontsEffects.BOLD}${levelSign} ${info.level} ${levelSign}${FontsEffects.DEFAULT} ${info.message}`
            ].join(" | ");
        }),
    ),
    transports: [
        new Console({
            handleExceptions: false,
            level: "debug",
        }),
        new File({
            filename: "server.verbose.log",
            level: "verbose",
        }),
    ],
});

function morganFormatFunction ( tokens: TokenIndexer, req: Request, res: Response ) {
    const status = Number(tokens.status(req, res));
    let statusColor: FourBitColors;

    if (status >= 400) {
        statusColor = FourBitColors.RED;
    } else if (status >= 200 && status < 300) {
        statusColor = FourBitColors.GREEN;
    } else {
        statusColor = FourBitColors.YELLOW;
    }

    return [
        `${FourBitColors.MAGENTA + FontsEffects.BOLD}Method: ${tokens.method(req, res)}${FontsEffects.DEFAULT}`,
        `${FourBitColors.BLUE + FontsEffects.BOLD}Url: ${tokens.url(req, res)}${FontsEffects.DEFAULT}`,
        `${statusColor}${FontsEffects.BOLD}Status Code: ${status}${FontsEffects.DEFAULT}`,
        `${FourBitColors.CYAN + FontsEffects.BOLD}Response Time: ${tokens[ "response-time" ](req, res)}ms${FontsEffects.DEFAULT}`,
        `Protocol: HTTP/${tokens[ "http-version" ](req, res)}`,
        `Content Length: ${tokens.res(req, res, "content-length")} bytes`,
        `Remote Address: ${tokens[ "remote-addr" ](req, res).substring(0, 30)}`,
        `User Agent: ${tokens[ "user-agent" ](req, res)}`,
    ].join(" | ");
}

const morganLogger = morgan(morganFormatFunction, { stream: { write: ( str: string ) => winstonLogger.info(str) } });

export {
    winstonLogger,
    morganLogger,
};
