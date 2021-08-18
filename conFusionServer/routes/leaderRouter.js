var express = require('express');
var bodyParser = require('body-parser');

var leaderRouter = express.Router({ mergeParams: true });

leaderRouter.use(bodyParser.json());

//Routes for specific leader
leaderRouter.route('/:leaderId')
    .all((req, res, next) => {
        res.statuscode = 200;
        res.setHeader('Content-Type', 'text/html');
        next();
    })
    .get((req, res, next) => {
        res.end("Will get the leader: " + req.params.leaderId + " to you!");
    })
    .post((req, res, next) => {
        res.statuscode = 403;
        res.end("POST request not supported by /leaders/"+req.params.leaderId);
    })
    .put((req, res, next) => {
        res.write("Updating the leader:"+ req.params.leaderId+" for you!");
        res.end("Will add the faltu leader : " + req.body.name + " with details: " + req.body.description);
    })
    .delete((req, res, next) => {
        res.end("Deleting the leader:"+ req.params.leaderId);
    });

    //Routes for the root path of the application
    leaderRouter.route('/')
    .all((req, res, next) => {
        res.statuscode = 200;
        res.setHeader('Content-Type', 'text/html');
        next();
    })
    .get((req, res, next) => {
        res.end("Will get all the leaders to you!");
    })
    .post((req, res, next) => {
        res.end("Will add the faltu leader : " + req.body.name + " with details: " + req.body.description);
    })
    .put((req, res, next) => {
        res.statuscode = 403;
        res.end("PUT request not supported by /leaders");
    })
    .delete((req, res, next) => {
        res.end("Deleting all the leaders");
    });

    module.exports = leaderRouter;