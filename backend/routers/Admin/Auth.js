const express = require('express');
const router =  express.Router();
const AuthController = require('../../controllers/Admin/AuthController');

function initilization() {
    getRoutes();
    postRoutes();
}

initilization();

function getRoutes() {
    
}

function postRoutes() {
    router.post('/signin',)
    router.post('/signup',)
}
module.exports = router;