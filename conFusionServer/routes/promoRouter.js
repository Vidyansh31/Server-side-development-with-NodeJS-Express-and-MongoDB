var express = require('express');
var bodyParser = require('body-parser');

var promoRouter = express.Router({ mergeParams: true });

promoRouter.use(bodyParser.json());

//Routes for specific promo
promoRouter.route('/:promoId')
    .all((req, res, next) => {
        res.statuscode = 200;
        res.setHeader('Content-Type', 'text/html');
        next();
    })
    .get((req, res, next) => {
        res.end("Will get the promotion: " + req.params.promoId + " to you!");
    })
    .post((req, res, next) => {
        res.statuscode = 403;
        res.end("POST request not supported by /promotions/"+req.params.promoId);
    })
    .put((req, res, next) => {
        res.write("Updating the promotion:"+ req.params.promoId+" for you!");
        res.end("Will add the faltu promotion : " + req.body.name + " with details: " + req.body.description);
    })
    .delete((req, res, next) => {
        res.end("Deleting the promotion:"+ req.params.promoId);
    });

    //Routes for the root path of the application
    promoRouter.route('/')
    .all((req, res, next) => {
        res.statuscode = 200;
        res.setHeader('Content-Type', 'text/html');
        next();
    })
    .get((req, res, next) => {
        res.end("Will get all the promotions to you!");
    })
    .post((req, res, next) => {
        res.end("Will add the faltu promotion : " + req.body.name + " with details: " + req.body.description);
    })
    .put((req, res, next) => {
        res.statuscode = 403;
        res.end("PUT request not supported by /promotions");
    })
    .delete((req, res, next) => {
        res.end("Deleting all the promotions");
    });

    module.exports = promoRouter;