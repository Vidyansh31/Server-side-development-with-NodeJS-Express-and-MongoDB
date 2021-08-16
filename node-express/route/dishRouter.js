const express = require('express');
const bodyparser = require('body-parser');

const dishRouter = express.Router({mergeParams:true});

dishRouter.use(bodyparser.json());

// Routes for specific dish 
dishRouter.route('/:dishId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send the dish ' +req.params.dishId +' to you!');
})
.post((req,res,next) => {
     res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+req.params.dishId);
})
.put((req,res,next) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end("Will add the faltu dish : " + req.body.name + " with details: " + req.body.description);
})
.delete((req,res,next) => {
    res.end('Deleting the dish '+req.params.dishId);
});

//Routes for the root path of the application
dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the dishes to you!');
})
.post((req,res,next) => {
    res.end("Will add the dish : " + req.body.name + "  with details: " + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT is not supported by /dishes');
})
.delete((req,res,next) => {
    res.end('Deleting all the dishes');
});


module.exports = dishRouter ;