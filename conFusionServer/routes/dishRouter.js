var express = require('express');
var bodyParser = require('body-parser');

var dishRouter = express.Router({ mergeParams: true });

dishRouter.use(bodyParser.json());

//Routes for specific dish
dishRouter.route('/:dishId')
    .all((req, res, next) => {
        res.statuscode = 200;
        res.setHeader('Content-Type', 'text/html');
        next();
    })
    .get((req, res, next) => {
        res.end("Will get the dish: " + req.params.dishId + " to you!");
    })
    .post((req, res, next) => {
        res.statuscode = 403;
        res.end("POST request not supported by /dishes/"+req.params.dishId);
    })
    .put((req, res, next) => {
        res.write("Updating the dish:"+ req.params.dishId+" for you!");
        res.end("Will add the faltu dish : " + req.body.name + " with details: " + req.body.description);
    })
    .delete((req, res, next) => {
        res.end("Deleting the dish:"+ req.params.dishId);
    });

    //Routes for the root path of the application
    dishRouter.route('/')
    .all((req, res, next) => {
        res.statuscode = 200;
        res.setHeader('Content-Type', 'text/html');
        next();
    })
    .get((req, res, next) => {
        res.end("Will get all the dishes to you!");
    })
    .post((req, res, next) => {
        res.end("Will add the faltu dish : " + req.body.name + " with details: " + req.body.description);
    })
    .put((req, res, next) => {
        res.statuscode = 403;
        res.end("PUT request not supported by /dishes");
    })
    .delete((req, res, next) => {
        res.end("Deleting all the dishes");
    });

    module.exports = dishRouter;
