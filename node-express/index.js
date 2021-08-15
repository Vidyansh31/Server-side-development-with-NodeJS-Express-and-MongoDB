const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();  // here we are saying that our application are going to use express node module

app.use(bodyParser.json());  // This allows us to parse the body of the request message

app.use(morgan('dev')); //it will print out additional information to the screen as required

app.use(express.static(__dirname + '/public')); // This will serve the static files

app.all('/dishes',(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/dishes',(req,res,next) => {
    res.end('Will send all the dishes to you!');
});

app.post('/dishes',(req,res,next) => {
    res.end("Will add the dish : " + req.body.name + "with details: " + req.body.description);
});

app.put('/dishes',(req,res,next) => {
    res.statusCode = 403;
    res.end('PUT is not supported');
});

app.delete('/dishes',(req,res,next) => {
    res.end('Deleting all the dishes');
});

app.all('/dishes/:dishId',(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/dishes/:dishId',(req,res,next) => {
    res.end('Will send all the dish : '+req.params.dishId+ ' to you!');
});

app.post('/dishes/:dishId',(req,res,next) => {
    res.statusCode = 403;
    res.end('POST is not supported on /dishes' +req.params.dishId );
});

app.put('/dishes/:dishId',(req,res,next) => {
    res.write('Updating the dish :' +req.params.dishId + '/n');
    res.end("Will add the dish : " + req.body.name + "with details: " + req.body.description);
});

app.delete('/dishes/:dishId',(req,res,next) => {
    res.end('Deleting the dish ' +req.params.dishId);
});
app.use((req, res, next) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an express server </h1></body></html>');
});

const server = http.createServer(app); // here we set up the server using express App

server.listen(port,hostname,() => {
    console.log(`Server runnig at http://${hostname}:${port}`);
})
