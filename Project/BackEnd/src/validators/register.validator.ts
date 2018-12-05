// const {body} = require('express-validator/check');
// const xRegExp = require('xregexp');
//
// module.exports.regUser = [
//     body('surname')
//         .exists()
//         .isLength({min: 3, max: 40}),
//     body('name')
//         .exists()
//         .isLength({min: 3, max: 40}),
//     body('birthday')
//         .matches(/\d{4}-\d{2}-\d{2}/),
//     body('email')
//         .isEmail()
//         .isLength({min: 5, max: 50}),
//     body('phone')
//         .optional({nullable: true})
//         .matches(/\+\d{10,18}/),
//     body('pass')
//         .exists()
//         .custom((value, {req}) => !value.includes(req.body.email) && !value.includes(req.body.name)),
//     body('repeatPass')
//         .exists()
//         .custom((value, {req}) => value === req.body.pass)
// ];
