import {body} from "express-validator/check";

export const orderValidator = [
    body("ticketsData")
        .exists()
        .isArray()
        .not()
        .isEmpty()
        .custom((value: any[]) => {
            return value.reduce((accum: boolean, current: any) => {
                accum = current.name && current.surname && isNaN(current.name) && isNaN(current.surname);
                return accum;
            }, true);
        }),
    body("eventId")
        .exists()
        .isNumeric(),
];
