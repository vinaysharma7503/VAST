const express = require('express');
const Mongoose = require('mongoose');
const app = express();
const env = require('../environment/env');

function initilization() {
    setupDatabase();
    setupBodyParser();
    //setUpRoutes();
    setupError404Handler();
    setupErrorHandler();
}
initilization();

function setupDatabase() {

    Mongoose.connect(env.db_root)
        .then((r) => {
            console.log("Database connected successfully");
        }).catch((err) => {
            console.log(err);
        });
}

function setupBodyParser() {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
}

function setupError404Handler() {
    app.use((req, res) => {
        res.status(404).json({
            msg: 'NOT FOUND',
            status: 404
        });
    });
}

function setupErrorHandler() {
    app.use((err, req, res, next) => {
        res.status(500).json({
            msg: err.message || "Something went wrong. Please try again later",
            status: 500
        });
    });
}
module.exports = app;