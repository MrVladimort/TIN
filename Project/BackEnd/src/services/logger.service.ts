import winston from "winston";
// winston.emitErrs = true;

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: false,
        }),
        new winston.transports.File({
            filename: 'server.verbose.log',
            level: 'verbose'
        })
    ],
    exitOnError: false
});

export default logger;
export const stream = {
    write: function (str: string) {
        logger.info(str);
    }
};