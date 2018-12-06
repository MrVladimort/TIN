import {createLogger, transports, format} from "winston";
import moment from "moment";

const {colorize, combine, json, prettyPrint, printf, timestamp, label} = format;
const {Console, File} = transports;

const logger = createLogger({
    exitOnError: false,
    format: combine(
        colorize({level: true}),
        label({label: 'Tin_Pro'}),
        timestamp({format: moment().format()}),

        // json(), TODO printf toJSON
        // prettyPrint(),
        printf(({label, timestamp, level, message}) => {
            return `\u001B[36m[${label}]\u001B[39m | `
                + `\u001B[33m[${timestamp}]\u001B[39m | `
                + `${level}: ${message}`
        })
    ),
});

logger.add(new Console({
    level: 'debug',
    handleExceptions: false,
}));

logger.add(new File({
    filename: 'server.verbose.log',
    level: 'verbose'
}));

export default logger;
export const stream = {
    write: function (str: string) {
        logger.info(str);
    }
};