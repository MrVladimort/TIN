import {body} from "express-validator/check";

export const registerValidator = [
    body("surname")
        .optional({nullable: true})
        .isLength({min: 3, max: 40}),
    body("name")
        .optional({nullable: true})
        .isLength({min: 3, max: 40}),
    body("email")
        .isEmail()
        .isLength({min: 5, max: 50}),
    body("pass")
        .exists()
        .custom((value, {req}) => !value.includes(req.body.email)),
];
