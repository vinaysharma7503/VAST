const { body, query, check } = require('express-validator'); // express validator import
const user = require('../models/userModel');

exports.userRegister = ((req, res) => {
    return [
        body('email', 'Email is required.').isEmail()
            .custom(async (result, { req }) => {
                const response = await user.find({email:result});// []
                if (response.length > 0) {  // true  // null undefiend false
                    req.errorStatus = 409; // 409 Unprocessable Entity
                    throw new Error('This email is already registered.');
                } else {
                    return true
                }
            }),
            body('username', 'Username is required.')
            .matches('[0-9]').withMessage('Username must contain at least 1 Number, Special Character, Lowercase, and Uppercase Letter.')
            .matches(/(?=.[!@#$_%^&.])/).withMessage('Username must contain at least 1 Number, Special Character, Lowercase, and Uppercase Letter.')
            .matches('[A-Z]').withMessage('Username must contain at least 1 Number, Special Character, Lowercase, and Uppercase Letter.')
            .matches('[a-z]').withMessage('Username must contain at least 1 Number, Special Character, Lowercase, and Uppercase Letter.')
            .custom(async (result, { req }) => {
                const response = await user.find({username:result});

                if (response.length > 0) {
                    req.errorStatus = 409; // 409 Unprocessable Entity
                    throw new Error('This username is already taken.')
                } else {
                    return true
                }
            }),
        check('password', 'Password is required.').isLength({ min: 8 })
            .matches('[0-9]').withMessage('Username must contain at least 1 Number, Special Character, Lowercase, and Uppercase Letter.')
            .matches(/(?=.[!@#$_%^&])/).withMessage('Username must contain at least 1 Number, Special Character, Lowercase, and Uppercase Letter.')
            .matches('[A-Z]').withMessage('Username must contain at least 1 Number, Special Character, Lowercase, and Uppercase Letter.')
            .matches('[a-z]').withMessage('Username must contain at least 1 Number, Special Character, Lowercase, and Uppercase Letter.')
            .trim().escape()
    ]
});