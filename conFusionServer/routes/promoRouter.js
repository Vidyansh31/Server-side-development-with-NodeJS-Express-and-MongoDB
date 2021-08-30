var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');

const Promotions = require('../models/promotion');

var promoRouter = express.Router({ mergeParams: true });

promoRouter.use(bodyParser.json());

//Routes for specific promo

promoRouter.route('/:promoId')
    .get((req, res, next) => {
        Promotions.findById(req.params.promoId)
            .then((promotion) => {
                res.statuscode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser ,authenticate.verifyAdmin, (req, res, next) => {
        res.statuscode = 403;
        res.end("POST request not supported by /Promotions/" + req.params.promoId);
    })
    .put(authenticate.verifyUser ,authenticate.verifyAdmin, (req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, {
            new: true
        })
            .then((promotion) => {
                res.statuscode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(authenticate.verifyUser ,authenticate.verifyAdmin, (req, res, next) => {
        Promotions.findByIdAndRemove(req.params.promoId)
            .then((resp) => {
                res.statuscode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

//Routes for the root path of the application
promoRouter.route('/')
    .get((req, res, next) => {
        Promotions.find({})
            .then((Promotions) => {
                res.statuscode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Promotions);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser , authenticate.verifyAdmin,(req, res, next) => {
        Promotions.create(req.body)
            .then((Promotions) => {
                console.log('promo Created', Promotions);
                res.statuscode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Promotions);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser ,authenticate.verifyAdmin, (req, res, next) => {
        res.statuscode = 403;
        res.end("PUT request not supported by /Promotions");
    })
    .delete(authenticate.verifyUser ,authenticate.verifyAdmin, (req, res, next) => {
        Promotions.remove({})
            .then((resp) => {
                res.statuscode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

    module.exports = promoRouter;