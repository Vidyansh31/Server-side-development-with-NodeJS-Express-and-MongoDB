var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
var cors = require('./cors'); 

const leaders = require('../models/leader');

var leaderRouter = express.Router({ mergeParams: true });

leaderRouter.use(bodyParser.json());

//Routes for specific leader
leaderRouter.route('/:leaderId')
    .options(cors.corsWithOption, (req, res) => { res.sendStatus = 200; })
    .get(cors.cors, (req, res, next) => {
        leaders.findById(req.params.leaderId)
            .then((leader) => {
                res.statuscode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOption, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statuscode = 403;
        res.end("POST request not supported by /leaders/" + req.params.leaderId);
    })
    .put(cors.corsWithOption, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, {
            new: true
        })
            .then((leader) => {
                res.statuscode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOption, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        leaders.findByIdAndRemove(req.params.leaderId)
            .then((resp) => {
                res.statuscode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

//Routes for the root path of the application
leaderRouter.route('/')
    .options(cors.corsWithOption, (req, res) => { res.sendStatus = 200; })
    .get(cors.cors, (req, res, next) => {
        leaders.find({})
            .then((leaders) => {
                res.statuscode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leaders);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOption, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        leaders.create(req.body)
            .then((leaders) => {
                console.log('leader Created', leaders);
                res.statuscode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leaders);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOption, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statuscode = 403;
        res.end("PUT request not supported by /leaders");
    })
    .delete(cors.corsWithOption, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        leaders.remove({})
            .then((resp) => {
                res.statuscode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = leaderRouter;