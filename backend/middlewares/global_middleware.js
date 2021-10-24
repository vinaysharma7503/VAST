const { validationResult } = require('express-validator'); // it collect response from express-validators
const jwt = require('jsonwebtoken');
const env = require('../environment/env');
const formidable = require('formidable');

exports.ractifyError = (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        next(new Error(error.array()[0].msg)); // to global error method
    } else {
        next(); // to next middleware
    }
}

exports.authenticate = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.slice(7, authHeader.length) : null ;

    try {
        jwt.verify(token, env.jwt_secret, ((error, decode)=>{
            if (error) {
                next(error)
            }else if (!decode) {
                req.errorStatus = 401; // 401 Unprocessable Entity
                next(new Error('User Not Authorised'))
            }else{
                req.userData = decode;
                console.log('userData',req.userData);
                next();
            }
        }))
    } catch (error) {
        req.errorStatus = 401; // 401 Unprocessable Entity
        next(error)
    }
}

exports.formDataParser=(req,res,next)=>{
    try {
        const form = formidable({multiples:true});
        form.parse(req,(err,fields={},files)=>{
            if (err) {
                next(err);
                return;
            }
            req.body = {...fields,files}
            next();
        })
    } catch (error) {
        req.errorStatus = 401; // 401 Unprocessable Entity
    }
}
