var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate')

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
    .post(authenticate.verifyUser, (req, res, next) => {
        res.statuscode = 403;
        res.end("POST request not supported by /dishes/" + req.params.dishId);
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, {
            new: true
        })
            .then((dish) => {
                res.statuscode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
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
    .post(authenticate.verifyUser, (req, res, next) => {
        Dishes.create(req.body)
            .then((dishes) => {
                console.log('Dish Created', dishes);
                res.statuscode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dishes);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statuscode = 403;
        res.end("PUT request not supported by /dishes");
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Dishes.remove({})
            .then((resp) => {
                res.statuscode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

dishRouter.route('/:dishId/comments/:commentId')
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null && dish.comments.id(req.params.commentId) != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish.comments.id(req.params.commentId));
                }
                else if (dish == null) {
                    err = new Error('Dish ' + req.params.dishId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Comment ' + req.params.commentId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/' + req.params.dishId
            + '/comments/' + req.params.commentId);
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null && dish.comments.id(req.params.commentId) != null) {
                    if (req.body.rating) {
                        dish.comments.id(req.params.commentId).rating = req.body.rating;
                    }
                    if (req.body.comment) {
                        dish.comments.id(req.params.commentId).comment = req.body.comment;
                    }
                }
                else if (dish == null) {
                    err = new Error('Dish ' + req.params.dishId + ' does not exist');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Comment ' + req.params.commentId + ' does not exist');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null && dish.comments.id(req.params.commentId) != null) {
                    dish.comments.id(req.params.commentId).remove();
                }
                else if (dish == null) {
                    err = new Error('Dish ' + req.params.dishId + ' does not exist');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Comment ' + req.params.commentId + ' does not exist');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

//Routes for specific dish Comments
dishRouter.route('/:dishId/comments')
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null) {
                    res.statuscode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish.comments);
                }
                else {
                    err = new Error('Dish ' + req.params.dishId + ' does not exist');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null) {
                    dish.comments.push(req.body);
                    dish.save()
                        .then((dish) => {
                            res.statuscode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(dish);
                        }, (err) => next(err));
                }
                else {
                    err = new Error('Dish ' + req.params.dishId + ' does not exist');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));

    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes/'
            + req.params.dishId + '/comments');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null) {
                    for (var i = dish.comments.length - 1; i >= 0; i--) {
                        //This removes every comments
                        dish.comments.id(dish.comments[i]._id).remove();
                    }
                    dish.save()
                        .then((dish) => {
                            res.statuscode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(dish);
                        }, (err) => next(err))
                }
                else {
                    err = new Error('Dish ' + req.params.dishId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

//Routes for specfic dish specific comment


module.exports = dishRouter;
