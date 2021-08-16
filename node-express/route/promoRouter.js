const express = require('express');
const bodyparser = require('body-parser');

const promoRouter = express.Router({mergeParams:true});

promoRouter.use(bodyparser.json());

// Routes for specific promo 
promoRouter.route('/:promoId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send the promotion ' +req.params.promoId +' to you!');
})
.post((req,res,next) => {
     res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'+req.params.promoId);
})
.put((req,res,next) => {
    res.write('Updating the promotion: ' + req.params.promoId + '\n');
    res.end("Will add the faltu promotion : " + req.body.name + " with details: " + req.body.description);
})
.delete((req,res,next) => {
    res.end('Deleting the promotion '+req.params.promoId);
});

//Routes for the root path of the application
promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the promotions to you!');
})
.post((req,res,next) => {
    res.end("Will add the promotion : " + req.body.name + "  with details: " + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT is not supported by /promotions');
})
.delete((req,res,next) => {
    res.end('Deleting all the promotions');
});


module.exports = promoRouter ;