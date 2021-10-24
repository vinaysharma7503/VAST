const express = require('express');
const router =  express.Router();
const AuthController = require('../controllers/AuthController');
const GlobalMiddleware = require('../middlewares/global_middleware');
const Validation = require('../validations/validation');

function initilization() {
    getRoutes();
    postRoutes();
}

initilization();

function getRoutes() {
    
}

function postRoutes() {
    router.post('/signin',GlobalMiddleware.formDataParser,Validation.userLogin(),GlobalMiddleware.ractifyError,AuthController.signin);
    router.post('/signup',GlobalMiddleware.formDataParser,Validation.userRegister(),GlobalMiddleware.ractifyError,AuthController.signup);
}
module.exports = router;