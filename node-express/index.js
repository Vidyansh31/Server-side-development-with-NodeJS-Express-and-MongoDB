const express = require('express');
const http = require('http');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();  // here we are saying that our application are going to use express node module

app.use(morgan('dev')); //it will print out additional information to the screen as required

app.use(express.static(__dirname + '/public')); // This will serve the static files

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
