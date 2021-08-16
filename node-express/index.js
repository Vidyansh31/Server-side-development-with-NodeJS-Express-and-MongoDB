// Require needed modules
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');


 

// Set host and port for server
const hostname = 'localhost';
const port = 3000;

// here we are saying that our application are going to use express node module
const app = express();

// Require our routers
const dishRouter = require('./route/dishRouter');

// Use our routers
app.use('/dishes', dishRouter);

// This allows us to parse the body of the request message
app.use(bodyParser.json()); 

//it will print out additional information to the screen as required
app.use(morgan('dev')); 

// This will serve the static files
app.use(express.static(__dirname + '/public')); 


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
