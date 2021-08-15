const express = require('express');
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const app = express();  // here we are saying that our application are going to use express node module

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
