const express = require('express');
const bodyparser = require('body-parser');

const leaderRouter = express.Router({mergeParams:true});

leaderRouter.use(bodyparser.json());

// Routes for specific leader 
leaderRouter.route('/:leaderId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send the leaders ' +req.params.leaderId +' to you!');
})
.post((req,res,next) => {
     res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+req.params.leaderId);
})
.put((req,res,next) => {
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end("Will add the faltu leader : " + req.body.name + " with details: " + req.body.description);
})
.delete((req,res,next) => {
    res.end('Deleting the leader '+req.params.leaderId);
});

//Routes for the root path of the application
leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the leaders to you!');
})
.post((req,res,next) => {
    res.end("Will add the leader : " + req.body.name + "  with details: " + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT is not supported by /leaders');
})
.delete((req,res,next) => {
    res.end('Deleting all the leaders');
});


module.exports = leaderRouter ;