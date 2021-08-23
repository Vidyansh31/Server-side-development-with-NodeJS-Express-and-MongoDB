var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');



var dishRouter = express.Router({ mergeParams: true });

dishRouter.use(bodyParser.json());

//Routes for specific dish
dishRouter.route('/:dishId')
    .get((req, res, next) => {
       Dishes.findById(req.params.dishId)
       .then((dish) => {
           res.statuscode = 200;
           res.setHeader('Content-Type', 'application/json');
           res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statuscode = 403;
        res.end("POST request not supported by /dishes/" + req.params.dishId);
    })
    .put((req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.dishId , {
            $set : req.body }, { new : true 
        })
        .then((dish) => {
            res.statuscode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Dishes.findByIdAndRemove(req.params.dishId)
        .then((resp) => {
            res.statuscode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp); 
        }, (err) => next(err))
            .catch((err) => next(err));
    });

//Routes for the root path of the application
dishRouter.route('/')
    .get((req, res, next) => {
        Dishes.find({})
            .then((dishes) => {
                res.statuscode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dishes);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
       Dishes.create(req.body)
       .then((dishes)=>{
           console.log('Dish Created' , dishes);
           res.statuscode=200;
           res.setHeader('Content-Type', 'application/json');
           res.json(dishes);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statuscode = 403;
        res.end("PUT request not supported by /dishes");
    })
    .delete((req, res, next) => {
        Dishes.remove({})
        .then((resp)=>{
            res.statuscode=200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    });

module.exports = dishRouter;
